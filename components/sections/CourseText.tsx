import { Container } from "@/components/Container";
import { CourseSwitcher } from "@/components/CourseSwitcher";
import { content } from "@/content";

export function CourseText() {
  return (
    <section className="pt-28 pb-24 md:pt-36 md:pb-32">
      <Container>
        <article className="mx-auto max-w-[68ch]">
          <p className="text-sm tracking-wide text-sage uppercase">
            {content.coursePage.kicker}
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.12] tracking-wide text-ink md:text-6xl">
            {content.coursePage.title}
          </h1>
          <div className="mt-8">
            <CourseSwitcher />
          </div>
        </article>
      </Container>
    </section>
  );
}
