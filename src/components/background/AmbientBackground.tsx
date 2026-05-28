import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Page-wide ambient background. Sits behind all content as a fixed layer.
 * Composed of five layered passes:
 *   1. Base off-white wash with two soft radial gradients
 *   2. Three large blurred "aurora" blobs (continuous drift + scroll parallax)
 *   3. Faint dot grid, masked to a center oval so it never competes with text
 *   4. SVG fractal noise for paper-like grain
 *   5. Bottom vignette so content cards stay legible against the bg
 *
 * All motion is subtle, slow, and respects prefers-reduced-motion.
 */
export function AmbientBackground() {
  const reduced = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  // Gentle scroll parallax on each blob, different magnitudes.
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -220]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX / window.innerWidth - 0.5) * 24,
          y: (e.clientY / window.innerHeight - 0.5) * 24,
        });
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      {/* Layer 1: Base radial wash, a touch more visible to give the page atmosphere. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 1200px 800px at 20% -5%, rgba(0, 113, 227, 0.13), transparent 60%), radial-gradient(ellipse 900px 700px at 85% 25%, rgba(190, 175, 220, 0.14), transparent 65%), radial-gradient(ellipse 1000px 600px at 50% 100%, rgba(0, 113, 227, 0.06), transparent 70%)',
        }}
      />

      {/* Layer 2: Aurora blobs */}
      <motion.div
        style={{ y: reduced ? 0 : blob1Y, x: reduced ? 0 : mouse.x * 0.6 }}
        animate={
          reduced
            ? undefined
            : { x: [0, 30, -20, 0], y: [0, -20, 30, 0] }
        }
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
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
        style={{ y: reduced ? 0 : blob2Y, x: reduced ? 0 : -mouse.x * 0.35 }}
        animate={
          reduced
            ? undefined
            : { x: [0, -40, 20, 0], y: [0, 35, -25, 0] }
        }
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
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
        style={{ y: reduced ? 0 : blob3Y, x: reduced ? 0 : mouse.x * 0.25 }}
        animate={
          reduced
            ? undefined
            : { x: [0, 20, -30, 0], y: [0, -15, 25, 0] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
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

      {/* Layer 3: Center-masked dot grid */}
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

      {/* Layer 4: Grain noise */}
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

      {/* Layer 5: Bottom vignette so cards stay readable */}
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
