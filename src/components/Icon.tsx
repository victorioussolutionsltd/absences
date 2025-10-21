import React from 'react';

export interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
  'aria-label'?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  className = '', 
  size, 
  'aria-label': ariaLabel 
}) => {
  let sizeClass = 'w-5 h-5';
  if (size) {
    sizeClass = typeof size === 'number' ? `w-${size} h-${size}` : size;
  }

  return (
    <svg 
      className={`${sizeClass} ${className}`}
      aria-label={ariaLabel}
      role={ariaLabel ? undefined : 'presentation'}
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};

// Export icon names for type safety
export const ICON_NAMES = [
  'chevron-up',
  'chevron-down', 
  'chevron-left',
  'chevron-right',
  'x',
  'document',
  'exclamation-circle',
  'check-circle',
] as const;

export type IconName = typeof ICON_NAMES[number];