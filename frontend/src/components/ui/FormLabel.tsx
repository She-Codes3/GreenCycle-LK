import React from 'react';
import { cn } from './utils';

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  required,
  optional,
  className,
  ...props
}) => {
  return (
    <label className={cn('ui-field-label flex items-center justify-between', className)} {...props}>
      <span>
        {children}
        {required && <span className="ml-1 text-red-600" aria-hidden="true">*</span>}
      </span>
      {optional && <span className="text-xs font-normal text-content-muted">(Optional)</span>}
    </label>
  );
};
