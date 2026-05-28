import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import type * as THREE from 'three';
import { Vector3 } from 'three';

/**
 * Shared scroll progress (0..1) updated on every scroll event via a passive
 * listener. Read directly from useFrame so there is no smoothing or lerp.
 */
const scrollState = { progress: 0 };
if (typeof window !== 'undefined') {
  const update = () => {
    const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollState.progress = Math.min(1, Math.max(0, window.scrollY / docH));
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
}

/**
 * --- Browser-aware quality tier ---
 * Safari (especially on macOS Intel and iOS) struggles with high-DPR WebGL +
 * antialiased thin lines. We detect Safari conservatively and drop to a
 * lighter mode that keeps the same visual concept but with fewer points,
 * looser neighbor connections, no MSAA, and a hard 1.0 pixel ratio.
 */
const isSafari = (() => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  // Match real Safari only. Exclude Chrome, Chromium, Edge, Android WebView,
  // Brave, Opera. Also catches iOS Safari and Safari on iPadOS (UA reports Mac).
  const isAppleVendor = /Safari/i.test(ua) && !/Chrome|Chromium|Edg\/|Edge\/|OPR\/|Android|FxiOS|CriOS/i.test(ua);
  return isAppleVendor;
})();

interface QualityTier {
  dpr: [number, number];
  pointCount: number;
  maxDistance: number;
  maxNeighbors: number;
  antialias: boolean;
  lineOpacity: number;
  pointOpacity: number;
}

const QUALITY: QualityTier = isSafari
  ? {
      // Safari: hard cap DPR at 1, antialias off, fewer points so the GPU
      // never spends frame budget on the field.
      dpr: [1, 1],
      pointCount: 100,
      maxDistance: 2.8,
      maxNeighbors: 2,
      antialias: false,
      lineOpacity: 0.32,
      pointOpacity: 0.6,
    }
  : {
      dpr: [1, 1.5],
      pointCount: 160,
      maxDistance: 2.4,
      maxNeighbors: 2,
      antialias: true,
      lineOpacity: 0.28,
      pointOpacity: 0.55,
    };

interface ConstellationData {
  positions: Float32Array;
  linePositions: Float32Array;
  pointCount: number;
  lineCount: number;
}

function buildConstellation(): ConstellationData {
  // Deterministic seed so the constellation is the same every load.
  let seed = 9273;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const count = QUALITY.pointCount;
  const positions = new Float32Array(count * 3);
  const points: Vector3[] = [];

  // Distribute inside a wider-than-deep box so the field reads as a "field"
  // rather than a sphere. Z spread keeps depth parallax interesting.
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

  // Connect each point to its nearest neighbors within a distance threshold.
  // Avoids long lines stretching across the field.
  const lineData: number[] = [];
  for (let i = 0; i < count; i++) {
    const neighbors: { j: number; d: number }[] = [];
    for (let j = 0; j < count; j++) {
      if (j === i) continue;
      const d = points[i].distanceTo(points[j]);
      if (d <= QUALITY.maxDistance) neighbors.push({ j, d });
    }
    neighbors.sort((a, b) => a.d - b.d);
    let added = 0;
    for (const n of neighbors) {
      if (added >= QUALITY.maxNeighbors) break;
      // Only add the edge once (when j > i).
      if (n.j > i) {
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

/**
 * --- Scroll tuning knobs ---
 * Tweak these to dial intensity up or down. All are pure multipliers on the
 * raw scroll progress (0..1). Bigger = more dramatic motion per scroll pixel.
 */
const SCROLL_ROT_Y = Math.PI * 2.4;   // ~432° of yaw over full page scroll
const SCROLL_ROT_X = Math.PI * 0.9;   // ~162° of pitch over full page scroll
const SCROLL_DRIFT_Y = -3.2;          // 3D units the field drifts UP as you scroll DOWN
const SCROLL_DRIFT_Z = 1.8;           // 3D units the field pulls toward the camera
const AMBIENT_ROT_Y = 0.012;          // very slow idle rotation so it isn't frozen at top
const MOUSE_TILT = 0.08;              // mouse parallax strength; keep small so scroll dominates

function Constellation() {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const data = useMemo(buildConstellation, []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;

    // Direct read from the passive-listener-updated ref. No lerp, no spring.
    const sp = scrollState.progress;
    const t = state.clock.elapsedTime;

    // Tiny ambient drift so scroll position 0 isn't completely static.
    const ambientY = t * AMBIENT_ROT_Y;

    // Mouse parallax — much smaller now so it never competes with scroll.
    const px = state.pointer.x * MOUSE_TILT;
    const py = state.pointer.y * MOUSE_TILT * 0.7;

    g.rotation.y = sp * SCROLL_ROT_Y + ambientY + px;
    g.rotation.x = sp * SCROLL_ROT_X - py;

    // Translate the whole constellation as you scroll. This is what makes the
    // motion read as "attached to scroll": the field visibly slides up and
    // pulls forward, not just rotating in place.
    g.position.y = sp * SCROLL_DRIFT_Y;
    g.position.z = sp * SCROLL_DRIFT_Z;
  });

  // Responsive scale: shrink slightly on small screens so it doesn't crowd text.
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
          opacity={QUALITY.pointOpacity}
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
          opacity={QUALITY.lineOpacity}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function ConstellationCanvas() {
  return (
    <Canvas
      // Browser-aware DPR. Safari = 1, others = up to 1.5 (Retina-crisp without burning frame budget).
      dpr={QUALITY.dpr}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{
        antialias: QUALITY.antialias,
        alpha: true,
        powerPreference: 'high-performance',
        // Avoid expensive depth + stencil work; we don't need either for a flat point cloud.
        stencil: false,
        depth: true,
      }}
      // GPU layer hints applied to the canvas element so the compositor can
      // promote it to its own layer and keep paint off the main thread.
      style={{
        background: 'transparent',
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <Constellation />
    </Canvas>
  );
}
