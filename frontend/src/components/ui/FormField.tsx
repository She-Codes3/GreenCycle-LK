import React from 'react';
import { cn } from './utils';
import { FormLabel } from './FormLabel';
import { FormMessage } from './FormMessage';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  optional,
  helperText,
  error,
  success,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('ui-field', className)} {...props}>
      {label && (
        <FormLabel htmlFor={htmlFor} required={required} optional={optional}>
          {label}
        </FormLabel>
      )}
      {children}
      {error && <FormMessage variant="error">{error}</FormMessage>}
      {!error && success && <FormMessage variant="success">{success}</FormMessage>}
      {!error && !success && helperText && <FormMessage variant="default">{helperText}</FormMessage>}
    </div>
  );
};
