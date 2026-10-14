import Image from "next/image";
import { Play } from "lucide-react";
import Carousel from "./ui/Carousel";
import { heading2, sectionPadding } from "./ui/typography";
import { SCS_LEARN_YOUTUBE_SUBSCRIBE_URL } from "./links";
import { YouTubeColorIcon } from "./ui/YouTubeIcon";

type ComingSoonVideo = {
  key: string;
  tag: string;
  kicker: string;
  title: string;
  byline: string;
  image: string;
};

// The welcome trailer sits above the carousel; the carousel is courseware from
// faculty who said yes after seeing their demo (source of truth: the "SCS Learn
// participating instructors" sheet). When a video premieres, swap its frame for
// the YouTube embed.
const TRAILER: ComingSoonVideo = {
  key: "welcome",
  tag: "Coming soon",
  kicker: "Trailer",
  title: "Welcome to SCS Learn",
  byline: "Phillip Compeau",
  image: "/landing/photos/lecture-hall.jpg",
};

const COURSEWARE: ComingSoonVideo[] = [
  {
    key: "17-437",
    tag: "Premieres in November",
    kicker: "17-437 · Courseware trailer",
    title: "Web Application Development",
    byline: "Terry Lee",
    image: "/landing/photos/gates-center-study.jpg",
  },
  {
    key: "10-701",
    tag: "Premieres in November",
    kicker: "10-701 · Courseware trailer",
    title: "Introduction to Machine Learning",
    byline: "Geoff Gordon and Pradeep Ravikumar",
    image: "/landing/photos/ml-visualization.jpg",
  },
  {
    key: "17-214",
    tag: "Premieres in November",
    kicker: "17-214 · Courseware trailer",
    title: "Principles of Software Construction",
    byline: "Hammad Ahmad",
    image: "/landing/photos/students-coding.jpg",
  },
  {
    key: "10-725",
    tag: "Premieres in November",
    kicker: "10-725 · Courseware trailer",
    title: "Optimization for Machine Learning",
    byline: "Barnabás Póczos",
    image: "/landing/photos/hardware-lab.jpg",
  },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// A 16:9 poster: campus photo under a dark wash, a red tag ("Coming soon",
// "Premieres in November"), the title, and a muted play mark in the corner.
function ComingSoonFrame({ video, large = false }: { video: ComingSoonVideo; large?: boolean }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black text-white">
      <Image src={video.image} alt="" fill sizes={large ? "(min-width: 1280px) 1200px, 100vw" : "(min-width: 768px) 50vw, 85vw"} quality={90} className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.25)_100%)]" />

      <p className="absolute top-0 left-0 bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] sm:text-sm">
        {video.tag}
      </p>

      <div className="absolute inset-x-0 bottom-0 pr-20 pb-5 pl-5 sm:pr-24 sm:pb-6 sm:pl-7">
        <p className="text-xs font-semibold text-white/80 sm:text-sm">{video.kicker}</p>
        <div aria-hidden className="mt-2 h-1 w-10 bg-primary" />
        <h3
          className={`mt-2 font-brand font-semibold leading-tight text-balance ${
            large ? "text-2xl sm:text-4xl lg:text-5xl" : "text-xl sm:text-2xl lg:text-[1.75rem]"
          }`}
        >
          {video.title}
        </h3>
        <p className="mt-1 text-sm text-white/80">{video.byline}</p>
      </div>

      <span aria-hidden className="absolute right-5 bottom-5 flex size-11 items-center justify-center rounded-full border-2 border-white/60 sm:right-7 sm:bottom-6 sm:size-14">
        <Play className="ml-0.5 size-5 fill-white/60 text-white/60 sm:size-6" />
      </span>
    </div>
  );
}

// Matches the carousel's column so the header, trailer, and cards line up.
const COLUMN = "mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16";

// Headline (wider, left) and description + subscribe button (right, bottom-aligned
// with the headline); the welcome trailer full width under them; then the
// courseware trailers in a carousel with its own arrows.
export default function YouTubeSection() {
  const slides = [];
  for (const video of COURSEWARE) {
    slides.push({ key: video.key, node: <ComingSoonFrame video={video} /> });
  }

  return (
    <section className={`bg-white text-black ${sectionPadding}`}>
      <div className={COLUMN}>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 className={`${heading2} lg:col-span-7`}>Courses at the forefront of computer science, free to watch.</h2>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-iron-gray">
              At Carnegie Mellon, computing extends to design, AI, biology, and beyond, with seven departments that all lead their fields. Watch their classroom lectures on YouTube, whenever you want.
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
        </div>

        <div className="mt-12">
          <ComingSoonFrame video={TRAILER} large />
        </div>
      </div>

      <div className="mt-14">
        <Carousel
          slides={slides}
          label="Courseware trailers"
          itemName="trailer"
          autoplayMs={4000}
          trackClassName="items-start"
          slideClassName="basis-[85%] md:basis-[calc((100%-1rem)/2)]"
          heading={<h3 className="font-sans text-xl font-bold">Courseware trailers</h3>}
        />
      </div>
    </section>
  );
}
