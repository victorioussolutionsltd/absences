'use client';

import { useState, useEffect } from 'react';
import { Table } from '../Table';
import { 
  getAbsenceTableColumns,
  getTableConfig,
  AbsenceWithConflict
} from './absenceTableConfig';
import { API_CONFIG } from '@/config/api';
import { t } from '@/i18n/translations';
import { calculateEndDate } from '@/utils/dateHelpers';
import { EmployeeAbsencesModal } from './EmployeeAbsencesModal';
import { XCircleIcon } from '../icons';

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
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle employee name click
  const handleEmployeeNameClick = (employeeName: string) => {
    setSelectedEmployee(employeeName);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee('');
  };

  // Fetch absences from the first API
  const fetchAbsences = async (): Promise<Absence[]> => {
    const response = await fetch(API_CONFIG.ABSENCES_URL);
    if (!response.ok) {
      throw new Error(t('errors.fetchAbsences', { error: response.statusText }));
    }
    return response.json();
  };

  // Fetch conflict data for a specific absence ID
  const fetchConflict = async (id: number): Promise<Conflict> => {
    const response = await fetch(`${API_CONFIG.CONFLICT_URL}/${id}`);
    if (!response.ok) {
      throw new Error(t('errors.fetchConflict', { id: id.toString(), error: response.statusText }));
    }
    return response.json();
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
        setError(err instanceof Error ? err.message : t('errors.fetchData'));
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMapData();
  }, []);

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <h3 className="text-sm font-medium text-red-800">{t('table.messages.errorTitle')}</h3>
              <div className="mt-2 text-sm text-red-700 break-words">{error}</div>
              <div className="mt-4">
                <button 
                  onClick={() => globalThis.location.reload()}
                  className="bg-red-100 px-3 py-2 text-sm text-red-800 rounded-md hover:bg-red-200 transition-colors w-full sm:w-auto"
                >
                  {t('table.messages.tryAgain')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t('page.subtitle')}</h2>
        <p className="text-sm sm:text-base text-gray-600">
          {t('page.description')}
        </p>
        {!loading && (
          <div className="mt-2 text-xs sm:text-sm text-gray-500">
            {t('page.recordsCount', { count: absencesData.length.toString() })}
            {absencesData.some(item => item.hasConflict) && (
              <span className="ml-2 text-red-600">
                {t('page.conflictsCount', { count: absencesData.filter(item => item.hasConflict).length.toString() })}
              </span>
            )}
          </div>
        )}
      </div>
      
      <Table
        data={absencesData}
        columns={getAbsenceTableColumns(handleEmployeeNameClick)}
        pageSize={API_CONFIG.PAGE_SIZE}
        loading={loading}
        emptyMessage={getTableConfig().emptyMessage}
        className={getTableConfig().className}
      />

      <EmployeeAbsencesModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        employeeName={selectedEmployee}
        allAbsences={absencesData}
      />
    </div>
  );
}

export default AbsencesTable;