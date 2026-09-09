import React from 'react';
import { cn } from './utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  showSummary?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  showSummary = false,
  className,
}) => {
  if (totalPages <= 1 && !totalItems) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const startItem = totalItems && pageSize ? (currentPage - 1) * pageSize + 1 : null;
  const endItem = totalItems && pageSize ? Math.min(currentPage * pageSize, totalItems) : null;

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex flex-col sm:flex-row items-center justify-between gap-4 py-3', className)}
    >
      {showSummary && totalItems !== undefined && (
        <p className="text-xs text-content-secondary">
          Showing <span className="font-medium text-content">{startItem}</span> to{' '}
          <span className="font-medium text-content">{endItem}</span> of{' '}
          <span className="font-medium text-content">{totalItems}</span> results
        </p>
      )}

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-surface text-content hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {getPages().map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={idx}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={cn(
                'inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium transition-colors',
                page === currentPage
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-border bg-surface text-content hover:bg-primary-light hover:text-primary'
              )}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="w-8 h-8 flex items-center justify-center text-content-muted text-xs">
              {page}
            </span>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-surface text-content hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
