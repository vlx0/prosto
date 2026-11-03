import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { content } from "@/content";

export function Outcomes() {
  return (
    <section id="outcomes" className="scroll-mt-44 lg:scroll-mt-28 py-16 md:py-24 lg:py-36">
      <Container>
        <FadeIn>
          <h2 className="font-serif text-4xl leading-[1.15] tracking-wide text-ink md:text-5xl">
            {content.outcomes.heading}
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.outcomes.items.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.04}>
              <article className="h-full rounded-[24px] border border-sage/25 bg-card p-7 shadow-soft">
                <h3 className="font-serif text-2xl leading-snug tracking-wide text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[32ch] text-base leading-[1.7] text-muted">
                  {item.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-10">
          <a
            href="#apply"
            className="text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {content.outcomes.microCta}
          </a>
        </FadeIn>
      </Container>
    </section>
  );
}
