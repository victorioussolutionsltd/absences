import { ChevronUpIcon, ChevronDownIcon } from '../icons';
import { TableColumn, SortConfig } from './types';

interface TableHeaderProps<T> {
  readonly columns: TableColumn<T>[];
  readonly sortConfig: SortConfig<T>;
  readonly onSort: (columnKey: keyof T) => void;
}

export function TableHeader<T>({ 
  columns, 
  sortConfig, 
  onSort 
}: TableHeaderProps<T>) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
              column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
            } ${column.className || ''}`}
            onClick={() => column.sortable && onSort(column.key)}
          >
            <div className="flex items-center space-x-1">
              <span>{column.label}</span>
              {column.sortable && (
                <div className="flex flex-col">
                  <ChevronUpIcon
                    className={`w-3 h-3 ${
                      sortConfig.key === column.key && sortConfig.direction === 'asc'
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }`}
                  />
                  <ChevronDownIcon
                    className={`w-3 h-3 -mt-1 ${
                      sortConfig.key === column.key && sortConfig.direction === 'desc'
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }`}
                  />
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}