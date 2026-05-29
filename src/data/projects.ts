export type ProjectStatus = 'shipped' | 'in-progress' | 'hackathon';

export interface Project {
  slug: string;
  name: string;
  /** Small label that frames what kind of thing this is (Platform / Internal Tool / AI Tool …). */
  category: string;
  /** One-line summary shown right under the project name. */
  tagline: string;
  /** The friction or messy reality the project responded to. */
  problem: string;
  /** What was actually built — the technical move, in one tight paragraph. */
  build: string;
  /** Outcome or change the build produced, stated honestly. */
  impact: string;
  role: string;
  tech: string[];
  status: ProjectStatus;
  year: string;
  featured?: boolean;
  /** Optional org/event logo served from /public. Used to attribute source (e.g. HackCC). */
  logo?: string;
  /** Optional short label that pairs with the logo for context (e.g. "HackCC"). */
  logoLabel?: string;
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
    name: 'HackSMC Judging Platform',
    category: 'Full-Stack Platform',
    tagline:
      'End-to-end workflow for hackathon registration, judge scoring, and automated winner calculation.',
    problem:
      'Hackathon judging workflows needed a cleaner way to handle participant registration, judge score entry, database updates, and winner calculation.',
    build:
      'Built full-stack flows in React with backend logic, database connections, and REST API-style data movement for registration, judge scoring, and automated winner calculation.',
    impact:
      'Created and tested a reusable judging system that made scoring logic, result calculation, and end-to-end data flow easier to manage.',
    role: 'Full-Stack Developer',
    tech: ['React', 'Node.js', 'REST API', 'JavaScript', 'Database'],
    status: 'shipped',
    year: '2026',
    featured: true,
    logo: '/hacksmc-logo.jpg',
    logoLabel: 'HackSMC',
    links: {
      live: 'https://dev.hacksmc.com',
    },
  },
  {
    slug: 'dnc-bid-automation',
    name: 'DNC Bid Automation Tool',
    category: 'Internal Tool',
    tagline:
      'Python + MySQL automation for construction bid review, pricing logic, and validation.',
    problem:
      'Construction bid data was scattered across manual records, making it slow to compare base prices, deadlines, bid status, and historical award outcomes.',
    build:
      'Built a Python internal tool backed by a MySQL database of 200+ project records, with bid scenario logic, target-ratio calculations, bidding constraint checks, and validation rules to reduce calculation and data-entry errors.',
    impact:
      'Reduced manual tracking time by 60% and helped the team review bid opportunities faster with cleaner, more structured data.',
    role: 'Software Engineer Intern',
    tech: ['Python', 'MySQL', 'SQL', 'Data Modeling', 'Automation'],
    status: 'shipped',
    year: '2024',
  },
  {
    slug: 'rebias',
    name: 'Re-Bias',
    category: 'AI Tool',
    tagline:
      'AI-assisted analysis that scores and tracks bias in online content.',
    problem:
      'Online content can carry bias, but users often do not have a simple way to see how language may frame people, groups, or topics.',
    build:
      'Built Node.js backend logic for bias detection, user history tracking, and reset and re-analysis workflows, with structured results so each review is repeatable.',
    impact:
      'Turned an abstract fairness problem into a usable product concept with structured analysis, user-facing feedback, and a repeatable review flow.',
    role: 'Full-Stack Developer',
    tech: ['Node.js', 'JavaScript', 'API', 'Data Tracking'],
    status: 'hackathon',
    year: '2025',
    logo: '/hackcc-logo.jpg',
    logoLabel: 'HackCC',
    links: {
      github: 'https://github.com/Yuhwa-L/Re-bias',
    },
  },
];
