import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import type * as THREE from 'three';
import { Vector3 } from 'three';
import { isSafari } from '@/lib/isSafari';

/**
 * ============================================================================
 *  WHAT THIS IS
 * ----------------------------------------------------------------------------
 *  A sparse 3D point cloud with thin connecting lines ("engineering
 *  constellation") that maps DIRECTLY to scroll position. It is the page's only
 *  scroll-reactive background element.
 *
 *  WHY IT USED TO FEEL LAGGY ON SAFARI (and how this fixes it)
 * ----------------------------------------------------------------------------
 *  The previous version updated a shared `progress` value inside a `scroll`
 *  event listener and read it from the render loop. On WebKit, `scroll` events
 *  are dispatched on the main thread *behind* the compositor during momentum /
 *  inertial scrolling — so the value was stale and the field visibly trailed
 *  the page ("follows scrolling too slowly / feels behind").
 *
 *  The fix: read `window.scrollY` LIVE inside `useFrame` (the rAF that runs
 *  immediately before paint). That is the freshest possible scroll offset — the
 *  exact one the browser is about to render — so the field is locked to scroll
 *  with zero easing/lerp and zero dependence on event cadence.
 *
 *  RESOLUTION IS ADAPTIVE, NOT A STATIC PER-BROWSER CAP
 * ----------------------------------------------------------------------------
 *  Earlier this hard-capped Safari at devicePixelRatio 1, which on a Retina
 *  screen renders at half resolution → visibly blurrier than Chrome (which got
 *  1.5). That was the wrong trade: this field is so sparse that rendering it at
 *  full DPR costs almost nothing — the real Safari cost was CSS blur, not WebGL.
 *
 *  So instead of guessing per-browser, we now MEASURE. The canvas starts as
 *  crisp as the display allows (MAX_DPR) and `<PerformanceMonitor>` samples the
 *  real frame rate; if an engine can't sustain it, the pixel ratio steps down,
 *  and back up when there's headroom. Every engine runs as sharp as it can.
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
 * Live, frame-synced scroll progress (0..1)
 * ------------------------------------------------------------------------- */

// `maxScroll` requires reading scrollHeight, which can force layout. We compute
// it once and refresh only when the viewport or document height actually
// changes (resize + a ResizeObserver on <body>) — NOT inside the frame loop.
let maxScroll = 1;
function recomputeMaxScroll() {
  maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}
if (typeof window !== 'undefined') {
  recomputeMaxScroll();
  window.addEventListener('resize', recomputeMaxScroll, { passive: true });
  // <body> grows/shrinks as fonts load, images decode, or sections reveal —
  // documentElement's box stays viewport-sized, so we observe body instead.
  if (typeof ResizeObserver !== 'undefined' && document.body) {
    new ResizeObserver(recomputeMaxScroll).observe(document.body);
  }
}

/**
 * Read the true scroll offset at frame time and normalize to 0..1. Called once
 * per rendered frame from useFrame; no smoothing — the mapping is instant.
 */
function getScrollProgress(): number {
  const y = window.scrollY || window.pageYOffset || 0;
  const p = y / maxScroll;
  return p < 0 ? 0 : p > 1 ? 1 : p;
}

/* ---------------------------------------------------------------------------
 * Field config (identical look on every browser)
 * ------------------------------------------------------------------------- */

const POINT_COUNT = 160;
const MAX_DISTANCE = 2.4;   // only connect points within this distance
const MAX_NEIGHBORS = 2;    // ...and to at most this many neighbors
const LINE_OPACITY = 0.28;
const POINT_OPACITY = 0.55;

// Antialias is the one browser-specific render flag. Off on Safari: MSAA on thin
// lines is comparatively pricey on WebKit, and the high adaptive DPR already
// keeps the lines crisp without it. On by default elsewhere.
const ANTIALIAS = !isSafari;

// Sharpest pixel ratio we START at, capped at 1.5. This is the sweet spot:
// crisp on Retina (it's the same ratio Chrome used and looked good), but far
// cheaper to sustain than a full 2.0 — at 2.0 the fullscreen transparent canvas
// composited over the page's backdrop-blur cards couldn't hold a steady frame
// rate on Safari (especially at 120Hz), which showed up as a frame drop a few
// seconds in. 1.5 = ~56% of the pixels of 2.0 for nearly identical sharpness.
const MAX_DPR = Math.min(
  typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
  1.5,
);

const round1 = (n: number) => Math.round(n * 10) / 10;

/* ---------------------------------------------------------------------------
 * Geometry — built ONCE (useMemo), never per frame
 * ------------------------------------------------------------------------- */

interface ConstellationData {
  positions: Float32Array;
  linePositions: Float32Array;
  pointCount: number;
  lineCount: number;
}

function buildConstellation(): ConstellationData {
  // Deterministic seed so the constellation is identical on every load.
  let seed = 9273;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const count = POINT_COUNT;
  const positions = new Float32Array(count * 3);
  const points: Vector3[] = [];

  // Wider-than-deep box so the field reads as a "field" not a sphere; Z spread
  // keeps depth parallax interesting.
  const SPREAD_X = 14;
  const SPREAD_Y = 9;
  const SPREAD_Z = 6;

  for (let i = 0; i < count; i++) {
    const x = (rand() - 0.5) * SPREAD_X;
    const y = (rand() - 0.5) * SPREAD_Y;
    const z = (rand() - 0.5) * SPREAD_Z;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    points.push(new Vector3(x, y, z));
  }

  // Connect each point to its nearest neighbors within a distance threshold so
  // there are no long lines stretching across the field.
  const lineData: number[] = [];
  for (let i = 0; i < count; i++) {
    const neighbors: { j: number; d: number }[] = [];
    for (let j = 0; j < count; j++) {
      if (j === i) continue;
      const d = points[i].distanceTo(points[j]);
      if (d <= MAX_DISTANCE) neighbors.push({ j, d });
    }
    neighbors.sort((a, b) => a.d - b.d);
    let added = 0;
    for (const n of neighbors) {
      if (added >= MAX_NEIGHBORS) break;
      if (n.j > i) {
        // Add each edge once (only when j > i).
        lineData.push(
          points[i].x, points[i].y, points[i].z,
          points[n.j].x, points[n.j].y, points[n.j].z,
        );
        added++;
      }
    }
  }

  return {
    positions,
    linePositions: new Float32Array(lineData),
    pointCount: count,
    lineCount: lineData.length / 6,
  };
}

/* ---------------------------------------------------------------------------
 * Scroll → motion mapping
 * ------------------------------------------------------------------------- */

// Pure multipliers on raw scroll progress (0..1). Bigger = more motion per
// scrolled pixel. Tune freely; none of these cost anything per frame.
const SCROLL_ROT_Y = Math.PI * 2.4;   // ~432° yaw over a full-page scroll
const SCROLL_ROT_X = Math.PI * 0.9;   // ~162° pitch over a full-page scroll
const SCROLL_DRIFT_Y = -3.2;          // field drifts UP as you scroll DOWN
const SCROLL_DRIFT_Z = 1.8;           // field pulls toward the camera
const AMBIENT_ROT_Y = 0.012;          // tiny idle yaw so the top of page isn't frozen

function Constellation() {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const data = useMemo(buildConstellation, []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;

    // Frame-synced, instant scroll mapping (see file header). No lerp/spring —
    // the field is wherever the page is, this exact frame.
    const sp = getScrollProgress();

    // Tiny ambient drift so progress 0 isn't completely static. (Mouse parallax
    // was removed: the canvas is pointer-events:none, so R3F never received
    // pointer moves — it was dead per-frame math.)
    const ambientY = state.clock.elapsedTime * AMBIENT_ROT_Y;

    g.rotation.y = sp * SCROLL_ROT_Y + ambientY;
    g.rotation.x = sp * SCROLL_ROT_X;
    g.position.y = sp * SCROLL_DRIFT_Y;
    g.position.z = sp * SCROLL_DRIFT_Z;
  });

  // Shrink slightly on small screens so the field doesn't crowd text.
  const fieldScale = useMemo(() => {
    if (size.width < 640) return 0.7;
    if (size.width < 1024) return 0.85;
    return 1;
  }, [size.width]);

  return (
    <group ref={groupRef} scale={fieldScale}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.positions, 3]}
            count={data.pointCount}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color="#1d1d1f"
          transparent
          opacity={POINT_OPACITY}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.linePositions, 3]}
            count={data.lineCount * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0071e3"
          transparent
          opacity={LINE_OPACITY}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function ConstellationCanvas() {
  // Pause the entire render loop when the tab is backgrounded. Browsers already
  // suspend rAF in hidden tabs, but flipping frameloop to 'never' is explicit
  // and guarantees zero GPU/CPU when not visible.
  const [active, setActive] = useState(() =>
    typeof document === 'undefined' ? true : !document.hidden,
  );
  useEffect(() => {
    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Adaptive resolution. Start as crisp as the display allows; PerformanceMonitor
  // (below) adjusts it from measured FPS so each engine runs as sharp as it can
  // sustain — Safari included.
  const [dpr, setDpr] = useState(MAX_DPR);

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={dpr}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{
        antialias: ANTIALIAS,
        // Transparent canvas so the CSS aurora shows through. Overdraw is tiny
        // (sparse points + thin lines), so alpha is cheap here.
        alpha: true,
        powerPreference: 'high-performance',
        // No stencil and no depth buffer: both materials use depthWrite:false on
        // sparse geometry, so draw order alone is correct. Saves a buffer + work.
        stencil: false,
        depth: false,
      }}
      style={{
        background: 'transparent',
        pointerEvents: 'none',
        // Promote to its own compositor layer so WebGL paint stays off the main
        // thread. No `will-change`: the element never animates its CSS transform
        // (all motion is inside WebGL), so it would only waste layer memory.
        transform: 'translateZ(0)',
      }}
    >
      {/*
        Adaptive safety net — DOWN-ONLY by design. It measures real frame rate
        and, if the engine genuinely can't hold it at the current resolution,
        drops the pixel ratio one notch toward 1.0 and settles there. It never
        climbs back up: every DPR change reallocates the WebGL drawing buffer
        (a visible hitch on Safari), so we change resolution as rarely as
        possible and NEVER oscillate. Capable hardware stays at MAX_DPR for the
        whole session with zero resize churn; only weak hardware ever steps down.
      */}
      <PerformanceMonitor onDecline={() => setDpr((d) => Math.max(1, round1(d - 0.5)))} />

      <Constellation />
    </Canvas>
  );
}
