// The people behind CS Learn, shown in the landing page's team section, in
// this order (groups are just for keeping the list tidy).
//
// PLACEHOLDERS: replace each entry with a real person. `photo` is a path
// under /public (e.g. "/team/jane-doe.jpg", square, at least 400px); leave it
// out and the card shows the person's initials instead. `href` is optional
// (a personal site or LinkedIn).

export type TeamMember = {
  name: string;
  role: string;
  /** e.g. "CS '27" or "Faculty advisor". */
  affiliation?: string;
  photo?: string;
  href?: string;
};

export type TeamGroup = {
  title: string;
  members: TeamMember[];
};

export const TEAM: TeamGroup[] = [
  {
    title: "Faculty",
    members: [
      { name: "Faculty Name", role: "Faculty advisor", affiliation: "Carnegie Mellon University" },
      { name: "Faculty Name", role: "Course lead", affiliation: "Carnegie Mellon University" },
    ],
  },
  {
    title: "Student team",
    members: [
      { name: "Student Name", role: "Project lead", affiliation: "CS '27" },
      { name: "Student Name", role: "Engineering", affiliation: "CS '27" },
      { name: "Student Name", role: "Engineering", affiliation: "CS '28" },
      { name: "Student Name", role: "Design", affiliation: "HCI '27" },
      { name: "Student Name", role: "Course production", affiliation: "CS '28" },
      { name: "Student Name", role: "Video & media", affiliation: "CS '29" },
    ],
  },
];
