/**
 * True only for real Safari/WebKit (desktop macOS + iOS/iPadOS), excluding
 * Chrome, Edge, Opera, Brave, Firefox, and Chromium/Firefox iOS browsers
 * (CriOS / FxiOS, which still contain "Safari" in their UA).
 *
 * Why we special-case Safari at all: WebKit pays a much higher price than Blink
 * for a few things this background leans on —
 *   1. high devicePixelRatio WebGL fill rate (Retina Macs / iPhones),
 *   2. MSAA antialiasing on thin lines,
 *   3. animating / scrolling any element that carries a `filter: blur()`
 *      (see WebKit bug 89475, "Blur filter causes issues when scrolling").
 * We use this flag to drop to a lighter rendering tier on Safari ONLY, so every
 * other browser keeps full fidelity. General optimizations are applied first
 * (everywhere); this is just the extra Safari headroom on top.
 *
 * Evaluated once at module load — the UA string never changes mid-session.
 */
export const isSafari: boolean = (() => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return (
    /Safari/i.test(ua) &&
    !/Chrome|Chromium|Edg\/|Edge\/|OPR\/|Android|FxiOS|CriOS/i.test(ua)
  );
})();
