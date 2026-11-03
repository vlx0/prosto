import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { content } from "@/content";

export function Format() {
  return (
    <section id="format" className="scroll-mt-44 lg:scroll-mt-28 py-16 md:py-24 lg:py-36">
      <Container>
        <FadeIn>
          <h2 className="font-serif text-4xl leading-[1.15] tracking-wide text-ink md:text-5xl">
            {content.format.heading}
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <FadeIn className="space-y-8 lg:col-span-7">
            {content.format.facts.map((fact) => (
              <div key={fact.label}>
                <p className="text-sm tracking-wide text-sage uppercase">
                  {fact.label}
                </p>
                <p className="mt-2 max-w-[50ch] text-lg leading-[1.7] text-ink">
                  {fact.value}
                </p>
              </div>
            ))}
          </FadeIn>
          <FadeIn className="lg:col-span-5" delay={0.08}>
            <div className="rounded-[24px] bg-card p-8 shadow-soft">
              <p className="font-serif text-2xl text-ink">
                {content.format.includesHeading}
              </p>
              <ul className="mt-5 space-y-3 text-base leading-[1.7] text-muted">
                {content.format.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
        <FadeIn className="mt-12">
          <p className="font-serif text-3xl leading-snug text-ink">
            {content.format.price}
          </p>
          <p className="mt-3 max-w-[46ch] text-base leading-[1.7] text-muted">
            {content.format.priceNote}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
