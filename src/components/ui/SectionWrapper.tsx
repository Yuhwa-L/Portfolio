import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionWrapperProps {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** When false, drops the bottom padding so two sections can visually merge. */
  withBottomPadding?: boolean;
}

export function SectionWrapper({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  innerClassName,
  withBottomPadding = true,
}: SectionWrapperProps) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn(
        'pt-20 sm:pt-24 lg:pt-section-lg',
        withBottomPadding && 'pb-20 sm:pb-24 lg:pb-section-lg',
        className,
      )}
    >
      <div className={cn('container max-w-6xl', innerClassName)}>
        {(eyebrow || title || intro) && (
          <div className="mb-12 sm:mb-16 max-w-3xl">
            {eyebrow && (
              <div className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-accent">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2
                id={headingId}
                className="text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight leading-[1.05] text-text-primary text-balance"
              >
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 text-lg sm:text-xl text-text-secondary leading-relaxed text-pretty">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
