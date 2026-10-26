import CourseCarousel, { type CarouselCourse } from "./CourseCarousel";
import { heading2 } from "./ui/typography";

// Parked 10/14: the page starts with video (YouTubeSection) and builds on top of
// it later. Re-enable in app/page.tsx; give the section an id if it needs one
// (#lectures now points at the YouTube section).
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

export default function CoursewareSection() {
  return (
    <section className="bg-white text-black pt-14 pb-16 md:pt-20 md:pb-20">
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
  );
}
