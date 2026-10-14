import Container from "./ui/Container";
import { heading2, sectionPadding } from "./ui/typography";
import { SCS_LEARN_YOUTUBE_URL } from "./links";

const COURSE_VIDEOS = [
  "Courseware XXX. Going live in November.",
  "Courseware YYY. Going live in November.",
  "Courseware ZZZ. Going live in November.",
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

function VideoPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex aspect-video w-full items-center justify-center bg-steel-gray px-6 text-center font-semibold text-iron-gray ${className}`}
    >
      {label}
    </div>
  );
}

// Red eyebrow, serif heading, a short description, then grey video
// placeholders until the lectures exist.
export default function YouTubeSection() {
  return (
    <section className={`bg-white text-black ${sectionPadding}`}>
      <Container>
        <p className="text-sm font-bold uppercase text-primary">SCS Learn on YouTube</p>
        <h2 className={`${heading2} mt-3`}>Every lecture, free to start.</h2>
        <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-base leading-relaxed text-iron-gray">
            Real classroom lectures from the Kenneth C. Griffin School of Computer Science, completely free to get started and watch on your own time.
          </p>
          <a
            href={SCS_LEARN_YOUTUBE_URL}
            {...external}
            className="inline-block shrink-0 border border-black px-5 py-2.5 text-sm font-semibold btn-fill-black hover:text-white"
          >
            Visit our YouTube channel
          </a>
        </div>

        <VideoPlaceholder label="SCS Learn intro from Phillip. Going live in November." className="mt-12 text-xl sm:text-2xl" />

        <ul className="mt-12 grid grid-cols-1 gap-10 xl:grid-cols-3 xl:gap-8">
          {COURSE_VIDEOS.map((label) => (
            <li key={label} className="min-w-0">
              <VideoPlaceholder label={label} className="text-base sm:text-lg" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
