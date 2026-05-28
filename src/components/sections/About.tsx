import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/ui/FadeIn';
import { recognitions } from '@/data/skills';
import { aboutCards, site } from '@/data/site';

export function About() {
  return (
    <SectionWrapper id="about" eyebrow="About" title="Built for the parts of software people actually use.">
      <div className="space-y-12 lg:space-y-16">
        {/* Top row: portrait + bio. Aligned to a 12-col grid for a clean rhythm. */}
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

          <FadeIn delay={0.05} className="md:col-span-7">
            <div className="space-y-5 text-[17px] sm:text-lg lg:text-xl text-text-secondary leading-relaxed text-pretty">
              <p>
                I'm a Computer Science student and full-stack developer who likes
                building practical tools for real users. My projects focus on web
                platforms, automation systems, and data-driven workflows, especially
                where messy real-world processes can be turned into cleaner software.
              </p>
              <p>
                I'm transferring to{' '}
                <span className="text-text-primary font-medium">Georgia Tech</span> in
                Fall 2026 and looking for a Software Engineering Internship where I
                can ship real features alongside engineers who care about the details.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Three descriptor cards: what I focus on. */}
        <FadeIn delay={0.1}>
          <ul className="grid gap-4 sm:grid-cols-3">
            {aboutCards.map((c) => (
              <li
                key={c.title}
                className="rounded-2xl border border-border-soft bg-white/70 backdrop-blur-md p-6 transition-colors hover:bg-white/85"
              >
                <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-accent">
                  {c.title}
                </h3>
                <p className="mt-3 text-[15px] text-text-secondary leading-relaxed text-pretty">
                  {c.detail}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Recognition + Looking For: kept as a single grouped card so it stays light. */}
        <FadeIn delay={0.15}>
          <div className="rounded-2xl border border-border-soft bg-white/70 backdrop-blur-md p-6 sm:p-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-text-tertiary">
                  Recognition
                </h3>
                <ul className="mt-5 space-y-3">
                  {recognitions.map((r) => (
                    <li key={r.title}>
                      <div className="text-base font-medium text-text-primary leading-snug">
                        {r.title}
                      </div>
                      <div className="mt-1 text-xs text-text-tertiary">{r.year}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:border-l sm:border-border-soft sm:pl-8">
                <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-text-tertiary">
                  Looking For
                </h3>
                <p className="mt-5 text-[15px] text-text-secondary leading-relaxed">
                  Software Engineering Internship roles for summer or full-year 2026,
                  remote or in person. Full-stack, backend, or developer tools teams.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
