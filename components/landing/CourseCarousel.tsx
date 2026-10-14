import type { ReactNode } from "react";
import Image from "next/image";
import Carousel from "./ui/Carousel";

export type CarouselCourse = {
  code: string;
  title: string;
  meta: string;
  image: string;
};

function CourseCard({ course }: { course: CarouselCourse }) {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-black">
        <Image
          src={course.image}
          alt=""
          fill
          // Not the card's width: the card is tall and the photos are
          // landscape, so object-cover scales each one to the card's
          // HEIGHT (26-28rem) and crops the sides - the rendered image
          // is ~800px wide. Sizing to the card width made the browser
          // fetch a copy half that size and stretch it.
          sizes="800px"
          quality={90}
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 max-w-[85%] bg-white bg-[linear-gradient(var(--color-primary),var(--color-primary))] bg-[length:100%_6px] bg-bottom bg-no-repeat px-5 pt-3 pb-4 text-black transition-[background-size,color] duration-300 ease-out group-hover:bg-[length:100%_100%] group-hover:text-white motion-reduce:transition-none">
        <p className="text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-white/85 motion-reduce:transition-none">
          {course.code}
        </p>
        <h3 className="font-sans text-lg font-bold leading-snug text-balance lg:text-xl">{course.title}</h3>
      </div>
    </>
  );
}

export default function CourseCarousel({ courses, heading }: { courses: CarouselCourse[]; heading: ReactNode }) {
  const slides = [];
  for (const course of courses) {
    slides.push({ key: course.code, node: <CourseCard course={course} /> });
  }
  return (
    <Carousel
      slides={slides}
      heading={heading}
      label="Courseware catalog"
      itemName="courseware"
      trackClassName="h-[26rem] sm:h-[28rem]"
      slideClassName="h-full basis-[85%] sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
    />
  );
}
