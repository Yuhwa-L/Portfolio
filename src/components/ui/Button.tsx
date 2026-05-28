import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variants: Record<Variant, string> = {
  primary:
    'bg-text-primary text-white hover:bg-black active:bg-black/90 shadow-sm',
  secondary:
    'bg-surface text-text-primary hover:bg-border-soft border border-border-soft',
  ghost:
    'bg-transparent text-text-primary hover:bg-surface',
};

const sizes: Record<Size, string> = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-[15px]',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    iconLeft,
    iconRight,
    ...rest
  } = props;

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium',
    'transition-all duration-200 ease-apple',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className,
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {iconLeft}
        <span>{children}</span>
        {iconRight}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}
