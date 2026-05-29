import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { isSafari } from '@/lib/isSafari';

/**
 * Page-wide ambient background. A fixed layer behind all content, composed of:
 *   1. Base off-white wash with soft radial gradients
 *   2. Three large blurred "aurora" blobs (slow idle drift only)
 *   3. Faint dot grid, masked to a center oval so it never competes with text
 *   4. SVG fractal-noise grain
 *   5. Bottom vignette so content cards stay legible
 *
 * PERFORMANCE — why this layer is intentionally "dumb":
 * ----------------------------------------------------------------------------
 * It is deliberately NOT coupled to scroll or mouse. The 3D constellation
 * (ConstellationCanvas) is the page's single scroll-reactive background element,
 * and it is frame-synced for zero lag. Keeping the aurora independent means
 * scrolling never triggers transform writes or re-rasterization of these large
 * `filter: blur()` blobs — the precise WebKit cost (bug 89475, "Blur filter
 * causes issues when scrolling") that used to make scrolling stutter and made
 * the 3D field appear to lag behind the page.
 *
 *   - No `useScroll` / `useTransform`  -> no scroll-time work, on any browser.
 *   - No mousemove listener / state    -> no React re-renders during pointer move.
 *   - Safari & reduced-motion: blobs are fully STATIC, so WebKit rasterizes each
 *     blur once and then just composites it. Other browsers keep a slow,
 *     continuous idle drift (transform-only, GPU-cheap on Blink/Gecko).
 *
 * The noise layer keeps `mix-blend-overlay`, but its backdrop is only the fixed
 * sibling layers here (not the scrolling page), so it composites once and is not
 * a per-scroll cost.
 */
export function AmbientBackground() {
  const reduced = useReducedMotion();

  // The only motion in this component. Off on Safari (animating a blurred layer
  // forces re-raster) and under prefers-reduced-motion.
  const drift = !reduced && !isSafari;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      {/* Layer 1: Base radial wash. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 1200px 800px at 20% -5%, rgba(0, 113, 227, 0.13), transparent 60%), radial-gradient(ellipse 900px 700px at 85% 25%, rgba(190, 175, 220, 0.14), transparent 65%), radial-gradient(ellipse 1000px 600px at 50% 100%, rgba(0, 113, 227, 0.06), transparent 70%)',
        }}
      />

      {/* Layer 2: Aurora blobs (idle drift only; static on Safari/reduced-motion). */}
      <motion.div
        animate={drift ? { x: [0, 30, -20, 0], y: [0, -20, 30, 0] } : undefined}
        transition={drift ? { duration: 32, repeat: Infinity, ease: 'easeInOut' } : undefined}
        className="absolute -left-40 -top-56 h-[720px] w-[720px] rounded-full opacity-80 blur-[110px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(170, 200, 255, 0.85), rgba(170, 200, 255, 0.18) 55%, transparent 75%)',
          }}
        />
      </motion.div>

      <motion.div
        animate={drift ? { x: [0, -40, 20, 0], y: [0, 35, -25, 0] } : undefined}
        transition={drift ? { duration: 36, repeat: Infinity, ease: 'easeInOut' } : undefined}
        className="absolute -right-32 top-[18%] h-[580px] w-[580px] rounded-full opacity-70 blur-[120px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(205, 190, 235, 0.75), rgba(205, 190, 235, 0.15) 55%, transparent 75%)',
          }}
        />
      </motion.div>

      <motion.div
        animate={drift ? { x: [0, 20, -30, 0], y: [0, -15, 25, 0] } : undefined}
        transition={drift ? { duration: 28, repeat: Infinity, ease: 'easeInOut' } : undefined}
        className="absolute bottom-[-160px] left-[18%] h-[520px] w-[520px] rounded-full opacity-55 blur-[110px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(180, 220, 210, 0.7), rgba(180, 220, 210, 0.12) 55%, transparent 75%)',
          }}
        />
      </motion.div>

      {/* Layer 3: Center-masked dot grid. */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(29, 29, 31, 0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 60% at 50% 25%, black 0%, transparent 75%)',
          maskImage:
            'radial-gradient(ellipse 75% 60% at 50% 25%, black 0%, transparent 75%)',
        }}
      />

      {/* Layer 4: Grain noise. */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="ambient-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambient-noise)" />
      </svg>

      {/* Layer 5: Bottom vignette so cards stay readable. */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.35) 60%, rgba(255, 255, 255, 0.7) 100%)',
        }}
      />
    </div>
  );
}
