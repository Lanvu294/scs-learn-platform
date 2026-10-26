import Image from "next/image";
import { TEAM, type TeamMember } from "@/lib/landing/team";
import Container from "./ui/Container";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Member({ member }: { member: TeamMember }) {
  const body = (
    <>
      <div className="relative aspect-square overflow-hidden bg-gray-light">
        {member.photo ? (
          <Image src={member.photo} alt="" fill sizes="(min-width: 64rem) 16vw, 33vw" className="object-cover" />
        ) : (
          <span aria-hidden className="absolute inset-0 flex items-center justify-center font-brand text-4xl text-iron-gray">
            {initials(member.name)}
          </span>
        )}
      </div>
      <p className="mt-3 font-semibold leading-snug group-hover:text-primary">{member.name}</p>
      <p className="text-sm text-black">{member.role}</p>
      {member.affiliation && <p className="text-sm text-iron-gray">{member.affiliation}</p>}
    </>
  );

  return member.href ? (
    <a href={member.href} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <div>{body}</div>
  );
}

/** The /team page body: one grid per group in lib/landing/team.ts. */
export default function TeamSection() {
  return (
    <section className="bg-white py-12 text-black md:py-16">
      <Container className="flex flex-col gap-14">
        {TEAM.map((group) => (
          <div key={group.title}>
            <h2 className="border-b-2 border-primary pb-3 font-sans text-lg font-bold">{group.title}</h2>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {group.members.map((member, i) => (
                <li key={`${member.name}-${i}`}>
                  <Member member={member} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </section>
  );
}
