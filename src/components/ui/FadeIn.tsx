import { motion, type HTMLMotionProps } from 'framer-motion';
import { APPLE_EASE } from '@/lib/motion';

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
  duration?: number;
  /** Default: only animate the first time the element enters the viewport. */
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  y = 14,
  duration = 0.6,
  once = true,
  className,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: APPLE_EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
