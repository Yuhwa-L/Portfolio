import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { nowEntries, site } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { APPLE_EASE, staggerChild, staggerContainer } from '@/lib/motion';

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32"
    >
      <div className="container max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={staggerChild}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/70 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-text-secondary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {site.availability}
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={staggerChild}
            className="mt-7 text-[44px] sm:text-[72px] lg:text-[96px] font-semibold tracking-[-0.035em] leading-[0.95] text-balance bg-gradient-to-br from-[#0a0a0c] via-[#1d1d1f] to-[#3a3a3f] bg-clip-text text-transparent"
          >
            {site.name}.
          </motion.h1>

          <motion.p
            variants={staggerChild}
            className="mt-6 text-lg sm:text-xl lg:text-2xl font-medium tracking-tight text-text-primary/85 leading-snug max-w-3xl text-balance"
          >
            {site.role}
          </motion.p>

          <motion.p
            variants={staggerChild}
            className="mt-6 max-w-2xl text-[17px] sm:text-lg lg:text-xl text-text-secondary leading-relaxed text-pretty"
          >
            {site.tagline}
          </motion.p>

          <motion.div variants={staggerChild} className="mt-6 flex flex-wrap gap-2">
            {site.heroStack.map((t) => (
              <Badge key={t} tone="soft" className="px-3.5 py-1.5 text-[13px]">
                {t}
              </Badge>
            ))}
          </motion.div>

          <motion.div
            variants={staggerChild}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button
              href="#projects"
              size="lg"
              variant="primary"
              iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              View Work
            </Button>
            <Button
              href={site.resumePath}
              size="lg"
              variant="secondary"
              iconLeft={<Download className="h-4 w-4" aria-hidden="true" />}
              download=""
            >
              Download Resume PDF
            </Button>
            <a
              href={site.links.email}
              className="ml-1 inline-flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              or email me
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-14">
            <NowStrip />
          </motion.div>
        </motion.div>

        <motion.a
          href="#metrics"
          aria-label="Scroll to next section"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: APPLE_EASE }}
          className="mt-20 hidden lg:inline-flex items-center gap-2 text-xs font-medium uppercase tracking-eyebrow text-text-tertiary hover:text-text-primary transition-colors"
        >
          <span>Scroll</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}

function NowStrip() {
  return (
    <div className="rounded-2xl border border-border-soft bg-white/70 backdrop-blur-md p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-text-tertiary">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        Now
      </div>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-6">
        {nowEntries.map((entry) => (
          <li key={entry.title} className="text-[15px]">
            <div className="font-medium text-text-primary">{entry.title}</div>
            <div className="mt-1 text-sm text-text-secondary leading-snug">{entry.detail}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
