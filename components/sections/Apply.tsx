import { ApplyForm } from "@/components/ApplyForm";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { content } from "@/content";

export function Apply() {
  return (
    <section id="apply" className="scroll-mt-28 py-16 md:py-24 lg:py-40">
      <Container>
        <FadeIn className="mx-auto max-w-xl">
          <h2 className="font-serif text-4xl leading-[1.15] tracking-wide text-ink md:text-5xl">
            {content.apply.heading}
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-[1.7] text-muted">
            {content.apply.promise}
          </p>
          <div className="mt-10">
            <ApplyForm />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
