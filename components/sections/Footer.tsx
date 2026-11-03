import { Container } from "@/components/Container";
import { content } from "@/content";

export function Footer() {
  return (
    <footer className="border-t border-sage/25 py-10">
      <Container className="flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>{content.footer.author}</p>
        <a
          href={content.footer.contactHref}
          className="text-ink underline decoration-sage/50 underline-offset-4 hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {content.footer.contactLabel}
        </a>
        <p>{content.footer.copyright}</p>
      </Container>
    </footer>
  );
}
