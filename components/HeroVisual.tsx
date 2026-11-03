export function HeroVisual({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative aspect-[4/5] w-full max-w-md rotate-[-1deg] overflow-hidden rounded-[24px] shadow-soft"
    >
      <div className="absolute inset-0 bg-card" />
      <div className="absolute -top-10 left-6 h-56 w-56 rounded-full bg-accent/35 blur-2xl" />
      <div className="absolute top-24 -right-8 h-64 w-64 rounded-full bg-sage/40 blur-2xl" />
      <div className="absolute bottom-6 left-10 h-40 w-40 rounded-full bg-accent/25 blur-xl" />
      <div className="absolute inset-8 rounded-[20px] border border-ink/5" />
    </div>
  );
}
