import Image from "next/image";
import CourseCarousel, { type CarouselCourse } from "./CourseCarousel";
import EmailSignupForm from "./EmailSignupForm";
import YouTubeSection from "./YouTubeSection";
import { SCS_LEARN_YOUTUBE_SUBSCRIBE_URL } from "./links";
import YouTubeIcon from "./ui/YouTubeIcon";
import { heading2 } from "./ui/typography";

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
      <section className="relative min-h-[480px] overflow-hidden text-white lg:min-h-[532px]">
        {/* Cover the hero and keep her face, which sits in the upper right of
            the photo, as the focus. */}
        <Image
          src="/landing/photos/learner-headphones-medium.jpg"
          alt="A student in headphones, focused on her laptop"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[78%_30%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.22)_100%)]"
        />
        <div className="relative mx-auto flex min-h-[480px] w-full max-w-[1440px] flex-col justify-end px-6 pt-28 pb-12 sm:px-12 lg:min-h-[532px] lg:px-24 lg:pt-36">
          <p className="text-5xl font-bold tracking-tight text-white lg:text-6xl">SCS Learn</p>
          <div aria-hidden className="mt-2.5 h-1 w-14 bg-primary" />
          <h1 className="mt-5 max-w-[800px] font-brand text-[2rem] font-semibold leading-[1.1] text-white sm:text-[2.5rem] lg:text-[3rem]">
            Computer science from Carnegie Mellon. Free, online, at your pace.
          </h1>
          <div id="waitlist" className="mt-12 scroll-mt-32">
            <EmailSignupForm buttonLabel="Join the waitlist" source="hero" />
          </div>
          <a
            href={SCS_LEARN_YOUTUBE_SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 text-lg font-semibold text-white hover:text-white/80"
          >
            <YouTubeIcon className="h-6 w-6" />
            <span className="link-swipe">In the meantime, watch our lectures on YouTube.</span>
          </a>
        </div>
      </section>

      <YouTubeSection />

      <section id="courses" className="scroll-mt-32 bg-white text-black pt-14 pb-16 md:pt-20 md:pb-20">
        <CourseCarousel
          courses={COURSES}
          heading={
            <div className="min-w-0 max-w-3xl">
              <p className="text-sm font-bold uppercase text-primary">Courseware</p>
              <h2 className={`${heading2} mt-3`}>Courseware from Carnegie Mellon, built by the faculty who teach it.</h2>
            </div>
          }
        />
      </section>
    </>
  );
}
