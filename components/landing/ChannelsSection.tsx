import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "./ui/Container";
import { heading2, sectionPadding } from "./ui/typography";
import { FACULTY_CHANNEL_GROUPS, INSTITUTIONAL_CHANNEL_GROUPS } from "./channels";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// Keeps course numbers like 11-785 from breaking across lines at the hyphen.
function noBreakCourseNumbers(text: string): string {
  return text.replace(/(\d)-(\d)/g, "$1\u2011$2");
}

// Faculty and course channels grouped by subject, then the school's own
// channels as a lighter list of links. The data lives in channels.ts.
export default function ChannelsSection() {
  return (
    <section id="channels" className={`bg-gray-light text-black ${sectionPadding}`}>
      <Container>
        <h2 className={`${heading2} mb-12 max-w-3xl text-balance`}>Check out other channels from our amazing faculty!</h2>

        <div className="flex flex-col gap-12">
          {FACULTY_CHANNEL_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 border-b-2 border-primary pb-2 text-lg font-bold">{group.title}</h3>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.channels.map((channel) => (
                  <li key={channel.href}>
                    <a
                      href={channel.href}
                      {...external}
                      aria-label={`${channel.name}: ${channel.blurb} (YouTube, opens in a new tab)`}
                      className="group flex h-full items-center gap-4 border border-steel-gray bg-white p-4 transition-colors duration-200 hover:border-primary focus-visible:border-primary"
                    >
                      <Image
                        src={channel.avatar}
                        alt=""
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-full object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold leading-snug group-hover:text-primary">{channel.name}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-black/70">{noBreakCourseNumbers(channel.blurb)}</span>
                      </span>
                      <ArrowUpRight aria-hidden size={20} className="shrink-0 text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mt-16 mb-6 font-brand text-2xl font-semibold md:text-3xl">Across Carnegie Mellon</h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {INSTITUTIONAL_CHANNEL_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 border-b-2 border-primary pb-2 font-bold">{group.title}</h4>
              <ul className="flex flex-col gap-2">
                {group.channels.map((channel) => (
                  <li key={channel.href}>
                    <a
                      href={channel.href}
                      {...external}
                      aria-label={`${channel.name} (YouTube, opens in a new tab)`}
                      className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-primary hover:underline"
                    >
                      {channel.name}
                      <ArrowUpRight aria-hidden size={16} className="shrink-0 text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
