export interface ExperienceItem {
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  /** Short description of the role — what the position actually meant in practice. */
  roleSummary: string;
  /** What I owned: the responsibilities and work I held. */
  owned: string;
  /** What changed because of the work. */
  changed: string;
  tech?: string[];
  /** Optional org logo served from /public. */
  logo?: string;
}

/**
 * Experience entries, ordered by recency (active roles first, then by end date).
 * Each role uses a compact Role → What I owned → What changed structure.
 */
export const experience: ExperienceItem[] = [
  {
    role: 'President',
    org: 'LIKELION SMC',
    location: 'Santa Monica, CA',
    start: 'Aug 2025',
    end: 'Present',
    roleSummary:
      'Leading a student tech community focused on project-based learning, collaboration, and beginner-friendly building.',
    owned:
      'Organized team direction, events, communication, and project momentum, and helped students turn early ideas into more structured technical work.',
    changed:
      'Created a stronger environment for students to learn by building, not just studying.',
    logo: '/likelion-logo.jpg',
  },
  {
    role: 'Full-Stack Developer',
    org: 'HackSMC',
    location: 'Santa Monica, CA',
    start: 'Mar 2026',
    end: 'May 2026',
    roleSummary:
      'Built platform features for hackathon operations and judging workflows.',
    owned:
      'Implemented participant registration and login UI, judge scoring workflows, backend and data flow, and the automated winner calculation logic.',
    changed:
      'Created a reusable full-stack workflow for managing scoring data, database updates, and result calculation.',
    tech: ['React', 'Node.js', 'REST API', 'JavaScript'],
    logo: '/hacksmc-logo.jpg',
  },
  {
    role: 'Computer Science Tutor',
    org: 'AGS Honor Society',
    location: 'Santa Monica, CA',
    start: 'Mar 2025',
    end: 'Mar 2026',
    roleSummary:
      'Supported students learning programming and CS fundamentals through one-on-one tutoring.',
    owned:
      'Explained debugging, logic, syntax, and problem-solving in beginner-friendly language across Java, C++, and Python.',
    changed:
      'Helped students move from confusion to clearer understanding through step-by-step technical support.',
    tech: ['Java', 'C++', 'Python', 'Data Structures'],
    logo: '/ags-logo.jpg',
  },
  {
    role: 'Software Engineer Intern',
    org: 'DNC Construction',
    location: 'Cheonan, Korea',
    start: 'Jun 2024',
    end: 'Aug 2024',
    roleSummary:
      'Built internal automation for construction bidding workflows during a summer internship.',
    owned:
      'Designed a MySQL database for 200+ project records and built Python logic for bid scenario analysis, validation checks, and structured tracking.',
    changed:
      'Reduced manual tracking time by 60% and improved the accuracy and speed of internal bid review.',
    tech: ['Python', 'MySQL', 'SQL'],
  },
];
