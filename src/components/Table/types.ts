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

export interface SortConfig<T> {
  key: keyof T | null;
  direction: 'asc' | 'desc';
}