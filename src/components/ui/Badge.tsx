import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeTone = 'neutral' | 'accent' | 'soft';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-surface text-text-secondary border border-border-soft',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  soft: 'bg-white text-text-secondary border border-border-soft',
};

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
