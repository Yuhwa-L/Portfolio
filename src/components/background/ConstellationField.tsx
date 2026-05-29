import { Suspense, lazy } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

const ConstellationCanvas = lazy(() => import('./ConstellationCanvas'));

/**
 * Engineering constellation: a sparse 3D point cloud with thin connecting lines.
 * Slowly auto-rotates, accelerates with scroll position, and tilts with mouse.
 * Sits behind page content but above the CSS AmbientBackground.
 *
 * Inspired by network diagrams and the visual language of code graphs.
 * Subtle on purpose: never wider than ~70% saturation, additive blending so it
 * blooms gently against the soft gradients instead of competing with them.
 */
export function ConstellationField() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden"
      style={{
        // Promote to its own compositor layer + isolate layout/paint so the
        // fixed canvas never participates in page reflow on scroll. No
        // `will-change` — this wrapper never animates its transform (all motion
        // lives inside the WebGL canvas), so it would only pin layer memory.
        transform: 'translateZ(0)',
        contain: 'strict',
      }}
    >
      <Suspense fallback={null}>
        <ConstellationCanvas />
      </Suspense>
    </div>
  );
}
