# Yuhwa Lee — Portfolio

A personal portfolio site for Software Engineering Internship applications.
Built to feel premium and minimal while staying clearly a developer's site:
real projects, real impact, real stack.

> **Live:** _(add your Vercel URL here after deploy)_
> **Author:** [Yuhwa Lee](https://www.linkedin.com/in/yuhwa-lee) · [GitHub](https://github.com/Yuhwa-L) · zeusya7015@gmail.com

## Highlights

- **Scroll-reactive 3D constellation** rendered with [react-three-fiber](https://docs.pmnd.rs/react-three-fiber). 160-point cloud, thin connecting lines, rotation + translation driven directly by `window.scrollY` (no lerp, no spring).
- **Layered CSS ambient background** behind the 3D layer: soft radial gradients, three drifting blurred blobs, dot grid mask, SVG fractal grain, bottom vignette.
- **Safari-aware quality tier** that drops DPR to 1, disables MSAA, and uses 100 points + looser connections for smooth scrolling on WebKit.
- **Apple-inspired typography and color tokens**, Framer Motion section entrances, and `prefers-reduced-motion` respected throughout.
- **Recruiter scannability**: Hero → Metrics strip → Projects (Problem/Built/Impact + Featured card) → About → Experience → Education → Skills → Resume CTA → Contact.
- **Real PDF resume download** wired through Vite's static pipeline (served as `application/pdf`).

## Stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Styling | Tailwind CSS 3.4 |
| Motion | Framer Motion 11 |
| 3D | three.js 0.169 + @react-three/fiber 8 + @react-three/drei 9 |
| Icons | lucide-react |
| Deploy | Vercel |

## Quickstart

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production build into dist/
npm run preview      # serve the built bundle locally
npm run type-check   # tsc --noEmit
```

## Project structure

```
public/
  favicon.svg
  robots.txt
  yuhwa-lee.jpg
  Yuhwa_Lee_Resume.pdf        Real PDF, downloaded by the hero CTA.
src/
  components/
    background/
      AmbientBackground.tsx   CSS gradients + grain + grid (fixed, -z-10).
      ConstellationField.tsx  Lazy wrapper that respects reduced-motion.
      ConstellationCanvas.tsx R3F scene: points, lines, scroll-driven motion.
    sections/                 Hero, Metrics, Projects, About, Experience, Education, Skills, Resume, Contact, Footer, Nav.
    ui/                       Button, Badge, SectionWrapper, FadeIn, ProjectCard, ExperienceCard, SkillCategory, ScrollProgress, SectionDivider.
  data/                       Single source of truth for all copy.
    site.ts                   Name, role, links, hero stack, metrics, "now" entries, about cards.
    projects.ts               Project cards with built[]/impact/metrics.
    experience.ts             Roles, dates, bullets.
    education.ts              Schools, degrees, dates.
    skills.ts                 Grouped chips + recognitions.
  lib/
    cn.ts                     clsx + tailwind-merge.
    motion.ts                 Shared Framer Motion variants.
    useReducedMotion.ts       prefers-reduced-motion hook.
  styles/globals.css          Tailwind layers, smooth scroll, focus rings, scrollbar.
  App.tsx                     Composes the page in section order.
  main.tsx                    Mounts React.
index.html                    Document shell, SEO meta, font preconnect.
tailwind.config.js            Color tokens, type scale, spacing.
```

## Notes on the 3D background

`ConstellationCanvas.tsx` exposes tuning constants at the top of the file:

```ts
const SCROLL_ROT_Y   = Math.PI * 2.4;   // total yaw across a full page scroll
const SCROLL_ROT_X   = Math.PI * 0.9;   // total pitch
const SCROLL_DRIFT_Y = -3.2;            // upward drift in 3D units
const SCROLL_DRIFT_Z = 1.8;             // forward pull toward camera
const AMBIENT_ROT_Y  = 0.012;           // idle rotation when scroll is at 0
const MOUSE_TILT     = 0.08;            // mouse parallax intensity
```

Safari detection sits in the same file and drives a separate `QUALITY` tier
(DPR 1, no MSAA, 100 points, looser neighbor distance). Verified with
Playwright that the WebGL context attributes flip correctly when the UA is
spoofed.

## Deploy

1. Push to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new) — framework auto-detects as Vite.
3. Defaults are correct: build `npm run build`, output `dist`.
4. Add a custom domain in **Project Settings → Domains**, then update the
   `og:url`, `<link rel="canonical">`, and `robots.txt` Sitemap line.

## Design tokens

Color, type, and motion live in `tailwind.config.js` and `src/styles/globals.css`.
The palette stays restrained on purpose: white background, Apple-blue accent
(`#0071e3`), three neutral grays for primary/secondary/tertiary text. No
component should introduce raw hex values.

## Acknowledgments

Visual direction inspired by Apple's product pages, Linear, and Raycast.
Constellation concept inspired by particle network demos in the
react-three-fiber community.
