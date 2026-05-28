import type { ExperienceItem } from '@/data/experience';
import { Badge } from '@/components/ui/Badge';

interface ExperienceCardProps {
  item: ExperienceItem;
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  const { role, org, location, start, end, bullets, tech } = item;
  return (
    <div className="grid gap-6 border-t border-border-soft py-10 first:border-t-0 first:pt-0 md:grid-cols-[180px_1fr] md:gap-10">
      <div className="text-sm font-medium uppercase tracking-eyebrow text-text-tertiary">
        <div>
          {start} <span aria-hidden="true">to</span> {end}
        </div>
        <div className="mt-1 normal-case tracking-normal text-xs text-text-tertiary">
          {location}
        </div>
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-text-primary">
          {role}
          <span className="text-text-tertiary font-normal"> at </span>
          <span className="text-text-primary">{org}</span>
        </h3>

        <ul className="mt-5 space-y-3 text-[15px] sm:text-base text-text-secondary">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-text-tertiary"
              />
              <span className="text-pretty">{b}</span>
            </li>
          ))}
        </ul>

        {tech && tech.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {tech.map((t) => (
              <Badge key={t} tone="soft">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
