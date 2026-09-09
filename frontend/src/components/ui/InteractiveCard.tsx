import React from 'react';
import { cn } from './utils';
import { Card, CardProps } from './Card';

export interface InteractiveCardProps extends CardProps {
  onClick?: () => void;
  selected?: boolean;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  onClick,
  selected = false,
  className,
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'ui-card-interactive cursor-pointer select-none',
        selected && 'border-secondary ring-2 ring-secondary/20 shadow-elevated',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};
