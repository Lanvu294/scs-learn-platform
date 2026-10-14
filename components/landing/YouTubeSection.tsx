import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Carousel from "./ui/Carousel";
import { sectionPadding } from "./ui/typography";
import { SCS_LEARN_YOUTUBE_SUBSCRIBE_URL, SCS_LEARN_YOUTUBE_URL } from "./links";
import { YouTubeColorIcon } from "./ui/YouTubeIcon";

type Instructor = {
  name: string;
  // Background-removed portrait (public/landing/faculty), from the department directory.
  photo: string;
};

type CoursewarePlaylist = {
  code: string;
  title: string;
  instructors: Instructor[];
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
    instructors: [{ name: "Terry Lee", photo: "/landing/faculty/lee.png" }],
    playlistUrl: null,
  },
  {
    code: "10-701",
    title: "Introduction to Machine Learning",
    instructors: [
      { name: "Geoff Gordon", photo: "/landing/faculty/gordon.png" },
      { name: "Pradeep Ravikumar", photo: "/landing/faculty/ravikumar.png" },
    ],
    playlistUrl: null,
  },
  {
    code: "17-214",
    title: "Principles of Software Construction",
    instructors: [{ name: "Hammad Ahmad", photo: "/landing/faculty/ahmad.png" }],
    playlistUrl: null,
  },
  {
    code: "10-725",
    title: "Optimization for Machine Learning",
    instructors: [{ name: "Barnabás Póczos", photo: "/landing/faculty/poczos.png" }],
    playlistUrl: null,
  },
];

function byline(instructors: Instructor[]): string {
  const names: string[] = [];
  for (const instructor of instructors) {
    names.push(instructor.name);
  }
  if (names.length < 3) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// Placeholder for the Welcome to SCS Learn video: a 16:9 frame on CMU's black
// tartan wave that says it's coming. No play icon until there's a video to play. Swap the whole frame for the YouTube embed when it's live.
function WelcomeVideoComingSoon() {
  return (
    <div className="relative isolate flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden bg-black px-6 text-center text-white sm:gap-6">
      <Image src="/landing/textures/cmu-tartan-wave-black.jpg" alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" quality={75} className="-z-20 object-cover" />
      {/* Darken the middle so the title reads; the pattern shows toward the edges. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.35)_75%)]" />
      <p className="font-brand text-2xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Welcome to SCS Learn</p>
      <div aria-hidden className="h-1 w-14 bg-primary" />
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70 sm:text-sm">Video coming soon</p>
    </div>
  );
}

// A 16:9 card that opens the course's playlist in a new tab: campus photo under a
// dark wash, a red "Premieres in November" tag, the course, and its faculty.
// A series poster: black-and-white portraits of the faculty on CMU's black tartan,
// course title on the left. Portraits warm into color on hover. Two instructors
// stand side by side, the second slightly behind the first.
function PlaylistCard({ playlist }: { playlist: CoursewarePlaylist }) {
  const names = byline(playlist.instructors);
  const portraits = [];
  for (let i = 0; i < playlist.instructors.length; i++) {
    const instructor = playlist.instructors[i];
    portraits.push(
      <div
        key={instructor.name}
        className={`relative aspect-square h-full shrink-0 ${i > 0 ? "-ml-[27%]" : ""}`}
        style={{ zIndex: playlist.instructors.length - i }}
      >
        <Image
          src={instructor.photo}
          alt=""
          fill
          sizes="(min-width: 768px) 26vw, 45vw"
          className="object-contain object-bottom grayscale transition-[filter] duration-500 group-hover/card:grayscale-0 motion-reduce:transition-none"
        />
      </div>,
    );
  }

  return (
    <a
      href={playlist.playlistUrl ?? SCS_LEARN_YOUTUBE_URL}
      {...external}
      // Say where the link really goes: the playlist once it exists, the channel until then.
      aria-label={`${playlist.code} ${playlist.title}, ${names}: ${
        playlist.playlistUrl ? "open the playlist on YouTube" : "open the SCS Learn channel on YouTube"
      } (new tab)`}
      className="group/card relative isolate block aspect-video w-full overflow-hidden bg-black text-white outline-none"
    >
      <Image src="/landing/textures/cmu-tartan-wave-black.jpg" alt="" fill sizes="(min-width: 768px) 50vw, 85vw" quality={75} className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.4)_55%,rgba(0,0,0,0.1)_100%)]" />

      {/* Portraits share one head size (normalized in the PNGs) and stand on the
          bottom edge, right side. With two people, the pair fades out under the text. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 flex h-[92%] items-end justify-end [mask-image:linear-gradient(to_right,transparent_18%,black_46%)]"
      >
        {portraits}
      </div>

      <p className="absolute top-0 left-0 bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] sm:text-sm">
        Premieres in November
      </p>

      <div className="absolute bottom-0 left-0 w-[54%] pb-5 pl-5 sm:pb-6 sm:pl-7">
        <p className="text-xs font-semibold text-white/80 sm:text-sm">{playlist.code}</p>
        <div aria-hidden className="mt-2 h-1 w-10 bg-primary" />
        <h3 className="mt-2 font-brand text-xl font-semibold leading-tight text-balance sm:text-2xl lg:text-[1.75rem]">{playlist.title}</h3>
        <p className="mt-1 text-sm text-white/80">{names}</p>
      </div>

      <span
        aria-hidden
        className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full border-2 border-white/60 bg-black/30 transition-colors group-hover/card:border-white group-hover/card:bg-white group-hover/card:text-black sm:top-4 sm:right-4 sm:size-12"
      >
        <ArrowUpRight className="size-5" />
      </span>

      {/* Keyboard focus ring, drawn on top (an outline would be clipped by the carousel). */}
      <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 ring-4 ring-primary ring-inset group-focus-visible/card:opacity-100" />
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
        {/* ~55/45, both columns starting on the same line. */}
        <div className="grid gap-5 lg:grid-cols-11 lg:items-start lg:gap-10">
          <h2 className="font-brand text-3xl font-semibold leading-[1.15] text-balance md:text-4xl lg:col-span-6 lg:text-[2.5rem]">
            Carnegie Mellon&apos;s CS classroom, doors open to all.
          </h2>
          <div className="lg:col-span-5 lg:pt-1.5">
            <p className="text-base leading-relaxed text-iron-gray">
              Watch our faculty teach across AI, robotics, systems, biology, and more, from seven departments that lead their fields.
            </p>
            <a
              href={SCS_LEARN_YOUTUBE_SUBSCRIBE_URL}
              {...external}
              className="mt-5 inline-flex items-center gap-2.5 bg-black py-2.5 pr-5 pl-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#272727]"
            >
              <YouTubeColorIcon className="h-6 w-6 shrink-0" />
              Subscribe on YouTube
            </a>
          </div>
        </div>

        <div className="mt-10 lg:mt-12">
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
