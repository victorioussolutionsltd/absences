import { type TableColumn } from './Table';

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

// Helper function to format dates
const formatDate = (value: string): string => {
  try {
    return new Date(value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return value;
  }
};

// Table columns configuration
export const absenceTableColumns: TableColumn<AbsenceWithConflict>[] = [
  {
    key: 'startDate',
    label: 'Start Date',
    sortable: true,
    render: (value) => formatDate(value),
  },
  {
    key: 'endDate',
    label: 'End Date',
    sortable: true,
    render: (value) => formatDate(value),
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
    render: (value) => (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAbsenceTypeColor(value)}`}>
        {value}
      </span>
    ),
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

// API configuration
export const API_CONFIG = {
  ABSENCES_URL: 'https://front-end-kata.brighthr.workers.dev/api/absences',
  CONFLICT_URL: 'https://front-end-kata.brighthr.workers.dev/api/conflict',
  PAGE_SIZE: 10,
} as const;

// Table settings
export const TABLE_CONFIG = {
  emptyMessage: 'No absence records found',
  className: 'shadow-lg',
} as const;