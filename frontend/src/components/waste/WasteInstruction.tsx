import React from 'react';
import { cn } from '../ui/utils';
import { Card } from '../ui/Card';

export interface InstructionStep {
  stepNumber: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  dos?: string[];
  donts?: string[];
}

export interface WasteInstructionProps {
  title?: string;
  subtitle?: string;
  steps: InstructionStep[];
  className?: string;
}

export const WasteInstruction: React.FC<WasteInstructionProps> = ({
  title = 'How to Segregate Waste Correctly',
  subtitle = 'Follow these simple steps before collection or drop-off',
  steps,
  className,
}) => {
  return (
    <Card className={cn('flex flex-col gap-6', className)}>
      {(title || subtitle) && (
        <div className="border-b border-border pb-4">
          <h3 className="text-base font-bold text-content">{title}</h3>
          {subtitle && <p className="text-xs text-content-muted mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className="flex flex-col p-4 rounded-xl border border-border bg-muted/30 relative"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center shadow-sm">
                {step.stepNumber}
              </span>
              {step.icon && <div className="text-primary text-xl">{step.icon}</div>}
            </div>

            <h4 className="text-sm font-bold text-content mb-1">{step.title}</h4>
            <p className="text-xs text-content-secondary leading-relaxed mb-3">
              {step.description}
            </p>

            {(step.dos || step.donts) && (
              <div className="mt-auto pt-3 border-t border-border/60 space-y-1.5 text-[11px]">
                {step.dos &&
                  step.dos.map((d, i) => (
                    <div key={i} className="flex items-start gap-1 text-emerald-800">
                      <span className="font-bold">✓</span>
                      <span>{d}</span>
                    </div>
                  ))}
                {step.donts &&
                  step.donts.map((d, i) => (
                    <div key={i} className="flex items-start gap-1 text-red-700">
                      <span className="font-bold">✕</span>
                      <span>{d}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
