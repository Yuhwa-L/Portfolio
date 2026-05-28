import type { SkillGroup } from '@/data/skills';
import { Badge } from '@/components/ui/Badge';

interface SkillCategoryProps {
  group: SkillGroup;
}

export function SkillCategory({ group }: SkillCategoryProps) {
  return (
    <div className="rounded-2xl bg-surface border border-border-soft p-6 sm:p-8">
      <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-text-tertiary">
        {group.heading}
      </h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <Badge key={item} tone="soft">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
