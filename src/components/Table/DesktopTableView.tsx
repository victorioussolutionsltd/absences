import { TableColumn, SortConfig } from './types';
import { TableHeader } from './TableHeader';

interface DesktopTableViewProps<T> {
  readonly columns: TableColumn<T>[];
  readonly paginatedData: T[];
  readonly emptyMessage: string;
  readonly sortConfig: SortConfig<T>;
  readonly onSort: (columnKey: keyof T) => void;
  readonly startIndex: number;
}

export function DesktopTableView<T extends Record<string, any>>({ 
  columns, 
  paginatedData, 
  emptyMessage, 
  sortConfig, 
  onSort,
  startIndex 
}: DesktopTableViewProps<T>) {
  return (
    <div className="hidden md:block overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader 
          columns={columns} 
          sortConfig={sortConfig} 
          onSort={onSort} 
        />
        
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={`row-${startIndex + rowIndex}-${JSON.stringify(Object.values(row).slice(0, 2))}`}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                      column.className || ''
                    }`}
                  >
                    {column.render
                      ? column.render(row[column.key], row, startIndex + rowIndex)
                      : String(row[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}