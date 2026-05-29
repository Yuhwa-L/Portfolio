export interface SkillGroup {
  heading: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    heading: 'Frontend',
    items: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    heading: 'Backend',
    items: ['Node.js', 'REST APIs', 'Express', 'SQL', 'MySQL'],
  },
  {
    heading: 'Data & Automation',
    items: ['Python', 'Excel', 'Data Modeling', 'Workflow Automation'],
  },
  {
    heading: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Cursor', 'Claude Code', 'Codex'],
  },
];

export interface Recognition {
  title: string;
  /** Short descriptive line — what the recognition means in plain language. */
  detail?: string;
  /** Achievement framing, e.g. "1st Place". Rendered alongside the year. */
  placement?: string;
  org?: string;
  year: string;
}

export const recognitions: Recognition[] = [
  {
    title: 'AMATYC Math Competition',
    detail: 'Quantitative reasoning, problem solving, and mathematical thinking.',
    placement: '1st Place',
    year: 'Nov 2025',
  },
];
