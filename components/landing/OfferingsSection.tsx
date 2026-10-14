import Image from "next/image";
import Container from "./ui/Container";
import { heading2, sectionPadding } from "./ui/typography";

type Offering = {
  title: string;
  description: string;
  cta: string;
  href: string;
  image?: string;
  color?: string;
  wide?: boolean;
};

const OFFERINGS: Offering[] = [
  {
    title: "Explore SCS research",
    description: "The faculty who teach these courses lead labs in AI, robotics, systems, and more.",
    cta: "See the research",
    href: "https://www.cs.cmu.edu/research/index",
    image: "/landing/photos/robotic-arm-lab.jpg",
    wide: true,
  },
  {
    title: "Earn a CMU credential",
    description: "Go deeper with graded coursework and an official certificate through CMU Online.",
    cta: "Explore CMU Online",
    href: "https://www.cmu.edu/online/",
    color: "bg-primary",
  },
  {
    title: "Train your organization",
    description: "Bring Carnegie Mellon computer science to your team with SCS Executive Education.",
    cta: "Learn more",
    href: "https://exec.cs.cmu.edu/",
    color: "bg-black",
  },
  {
    title: "Study on campus",
    description: "Join the Kenneth C. Griffin School of Computer Science in Pittsburgh as a full-time student at Carnegie Mellon University.",
    cta: "Explore admissions",
    href: "https://www.cs.cmu.edu/education",
    image: "/landing/photos/campus-walk.jpg",
    wide: true,
  },
];

export default function OfferingsSection() {
  return (
    <section className={`bg-white text-black ${sectionPadding}`}>
      <Container>
        <p className="text-sm font-bold uppercase text-primary">Next steps</p>
        <h2 className={`${heading2} mt-3 mb-10`}>Ready for more?</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {OFFERINGS.map(({ title, description, cta, href, image, color, wide }) => {
            const className = `group relative isolate flex min-h-[18rem] flex-col justify-end overflow-hidden p-8 text-white md:min-h-[20rem] md:p-10 ${
              wide ? "md:col-span-2" : ""
            } ${image ? "bg-black" : color}`;
            const content = (
              <>
                {image && (
                  <>
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 48rem) 66vw, 100vw"
                      quality={90}
                      className="-z-20 object-cover"
                    />
                    <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
                  </>
                )}
                <h3 className="max-w-md text-balance font-brand text-[1.875rem] font-semibold leading-[1.15] xl:text-[2.25rem]">
                  {title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-white/85">
                  {description}
                  {href && (
                    <>
                      {" "}
                      <span className="whitespace-nowrap font-semibold text-white underline underline-offset-4">{cta}.</span>
                    </>
                  )}
                </p>
              </>
            );
            return (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
