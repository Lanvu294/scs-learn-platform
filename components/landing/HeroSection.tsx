import Image from "next/image";
import Link from "next/link";
import CourseCarousel, { type CarouselCourse } from "./CourseCarousel";
import EmailSignupForm from "./EmailSignupForm";
import YouTubeSection from "./YouTubeSection";
import { SCS_LEARN_YOUTUBE_URL } from "./links";
import YouTubeIcon from "./ui/YouTubeIcon";

const COURSES: CarouselCourse[] = [
  {
    code: "06-204",
    title: "Great Ideas in Computational Biology",
    meta: "Phillip Compeau · Python · Intro",
    image: "/landing/photos/comp-bio-poster-session.jpg",
  },
  {
    code: "15-112",
    title: "Fundamentals of Programming and Computer Science",
    meta: "Python · Intro",
    image: "/landing/photos/students-coding.jpg",
  },
  {
    code: "10-301",
    title: "Introduction to Machine Learning",
    meta: "Python · Intermediate",
    image: "/landing/photos/ml-visualization.jpg",
  },
  {
    code: "15-122",
    title: "Principles of Imperative Computation",
    meta: "C · Intro",
    image: "/landing/photos/gates-center-study.jpg",
  },
  {
    code: "11-411",
    title: "Natural Language Processing",
    meta: "Python · Advanced",
    image: "/landing/photos/language-technologies-group.jpg",
  },
  {
    code: "15-213",
    title: "Introduction to Computer Systems",
    meta: "C · Intermediate",
    image: "/landing/photos/hardware-lab.jpg",
  },
  {
    code: "16-311",
    title: "Introduction to Robotics",
    meta: "Python · Intermediate",
    image: "/landing/photos/robotic-arm-lab.jpg",
  },
  {
    code: "05-391",
    title: "Designing Human-Centered Software",
    meta: "Design · Intro",
    image: "/landing/photos/vr-hci-study.jpg",
  },
];

export default function HeroSection() {
  return (
    <>
      {/* Split hero: copy on a black panel, the learner photo filling the right
          half. The photo's background is bright, so text never sits on it. */}
      <section className="grid bg-black text-white lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="relative order-1 aspect-[3/2] lg:order-2 lg:aspect-auto">
          <Image
            src="/landing/photos/learner-headphones-medium.jpg"
            alt="A student in headphones, focused on her laptop"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[88%_50%]"
          />
        </div>

        <div className="order-2 flex items-center px-4 py-10 sm:px-6 md:px-12 lg:order-1 lg:px-16 lg:py-14">
          <div className="max-w-xl">
            <p className="text-5xl font-bold tracking-tight lg:text-6xl">SCS Learn</p>
            <div aria-hidden className="mt-3 mb-4 h-1 w-14 bg-primary" />
            <h1 className="font-brand text-3xl font-semibold leading-[1.15] md:text-4xl xl:text-[2.6rem]">Computer science from Carnegie Mellon. Free, online, at your own pace.</h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-white/85">
              Courseware from Carnegie Mellon&apos;s world-leading School of Computer Science, where computing meets
              AI, biology, robotics, design, and more.
            </p>
            <p className="mt-6 text-sm font-semibold text-white">Coming soon. Sign up to be first in.</p>
            <EmailSignupForm buttonLabel="Sign up early" source="hero" className="mt-2" />
            <p className="mt-3 text-sm text-white/75">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-white">
                <span className="link-swipe">Sign in</span> &rarr;
              </Link>
            </p>
            <a
              href={SCS_LEARN_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <YouTubeIcon className="h-4 w-4" />
              <span className="link-swipe">In the meantime, watch our lectures on YouTube</span>
            </a>
          </div>
        </div>
      </section>

      <YouTubeSection />

      <section id="courses" className="scroll-mt-32 bg-white text-black pt-14 pb-16 md:pt-20 md:pb-20">
        <CourseCarousel
          courses={COURSES}
          heading={<h2 className="max-w-2xl font-brand text-2xl font-semibold leading-[1.2] md:text-3xl">Courseware from real CMU courses, built by the faculty who teach them</h2>}
        />
      </section>
    </>
  );
}
