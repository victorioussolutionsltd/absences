'use client';

import { useState, useEffect } from 'react';
import { PaginatedTable } from './Table';
import { 
  absenceTableColumns, 
  API_CONFIG, 
  TABLE_CONFIG,
  type AbsenceWithConflict 
} from './absenceTableConfig';

// Types based on the API responses
interface Absence {
  id: number;
  startDate: string;
  endDate: string;
  days?: number; // Number of days for the absence
  employee: {
    firstName: string;
    lastName: string;
  };
  approved: boolean;
  absenceType: string;
}

interface Conflict {
  id: number;
  conflicts: boolean;
  // Add other conflict properties as needed
}

export function AbsencesTable() {
  const [absencesData, setAbsencesData] = useState<AbsenceWithConflict[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch absences from the first API
  const fetchAbsences = async (): Promise<Absence[]> => {
    const response = await fetch(API_CONFIG.ABSENCES_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch absences: ${response.statusText}`);
    }
    return response.json();
  };

  // Fetch conflict data for a specific absence ID
  const fetchConflict = async (id: number): Promise<Conflict> => {
    const response = await fetch(`${API_CONFIG.CONFLICT_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch conflict for ID ${id}: ${response.statusText}`);
    }
    return response.json();
  };

  // Helper function to calculate correct end date
  const calculateEndDate = (startDate: string, days?: number): string => {
    if (!days || days <= 0) {
      return startDate; // If no days specified, end date is same as start date
    }
    
    const start = new Date(startDate);
    // Add (days - 1) because if absence is 1 day, start and end should be the same
    const end = new Date(start);
    end.setDate(start.getDate() + (days - 1));
    
    return end.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
  };

  useEffect(() => {
    const fetchAndMapData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, fetch all absences
        const absences = await fetchAbsences();

        // Helper function to safely fetch conflict data
        const fetchConflictSafely = async (absenceId: number) => {
          try {
            return await fetchConflict(absenceId);
          } catch (err) {
            console.warn(`Failed to fetch conflict for absence ${absenceId}:`, err);
            return { id: absenceId, conflicts: false };
          }
        };

        // Then fetch conflict data for each absence in parallel
        const conflictPromises = absences.map(absence => fetchConflictSafely(absence.id));
        const conflicts = await Promise.all(conflictPromises);

        // Map and combine the data
        const mappedData: AbsenceWithConflict[] = absences.map(absence => ({
          id: absence.id,
          startDate: absence.startDate,
          endDate: calculateEndDate(absence.startDate, absence.days),
          days: absence.days,
          employeeName: `${absence.employee.firstName} ${absence.employee.lastName}`,
          approvalStatus: absence.approved ? 'approved' : 'pending approval',
          absenceType: absence.absenceType,
          hasConflict: conflicts[absence.id]?.conflicts || false,
        }));

        setAbsencesData(mappedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMapData();
  }, []);

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <div className="mt-4">
                <button 
                  onClick={() => globalThis.location.reload()}
                  className="bg-red-100 px-3 py-2 text-sm text-red-800 rounded-md hover:bg-red-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Employee Absences</h2>
        <p className="text-gray-600">
          Data from BrightHR API - absences and conflict information
        </p>
        {!loading && (
          <div className="mt-2 text-sm text-gray-500">
            Showing {absencesData.length} absence records
            {absencesData.some(item => item.hasConflict) && (
              <span className="ml-2 text-red-600">
                • {absencesData.filter(item => item.hasConflict).length} with conflicts
              </span>
            )}
          </div>
        )}
      </div>
      
      <PaginatedTable
        data={absencesData}
        columns={absenceTableColumns}
        pageSize={API_CONFIG.PAGE_SIZE}
        loading={loading}
        emptyMessage={TABLE_CONFIG.emptyMessage}
        className={TABLE_CONFIG.className}
      />
    </div>
  );
}

export default AbsencesTable;