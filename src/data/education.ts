export interface EducationItem {
  school: string;
  degree: string;
  detail?: string;
  location: string;
  /** Display string. For ongoing degrees, the end is "Present". For upcoming, just the term. */
  when: string;
  status?: 'upcoming' | 'current' | 'past';
  /** Optional school logo served from /public. Falls back to a graduation cap icon. */
  logo?: string;
}

export const education: EducationItem[] = [
  {
    school: 'Georgia Institute of Technology',
    degree: 'B.S. Computer Science',
    detail: 'Incoming transfer student.',
    location: 'Atlanta, GA',
    when: 'Fall 2026',
    status: 'upcoming',
    logo: '/gt-logo.png',
  },
  {
    school: 'Santa Monica College',
    degree: 'A.S. Computer Science',
    detail: 'Transfer preparation. GPA 4.0. Data Structures, OOP, Java, C++.',
    location: 'Santa Monica, CA',
    when: 'Aug 2024 to Jun 2026',
    status: 'current',
    logo: '/smc-logo.png',
  },
];
