import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { content } from "@/content";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-44 lg:scroll-mt-28 py-16 md:py-24 lg:py-36">
      <Container>
        <FadeIn>
          <h2 className="font-serif text-4xl leading-[1.15] tracking-wide text-ink md:text-5xl">
            {content.faq.heading}
          </h2>
        </FadeIn>
        <div className="mt-10 max-w-3xl divide-y divide-sage/30 border-y border-sage/30">
          {content.faq.items.map((item) => (
            <FadeIn key={item.q}>
              <details className="group py-6">
                <summary className="flex cursor-pointer items-start justify-between gap-6 font-serif text-2xl leading-snug tracking-wide text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 text-sage transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[65ch] text-base leading-[1.7] text-muted">
                  {item.a}
                </p>
              </details>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
