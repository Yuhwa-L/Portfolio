import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/ui/FadeIn';
import { site } from '@/data/site';

export function Contact() {
  return (
    <SectionWrapper
      id="contact"
      eyebrow="Contact"
      title="Let's build something."
      intro="The fastest way to reach me is email. I reply within a day or two and read every message."
    >
      <FadeIn>
        <div className="grid gap-3 sm:grid-cols-3">
          <EmailCard />
          <ExternalCard
            label="LinkedIn"
            handle="linkedin.com/in/yuhwa-lee"
            href={site.links.linkedin}
            icon={Linkedin}
          />
          <ExternalCard
            label="GitHub"
            handle="github.com/Yuhwa-L"
            href={site.links.github}
            icon={Github}
          />
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}

function EmailCard() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API may be unavailable on older browsers; silently noop.
    }
  };

  return (
    <div className="group relative flex h-full items-start justify-between gap-4 rounded-2xl border border-border-soft bg-white/70 backdrop-blur-md p-6 transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:border-border hover:shadow-card">
      <a href={site.links.email} className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-text-tertiary">
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          Email
        </div>
        <div className="mt-3 break-words text-base font-medium text-text-primary group-hover:text-accent transition-colors">
          {site.email}
        </div>
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? 'Email copied to clipboard' : 'Copy email to clipboard'}
        className="relative shrink-0 rounded-full p-2 text-text-tertiary transition-colors hover:bg-surface hover:text-text-primary"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

interface ExternalCardProps {
  label: string;
  handle: string;
  href: string;
  icon: typeof Mail;
}

function ExternalCard({ label, handle, href, icon: Icon }: ExternalCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-border-soft bg-white/70 backdrop-blur-md p-6 transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:border-border hover:shadow-card"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-text-tertiary">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {label}
        </div>
        <div className="mt-3 break-words text-base font-medium text-text-primary group-hover:text-accent transition-colors">
          {handle}
        </div>
      </div>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-text-tertiary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        aria-hidden="true"
      />
    </a>
  );
}
