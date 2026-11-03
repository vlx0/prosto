import type { Metadata } from "next";
import { CourseText } from "@/components/sections/CourseText";
import { content } from "@/content";

export const metadata: Metadata = {
  title: `${content.coursePage.title} — ${content.nav.brand}`,
  description: content.coursePage.kicker,
};

export default function CoursePage() {
  return (
    <main id="main">
      <CourseText />
    </main>
  );
}
