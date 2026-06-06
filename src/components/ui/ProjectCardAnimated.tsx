import { motion, type MotionValue, type Variants } from 'framer-motion';
import { ArrowUpRight, FileText, Github, Sparkles } from 'lucide-react';
import type { Project } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';
import { APPLE_EASE } from '@/lib/motion';

interface ProjectCardAnimatedProps {
  project: Project;
  className?: string;
  /** When true, wrap inner blocks in motion.divs and stagger them. */
  animated?: boolean;
  /** Optional scroll-linked y offset applied to the title block for subtle inner parallax. */
  titleParallax?: MotionValue<number>;
  /** Optional scroll-linked y offset applied to the footer block (opposite direction). */
  footerParallax?: MotionValue<number>;
}

const statusLabels: Record<Project['status'], string> = {
  shipped: 'Shipped',
  'in-progress': 'In Progress',
  hackathon: 'Hackathon',
};

const innerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.07,
    },
  },
};

const innerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: APPLE_EASE },
  },
};

export function ProjectCardAnimated({
  project,
  className,
  animated = true,
  titleParallax,
  footerParallax,
}: ProjectCardAnimatedProps) {
  const {
    name,
    category,
    tagline,
    problem,
    build,
    impact,
    role,
    tech,
    status,
    year,
    featured,
    logo,
    logoLabel,
    links,
  } = project;
  const hasLive = Boolean(links?.live);
  const hasGithub = Boolean(links?.github);
  const hasCaseStudy = Boolean(links?.caseStudy);

  const Block = animated ? motion.div : 'div';
  const blockProps = animated ? { variants: innerItem } : {};

  const Container = animated ? motion.article : 'article';
  const containerProps = animated
    ? {
        variants: innerContainer,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-12%' },
      }
    : {};

  return (
    <Container
      {...(containerProps as object)}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-border-soft/80 bg-white/80 backdrop-blur-xl p-5 sm:p-6',
        'shadow-card transition-shadow duration-500 ease-apple',
        'hover:shadow-card-hover',
        featured && 'sm:p-7 lg:p-8 border-text-primary/15 bg-white/90',
        className,
      )}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-accent/15 to-transparent"
        />
      )}

      {/* Header: status + year + featured pill */}
      <Block
        {...(blockProps as object)}
        className="relative flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <Badge tone={status === 'shipped' ? 'accent' : 'neutral'}>
            {statusLabels[status]}
          </Badge>
          <span className="text-xs font-medium text-text-tertiary">
            {year}
            {logoLabel ? ` · ${logoLabel}` : ''}
          </span>
        </div>
        {featured && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-text-primary px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-eyebrow text-white">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Featured
          </span>
        )}
      </Block>

      {/* Title block: category eyebrow above, then logo + title on one row, tagline below. */}
      <Block {...(blockProps as object)} className="relative mt-4">
        <motion.div
          style={animated && titleParallax ? { y: titleParallax } : undefined}
        >
          <div className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent">
            {category}
          </div>
          <div className="mt-2 flex items-center gap-3 sm:gap-3.5">
            {logo && (
              <span
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border-soft bg-white"
                title={logoLabel ? `From ${logoLabel}` : undefined}
              >
                <img
                  src={logo}
                  alt={logoLabel ? `${logoLabel} logo` : 'Source logo'}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </span>
            )}
            <h3 className="min-w-0 flex-1 text-[24px] sm:text-[28px] font-semibold tracking-tight text-text-primary leading-[1.1]">
              {name}
            </h3>
          </div>
          <p className="mt-2.5 text-[14.5px] sm:text-[15px] text-text-secondary leading-snug text-pretty">
            {tagline}
          </p>
        </motion.div>
      </Block>

      {/* Problem / Build / Impact — inline-label rows for compactness */}
      <Block {...(blockProps as object)} className="relative mt-5">
        <dl className="space-y-3">
          <PBIRow label="Problem" text={problem} />
          <PBIRow label="Build" text={build} />
          <PBIRow label="Impact" text={impact} accent />
        </dl>
      </Block>

      <div className="relative mt-auto pt-5">
        {/* Tech chips */}
        <Block {...(blockProps as object)} className="mb-3 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <Badge key={t} tone="soft" className="px-2.5 py-1 text-[12px]">
              {t}
            </Badge>
          ))}
        </Block>

        {/* Footer: role + buttons */}
        <Block
          {...(blockProps as object)}
          className="flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-3"
        >
          <motion.span
            style={animated && footerParallax ? { y: footerParallax } : undefined}
            className="text-[11px] font-medium uppercase tracking-eyebrow text-text-tertiary"
          >
            {role}
          </motion.span>
          <motion.div
            style={animated && footerParallax ? { y: footerParallax } : undefined}
            className="flex items-center gap-2"
          >
            {hasGithub && (
              <a
                href={links!.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-white/80 px-3 py-1.5 text-[13px] font-medium text-text-primary transition-colors hover:bg-white hover:border-border"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub
              </a>
            )}
            {hasLive && (
              <a
                href={links!.live}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full bg-text-primary px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-black"
              >
                Live Demo
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
            {hasCaseStudy && (
              <a
                href={links!.caseStudy}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-white/80 px-3 py-1.5 text-[13px] font-medium text-text-primary transition-colors hover:bg-white hover:border-border"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Case Study
              </a>
            )}
          </motion.div>
        </Block>
      </div>
    </Container>
  );
}

interface PBIRowProps {
  label: string;
  text: string;
  accent?: boolean;
}

function PBIRow({ label, text, accent }: PBIRowProps) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[76px_1fr] sm:gap-4">
      <dt
        className={cn(
          'text-[10.5px] font-semibold uppercase tracking-eyebrow sm:pt-[3px]',
          accent ? 'text-accent' : 'text-text-tertiary',
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          'text-[14.5px] sm:text-[15px] leading-snug text-pretty',
          accent ? 'font-medium text-text-primary' : 'text-text-secondary',
        )}
      >
        {text}
      </dd>
    </div>
  );
}
