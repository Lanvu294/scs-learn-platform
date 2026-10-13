import { ArrowUpRight } from "lucide-react";
import YouTubeIcon from "./ui/YouTubeIcon";
import { SCS_LEARN_YOUTUBE_URL } from "./links";

const FACTS = ["Full-length lectures", "Free, no sign-up", "Watch at your own pace"];

/**
 * Directly under the hero: the YouTube channel is where every lecture lives,
 * so it gets top billing. Styled like cmu.edu's black bands - square corners,
 * Source Serif heading, and the red arrow-square call to action.
 */
export default function YouTubeBand() {
  return (
    <section className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
        <div className="flex items-start gap-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#ff0000]">
            <YouTubeIcon className="h-8 w-8 text-white" />
          </span>
          <div>
            <h2 className="font-brand text-2xl font-semibold leading-snug md:text-3xl">Every lecture, free on YouTube</h2>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/75">
              {FACTS.map((fact) => (
                <li key={fact} className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 bg-primary" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          href={SCS_LEARN_YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-stretch self-start text-sm font-semibold md:self-auto"
        >
          <span className="flex w-11 items-center justify-center bg-primary">
            <ArrowUpRight
              size={22}
              strokeWidth={1.75}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
          <span className="relative isolate flex items-center overflow-hidden border border-l-0 border-primary px-5 py-3 transition-colors duration-200 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-primary before:transition-transform before:duration-200 group-hover:before:translate-y-0">
            Watch on YouTube
          </span>
        </a>
      </div>
    </section>
  );
}
