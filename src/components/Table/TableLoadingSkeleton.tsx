interface TableLoadingSkeletonProps {
  readonly pageSize: number;
  readonly startIndex: number;
  readonly className?: string;
}

export function TableLoadingSkeleton({ 
  pageSize, 
  startIndex, 
  className = '' 
}: TableLoadingSkeletonProps) {
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