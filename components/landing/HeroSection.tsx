import Image from "next/image";
import CourseCarousel, { type CarouselCourse } from "./CourseCarousel";
import EmailSignupForm from "./EmailSignupForm";
import YouTubeSection from "./YouTubeSection";
import { heading1 } from "./ui/typography";

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
      {/* cmu.edu's hero: full-bleed photo under a dark scrim, white serif headline, red-arrow CTA. */}
      <section className="relative isolate flex min-h-[32rem] items-center bg-black text-white lg:min-h-[38rem]">
        <Image
          src="/hero-background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          // The file is already a compressed 2000px WebP, the largest copy we
          // have. Re-encoding it through the optimizer (q75) compounded the
          // loss, so it's served exactly as-is.
          unoptimized
          className="-z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

        <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 md:px-12 lg:px-16 lg:pt-36 lg:pb-20">
          <p className="mb-4 text-base font-bold uppercase tracking-[0.12em] text-white">
            SCS Learn
          </p>
          <h1 className={`${heading1} max-w-3xl`}>
            Take real Carnegie Mellon courses.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/85">
            Real courses from the Kenneth C. Griffin School of Computer Science, taught by the professors who built them,
            with an AI tutor trained on the material.
          </p>
          <div className="mt-8">
            <EmailSignupForm buttonLabel="Claim my spot" source="hero" />
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
