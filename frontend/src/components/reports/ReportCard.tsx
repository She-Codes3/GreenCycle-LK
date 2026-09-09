import React from 'react';
import { cn } from '../ui/utils';
import { InteractiveCard } from '../ui/InteractiveCard';
import { ReportStatus } from './ReportStatus';

export interface ReportCardProps {
  id: string;
  title: string;
  issueType: string;
  location: string;
  submittedAt: string;
  status: string;
  imageUrl?: string;
  upvotes?: number;
  commentsCount?: number;
  onUpvote?: () => void;
  onView?: () => void;
  className?: string;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  id,
  title,
  issueType,
  location,
  submittedAt,
  status,
  imageUrl,
  upvotes = 0,
  commentsCount = 0,
  onUpvote,
  onView,
  className,
}) => {
  return (
    <InteractiveCard
      onClick={onView}
      padding="none"
      className={cn('overflow-hidden flex flex-col justify-between', className)}
    >
      {/* Thumbnail or placeholder */}
      {imageUrl ? (
        <div className="relative h-40 w-full bg-muted overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-content/80 text-white backdrop-blur-sm">
              {issueType}
            </span>
            <span className="text-[11px] font-mono text-white/80 bg-content/60 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
              #{id}
            </span>
          </div>
          <div className="absolute top-2.5 right-2.5">
            <ReportStatus status={status} size="sm" />
          </div>
        </div>
      ) : (
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary-light">
              {issueType}
            </span>
            <span className="text-xs font-mono text-content-muted">#{id}</span>
          </div>
          <ReportStatus status={status} size="sm" />
        </div>
      )}

      {/* Body Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h4 className="font-bold text-sm text-content leading-snug mb-1">{title}</h4>
          <div className="flex items-center gap-1.5 text-xs text-content-secondary mb-2">
            <svg className="w-3.5 h-3.5 text-content-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Footer info & upvotes */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-3 text-xs text-content-muted">
          <span className="text-[11px]">{submittedAt}</span>

          <div className="flex items-center gap-3">
            {commentsCount > 0 && (
              <span className="flex items-center gap-1 text-[11px]">
                💬 {commentsCount}
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onUpvote?.();
              }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg border border-border hover:border-secondary hover:text-primary transition-colors text-xs font-medium"
              title="Confirm / Upvote issue"
            >
              <span>👍</span>
              <span>{upvotes}</span>
            </button>
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
};
