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
    items: ['Node.js', 'REST APIs', 'Express', 'SQL', 'SQLite'],
  },
  {
    heading: 'Data & Automation',
    items: ['Python', 'Excel', 'Data Modeling', 'Workflow Automation'],
  },
  {
    heading: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Cursor', 'Claude Code'],
  },
];

export interface Recognition {
  title: string;
  org?: string;
  year: string;
}

export const recognitions: Recognition[] = [
  {
    title: 'AMATYC Mathematics Competition, 1st Place',
    year: 'Nov 2025',
  },
];
