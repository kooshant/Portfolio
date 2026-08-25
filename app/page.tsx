import About from "@/components/About";
import Certifications from "@/components/Certifications";
import CodingActivity from "@/components/coding/CodingActivity";
import Contact from "@/components/Contact";
import Dock from "@/components/Dock";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import { codingDisplay } from "@/data/profile";

/**
 * Regenerate hourly so GitHub/LeetCode figures stay current without hitting
 * either API per visitor. Next.js statically analyses this export, so it has to
 * be a literal — it can't read the value from data/profile.ts directly.
 */
export const revalidate = 3_600;

/**
 * Compile-time guard: if this literal and codingDisplay.revalidateSeconds ever
 * drift apart, `npm run build` fails here rather than shipping a page whose
 * regeneration window disagrees with its fetch cache.
 */
const _revalidateInSync: typeof revalidate = codingDisplay.revalidateSeconds;
void _revalidateInSync;

export default function Home() {
  return (
    <>
      {/* Near-full-bleed: a slim outer margin lets the panel read as the page,
          with a cap so ultrawide displays don't stretch it indefinitely. */}
      <div className="mx-auto w-full max-w-[120rem] px-3 py-3 sm:px-4 sm:py-4">
        {/* Everything nests inside one rounded panel. */}
        <div className="panel overflow-hidden rounded-3xl">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <CodingActivity />
          <Stack />
          <Certifications />
          <Contact />
          <Footer />
        </div>
      </div>

      <Dock />
    </>
  );
}
