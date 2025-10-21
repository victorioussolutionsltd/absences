import { TableColumn } from './types';

interface MobileSortControlsProps<T> {
  readonly sortConfig: {
    key: keyof T | null;
    direction: 'asc' | 'desc';
  };
  readonly columns: TableColumn<T>[];
  readonly onSort: (columnKey: keyof T) => void;
}

export function MobileSortControls<T>({ 
  sortConfig, 
  columns, 
  onSort 
}: MobileSortControlsProps<T>) {
  return (
    <div className="md:hidden mb-4 flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      <select
        value={sortConfig.key ? String(sortConfig.key) : ''}
        onChange={(e) => {
          const columnKey = e.target.value as keyof T;
          if (columnKey) {
            onSort(columnKey);
          }
        }}
        className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">No sorting</option>
        {columns
          .filter(col => col.sortable)
          .map((column) => {
            let sortIndicator = '';
            if (sortConfig.key === column.key) {
              sortIndicator = sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
            }
            return (
              <option key={String(column.key)} value={String(column.key)}>
                {column.label}{sortIndicator}
              </option>
            );
          })}
      </select>
    </div>
  );
}