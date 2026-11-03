import { AuthorVisual } from "@/components/AuthorVisual";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { content } from "@/content";

export function Author() {
  return (
    <section id="author" className="scroll-mt-28 py-16 md:py-24 lg:py-36">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <FadeIn className="flex justify-center lg:col-span-5">
            <AuthorVisual label={content.author.visualLabel} />
          </FadeIn>
          <FadeIn className="lg:col-span-7" delay={0.08}>
            <p className="font-hand text-3xl leading-snug text-accent md:text-4xl">
              {content.author.pullQuote}
            </p>
            <div className="mt-8 max-w-[42ch] space-y-4 text-lg leading-[1.7] text-ink">
              {content.author.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              {content.author.credentials}
            </p>
            <p className="mt-4 font-hand text-3xl text-ink">
              {content.author.signature}
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
