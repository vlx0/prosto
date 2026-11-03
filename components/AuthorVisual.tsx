export function AuthorVisual({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative aspect-[4/5] w-full max-w-sm rotate-[1deg] overflow-hidden rounded-[24px] shadow-soft"
    >
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-8 -left-6 h-48 w-48 rounded-full bg-sage/45 blur-2xl" />
      <div className="absolute right-0 top-20 h-56 w-40 rounded-full bg-accent/40 blur-2xl" />
      <div className="absolute bottom-10 left-12 h-28 w-52 rounded-full bg-accent/20 blur-xl" />
      <div className="absolute inset-6 rounded-[18px] border border-cream/40" />
    </div>
  );
}
