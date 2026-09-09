import React from 'react';
import { cn } from './utils';

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'error' | 'success';
}

export const FormMessage: React.FC<FormMessageProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  if (!children) return null;

  const variantClass =
    variant === 'error'
      ? 'ui-field-message-error'
      : variant === 'success'
      ? 'ui-field-message-success'
      : 'ui-field-message';

  return (
    <p
      role={variant === 'error' ? 'alert' : undefined}
      className={cn(variantClass, className)}
      {...props}
    >
      {children}
    </p>
  );
};
