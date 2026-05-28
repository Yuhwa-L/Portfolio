import { GraduationCap } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/ui/FadeIn';
import { education } from '@/data/education';
import { Badge } from '@/components/ui/Badge';

const statusLabel: Record<NonNullable<(typeof education)[number]['status']>, string> = {
  upcoming: 'Incoming',
  current: 'Current',
  past: 'Completed',
};

export function Education() {
  return (
    <SectionWrapper
      id="education"
      eyebrow="Education"
      title="Studying Computer Science."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((item, i) => (
          <FadeIn key={item.school} delay={i * 0.08}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-border-soft bg-white/70 backdrop-blur-md p-7 sm:p-8 transition-all duration-500 ease-apple hover:-translate-y-1 hover:border-border hover:shadow-card-hover">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface border border-border-soft text-text-primary">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </div>
                {item.status && (
                  <Badge tone={item.status === 'upcoming' ? 'accent' : 'neutral'}>
                    {statusLabel[item.status]}
                  </Badge>
                )}
              </div>

              <h3 className="mt-6 text-xl sm:text-2xl font-semibold tracking-tight text-text-primary leading-snug">
                {item.school}
              </h3>
              <p className="mt-2 text-[15px] text-text-secondary">{item.degree}</p>

              {item.detail && (
                <p className="mt-4 text-[15px] text-text-secondary leading-relaxed">
                  {item.detail}
                </p>
              )}

              <div className="mt-6 flex items-center gap-3 text-xs font-medium uppercase tracking-eyebrow text-text-tertiary">
                <span>{item.when}</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border" />
                <span className="normal-case tracking-normal">{item.location}</span>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}
