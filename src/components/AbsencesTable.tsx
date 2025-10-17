'use client';

import { useState, useEffect } from 'react';
import { PaginatedTable, type TableColumn } from './Table';

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

// Combined data type for the table
interface AbsenceWithConflict {
  id: number;
  startDate: string;
  endDate: string;
  days?: number;
  employeeName: string;
  approvalStatus: 'approved' | 'pending approval';
  absenceType: string;
  hasConflict?: boolean;
}

export function AbsencesTable() {
  const [absencesData, setAbsencesData] = useState<AbsenceWithConflict[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch absences from the first API
  const fetchAbsences = async (): Promise<Absence[]> => {
    const response = await fetch('https://front-end-kata.brighthr.workers.dev/api/absences');
    if (!response.ok) {
      throw new Error(`Failed to fetch absences: ${response.statusText}`);
    }
    return response.json();
  };

  // Fetch conflict data for a specific absence ID
  const fetchConflict = async (id: number): Promise<Conflict> => {
    const response = await fetch(`https://front-end-kata.brighthr.workers.dev/api/conflict/${id}`);
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

  // Define columns for the table
  const columns: TableColumn<AbsenceWithConflict>[] = [
    {
      key: 'startDate',
      label: 'Start Date',
      sortable: true,
      render: (value) => {
        try {
          return new Date(value).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
        } catch {
          return value;
        }
      },
    },
    {
      key: 'endDate',
      label: 'End Date',
      sortable: true,
      render: (value) => {
        try {
          return new Date(value).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
        } catch {
          return value;
        }
      },
    },
    {
      key: 'days',
      label: 'Duration',
      sortable: true,
      className: 'text-center',
      render: (value) => {
        if (!value) return <span className="font-medium text-gray-900">N/A</span>;
        
        const dayText = value === 1 ? 'day' : 'days';
        return (
          <span className="font-medium text-gray-900">
            {value} {dayText}
          </span>
        );
      },
    },
    {
      key: 'employeeName',
      label: 'Employee Name',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: 'approvalStatus',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === 'approved'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {value === 'approved' ? 'Approved' : 'Pending Approval'}
        </span>
      ),
    },
    {
      key: 'absenceType',
      label: 'Absence Type',
      sortable: true,
      render: (value) => {
        const getTypeColor = (type: string) => {
          const lowerType = type.toLowerCase();
          if (lowerType.includes('vacation') || lowerType.includes('holiday')) {
            return 'bg-blue-100 text-blue-800';
          }
          if (lowerType.includes('sick')) {
            return 'bg-red-100 text-red-800';
          }
          if (lowerType.includes('personal')) {
            return 'bg-purple-100 text-purple-800';
          }
          if (lowerType.includes('maternity') || lowerType.includes('paternity')) {
            return 'bg-pink-100 text-pink-800';
          }
          return 'bg-gray-100 text-gray-800';
        };

        return (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(value)}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'hasConflict',
      label: 'Has Conflict',
      sortable: true,
      className: 'text-center',
      render: (value) => (
        <div className="flex justify-center">
          {value ? (
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Yes
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No
            </span>
          )}
        </div>
      ),
    },
  ];

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
        columns={columns}
        pageSize={10}
        loading={loading}
        emptyMessage="No absence records found"
        className="shadow-lg"
      />
    </div>
  );
}

export default AbsencesTable;