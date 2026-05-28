import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/ui/FadeIn';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Work"
      title="Things I have shipped."
      intro="Built end to end, from data model to deployed UI. Each one solved a problem someone had in front of them."
    >
      <div className="grid gap-5">
        {featured && (
          <FadeIn>
            <ProjectCard project={featured} className="h-full" />
          </FadeIn>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {others.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={project} className="h-full" />
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
