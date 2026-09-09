import React from 'react';
import { cn } from '../ui/utils';

export interface TimelineStep {
  id: string;
  label: string;
  timestamp?: string;
  completed: boolean;
  current?: boolean;
  note?: string;
}

export interface PickupTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export const PickupTimeline: React.FC<PickupTimelineProps> = ({ steps, className }) => {
  return (
    <div className={cn('relative pl-6 space-y-6', className)}>
      {/* Connecting Vertical Line */}
      <div className="absolute top-3 bottom-3 left-2.5 w-0.5 bg-border-strong -translate-x-1/2" />

      {steps.map((step) => (
        <div key={step.id} className="relative flex items-start gap-4">
          {/* Step Indicator Dot */}
          <div
            className={cn(
              'absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center transition-all z-10',
              step.completed
                ? 'bg-primary text-white ring-4 ring-primary-light shadow-sm'
                : step.current
                ? 'bg-secondary text-white ring-4 ring-secondary-light animate-pulse'
                : 'bg-surface border-2 border-border-strong text-transparent'
            )}
          >
            {step.completed ? (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <h4
                className={cn(
                  'text-sm font-semibold',
                  step.completed || step.current ? 'text-content' : 'text-content-muted'
                )}
              >
                {step.label}
              </h4>
              {step.timestamp && (
                <span className="text-[11px] text-content-muted font-mono">{step.timestamp}</span>
              )}
            </div>
            {step.note && (
              <p className="text-xs text-content-secondary mt-0.5 leading-relaxed">{step.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
