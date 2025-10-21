'use client';

import { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  className?: string;
}

export interface PaginatedTableProps<T = any> {
  readonly data: T[];
  readonly columns: TableColumn<T>[];
  readonly pageSize?: number;
  readonly loading?: boolean;
  readonly emptyMessage?: string;
  readonly className?: string;
  readonly showPagination?: boolean;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
  showPagination = true,
}: PaginatedTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'desc' ? -comparison : comparison;
    });
  }, [data, sortConfig]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Handle sorting
  const handleSort = (columnKey: keyof T) => {
    const column = columns.find((col) => col.key === columnKey);
    if (!column?.sortable) return;

    setSortConfig((prev) => ({
      key: columnKey,
      direction:
        prev.key === columnKey && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="animate-pulse">
          {/* Desktop skeleton */}
          <div className="hidden md:block">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            {Array.from({ length: pageSize }, (_, i) => (
              <div key={`skeleton-row-${i + startIndex}`} className="h-8 bg-gray-100 rounded mb-2"></div>
            ))}
          </div>
          
          {/* Mobile skeleton */}
          <div className="md:hidden space-y-4">
            <div className="h-16 bg-gray-200 rounded mb-4"></div>
            {Array.from({ length: pageSize }, (_, i) => (
              <div key={`skeleton-card-${i + startIndex}`} className="h-32 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Sort Controls */}
      <div className="md:hidden mb-4 flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <select
          value={sortConfig.key ? String(sortConfig.key) : ''}
          onChange={(e) => {
            const columnKey = e.target.value as keyof T;
            if (columnKey) {
              handleSort(columnKey);
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

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  } ${column.className || ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
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

          {/* Body */}
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

      {/* Mobile Card View */}
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

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          {/* Mobile pagination */}
          <div className="flex justify-between items-center flex-1 sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            
            <span className="text-sm text-gray-700 px-2">
              <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
            </span>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>

          {/* Desktop pagination */}
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(endIndex, sortedData.length)}
                </span>{' '}
                of <span className="font-medium">{sortedData.length}</span> results
              </p>
              <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                      page === currentPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </nav>
          </div>
        </div>
      )}
    </div>
  );
}

// Export default for convenience
export default Table;
