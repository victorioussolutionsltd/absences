import { TableColumn } from './types';

interface MobileCardViewProps<T> {
  readonly columns: TableColumn<T>[];
  readonly paginatedData: T[];
  readonly emptyMessage: string;
  readonly startIndex: number;
}

export function MobileCardView<T extends Record<string, any>>({ 
  columns, 
  paginatedData, 
  emptyMessage, 
  startIndex 
}: MobileCardViewProps<T>) {
  return (
    <div className="md:hidden space-y-4">
      {paginatedData.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200">
          {emptyMessage}
        </div>
      ) : (
        paginatedData.map((row, rowIndex) => (
          <div
            key={`card-${startIndex + rowIndex}-${JSON.stringify(Object.values(row).slice(0, 2))}`}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-3"
          >
            {columns.map((column) => (
              <div key={String(column.key)} className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500 min-w-0 flex-1">
                  {column.label}:
                </span>
                <span className="text-sm text-gray-900 text-right min-w-0 flex-1 ml-2">
                  {column.render
                    ? column.render(row[column.key], row, startIndex + rowIndex)
                    : String(row[column.key] ?? '')}
                </span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}