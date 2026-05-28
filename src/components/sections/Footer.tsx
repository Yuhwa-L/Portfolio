import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { site } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-soft bg-white/40 backdrop-blur-sm">
      <div className="container max-w-6xl py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="max-w-md">
            <div className="text-xs font-semibold uppercase tracking-eyebrow text-text-tertiary">
              {site.location}
            </div>
            <p className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight text-text-primary leading-tight">
              Thanks for scrolling. Let's talk.
            </p>
            <a
              href={site.links.email}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {site.email}
            </a>
          </div>

          <ul className="flex items-center gap-2">
            <li>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-white/60 text-text-secondary hover:bg-white hover:text-text-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-white/60 text-text-secondary hover:bg-white hover:text-text-primary transition-colors"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="#top"
                aria-label="Back to top"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-white/60 text-text-secondary hover:bg-white hover:text-text-primary transition-colors"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border-soft pt-6 text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-medium text-text-secondary">{site.name}</span>
            <span aria-hidden="true"> · </span>
            <span>&copy; {year}</span>
          </div>
          <div>Designed and built with React, Tailwind, and Framer Motion.</div>
        </div>
      </div>
    </footer>
  );
}
