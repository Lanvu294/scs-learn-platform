import Container from "./ui/Container";
import YouTubePreview from "./YouTubePreview";
import { heading2, sectionPadding } from "./ui/typography";
import { SCS_LEARN_FEATURED_VIDEO_ID, SCS_LEARN_YOUTUBE_URL } from "./links";

// Each embeds the featured video and links to the channel until the course
// playlists exist.
const PLAYLISTS = [
  {
    title: "15-112: Fundamentals of Programming",
    videoId: SCS_LEARN_FEATURED_VIDEO_ID,
    href: SCS_LEARN_YOUTUBE_URL,
  },
  {
    title: "10-301: Introduction to Machine Learning",
    videoId: SCS_LEARN_FEATURED_VIDEO_ID,
    href: SCS_LEARN_YOUTUBE_URL,
  },
  {
    title: "06-204: Great Ideas in Computational Biology",
    videoId: SCS_LEARN_FEATURED_VIDEO_ID,
    href: SCS_LEARN_YOUTUBE_URL,
  },
];

const embedAllow =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// Modeled on cmu.edu's feature story layout: red eyebrow, serif heading, two
// columns of copy, a full-width video, then a row of linked thumbnails.
export default function YouTubeSection() {
  return (
    <section className={`bg-white text-black ${sectionPadding}`}>
      <Container>
        <p className="text-sm font-bold uppercase text-primary">SCS Learn on YouTube</p>
        <h2 className={`${heading2} mt-3`}>Every lecture, free to watch</h2>

        <div className="mt-6 grid grid-cols-1 gap-6 text-base leading-relaxed text-iron-gray md:grid-cols-2 md:gap-12">
          <p>
            Full lectures from the Kenneth C. Griffin School of Computer Science, recorded in the classroom by the
            professors who built the courses. You get the same explanations, worked examples and student questions that
            Carnegie Mellon students hear in the room, posted for anyone to watch with no account required.
          </p>
          <div>
            <p>Watch at your own pace, then sign in for the notes, coursework and AI tutor that go with them.</p>
            <a
              href={SCS_LEARN_YOUTUBE_URL}
              {...external}
              className="mt-5 inline-block border border-black px-5 py-2.5 text-sm font-semibold btn-fill-black hover:text-white"
            >
              Visit our YouTube channel
            </a>
          </div>
        </div>

        <iframe
          src={`https://www.youtube-nocookie.com/embed/${SCS_LEARN_FEATURED_VIDEO_ID}`}
          title="SCS Learn on YouTube"
          loading="lazy"
          allow={embedAllow}
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="mt-12 aspect-video w-full"
        />

        {/* Three across only from xl: narrower columns can't fit the longest title on one line. */}
        <ul className="mt-12 grid grid-cols-1 gap-10 xl:grid-cols-3 xl:gap-8">
          {PLAYLISTS.map(({ title, videoId, href }) => (
            <li key={title} className="min-w-0">
              <YouTubePreview videoId={videoId} title={title} />
              <h3 title={title} className="mt-5 truncate pb-2 font-sans text-sm leading-snug font-bold sm:text-base">
                <a
                  href={href}
                  {...external}
                  className="underline decoration-2 underline-offset-[6px] hover:text-primary"
                >
                  {title}
                </a>
              </h3>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
