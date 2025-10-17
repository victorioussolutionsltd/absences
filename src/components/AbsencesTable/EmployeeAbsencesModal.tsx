'use client';

import { useState, useEffect } from 'react';
import { t } from '@/i18n/translations';
import { formatDate } from '@/utils/dateHelpers';
import { AbsenceWithConflict, getTranslatedAbsenceType } from './absenceTableConfig';

interface EmployeeAbsencesModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly employeeName: string;
  readonly allAbsences: AbsenceWithConflict[];
}

export function EmployeeAbsencesModal({ 
  isOpen, 
  onClose, 
  employeeName, 
  allAbsences 
}: EmployeeAbsencesModalProps) {
  const [employeeAbsences, setEmployeeAbsences] = useState<AbsenceWithConflict[]>([]);

  useEffect(() => {
    if (isOpen && employeeName) {
      const filteredAbsences = allAbsences.filter(
        absence => absence.employeeName === employeeName
      );
      // Sort by start date (newest first)
      const sortedAbsences = filteredAbsences.toSorted((a, b) => 
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
      setEmployeeAbsences(sortedAbsences);
    }
  }, [isOpen, employeeName, allAbsences]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const getAbsenceTypeColor = (type: string): string => {
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

  const getStatusColor = (status: string): string => {
    return status === 'approved' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <button
        type="button"
        className="absolute inset-0 w-full h-full bg-transparent border-none cursor-default"
        onClick={handleBackdropClick}
        aria-label={t('modal.close')}
      />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col relative z-10">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b">
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 break-words">
              {t('modal.employeeAbsences.title', { name: employeeName })}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {t('modal.employeeAbsences.subtitle', { 
                count: employeeAbsences.length.toString() 
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 sm:p-2"
            aria-label={t('modal.close')}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {employeeAbsences.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <div className="text-gray-400 mb-3 sm:mb-4">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                {t('modal.employeeAbsences.noData')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 break-words">
                {t('modal.employeeAbsences.noDataDescription', { name: employeeName })}
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {/* Desktop View */}
              <div className="hidden sm:block">
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('table.columns.startDate')}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('table.columns.endDate')}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('table.columns.days')}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('table.columns.absenceType')}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('table.columns.status')}
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('table.columns.hasConflict')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employeeAbsences.map((absence) => (
                        <tr key={absence.id} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {formatDate(absence.startDate)}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {formatDate(absence.endDate)}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {absence.days || 1}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <span className={`inline-flex px-1 sm:px-2 py-1 text-xs font-semibold rounded-full ${getAbsenceTypeColor(absence.absenceType)}`}>
                              {getTranslatedAbsenceType(absence.absenceType as any)}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <span className={`inline-flex px-1 sm:px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(absence.approvalStatus)}`}>
                              {t(`table.status.${absence.approvalStatus.replace(' ', '_')}`)}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            {absence.hasConflict ? (
                              <span className="inline-flex items-center px-1 sm:px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="hidden sm:inline">{t('table.conflict.yes')}</span>
                                <span className="sm:hidden">!</span>
                              </span>
                            ) : (
                              <span className="inline-flex px-1 sm:px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                <span className="hidden sm:inline">{t('table.conflict.no')}</span>
                                <span className="sm:hidden">✓</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile View */}
              <div className="sm:hidden space-y-3">
                {employeeAbsences.map((absence) => (
                  <div key={absence.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 break-words">
                          {formatDate(absence.startDate)} - {formatDate(absence.endDate)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {absence.days || 1} {t('table.columns.days').toLowerCase()}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {absence.hasConflict ? (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="truncate">{t('table.conflict.yes')}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="truncate">{t('table.conflict.no')}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAbsenceTypeColor(absence.absenceType)}`}>
                          <span className="truncate">{getTranslatedAbsenceType(absence.absenceType as any)}</span>
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(absence.approvalStatus)}`}>
                          <span className="truncate">{t(`table.status.${absence.approvalStatus.replace(' ', '_')}`)}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-600 font-medium">{t('table.columns.hasConflict')}:</span>
                        {absence.hasConflict ? (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="truncate">{t('table.conflict.yes')}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="truncate">{t('table.conflict.no')}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-4 sm:p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {t('modal.close')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAbsencesModal;