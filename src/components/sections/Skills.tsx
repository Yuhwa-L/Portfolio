import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/ui/FadeIn';
import { skills } from '@/data/skills';
import { Badge } from '@/components/ui/Badge';

export function Skills() {
  return (
    <SectionWrapper
      id="skills"
      eyebrow="Skills"
      title="Tools and ideas I work with."
    >
      <div className="rounded-3xl border border-border-soft bg-white/70 backdrop-blur-md">
        <ul className="divide-y divide-border-soft">
          {skills.map((group, i) => (
            <FadeIn key={group.heading} delay={i * 0.05}>
              <li className="grid gap-4 p-6 sm:p-8 md:grid-cols-[200px_1fr] md:items-center md:gap-8">
                <div className="text-xs font-semibold uppercase tracking-eyebrow text-text-tertiary">
                  {group.heading}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} tone="soft" className="px-3.5 py-1.5 text-[13px]">
                      {item}
                    </Badge>
                  ))}
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
