export type ProjectStatus = 'shipped' | 'in-progress' | 'hackathon';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  /** One-line summary shown right under the name. */
  tagline: string;
  /** 2-3 bullet points describing what was built. */
  built: string[];
  /** Optional impact line, rendered with emphasis. */
  impact?: string;
  /** Optional pull-quote metrics for the featured card. */
  metrics?: ProjectMetric[];
  role: string;
  tech: string[];
  status: ProjectStatus;
  year: string;
  featured?: boolean;
  links?: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
}

/**
 * Featured project list. Order = display order. HackSMC is the headline card.
 */
export const projects: Project[] = [
  {
    slug: 'hacksmc',
    name: 'HackSMC Platform',
    tagline:
      'Built participant login, registration, judge scoring, and automated winner calculation for a campus hackathon platform.',
    built: [
      'Participant registration and login flow in React, with a database-backed user model.',
      'REST endpoints judges used to submit team scores, validated and persisted on the backend.',
      'Automated ranking that calculated winners from stored scores and surfaced them on a results page.',
    ],
    impact: 'Used by every team and judge at the event. Manual score tallying was removed entirely.',
    role: 'Full-Stack Developer',
    tech: ['React', 'Node.js', 'REST API', 'JavaScript'],
    status: 'shipped',
    year: '2026',
    featured: true,
    links: {
      live: 'https://dev.hacksmc.com',
    },
  },
  {
    slug: 'hd-bid-automation',
    name: 'H&D Bid Automation Tool',
    tagline:
      'Python tool that streamlined construction tender pricing and review across 200+ historical project records.',
    built: [
      'SQLite data model for bid records: base prices, deadlines, bid status, and historical award outcomes.',
      'Python pricing and validation logic that analyzed bid scenarios against base price, target ratio, and constraints.',
      'Debugging pass that resolved calculation and database errors so the internal review queue could trust the numbers.',
    ],
    impact: 'Cut manual tracking and review time by roughly 60% for the bid workflow.',
    metrics: [
      { value: '60%', label: 'Faster review' },
      { value: '200+', label: 'Records modeled' },
    ],
    role: 'Software Engineer Intern',
    tech: ['Python', 'SQLite', 'SQL', 'Automation'],
    status: 'shipped',
    year: '2024',
  },
  {
    slug: 'rebias',
    name: 'Re-Bias',
    tagline:
      'AI-assisted app that detects, scores, and visualizes bias in online content.',
    built: [
      'Node.js backend that calls the OpenAI API to analyze articles and posts for bias.',
      'Endpoints for analysis requests, algorithm reset, and per-user history tracking.',
      'Visualization layer so users see the reasoning behind the score, not just a verdict.',
    ],
    impact: 'Prototyped, demoed, and open-sourced at HackCC 2025. Repository is public and active.',
    role: 'Full-Stack Developer',
    tech: ['Node.js', 'OpenAI API', 'REST API', 'JavaScript'],
    status: 'hackathon',
    year: '2025',
    links: {
      github: 'https://github.com/Yuhwa-L/Re-bias',
    },
  },
];
