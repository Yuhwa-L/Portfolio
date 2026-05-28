import { motion } from 'framer-motion';
import { metrics } from '@/data/site';
import { APPLE_EASE } from '@/lib/motion';

/**
 * Compact metrics strip displayed right below the Hero. Recruiter-friendly,
 * single horizontal pass of provable numbers (GPA, time saved, records, peers).
 */
export function Metrics() {
  return (
    <section
      id="metrics"
      aria-label="Selected impact"
      className="relative py-8 sm:py-10"
    >
      <div className="container max-w-6xl">
        <div className="rounded-2xl border border-border-soft bg-white/70 backdrop-blur-md shadow-sm">
          <ul className="grid grid-cols-2 divide-y divide-border-soft sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
            {metrics.map((m, i) => (
              <motion.li
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: APPLE_EASE }}
                className="px-6 py-6 sm:px-7"
              >
                <div className="text-3xl sm:text-[34px] font-semibold tracking-tight text-text-primary leading-none">
                  {m.value}
                </div>
                <div className="mt-3 text-[13px] leading-snug text-text-primary/90">
                  {m.label}
                </div>
                <div className="mt-1 text-xs text-text-tertiary">{m.source}</div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
