# 3D background — performance & scroll-sync notes

System: **React Three Fiber** (three.js) constellation canvas + a **framer-motion**
CSS "aurora" layer. Both sit in fixed, `pointer-events:none`, GPU-promoted layers
behind the page content.

## What caused the lag (especially on Safari)

1. **The 3D trailed the page.** Scroll progress was updated inside a `scroll`
   event listener and read by the render loop. On WebKit, `scroll` events are
   dispatched on the main thread *behind* the compositor during momentum/inertial
   scrolling, so the value was stale — the field visibly chased the page.

2. **The aurora taxed the compositor every frame.** Three large `filter:blur()`
   blobs were *continuously animated* **and** scroll-parallaxed **and**
   mouse-parallaxed. Animating/scrolling a blurred layer forces WebKit to
   re-rasterize the blur (see [WebKit bug 89475](https://bugs.webkit.org/show_bug.cgi?id=89475)),
   which choked frame budget during scroll and made the 3D appear to stutter.

3. Minor: `scrollHeight` was read on every scroll event (layout read); the canvas
   ran a dead mouse-parallax calculation every frame (it's `pointer-events:none`,
   so R3F never received pointer moves); a mousemove `setState` re-rendered the
   aurora on every pointer move; `will-change:transform` pinned layer memory on a
   wrapper that never animates.

## What was optimized

**`ConstellationCanvas.tsx`** (the fix for "feels behind"):
- Read `window.scrollY` **live inside `useFrame`** — the rAF that runs right
  before paint. Direct, instant mapping to rotation/position; **no lerp/spring**
  and no dependency on scroll-event cadence. This is what locks the field to
  scroll on Safari.
- `maxScroll` (the only layout-reading value) is cached and refreshed only on
  resize + a `ResizeObserver` on `<body>` — never per frame (no layout thrash).
- Removed the dead per-frame mouse math. No allocations in the loop.
- `gl: { depth:false, stencil:false, powerPreference:'high-performance' }`;
  `alpha:true` (needed — the aurora shows through; overdraw is tiny). Visibility
  pause via the reactive `frameloop` prop.
- **Adaptive resolution** (see below) instead of a static per-browser DPR cap.

**`AmbientBackground.tsx`** (the fix for scroll-time compositor cost):
- Removed `useScroll`/`useTransform` and the mousemove listener/state entirely —
  the aurora is no longer coupled to scroll or pointer, so scrolling triggers
  zero transform writes / blur re-rasterization on these heavy layers.
- Blobs keep a slow idle drift on Blink/Gecko but are **fully static on Safari
  and under `prefers-reduced-motion`**, so WebKit rasterizes each blur once.

**`ConstellationField.tsx`**: dropped `will-change` (kept `translateZ(0)` +
`contain:strict`). **`lib/isSafari.ts`**: shared, conservative Safari detection
that drives the lighter Safari tier.

## Adaptive resolution (auto-detects engine capability)

There is **no static per-browser DPR cap** anymore. The earlier "Safari = DPR 1"
rule rendered Safari at half resolution on Retina (visibly blurrier than Chrome's
1.5) for no real gain — this field is too sparse for DPR to be the bottleneck.

Instead the canvas starts at `MAX_DPR = min(devicePixelRatio, 1.5)` — crisp on
Retina (the same ratio Chrome used and looked good) but cheap enough for Safari
to *sustain*. drei's `<PerformanceMonitor>` is then a **down-only safety net**:
if an engine genuinely can't hold the frame rate, `onDecline` drops the pixel
ratio one notch toward 1.0 and it settles there.

> Why down-only (and why not start at 2.0): each DPR change reallocates the
> WebGL drawing buffer, which is a visible hitch on Safari. An earlier version
> started at 2.0 and let the monitor climb/drop both ways — a few cycles in
> (~5–10s) it would decide 2.0 wasn't sustainable over the page's backdrop-blur
> cards and start resizing/oscillating, which read as "frames drop after ~10s".
> Capping at a sustainable 1.5 and never climbing back up means capable hardware
> holds one resolution for the whole session (zero resize churn) and only weak
> hardware ever steps down once.

The geometry/look is now identical on all browsers; the only browser-specific
flag left is **antialias off on Safari** (MSAA on thin lines is pricey on WebKit;
high DPR keeps them crisp anyway). The CSS aurora is still frozen on Safari.

## Verified

Headless Chrome (CDP): exactly one `<canvas>`, no runtime/JS errors, DPR honored,
and the constellation rotates/drifts correctly across scroll = 0% / 50% / 100%.
`prefers-reduced-motion` unmounts the canvas and freezes the aurora (static
gradients remain as the light fallback).

## Known remaining cost (intentionally out of scope)

`backdrop-blur` on content cards (Nav, Hero, Projects, About, Skills, Contact,
Footer, …) is the largest *remaining* Safari scroll cost: each one re-samples the
moving backdrop on every scrolled frame. Reducing or dropping `backdrop-filter`
on Safari is the next lever, but that's content styling and was left untouched
per scope.
