export function Atmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-28 -left-20 h-[34rem] w-[34rem] rounded-full bg-accent/[0.10] blur-3xl" />
      <div className="absolute top-[32%] -right-28 h-[30rem] w-[30rem] rounded-full bg-sage/[0.12] blur-3xl" />
      <div className="absolute -bottom-24 left-[28%] h-[28rem] w-[28rem] rounded-full bg-accent/[0.07] blur-3xl" />
    </div>
  );
}
