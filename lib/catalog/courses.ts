// The public course catalog behind /courses and /courses/[code]. It is
// marketing copy, kept here rather than in Supabase so the catalog can be
// browsed without an account and edited without a migration.
//
// DRAFT COPY: descriptions and syllabus outlines are written to be broadly
// accurate, but check each entry against the course's official description
// before launch. Instructors are only listed where we know them.

import { SCS_LEARN_FEATURED_VIDEO_ID, SCS_LEARN_YOUTUBE_URL } from "@/components/landing/links";

export type AreaId = "cs" | "ml" | "lti" | "robotics" | "hci" | "compbio";
export type Level = "Intro" | "Intermediate" | "Advanced";

export type Area = {
  id: AreaId;
  name: string;
  /** One line for the "Browse by area" tiles. */
  blurb: string;
};

// The CS department's subject areas, keyed by the course-number prefixes
// CMU uses for them.
export const AREAS: Area[] = [
  { id: "cs", name: "Computer Science", blurb: "Programming, systems, and the theory underneath." },
  { id: "ml", name: "Machine Learning", blurb: "Learning from data, from linear models to deep nets." },
  { id: "lti", name: "Language Technologies", blurb: "Teaching computers to read, write, and translate." },
  { id: "robotics", name: "Robotics", blurb: "Machines that sense, plan, and move in the world." },
  { id: "hci", name: "Human-Computer Interaction", blurb: "Designing software around the people who use it." },
  { id: "compbio", name: "Computational Biology", blurb: "Algorithms for genomes, cells, and evolution." },
];

export const LEVELS: Level[] = ["Intro", "Intermediate", "Advanced"];

export type CatalogCourse = {
  code: string;
  title: string;
  area: AreaId;
  level: Level;
  language: string;
  /** Empty when we haven't confirmed who teaches the recorded offering. */
  instructors: string[];
  image: string;
  summary: string;
  description: string;
  /** Syllabus outline, in teaching order. */
  topics: string[];
  /** What the course comes with on CS Learn. */
  materials: ("Lecture videos" | "Lecture notes" | "Slides" | "Assignments" | "Quizzes")[];
  /** Playlist or channel link; the channel until each course's playlist exists. */
  playlistUrl: string;
  featuredVideoId: string;
};

export const COURSES: CatalogCourse[] = [
  {
    code: "06-204",
    title: "Great Ideas in Computational Biology",
    area: "compbio",
    level: "Intro",
    language: "Python",
    instructors: ["Phillip Compeau"],
    image: "/landing/photos/comp-bio-poster-session.jpg",
    summary: "The algorithms that turned biology into a data science, built from scratch in Python.",
    description:
      "How do we assemble a genome from millions of short reads, find the genes that switch on together, or rebuild the tree of life? Each unit starts from a real biological question and works toward the algorithm that answers it, which you then implement yourself.",
    topics: [
      "Finding hidden messages in DNA",
      "Genome assembly",
      "Sequence alignment and dynamic programming",
      "Evolutionary trees",
      "Gene expression and clustering",
      "Hidden Markov models",
    ],
    materials: ["Lecture videos", "Lecture notes", "Slides", "Assignments", "Quizzes"],
    playlistUrl: SCS_LEARN_YOUTUBE_URL,
    featuredVideoId: SCS_LEARN_FEATURED_VIDEO_ID,
  },
  {
    code: "15-112",
    title: "Fundamentals of Programming and Computer Science",
    area: "cs",
    level: "Intro",
    language: "Python",
    instructors: [],
    image: "/landing/photos/students-coding.jpg",
    summary: "A first course in programming that ends with you building an interactive app of your own.",
    description:
      "A fast-paced introduction to programming and problem solving in Python. You learn to write, test, and debug real programs, then put it all together in a term project of your own design.",
    topics: [
      "Data and expressions",
      "Functions and conditionals",
      "Loops and strings",
      "Lists and 2D lists",
      "Sets, dictionaries, and efficiency",
      "Object-oriented programming",
      "Recursion",
      "Graphics, animation, and the term project",
    ],
    materials: ["Lecture videos", "Lecture notes", "Assignments", "Quizzes"],
    playlistUrl: SCS_LEARN_YOUTUBE_URL,
    featuredVideoId: SCS_LEARN_FEATURED_VIDEO_ID,
  },
  {
    code: "15-122",
    title: "Principles of Imperative Computation",
    area: "cs",
    level: "Intro",
    language: "C",
    instructors: [],
    image: "/landing/photos/gates-center-study.jpg",
    summary: "How to write programs you can reason about, and prove correct.",
    description:
      "Careful, correct imperative programming: contracts, invariants, and the data structures every programmer relies on. You start in C0, a safe subset of C, and finish writing real C with manual memory management.",
    topics: [
      "Contracts and loop invariants",
      "Searching and sorting",
      "Stacks and queues",
      "Linked lists",
      "Hash tables",
      "Binary search trees and heaps",
      "Graphs",
      "Transition to C and memory management",
    ],
    materials: ["Lecture videos", "Lecture notes", "Slides", "Assignments"],
    playlistUrl: SCS_LEARN_YOUTUBE_URL,
    featuredVideoId: SCS_LEARN_FEATURED_VIDEO_ID,
  },
  {
    code: "15-213",
    title: "Introduction to Computer Systems",
    area: "cs",
    level: "Intermediate",
    language: "C",
    instructors: [],
    image: "/landing/photos/hardware-lab.jpg",
    summary: "What actually happens when your program runs, from bits to processes to the network.",
    description:
      "A programmer's view of how computer systems execute programs, store information, and communicate. You'll write code that touches the machine directly, including a memory allocator and a working shell.",
    topics: [
      "Bits, bytes, and integers",
      "Floating point",
      "Machine-level programming",
      "The memory hierarchy and caches",
      "Linking",
      "Exceptions and processes",
      "Virtual memory and dynamic allocation",
      "System I/O, networking, and concurrency",
    ],
    materials: ["Lecture videos", "Slides", "Assignments"],
    playlistUrl: SCS_LEARN_YOUTUBE_URL,
    featuredVideoId: SCS_LEARN_FEATURED_VIDEO_ID,
  },
  {
    code: "10-301",
    title: "Introduction to Machine Learning",
    area: "ml",
    level: "Intermediate",
    language: "Python",
    instructors: [],
    image: "/landing/photos/ml-visualization.jpg",
    summary: "The core ideas of machine learning, derived carefully and implemented from scratch.",
    description:
      "The principles behind modern machine learning: how models are defined, trained, and evaluated, and why they work. You implement the key algorithms yourself before reaching for a library.",
    topics: [
      "Decision trees and k-nearest neighbors",
      "Linear and logistic regression",
      "Optimization and gradient descent",
      "Neural networks and backpropagation",
      "Regularization and model selection",
      "Probabilistic learning",
      "Unsupervised learning",
      "Reinforcement learning",
    ],
    materials: ["Lecture videos", "Lecture notes", "Slides", "Assignments", "Quizzes"],
    playlistUrl: SCS_LEARN_YOUTUBE_URL,
    featuredVideoId: SCS_LEARN_FEATURED_VIDEO_ID,
  },
  {
    code: "11-411",
    title: "Natural Language Processing",
    area: "lti",
    level: "Advanced",
    language: "Python",
    instructors: [],
    image: "/landing/photos/language-technologies-group.jpg",
    summary: "How computers process human language, from word counts to large language models.",
    description:
      "The linguistic and statistical foundations of natural language processing, and the systems built on them. Covers classic methods alongside the neural models behind today's language technologies.",
    topics: [
      "Words, morphology, and text processing",
      "Language models",
      "Text classification",
      "Sequence labeling and syntax",
      "Semantics and meaning",
      "Neural networks for language",
      "Machine translation",
      "Large language models",
    ],
    materials: ["Lecture videos", "Slides", "Assignments"],
    playlistUrl: SCS_LEARN_YOUTUBE_URL,
    featuredVideoId: SCS_LEARN_FEATURED_VIDEO_ID,
  },
  {
    code: "16-311",
    title: "Introduction to Robotics",
    area: "robotics",
    level: "Intermediate",
    language: "Python",
    instructors: [],
    image: "/landing/photos/robotic-arm-lab.jpg",
    summary: "The math and code behind robots that see, plan, and move.",
    description:
      "An introduction to the fundamental ideas of robotics: describing how robots move, sensing the world around them, and planning paths through it. Each idea is put to work on a simulated robot.",
    topics: [
      "Kinematics",
      "Rigid-body transformations",
      "Sensing and perception",
      "Localization",
      "Path planning",
      "Feedback control",
    ],
    materials: ["Lecture videos", "Slides", "Assignments"],
    playlistUrl: SCS_LEARN_YOUTUBE_URL,
    featuredVideoId: SCS_LEARN_FEATURED_VIDEO_ID,
  },
  {
    code: "05-391",
    title: "Designing Human-Centered Software",
    area: "hci",
    level: "Intro",
    language: "Design",
    instructors: [],
    image: "/landing/photos/vr-hci-study.jpg",
    summary: "Methods for designing software that people can actually use.",
    description:
      "How to understand users, generate and test design ideas, and evaluate interfaces. You'll practice the methods professional designers use, from contextual inquiry to usability testing.",
    topics: [
      "Understanding users",
      "Contextual inquiry",
      "Ideation and sketching",
      "Prototyping",
      "Usability heuristics",
      "Usability testing",
      "Visual design",
    ],
    materials: ["Lecture videos", "Slides", "Assignments"],
    playlistUrl: SCS_LEARN_YOUTUBE_URL,
    featuredVideoId: SCS_LEARN_FEATURED_VIDEO_ID,
  },
];

export function getCourse(code: string): CatalogCourse | undefined {
  return COURSES.find((course) => course.code === code);
}

export function getArea(id: AreaId): Area {
  return AREAS.find((area) => area.id === id)!;
}

export function isAreaId(value: string | undefined): value is AreaId {
  return AREAS.some((area) => area.id === value);
}

export function isLevel(value: string | undefined): value is Level {
  return LEVELS.includes(value as Level);
}

export function courseCountByArea(): Record<AreaId, number> {
  const counts = Object.fromEntries(AREAS.map((area) => [area.id, 0])) as Record<AreaId, number>;
  for (const course of COURSES) counts[course.area]++;
  return counts;
}
