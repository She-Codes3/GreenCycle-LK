import React from 'react';
import { cn } from '../ui/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'canvas' | 'surface' | 'muted';
}

const spacingClasses = {
  none: 'py-0',
  sm: 'py-4 sm:py-6',
  md: 'py-8 sm:py-12',
  lg: 'py-12 sm:py-16',
};

const backgroundClasses = {
  canvas: 'bg-canvas',
  surface: 'bg-surface',
  muted: 'bg-muted border-y border-border',
};

export const Section: React.FC<SectionProps> = ({
  spacing = 'md',
  background = 'canvas',
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={cn(
        'w-full',
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
