/**
 * Subtle horizontal divider that fades in at the edges. Used between sections
 * when a softer transition than the default gap is wanted.
 */
export function SectionDivider() {
  return (
    <div className="container max-w-6xl">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border-soft to-transparent" />
    </div>
  );
}
