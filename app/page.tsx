import { Apply } from "@/components/sections/Apply";
import { Author } from "@/components/sections/Author";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Format } from "@/components/sections/Format";
import { Hero } from "@/components/sections/Hero";
import { Outcomes } from "@/components/sections/Outcomes";
import { Recognition } from "@/components/sections/Recognition";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Recognition />
      <Author />
      <Outcomes />
      <Testimonials />
      <Format />
      <Faq />
      <Apply />
      <Footer />
    </main>
  );
}
