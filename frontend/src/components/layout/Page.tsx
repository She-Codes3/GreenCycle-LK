import React from 'react';
import { cn } from '../ui/utils';

export type PageProps = React.HTMLAttributes<HTMLDivElement>;

export const Page: React.FC<PageProps> = ({ children, className, ...props }) => {
  return (
    <main className={cn('ui-page font-sans', className)} {...props}>
      {children}
    </main>
  );
};
