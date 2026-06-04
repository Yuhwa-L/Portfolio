# Yuhwa Lee — Portfolio

A personal portfolio for Software Engineering Internship applications — premium
and minimal, but clearly a developer's site: real projects, real impact, real stack.

> **Live:** [yuhwalee.com](https://www.yuhwalee.com)
> **Author:** [Yuhwa Lee](https://www.linkedin.com/in/yuhwa-lee) · [GitHub](https://github.com/Yuhwa-L) · zeusya7015@gmail.com

## Highlights

- **Scroll-reactive 3D constellation** ([react-three-fiber](https://docs.pmnd.rs/react-three-fiber)) — a 90-point cloud whose rotation and drift are driven directly by `window.scrollY` (no lerp, no spring).
- **Adaptive resolution** that starts crisp (DPR capped at 1.5) and steps down only when `<PerformanceMonitor>` measures a frame-rate drop, so every engine — Safari included — runs as sharp as it can sustain.
- **Layered CSS ambient background** behind the 3D layer: radial gradients, drifting blurred blobs, dot-grid mask, SVG grain, and a bottom vignette.
- **Recruiter-first flow**: Hero → Metrics → Projects → About → Experience → Education → Skills → Resume → Contact.
- **Apple-inspired tokens**, Framer Motion entrances, and `prefers-reduced-motion` respected throughout.
- **Real PDF resume** served through Vite's static pipeline.

## Stack

React 18 + TypeScript · Vite 5 · Tailwind CSS 3.4 · Framer Motion 11 ·
three.js + @react-three/fiber + @react-three/drei · lucide-react · deployed on Vercel.

## Quickstart

```bash
npm install
npm run dev        # http://localhost:5173

npm run build      # type-check + production build → dist/
npm run preview    # serve the built bundle
```

## Structure

```
public/    Static assets — favicon, robots.txt, photo, resume PDF.
src/
  components/
    background/   AmbientBackground, ConstellationField, ConstellationCanvas (R3F scene).
    sections/     Hero, Metrics, Projects, About, Experience, Education, Skills, Resume, Contact, Footer, Nav.
    ui/           Reusable bits — Button, Badge, cards, dividers, scroll progress.
  data/           Single source of truth for all copy (site, projects, experience, education, skills).
  lib/            cn(), motion variants, reduced-motion hook.
  styles/         Tailwind layers and global CSS.
```

## The 3D background

`ConstellationCanvas.tsx` exposes tuning constants at the top of the file:

```ts
const SCROLL_ROT_Y   = Math.PI * 2.4;   // total yaw across a full page scroll
const SCROLL_ROT_X   = Math.PI * 0.9;   // total pitch
const SCROLL_DRIFT_Y = -3.2;            // upward drift in 3D units
const SCROLL_DRIFT_Z = 1.8;             // forward pull toward camera
const AMBIENT_ROT_Y  = 0.012;           // idle rotation at scroll 0
const MOUSE_TILT     = 0.08;            // mouse parallax intensity
```

The same file detects Safari and drops to a lighter `QUALITY` tier for smooth WebKit scrolling.

## Design

Color, type, and motion live in `tailwind.config.js` and `src/styles/globals.css`.
The palette stays restrained on purpose: white background, Apple-blue accent
(`#0071e3`), three neutral grays. No component introduces raw hex values.

Visual direction inspired by Apple's product pages, Linear, and Raycast;
constellation concept from the react-three-fiber community.
