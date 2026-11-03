import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { SceneIcon } from "@/components/SceneIcon";
import { content } from "@/content";

const tilts = ["-rotate-1", "rotate-[0.8deg]", "rotate-[1deg]", "-rotate-[0.6deg]"];

export function Recognition() {
  return (
    <section
      id="recognition"
      className="scroll-mt-44 lg:scroll-mt-28 py-16 md:py-24 lg:py-36"
    >
      <Container>
        <FadeIn>
          <h2 className="font-serif text-4xl leading-[1.15] tracking-wide text-ink md:text-5xl">
            {content.recognition.heading}
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-7">
          {content.recognition.scenes.map((scene, index) => (
            <FadeIn key={scene.text} delay={index * 0.05}>
              <article
                className={`rounded-[24px] bg-card p-7 shadow-soft md:p-8 ${tilts[index] ?? ""}`}
              >
                <SceneIcon name={scene.icon} />
                <p className="mt-5 max-w-[36ch] text-lg leading-[1.7] text-ink">
                  {scene.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
