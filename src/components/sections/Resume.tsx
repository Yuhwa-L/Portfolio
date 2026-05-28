import { Download, FileText, Mail } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/ui/FadeIn';
import { site } from '@/data/site';

export function Resume() {
  return (
    <SectionWrapper id="resume" className="pt-0 sm:pt-0 lg:pt-0">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl bg-text-primary px-7 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 text-white">
          {/* Decorative gradient washes */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-1/4 -top-1/2 h-[560px] w-[560px] rounded-full bg-accent/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-1/4 -bottom-1/2 h-[480px] w-[480px] rounded-full bg-white/5 blur-3xl"
          />
          {/* Subtle internal grain */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay"
          >
            <filter id="resume-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#resume-noise)" />
          </svg>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/15">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Resume
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-balance">
                The full story, on one page.
              </h2>
              <p className="mt-5 text-lg text-white/70 leading-relaxed text-pretty max-w-xl">
                Download a copy for application portals or send it straight to a hiring inbox.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:flex-col lg:items-stretch lg:justify-end">
              <a
                href={site.resumePath}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-white/90"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download PDF
              </a>
              <a
                href={site.links.email}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Me
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
