import { type TableColumn } from '../Table';
import { t } from '../../i18n/translations';
import { formatDate } from '@/utils/dateHelpers';

// Absence type constants
export const ABSENCE_TYPES = {
  ANNUAL_LEAVE: 'ANNUAL_LEAVE',
  SICKNESS: 'SICKNESS',
  PERSONAL: 'PERSONAL',
  MATERNITY: 'MATERNITY',
  PATERNITY: 'PATERNITY',
  HOLIDAY: 'HOLIDAY',
  VACATION: 'VACATION',
  SICK_LEAVE: 'SICK_LEAVE'
} as const;

export type AbsenceType = typeof ABSENCE_TYPES[keyof typeof ABSENCE_TYPES];

// Combined data type for the table
export interface AbsenceWithConflict {
  id: number;
  startDate: string;
  endDate: string;
  days?: number;
  employeeName: string;
  approvalStatus: 'approved' | 'pending approval';
  absenceType: string;
  hasConflict?: boolean;
}

// Helper function to get absence type colors
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

// Helper function to get translated absence type by constant
export const getTranslatedAbsenceType = (absenceType: AbsenceType): string => {
  return t(`table.absenceTypes.${absenceType}`);
};

// Helper function to translate absence types
const translateAbsenceType = (type: string): string => {
  const upperType = type.toUpperCase().replaceAll(/\s+/g, '_');
  
  // Try to find exact match first
  const translationKey = `table.absenceTypes.${upperType}`;
  const translated = t(translationKey);
  
  // If translation exists and is different from the key, use it
  if (translated !== translationKey) {
    return translated;
  }
  
  // Fallback: try common mappings
  const commonMappings: Record<string, string> = {
    'ANNUAL LEAVE': 'ANNUAL_LEAVE',
    'SICK LEAVE': 'SICK_LEAVE',
    'SICK': 'SICKNESS',
    'VACATION': 'VACATION',
    'HOLIDAY': 'HOLIDAY',
    'PERSONAL': 'PERSONAL',
    'MATERNITY': 'MATERNITY',
    'PATERNITY': 'PATERNITY'
  };
  
  const mappedKey = commonMappings[upperType];
  if (mappedKey) {
    const mappedTranslation = t(`table.absenceTypes.${mappedKey}`);
    if (mappedTranslation !== `table.absenceTypes.${mappedKey}`) {
      return mappedTranslation;
    }
  }
  
  // If no translation found, return original
  return type;
};

// Table columns configuration - function to generate columns with current language
export const getAbsenceTableColumns = (onEmployeeNameClick?: (employeeName: string) => void): TableColumn<AbsenceWithConflict>[] => [
  {
    key: 'startDate',
    label: t('table.columns.startDate'),
    sortable: true,
    render: (value) => formatDate(value),
  },
  {
    key: 'endDate',
    label: t('table.columns.endDate'),
    sortable: true,
    render: (value) => formatDate(value),
  },
  {
    key: 'days',
    label: t('table.columns.duration'),
    sortable: true,
    className: 'text-center',
    render: (value) => {
      if (!value) return <span className="font-medium text-gray-900">{t('table.duration.notAvailable')}</span>;
      
      const dayText = value === 1 ? t('table.duration.day') : t('table.duration.days');
      return (
        <span className="font-medium text-gray-900">
          {value} {dayText}
        </span>
      );
    },
  },
  {
    key: 'employeeName',
    label: t('table.columns.employeeName'),
    sortable: true,
    render: (value) => onEmployeeNameClick ? (
      <button
        type="button"
        onClick={() => onEmployeeNameClick(value)}
        className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors"
      >
        {value}
      </button>
    ) : (
      <span className="font-medium text-gray-900">{value}</span>
    ),
  },
  {
    key: 'approvalStatus',
    label: t('table.columns.status'),
    sortable: true,
    render: (value) => (
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'approved'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {value === 'approved' ? t('table.status.approved') : t('table.status.pendingApproval')}
      </span>
    ),
  },
  {
    key: 'absenceType',
    label: t('table.columns.absenceType'),
    sortable: true,
    render: (value) => (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAbsenceTypeColor(value)}`}>
        {translateAbsenceType(value)}
      </span>
    ),
  },
  {
    key: 'hasConflict',
    label: t('table.columns.hasConflict'),
    sortable: true,
    className: 'text-center',
    render: (value) => (
      <div className="flex justify-center">
        {value ? (
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {t('table.conflict.yes')}
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {t('table.conflict.no')}
          </span>
        )}
      </div>
    ),
  },
];

// Backward compatibility - keep the static export but mark as deprecated
/** @deprecated Use getAbsenceTableColumns() instead for dynamic language support */
export const absenceTableColumns = getAbsenceTableColumns();

// API configuration
export const API_CONFIG = {
  ABSENCES_URL: 'https://front-end-kata.brighthr.workers.dev/api/absences',
  CONFLICT_URL: 'https://front-end-kata.brighthr.workers.dev/api/conflict',
  PAGE_SIZE: 10,
} as const;

// Table settings - function to generate config with current language
export const getTableConfig = () => ({
  emptyMessage: t('table.messages.emptyTable'),
  className: 'shadow-lg',
} as const);

// Backward compatibility - keep the static export but mark as deprecated
/** @deprecated Use getTableConfig() instead for dynamic language support */
export const TABLE_CONFIG = getTableConfig();