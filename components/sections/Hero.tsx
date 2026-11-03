import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { HeroVisual } from "@/components/HeroVisual";
import { content } from "@/content";

export function Hero() {
  return (
    <section
      id="start"
      className="relative scroll-mt-44 px-0 pt-44 pb-16 md:pb-24 lg:scroll-mt-28 lg:pt-40 lg:pb-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <FadeIn className="lg:col-span-7">
            <h1 className="max-w-[16ch] font-serif text-5xl leading-[1.12] tracking-wide text-ink sm:text-6xl lg:text-7xl">
              {content.hero.h1}
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-[1.7] text-muted">
              {content.hero.sub}
            </p>
            <div className="mt-10">
              <Button href="#apply">{content.hero.cta}</Button>
            </div>
          </FadeIn>
          <FadeIn className="flex justify-center lg:col-span-5" delay={0.08}>
            <HeroVisual label={content.author.visualLabel} />
          </FadeIn>
        </div>
        <FadeIn className="mt-16 flex justify-center md:mt-24">
          <a
            href="#recognition"
            className="inline-flex flex-col items-center text-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label={content.hero.scrollLabel}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </FadeIn>
      </Container>
    </section>
  );
}
