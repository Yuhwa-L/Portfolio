import { ArrowUpRight, FileText, Github, Sparkles } from 'lucide-react';
import type { Project } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const statusLabels: Record<Project['status'], string> = {
  shipped: 'Shipped',
  'in-progress': 'In Progress',
  hackathon: 'Hackathon',
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { name, tagline, built, impact, metrics, role, tech, status, year, featured, links } = project;
  const hasLive = Boolean(links?.live);
  const hasGithub = Boolean(links?.github);
  const hasCaseStudy = Boolean(links?.caseStudy);
  const hasAnyLink = hasLive || hasGithub || hasCaseStudy;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border-soft bg-white/75 backdrop-blur-md p-7 sm:p-9',
        'transition-all duration-500 ease-apple',
        'hover:-translate-y-1 hover:border-border hover:shadow-card-hover',
        featured && 'sm:p-10 lg:p-12 border-text-primary/15 bg-white/85 shadow-sm',
        className,
      )}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-accent/15 to-transparent"
        />
      )}

      <header className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge tone={status === 'shipped' ? 'accent' : 'neutral'}>
            {statusLabels[status]}
          </Badge>
          <span className="text-xs font-medium text-text-tertiary">{year}</span>
        </div>
        {featured && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-text-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-eyebrow text-white">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Featured
          </span>
        )}
      </header>

      <h3
        className={cn(
          'relative mt-6 font-semibold tracking-tight text-text-primary leading-tight',
          featured ? 'text-3xl sm:text-4xl lg:text-[44px]' : 'text-2xl sm:text-[30px]',
        )}
      >
        {name}
      </h3>
      <p
        className={cn(
          'relative mt-3 text-text-secondary leading-relaxed text-pretty',
          featured ? 'text-lg sm:text-xl max-w-2xl' : 'text-[17px]',
        )}
      >
        {tagline}
      </p>

      <div className="relative mt-7">
        <h4 className="text-[11px] font-semibold uppercase tracking-eyebrow text-text-tertiary">
          What I built
        </h4>
        <ul className="mt-3 space-y-2.5">
          {built.map((b) => (
            <li
              key={b}
              className={cn(
                'flex gap-3 text-text-secondary leading-relaxed text-pretty',
                featured ? 'text-[16px] sm:text-[17px]' : 'text-[15px] sm:text-[16px]',
              )}
            >
              <span
                aria-hidden="true"
                className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-text-tertiary"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {impact && (
        <div className="relative mt-6 rounded-2xl border border-border-soft bg-surface px-5 py-4">
          <div className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent">
            Impact
          </div>
          <p className="mt-1.5 text-[15px] sm:text-[16px] font-medium text-text-primary leading-snug text-pretty">
            {impact}
          </p>
        </div>
      )}

      {metrics && metrics.length > 0 && (
        <div className="relative mt-5 grid grid-cols-2 gap-3 sm:max-w-md">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border-soft bg-white/70 px-4 py-3"
            >
              <div className="text-2xl font-semibold tracking-tight text-text-primary leading-none">
                {m.value}
              </div>
              <div className="mt-1 text-xs text-text-tertiary">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="relative mt-auto pt-8">
        <div className="mb-5 flex flex-wrap gap-2">
          {tech.map((t) => (
            <Badge key={t} tone="soft" className="px-3 py-1.5 text-[13px]">
              {t}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-5">
          <span className="text-xs font-medium uppercase tracking-eyebrow text-text-tertiary">
            {role}
          </span>
          <div className="flex items-center gap-2">
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
            {!hasAnyLink && (
              <span
                aria-disabled="true"
                title="Internal project. Case study coming soon."
                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-border-soft bg-surface px-3 py-1.5 text-[13px] font-medium text-text-tertiary"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Case Study soon
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
