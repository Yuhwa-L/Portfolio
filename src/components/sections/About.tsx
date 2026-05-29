import { Trophy } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/ui/FadeIn';
import { recognitions } from '@/data/skills';
import { aboutCards, site } from '@/data/site';

export function About() {
  const topRecognition = recognitions[0];

  return (
    <SectionWrapper id="about" eyebrow="About" title="Built for the parts of software people actually use.">
      <div className="space-y-12 lg:space-y-14">
        {/* Top row: portrait + bio + AMATYC academic highlight. */}
        <div className="grid items-start gap-10 lg:gap-14 md:grid-cols-12">
          <FadeIn className="md:col-span-5">
            <figure className="relative mx-auto max-w-sm md:max-w-none">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/15 via-accent/5 to-transparent blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-border-soft bg-white/80 backdrop-blur-md shadow-card ring-1 ring-black/[0.02]">
                <img
                  src="/yuhwa-lee.jpg"
                  alt={`Portrait of ${site.name}`}
                  width={1000}
                  height={1000}
                  className="aspect-square w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between text-xs font-medium uppercase tracking-eyebrow text-text-tertiary">
                <span>{site.name}</span>
                <span>{site.location}</span>
              </figcaption>
            </figure>
          </FadeIn>

          <div className="md:col-span-7 space-y-6 lg:space-y-7">
            <FadeIn delay={0.05}>
              <div className="space-y-5 text-[17px] sm:text-lg lg:text-xl text-text-secondary leading-relaxed text-pretty [&_strong]:font-medium [&_strong]:text-text-primary">
                <p>
                  I build <strong>practical software</strong> for{' '}
                  <strong>messy real-world workflows</strong>, the kind of system that
                  lives behind a spreadsheet, an unclear process, or scattered records,
                  and quietly makes the work faster to do. My focus sits where{' '}
                  <strong>full-stack development</strong>, <strong>automation</strong>,
                  and <strong>data modeling</strong> overlap.
                </p>
                <p>
                  I'm an incoming <strong>Computer Science</strong> student at{' '}
                  <strong>Georgia Tech</strong> and a full-stack developer interested in
                  tools people actually use day to day. I care about clean systems,
                  useful interfaces, and the parts of software that make a real,{' '}
                  <strong>measurable difference</strong> once they're shipped.
                </p>
              </div>
            </FadeIn>

            {topRecognition && (
              <FadeIn delay={0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-border-soft bg-white/75 backdrop-blur-md p-5 sm:p-6 transition-all duration-500 ease-apple hover:-translate-y-0.5 hover:border-border hover:shadow-card">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl"
                  />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                      <Trophy className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent">
                        Academic Highlight
                      </div>
                      <div className="mt-1.5 text-base sm:text-lg font-semibold text-text-primary leading-snug">
                        {topRecognition.title}
                      </div>
                      {topRecognition.detail && (
                        <p className="mt-1.5 text-[13.5px] sm:text-sm text-text-secondary leading-snug text-pretty">
                          {topRecognition.detail}
                        </p>
                      )}
                      <div className="mt-2 text-[11px] font-medium uppercase tracking-eyebrow text-text-tertiary">
                        {topRecognition.placement && (
                          <>
                            <span className="font-semibold text-amber-500">
                              {topRecognition.placement}
                            </span>
                            {topRecognition.year && (
                              <span aria-hidden="true"> · </span>
                            )}
                          </>
                        )}
                        {topRecognition.year}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>

        {/* Four descriptor cards: how I think as a builder. */}
        <FadeIn delay={0.1}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutCards.map((c) => (
              <li
                key={c.title}
                className="rounded-2xl border border-border-soft bg-white/70 backdrop-blur-md p-5 sm:p-6 transition-colors hover:bg-white/85"
              >
                <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-accent">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] sm:text-[15px] text-text-secondary leading-relaxed text-pretty">
                  {c.detail}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
