import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/landing/PageShell";
import PageHeader from "@/components/landing/PageHeader";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import { SCS_LEARN_YOUTUBE_URL } from "@/components/landing/links";
import Container from "@/components/landing/ui/Container";
import { heading2 } from "@/components/landing/ui/typography";

export const metadata: Metadata = {
  title: "About | CS Learn",
  description: "CS Learn opens Carnegie Mellon's computer science courses to anyone, free and at their own pace.",
};

const FACTS = [
  { term: "Real courses", detail: "Lectures, notes, and coursework from courses taught at Carnegie Mellon." },
  { term: "Built by faculty", detail: "Every course comes from the instructors who teach it on campus." },
  { term: "Free", detail: "No tuition, no application, and no prerequisites to start." },
  { term: "Self-paced", detail: "Watch, read, and submit work on your own schedule." },
];

const NEXT = [
  { title: "Meet the team", text: "The students who build CS Learn.", href: "/team" },
  { title: "Browse the courses", text: "Every course in the catalog, by area and level.", href: "/courses" },
  { title: "Watch on YouTube", text: "Lectures premiere on our channel in November.", href: SCS_LEARN_YOUTUBE_URL },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        title="About CS Learn"
        intro="Carnegie Mellon's computer science courses, open to anyone, anywhere."
      />

      <section className="bg-white py-14 text-black md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className={heading2}>Our mission</h2>
            <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-gray-800">
              <p>
                Some of the best computer science teaching in the world happens in Carnegie Mellon classrooms. CS Learn
                exists so that it doesn&apos;t have to stay there.
              </p>
              <p>
                We take real CMU courses, with their full lectures, notes, and autograded coursework, and put them
                online for anyone who wants to learn, whether you&apos;re switching careers, still in school, or
                upskilling on the job.
              </p>
            </div>
          </div>

          <dl className="border-t border-steel-gray">
            {FACTS.map(({ term, detail }) => (
              <div key={term} className="grid grid-cols-1 gap-1 border-b border-steel-gray py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-semibold text-primary">{term}</dt>
                <dd className="text-[17px] text-gray-800">{detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <HowItWorksSection />

      <section className="bg-white py-14 text-black md:py-20">
        <Container>
          <ul className="grid grid-cols-1 gap-px border border-steel-gray bg-steel-gray md:grid-cols-3">
            {NEXT.map(({ title, text, href }) => (
              <li key={href} className="bg-white">
                <Link
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group block h-full p-8 hover:bg-gray-light"
                >
                  <p className="font-brand text-2xl font-semibold group-hover:text-primary">{title} &rarr;</p>
                  <p className="mt-2 text-[15px] text-iron-gray">{text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

    </PageShell>
  );
}
