import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/ui/FadeIn';
import { ExperienceCard } from '@/components/ui/ExperienceCard';
import { experience } from '@/data/experience';

export function Experience() {
  return (
    <SectionWrapper
      id="experience"
      eyebrow="Experience"
      title="Where I've worked and led."
    >
      <div className="max-w-4xl">
        {experience.map((item, i) => (
          <FadeIn key={`${item.org}-${item.role}`} delay={i * 0.06}>
            <ExperienceCard item={item} />
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}
