import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';
import { ProjectCardAnimated } from '@/components/ui/ProjectCardAnimated';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useMediaQuery } from '@/lib/useMediaQuery';

/**
 * Apple-style scroll experience for the project list.
 *
 * Desktop: the section title pins on the left while cards reveal one by one
 * on the right. Each card fades + slides + scales in as it enters the viewport,
 * then subtly recedes (scale down, shift up) as the next card arrives — giving
 * the impression of a stacked deck. Inner card content staggers in (header,
 * title, summary, bullets, impact, chips, buttons) once the card is in view.
 *
 * Mobile: layout collapses to a single column with a simple fade-up reveal —
 * no sticky pinning, no scroll-linked transforms.
 *
 * All motion uses transform/opacity only (no width/height/filter). Scroll
 * progress is read via useScroll/useTransform; no React state runs per frame.
 *
 * The page's existing 3D background is untouched; cards use a translucent
 * white/glass surface with a soft shadow and thin border so they read cleanly
 * over the constellation field.
 */
export function Projects() {
  const reduced = useReducedMotion();
  // Match Tailwind's `lg` breakpoint. Sticky title + scroll-linked stack only
  // engage on desktop; below it, the section collapses to a single column with
  // a simple fade-up reveal per card.
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll through the cards column for the sticky title's hairline
  // progress indicator. Cheap: one useScroll, no per-frame state.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 60%'],
  });
  // Progress bar uses transform: scaleX (no width animation, per perf rules).
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="pt-20 sm:pt-24 lg:pt-section-lg pb-20 sm:pb-24 lg:pb-section-lg"
    >
      <div className="container max-w-6xl">
        <div
          ref={sectionRef}
          className="lg:grid lg:grid-cols-[minmax(0,360px),minmax(0,1fr)] lg:gap-16 xl:gap-20"
        >
          {/* Sticky title column (desktop) */}
          <div className="lg:sticky lg:top-28 lg:self-start lg:max-h-[80vh]">
            <ProjectsHeader progressScaleX={progressScaleX} reduced={reduced} />
          </div>

          {/* Cards column */}
          <div className="mt-12 lg:mt-0 space-y-6 sm:space-y-8">
            {projects.map((project, i) => (
              <ProjectStackCard
                key={project.slug}
                project={project}
                index={i}
                reduced={reduced}
                isDesktop={isDesktop}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectsHeaderProps {
  progressScaleX: MotionValue<number>;
  reduced: boolean;
}

function ProjectsHeader({ progressScaleX, reduced }: ProjectsHeaderProps) {
  return (
    <div className="max-w-md">
      <div className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-accent">
        Work
      </div>
      <h2
        id="projects-title"
        className="text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight leading-[1.05] text-text-primary text-balance"
      >
        Things I have shipped.
      </h2>
      <p className="mt-5 text-lg sm:text-xl text-text-secondary leading-relaxed text-pretty">
        Built end to end, from data model to deployed UI. Each one solved a
        problem someone had in front of them.
      </p>

      {/* Hairline progress indicator — desktop-only, scroll-linked via scaleX
          on a full-width hairline. Width itself never animates. */}
      <div className="mt-10 hidden lg:block">
        <div className="relative h-px w-full bg-border-soft">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 origin-left bg-text-primary"
            style={reduced ? { scaleX: 1 } : { scaleX: progressScaleX }}
          />
        </div>
        <div className="mt-3 text-[11px] font-medium uppercase tracking-eyebrow text-text-tertiary">
          {projects.length} projects
        </div>
      </div>
    </div>
  );
}

interface ProjectStackCardProps {
  project: Project;
  index: number;
  reduced: boolean;
  isDesktop: boolean;
}

/**
 * One card in the scrolling stack.
 *
 * Outer motion.div is driven by scroll progress against its own bounds:
 *   - 0 → 0.28 progress:   y 80 → 0, scale 0.96 → 1, opacity 0 → 1   (enter)
 *   - 0.28 → 0.72:         rest                                      (read)
 *   - 0.72 → 1:            y 0 → -32, scale 1 → 0.95, opacity 1 → 0.55 (recede)
 *
 * The receding tail is what creates the "previous cards settle back as the
 * next one arrives" stacked feel — without literally stacking elements at the
 * same coordinate, which would fight scroll on Safari.
 *
 * Inner element staggering is handled inside ProjectCardAnimated via
 * whileInView variants on the article wrapper.
 */
function ProjectStackCard({ project, index, reduced, isDesktop }: ProjectStackCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Read scroll progress across the card's vertical bounds. Hook is always
  // called (Rules of Hooks); we just ignore the values on mobile.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Entry → rest → recede. Tight ranges keep the animation snappy and
  // avoid the "always slightly moving" feeling on long scrolls.
  const y = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [80, 0, 0, -32]);
  const scale = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0.96, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.85, 1], [0, 1, 1, 0.55]);

  // Subtle inner parallax: title drifts down a few pixels, footer drifts up,
  // creating a quiet sense of depth as the card moves through the viewport.
  // Range is intentionally tiny — anything larger reads as smear.
  const titleParallax = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const footerParallax = useTransform(scrollYProgress, [0, 1], [6, -6]);

  // Reduced-motion: skip every scroll-linked transform and inner stagger.
  if (reduced) {
    return (
      <div ref={cardRef}>
        <ProjectCardAnimated project={project} animated={false} className="h-full" />
      </div>
    );
  }

  // Mobile/tablet: simple fade-up reveal per card, no sticky stacking and no
  // scroll-linked transforms. The inner stagger still runs and provides the
  // staggered fade-up feel within the card.
  if (!isDesktop) {
    return (
      <div ref={cardRef}>
        <ProjectCardAnimated project={project} animated className="h-full" />
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        scale,
        opacity,
        willChange: 'transform, opacity',
        transformOrigin: '50% 0%',
        // Higher index sits on top — matters when scales overlap visually.
        zIndex: index + 1,
      }}
    >
      <ProjectCardAnimated
        project={project}
        animated
        titleParallax={titleParallax}
        footerParallax={footerParallax}
        className="h-full"
      />
    </motion.div>
  );
}
