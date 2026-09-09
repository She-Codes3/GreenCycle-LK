import React from 'react';
import { cn } from './utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  count = 1,
  className,
  style,
  ...props
}) => {
  const variantClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'text'
      ? 'h-4 rounded-md my-1'
      : 'rounded-xl';

  const inlineStyles: React.CSSProperties = {
    ...style,
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined,
  };

  const elements = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      aria-hidden="true"
      className={cn('ui-skeleton', variantClass, className)}
      style={inlineStyles}
      {...props}
    />
  ));

  return count === 1 ? elements[0] : <div className="flex flex-col gap-2 w-full">{elements}</div>;
};
