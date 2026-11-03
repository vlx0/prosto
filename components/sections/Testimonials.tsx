import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { content } from "@/content";

const tilts = ["-rotate-[0.6deg]", "rotate-[0.8deg]", "-rotate-[0.4deg]"];

export function Testimonials() {
  return (
    <section id="stories" className="scroll-mt-44 lg:scroll-mt-28 py-16 md:py-24 lg:py-36">
      <Container>
        <FadeIn>
          <h2 className="font-serif text-4xl leading-[1.15] tracking-wide text-ink md:text-5xl">
            {content.testimonials.heading}
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {content.testimonials.quotes.map((quote, index) => (
            <FadeIn key={quote.name} delay={index * 0.06}>
              <figure
                className={`h-full rounded-[24px] bg-card p-8 shadow-soft ${tilts[index] ?? ""}`}
              >
                <blockquote className="font-serif text-xl leading-relaxed text-ink md:text-[1.35rem]">
                  {quote.text}
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted">
                  {quote.name}
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
