interface ChevronUpIconProps {
  readonly className?: string;
}

export function ChevronUpIcon({ className = "w-4 h-4" }: ChevronUpIconProps) {
  return (
    <svg 
      className={className} 
      fill="currentColor" 
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}