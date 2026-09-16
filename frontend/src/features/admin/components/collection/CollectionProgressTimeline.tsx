import React from 'react';
import { Check, Clock, Truck, PackageCheck, CheckCircle2, XCircle } from 'lucide-react';
import { CollectionRequest } from '../../types/collectionRequest';

interface CollectionProgressTimelineProps {
  request: CollectionRequest;
  className?: string;
}

interface StepDef {
  index: number;
  key: string;
  label: string;
  subtext?: string;
  icon: React.ReactNode;
}

export const CollectionProgressTimeline: React.FC<CollectionProgressTimelineProps> = ({
  request,
  className = '',
}) => {
  const { status, collector, completionInfo } = request;

  // Determine active step index (0 to 4)
  // 0: Request Submitted
  // 1: Collector Assigned
  // 2: Collection In Progress
  // 3: Waste Collected
  // 4: Request Completed
  let activeIndex = 0;
  if (status === 'Pending') activeIndex = 0;
  else if (status === 'Assigned') activeIndex = 1;
  else if (status === 'In Progress') activeIndex = 2;
  else if (status === 'Collected') activeIndex = 3;
  else if (status === 'Completed') activeIndex = 4;

  const isCancelled = status === 'Cancelled';

  const steps: StepDef[] = [
    {
      index: 0,
      key: 'submitted',
      label: 'Request Submitted',
      subtext: `${request.requestedDate} — ${request.requestedTime}`,
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    {
      index: 1,
      key: 'assigned',
      label: 'Collector Assigned',
      subtext: collector
        ? `${collector.name} (${collector.collectorId})`
        : 'Awaiting municipal assignment',
      icon: <Check className="w-3.5 h-3.5" />,
    },
    {
      index: 2,
      key: 'in-progress',
      label: 'Collection In Progress',
      subtext: collector && activeIndex >= 2 ? 'Dispatched / Route in progress' : 'Not yet dispatched',
      icon: <Truck className="w-3.5 h-3.5" />,
    },
    {
      index: 3,
      key: 'collected',
      label: 'Waste Collected',
      subtext: completionInfo?.collectedAt
        ? `Loaded at ${completionInfo.collectedAt}`
        : activeIndex >= 3
        ? 'Physical collection confirmed'
        : 'Pending physical collection',
      icon: <PackageCheck className="w-3.5 h-3.5" />,
    },
    {
      index: 4,
      key: 'completed',
      label: 'Request Completed',
      subtext: completionInfo?.completedAt
        ? `Closed at ${completionInfo.completedAt}`
        : activeIndex === 4
        ? 'Final sign-off complete'
        : 'Pending final closure',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
  ];

  if (isCancelled) {
    return (
      <div className={`p-4 rounded-2xl border border-rose-200 bg-rose-50/50 ${className}`}>
        <div className="flex items-center gap-2.5 text-rose-800 font-bold text-xs mb-2">
          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Collection Request Cancelled</span>
        </div>
        <p className="text-xs text-rose-700/90 leading-relaxed">
          This request was cancelled before completion. Reason:{' '}
          <span className="font-semibold">{request.notes || 'Cancelled by citizen or municipal request.'}</span>
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-muted/30 rounded-2xl border border-border p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-border/60">
        <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted">
          Collection Lifecycle Progress
        </h4>
        <span className="text-[11px] font-bold text-primary">
          Step {activeIndex + 1} of 5
        </span>
      </div>

      {/* Stepper for Tablet & Desktop */}
      <div className="hidden sm:grid grid-cols-5 gap-2 relative">
        {steps.map((step) => {
          const isDone = activeIndex > step.index;
          const isCurrent = activeIndex === step.index;

          return (
            <div key={step.key} className="flex flex-col items-center text-center relative group">
              {/* Connector line behind */}
              {step.index < 4 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-0.5 -z-0 transition-colors ${
                    activeIndex > step.index ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}

              {/* Node Circle */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                  isDone
                    ? 'bg-primary text-white ring-2 ring-primary/20'
                    : isCurrent
                    ? 'bg-primary text-white ring-4 ring-primary/25 animate-pulse'
                    : 'bg-surface text-content-muted border border-border'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.icon}
              </div>

              {/* Label & Subtext */}
              <div className="mt-2.5 space-y-0.5 max-w-[120px]">
                <span
                  className={`block text-[11px] font-bold leading-tight ${
                    isCurrent
                      ? 'text-primary font-black'
                      : isDone
                      ? 'text-content'
                      : 'text-content-muted'
                  }`}
                >
                  {step.label}
                </span>
                <span className="block text-[9px] text-content-muted leading-tight truncate">
                  {step.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vertical Stepper for Mobile (below sm) */}
      <div className="sm:hidden space-y-3">
        {steps.map((step) => {
          const isDone = activeIndex > step.index;
          const isCurrent = activeIndex === step.index;

          return (
            <div key={step.key} className="flex items-start gap-3 relative">
              {step.index < 4 && (
                <div
                  className={`absolute left-3.5 top-7 w-0.5 h-6 ${
                    activeIndex > step.index ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                  isDone
                    ? 'bg-primary text-white'
                    : isCurrent
                    ? 'bg-primary text-white ring-2 ring-primary/30'
                    : 'bg-surface text-content-muted border border-border'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : step.icon}
              </div>
              <div className="pt-0.5">
                <span
                  className={`block text-xs font-bold ${
                    isCurrent ? 'text-primary' : isDone ? 'text-content' : 'text-content-muted'
                  }`}
                >
                  {step.label}
                </span>
                <span className="block text-[10px] text-content-muted">
                  {step.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
