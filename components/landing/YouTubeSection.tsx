import Image from "next/image";
import { Play } from "lucide-react";
import Carousel from "./ui/Carousel";
import { heading2, sectionPadding } from "./ui/typography";
import { SCS_LEARN_YOUTUBE_SUBSCRIBE_URL } from "./links";
import { YouTubeColorIcon } from "./ui/YouTubeIcon";

type ComingSoonVideo = {
  key: string;
  kicker: string;
  title: string;
  byline: string;
  image: string;
};

// Poster frames until the videos go live in November. When one premieres,
// swap its frame for the YouTube embed.
const VIDEOS: ComingSoonVideo[] = [
  {
    key: "intro",
    kicker: "Introduction",
    title: "Welcome to SCS Learn",
    byline: "Phillip Compeau",
    image: "/landing/photos/lecture-hall.jpg",
  },
  {
    key: "06-204",
    kicker: "06-204 · Courseware trailer",
    title: "Great Ideas in Computational Biology",
    byline: "Phillip Compeau",
    image: "/landing/photos/comp-bio-poster-session.jpg",
  },
  {
    key: "15-112",
    kicker: "15-112 · Courseware trailer",
    title: "Fundamentals of Programming and Computer Science",
    byline: "School of Computer Science",
    image: "/landing/photos/students-coding.jpg",
  },
  {
    key: "10-301",
    kicker: "10-301 · Courseware trailer",
    title: "Introduction to Machine Learning",
    byline: "Machine Learning Department",
    image: "/landing/photos/ml-visualization.jpg",
  },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// A 16:9 poster: campus photo under a dark wash, a red "Premieres in November"
// tag, the title, and a muted play mark in the corner.
function ComingSoonFrame({ video }: { video: ComingSoonVideo }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black text-white">
      <Image src={video.image} alt="" fill sizes="(min-width: 768px) 50vw, 85vw" quality={90} className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.25)_100%)]" />

      <p className="absolute top-0 left-0 bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] sm:text-sm">
        Premieres in November
      </p>

      <div className="absolute inset-x-0 bottom-0 pr-20 pb-5 pl-5 sm:pr-24 sm:pb-6 sm:pl-7">
        <p className="text-xs font-semibold text-white/80 sm:text-sm">{video.kicker}</p>
        <div aria-hidden className="mt-2 h-1 w-10 bg-primary" />
        <h3 className="mt-2 font-brand text-xl font-semibold leading-tight text-balance sm:text-2xl lg:text-[1.75rem]">{video.title}</h3>
        <p className="mt-1 text-sm text-white/80">{video.byline}</p>
      </div>

      <span aria-hidden className="absolute right-5 bottom-5 flex size-11 items-center justify-center rounded-full border-2 border-white/60 sm:right-7 sm:bottom-6 sm:size-14">
        <Play className="ml-0.5 size-5 fill-white/60 text-white/60 sm:size-6" />
      </span>
    </div>
  );
}

// Serif heading, a short description, a YouTube subscribe button, then a carousel of
// coming-soon frames until the lectures exist.
export default function YouTubeSection() {
  const slides = [];
  for (const video of VIDEOS) {
    slides.push({ key: video.key, node: <ComingSoonFrame video={video} /> });
  }

  return (
    <section className={`bg-white text-black ${sectionPadding}`}>
      <Carousel
        slides={slides}
        label="Coming-soon videos"
        itemName="video"
        autoplayMs={4000}
        trackClassName="items-start"
        slideClassName="basis-[85%] md:basis-[calc((100%-1rem)/2)]"
        heading={
          <div className="min-w-0 max-w-3xl">
            <h2 className={heading2}>Courses at the forefront of computer science, free to watch.</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-iron-gray">
              At Carnegie Mellon, computing extends to design, AI, biology, and beyond, from seven departments that all lead their fields. Watch their classroom lectures on YouTube, whenever you want.
            </p>
            <a
              href={SCS_LEARN_YOUTUBE_SUBSCRIBE_URL}
              {...external}
              className="group/yt mt-6 inline-flex items-center gap-3 bg-black py-2.5 pr-5 pl-3.5 text-white transition-colors hover:bg-[#272727]"
            >
              <YouTubeColorIcon className="h-7 w-7 shrink-0" />
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">Subscribe on YouTube</span>
                <span className="text-xs text-white/70">@SCSLearn</span>
              </span>
            </a>
          </div>
        }
      />
    </section>
  );
}
