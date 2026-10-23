import Image from "next/image";
import Container from "./ui/Container";

const SCOTTYLABS_URL = "https://scottylabs.org";

// Credit band above the footer. The footer stays a copy of the cs.cmu.edu
// footer, so the student builders get their own strip here.
export default function BuiltBySection() {
  return (
    <section className="border-t border-steel-gray bg-white text-black">
      <Container className="flex flex-col items-center gap-4 py-10 text-center md:flex-row md:justify-center md:gap-6 md:text-left">
        <a
          href={SCOTTYLABS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2.5 text-xl font-medium hover:text-primary"
        >
          <Image src="/landing/partners/scottylabs-mark.svg" alt="" width={37} height={33} className="h-8 w-auto" />
          ScottyLabs
        </a>
        <span aria-hidden className="hidden h-8 w-px bg-steel-gray md:block" />
        <p className="text-base leading-relaxed">CS Learn is built with love by students, with the support of ScottyLabs.</p>
      </Container>
    </section>
  );
}
