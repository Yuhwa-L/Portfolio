import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-apple',
        scrolled
          ? 'backdrop-blur-xl bg-bg/70 border-b border-border-soft'
          : 'backdrop-blur-md bg-bg/50 border-b border-transparent',
      )}
    >
      <nav
        className="container max-w-6xl flex h-14 items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="group inline-flex items-center gap-2 text-[15px] font-semibold tracking-tight text-text-primary"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-text-primary text-[11px] font-bold text-white tracking-tight">
            YL
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        <ul className="hidden md:flex items-center gap-0.5 rounded-full border border-border-soft bg-white/50 p-1 backdrop-blur">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-full px-3.5 py-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-white transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={site.resumePath}
            download
            className="inline-flex items-center gap-2 rounded-full bg-text-primary px-4 py-1.5 text-[13px] font-medium text-white hover:bg-black transition-colors"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden rounded-full p-2 text-text-primary hover:bg-surface transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-apple bg-bg/95 backdrop-blur-xl border-t border-border-soft',
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="container max-w-6xl flex flex-col py-3">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-base font-medium text-text-primary hover:bg-surface"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-2 px-3 pb-2">
            <a
              href={site.resumePath}
              download
              onClick={() => setOpen(false)}
              className="block w-full text-center rounded-full bg-text-primary px-4 py-3 text-sm font-medium text-white"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
