/**
 * Central place for personal info and links.
 * Update the PLACEHOLDER values below before deploying.
 */
export const site = {
  name: 'Yuhwa Lee',
  shortName: 'Yuhwa',
  /** Hero subtitle. Dot-separated phrases keep it scannable while wrapping cleanly. */
  role: 'Full-Stack Developer · Incoming CS @ Georgia Tech · Builder of automation tools and web platforms',
  location: 'Los Angeles, CA',
  email: 'zeusya7015@gmail.com',
  resumePath: '/Yuhwa_Lee_Resume.pdf',
  availability: 'Open to Software Engineering Internships',
  /** Hero intro paragraph. */
  tagline:
    'I build full-stack web apps, automation systems, and data tools that solve real workflow problems.',
  /** Tech the hero advertises up front. Keep to ~5 chips for a clean row. */
  heroStack: ['React', 'Node.js', 'Python', 'SQL', 'REST APIs'] as const,
  intro:
    'I build the parts of software people actually use: the login screen that has to work the first time, the script that has to run reliably, the workflow a team relies on every day.',
  links: {
    linkedin: 'https://www.linkedin.com/in/yuhwa-lee',
    github: 'https://github.com/Yuhwa-L',
    email: 'mailto:zeusya7015@gmail.com?subject=Hi%20Yuhwa%2C%20about%20a%20SWE%20internship',
  },
  nav: [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;

/**
 * Headline metrics shown right below the Hero.
 * Each value is paired with a short label and a one-line source/context.
 */
export interface Metric {
  value: string;
  label: string;
  source: string;
}

export const metrics: Metric[] = [
  {
    value: '4.0',
    label: 'GPA',
    source: 'Current academic performance',
  },
  {
    value: '60%',
    label: 'Faster workflow',
    source: 'Bid tracking automation',
  },
  {
    value: '200+',
    label: 'Records organized',
    source: 'MySQL project database',
  },
  {
    value: '100+',
    label: 'Users supported',
    source: 'HackSMC platform and testing',
  },
];

/**
 * "Now" / Currently entries. Short, present-tense.
 * Update these as life moves on.
 */
export interface NowEntry {
  title: string;
  detail: string;
}

export const nowEntries: NowEntry[] = [
  {
    title: 'Transferring to Georgia Tech',
    detail: 'B.S. in Computer Science, incoming Fall 2026.',
  },
  {
    title: 'Leading LIKELION SMC',
    detail: 'Workshops and student community events.',
  },
];

/**
 * Small descriptor cards used in the About section.
 */
export interface AboutCard {
  title: string;
  detail: string;
}

export const aboutCards: AboutCard[] = [
  {
    title: 'Practical Systems',
    detail:
      'I build tools that make real workflows faster and clearer — not demos, not boilerplate.',
  },
  {
    title: 'Full-Stack Thinking',
    detail:
      'Frontend, backend, and the data underneath. I want the whole flow to feel right, not just the surface.',
  },
  {
    title: 'Data + Automation',
    detail:
      'Python, SQL, and MySQL turn scattered records and manual review into one repeatable workflow.',
  },
  {
    title: 'Product Sense',
    detail:
      'A tool only matters when the person using it can rely on it. That is the bar I build to.',
  },
];

export type SiteConfig = typeof site;
