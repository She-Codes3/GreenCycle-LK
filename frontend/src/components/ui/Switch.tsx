import React from 'react';
import { cn } from './utils';

export interface SwitchProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const trackSizes = {
  sm: 'w-8 h-4',
  md: 'w-11 h-6',
  lg: 'w-14 h-7',
};

export const Switch: React.FC<SwitchProps> = ({
  id,
  checked,
  defaultChecked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className={cn('flex items-start justify-between gap-3', className)}>
      {(label || description) && (
        <div className="flex flex-col cursor-pointer" onClick={toggle}>
          {label && (
            <span
              className={cn(
                'text-sm font-medium text-content select-none',
                disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-content-muted leading-4 mt-0.5 select-none">
              {description}
            </span>
          )}
        </div>
      )}

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out',
          'focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus:outline-none',
          isChecked ? 'bg-primary' : 'bg-border-strong',
          trackSizes[size],
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <span className="sr-only">{label ? String(label) : 'Toggle switch'}</span>
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none inline-block transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
            size === 'sm' && (isChecked ? 'translate-x-4 h-3 w-3 mt-0.5' : 'translate-x-0.5 h-3 w-3 mt-0.5'),
            size === 'md' && (isChecked ? 'translate-x-5 h-5 w-5 mt-0.5' : 'translate-x-0.5 h-5 w-5 mt-0.5'),
            size === 'lg' && (isChecked ? 'translate-x-7 h-6 w-6 mt-0.5' : 'translate-x-0.5 h-6 w-6 mt-0.5')
          )}
        />
      </button>
    </div>
  );
};
