import type { ExperienceItem } from '@/data/experience';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

interface ExperienceCardProps {
  item: ExperienceItem;
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  const { role, org, location, start, end, roleSummary, owned, changed, tech, logo } = item;
  return (
    <div className="grid gap-6 border-t border-border-soft py-9 first:border-t-0 first:pt-0 md:grid-cols-[180px_1fr] md:gap-10">
      <div className="text-sm font-medium uppercase tracking-eyebrow text-text-tertiary">
        <div>
          {start} <span aria-hidden="true">to</span> {end}
        </div>
        <div className="mt-1 normal-case tracking-normal text-xs text-text-tertiary">
          {location}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3">
          {logo && (
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-soft bg-white">
              <img
                src={logo}
                alt={`${org} logo`}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </span>
          )}
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-text-primary">
            {role}
            <span className="text-text-tertiary font-normal"> at </span>
            <span className="text-text-primary">{org}</span>
          </h3>
        </div>

        <dl className="mt-4 space-y-3">
          <RWCRow label="Role" text={roleSummary} />
          <RWCRow label="What I owned" text={owned} />
          <RWCRow label="What changed" text={changed} accent />
        </dl>

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

interface RWCRowProps {
  label: string;
  text: string;
  accent?: boolean;
}

function RWCRow({ label, text, accent }: RWCRowProps) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-5">
      <dt
        className={cn(
          'text-[10.5px] font-semibold uppercase tracking-eyebrow sm:pt-[5px]',
          accent ? 'text-accent' : 'text-text-tertiary',
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          'text-[15px] sm:text-base leading-relaxed text-pretty',
          accent ? 'font-medium text-text-primary' : 'text-text-secondary',
        )}
      >
        {text}
      </dd>
    </div>
  );
}
