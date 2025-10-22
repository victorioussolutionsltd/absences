'use client';

import { 
  TableLoadingSkeleton,
  MobileSortControls,
  DesktopTableView,
  MobileCardView,
  TablePagination,
  useTableState,
  type PaginatedTableProps
} from './index';

export function Table<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
  showPagination = true,
}: Readonly<PaginatedTableProps<T>>) {
  const {
    currentPage,
    sortConfig,
    sortedData,
    paginatedData,
    totalPages,
    startIndex,
    endIndex,
    handleSort: handleSortInternal,
    handlePageChange,
  } = useTableState(data, pageSize);

  // Handle sorting with column validation
  const handleSort = (columnKey: keyof T) => {
    const column = columns.find((col) => col.key === columnKey);
    if (!column?.sortable) return;
    handleSortInternal(columnKey);
  };

  if (loading) {
    return (
      <TableLoadingSkeleton 
        pageSize={pageSize} 
        startIndex={startIndex} 
        className={className} 
      />
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <MobileSortControls 
        sortConfig={sortConfig} 
        columns={columns} 
        onSort={handleSort} 
      />
      
      <DesktopTableView 
        columns={columns}
        paginatedData={paginatedData}
        emptyMessage={emptyMessage}
        sortConfig={sortConfig}
        onSort={handleSort}
        startIndex={startIndex}
      />
      
      <MobileCardView 
        columns={columns}
        paginatedData={paginatedData}
        emptyMessage={emptyMessage}
        startIndex={startIndex}
      />
      
      {showPagination && (
        <TablePagination 
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={sortedData.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

// Export default for convenience
export default Table;