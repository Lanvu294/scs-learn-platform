import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import Carousel from "./ui/Carousel";
import { heading2, sectionPadding } from "./ui/typography";
import { SCS_LEARN_YOUTUBE_SUBSCRIBE_URL, SCS_LEARN_YOUTUBE_URL } from "./links";
import { YouTubeColorIcon } from "./ui/YouTubeIcon";

type CoursewarePlaylist = {
  code: string;
  title: string;
  byline: string;
  image: string;
  // The course's YouTube playlist. Until it exists, the card opens the channel.
  playlistUrl: string | null;
};

// Courseware from faculty who said yes after seeing their demo (source of truth:
// the "SCS Learn participating instructors" sheet). Each card opens the course's
// playlist in a new tab.
const PLAYLISTS: CoursewarePlaylist[] = [
  {
    code: "17-437",
    title: "Web Application Development",
    byline: "Terry Lee",
    image: "/landing/photos/gates-center-study.jpg",
    playlistUrl: null,
  },
  {
    code: "10-701",
    title: "Introduction to Machine Learning",
    byline: "Geoff Gordon and Pradeep Ravikumar",
    image: "/landing/photos/ml-visualization.jpg",
    playlistUrl: null,
  },
  {
    code: "17-214",
    title: "Principles of Software Construction",
    byline: "Hammad Ahmad",
    image: "/landing/photos/students-coding.jpg",
    playlistUrl: null,
  },
  {
    code: "10-725",
    title: "Optimization for Machine Learning",
    byline: "Barnabás Póczos",
    image: "/landing/photos/hardware-lab.jpg",
    playlistUrl: null,
  },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// Placeholder for the Welcome to SCS Learn video: a 16:9 frame on CMU's black
// tartan wave that says it's coming. Swap the whole frame for the YouTube embed when it's live.
function WelcomeVideoComingSoon() {
  return (
    <div className="relative isolate flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden bg-black px-6 text-center text-white sm:gap-6">
      <Image src="/landing/textures/cmu-tartan-wave-black.jpg" alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" quality={75} className="-z-20 object-cover" />
      {/* Darken the middle so the title reads; the pattern shows toward the edges. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.35)_75%)]" />
      <span aria-hidden className="flex size-14 items-center justify-center rounded-full border-2 border-white/40 sm:size-20">
        <Play className="ml-1 size-6 fill-white/40 text-white/40 sm:size-8" />
      </span>
      <p className="font-brand text-2xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Welcome to SCS Learn</p>
      <div aria-hidden className="h-1 w-14 bg-primary" />
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70 sm:text-sm">Video coming soon</p>
    </div>
  );
}

// A 16:9 card that opens the course's playlist in a new tab: campus photo under a
// dark wash, a red "Premieres in November" tag, the course, and its faculty.
function PlaylistCard({ playlist }: { playlist: CoursewarePlaylist }) {
  return (
    <a
      href={playlist.playlistUrl ?? SCS_LEARN_YOUTUBE_URL}
      {...external}
      aria-label={`${playlist.code} ${playlist.title}, ${playlist.byline}: open the playlist on YouTube (new tab)`}
      className="group/card relative block aspect-video w-full overflow-hidden bg-black text-white"
    >
      <Image
        src={playlist.image}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 85vw"
        quality={90}
        className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.25)_100%)]" />

      <p className="absolute top-0 left-0 bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] sm:text-sm">
        Premieres in November
      </p>

      <div className="absolute inset-x-0 bottom-0 pr-20 pb-5 pl-5 sm:pr-24 sm:pb-6 sm:pl-7">
        <p className="text-xs font-semibold text-white/80 sm:text-sm">{playlist.code}</p>
        <div aria-hidden className="mt-2 h-1 w-10 bg-primary" />
        <h3 className="mt-2 font-brand text-xl font-semibold leading-tight text-balance sm:text-2xl lg:text-[1.75rem]">{playlist.title}</h3>
        <p className="mt-1 text-sm text-white/80">{playlist.byline}</p>
      </div>

      <span
        aria-hidden
        className="absolute right-5 bottom-5 flex size-11 items-center justify-center rounded-full border-2 border-white/60 transition-colors group-hover/card:border-white group-hover/card:bg-white group-hover/card:text-black sm:right-7 sm:bottom-6 sm:size-14"
      >
        <ArrowUpRight className="size-5 sm:size-6" />
      </span>
    </a>
  );
}

// Matches the carousel's column so the header, welcome video, and cards line up.
const COLUMN = "mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16";

// Headline (wider, left) and description + subscribe button (right, bottom-aligned
// with the headline); the welcome video placeholder full width under them; then
// the lecture playlists in a carousel with its own arrows.
export default function YouTubeSection() {
  const slides = [];
  for (const playlist of PLAYLISTS) {
    slides.push({ key: playlist.code, node: <PlaylistCard playlist={playlist} /> });
  }

  return (
    <section id="courses" className={`scroll-mt-32 bg-white text-black ${sectionPadding}`}>
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
          <WelcomeVideoComingSoon />
        </div>
      </div>

      <div className="mt-14">
        <Carousel
          slides={slides}
          label="Lecture playlists"
          itemName="playlist"
          autoplayMs={4000}
          trackClassName="items-start"
          slideClassName="basis-[85%] md:basis-[calc((100%-1rem)/2)]"
          heading={<h3 className="font-sans text-xl font-bold">Lecture playlists</h3>}
        />
      </div>
    </section>
  );
}
