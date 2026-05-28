export interface ExperienceItem {
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  tech?: string[];
}

/**
 * Experience entries, ordered by recency (active roles first, then by end date).
 * Bullets are capped at 3 per role for fast recruiter scanning.
 */
export const experience: ExperienceItem[] = [
  {
    role: 'President',
    org: 'LIKELION SMC',
    location: 'Santa Monica, CA',
    start: 'Aug 2025',
    end: 'Present',
    bullets: [
      'Lead the Santa Monica College chapter of LIKELION, a student coding network with chapters across 130+ universities worldwide.',
      'Create recruiting and social content to bring new members into the chapter and grow the community.',
      'Run event promotion and workshops that turn casual interest into a steady, active membership.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    org: 'HackSMC',
    location: 'Santa Monica, CA',
    start: 'Mar 2026',
    end: 'May 2026',
    bullets: [
      'Built the participant registration and login flow in React, backed by a database-managed user model.',
      'Designed REST endpoints for judge scoring and the automated ranking logic that calculated winners.',
      'Connected frontend, backend, and database into one end-to-end workflow and debugged it before the event.',
    ],
    tech: ['React', 'Node.js', 'REST API', 'JavaScript'],
  },
  {
    role: 'Computer Science Tutor',
    org: 'AGS Honor Society',
    location: 'Santa Monica, CA',
    start: 'Mar 2025',
    end: 'Mar 2026',
    bullets: [
      'Tutored Santa Monica College students through the AGS (Alpha Gamma Sigma) Honor Society tutoring committee.',
      'Covered Data Structures, Java, C++, Python, and introductory programming in one-on-one sessions.',
      'Walked students through problems step by step so they built intuition for OOP, recursion, and core data structures.',
    ],
    tech: ['Java', 'C++', 'Python', 'Data Structures'],
  },
  {
    role: 'Software Engineer Intern',
    org: 'H&D Construction',
    location: 'Cheonan, Korea',
    start: 'Jun 2024',
    end: 'Aug 2024',
    bullets: [
      'Built a Python and SQLite bid automation tool that cut manual tracking time by roughly 60%.',
      'Designed a SQLite database for 200+ project records: base prices, deadlines, bid status, and award outcomes.',
      'Implemented pricing and validation logic against base price, target ratio, and bidding constraints.',
    ],
    tech: ['Python', 'SQLite', 'SQL'],
  },
];
