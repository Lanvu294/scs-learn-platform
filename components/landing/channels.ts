// YouTube channels the landing page points learners to. Faculty and course
// channels are grouped by subject and sorted by name within a group, never by
// subscribers, so the page doesn't rank colleagues. Channel ids, handles, and
// activity verified with yt-dlp on 2026-10-19; avatars and their sources are in
// public/landing/channels/.

export type FacultyChannel = {
  name: string;
  // Instructor and course, short enough for one or two lines on a card.
  blurb: string;
  href: string;
  avatar: string;
};

export type InstitutionalChannel = {
  name: string;
  href: string;
};

export const FACULTY_CHANNEL_GROUPS: { title: string; channels: FacultyChannel[] }[] = [
  {
    title: "AI and machine learning",
    channels: [
      {
        name: "CMU 10-708",
        blurb: "Eric Xing, probabilistic graphical models",
        href: "https://www.youtube.com/@CMU-10-708-PGM",
        avatar: "/landing/channels/cmu-10-708.jpg",
      },
      {
        name: "CMU Deep Learning",
        blurb: "Bhiksha Raj, deep learning, 11-785",
        href: "https://www.youtube.com/channel/UC8hYZGEkI2dDO8scT8C5UQA",
        avatar: "/landing/channels/cmu-deep-learning.jpg",
      },
      {
        name: "Geoff Gordon",
        blurb: "Machine learning and optimization, 10-701 and 10-725",
        href: "https://www.youtube.com/@professorgeoff",
        avatar: "/landing/channels/geoff-gordon.jpg",
      },
      {
        name: "Louis-Philippe Morency",
        blurb: "Multimodal machine learning, 11-777",
        href: "https://www.youtube.com/@LPMorency",
        avatar: "/landing/channels/lp-morency.jpg",
      },
      {
        name: "Matt Gormley",
        blurb: "Structured prediction, 10-418/618",
        href: "https://www.youtube.com/channel/UCF4lXfWfgTvslz6yNGVkQTg",
        avatar: "/landing/channels/matt-gormley.jpg",
      },
      {
        name: "Zico Kolter",
        blurb: "Graduate artificial intelligence, 15-780",
        href: "https://www.youtube.com/channel/UC0jnok-Kzmjv5a2aL92DDMA",
        avatar: "/landing/channels/zico-kolter.jpg",
      },
    ],
  },
  {
    title: "Language and speech",
    channels: [
      {
        name: "Graham Neubig",
        blurb: "Natural language processing, 11-711",
        href: "https://www.youtube.com/@neubig",
        avatar: "/landing/channels/graham-neubig.jpg",
      },
      {
        name: "ML for Signal Processing",
        blurb: "Bhiksha Raj, 11-755",
        href: "https://www.youtube.com/@MLSPCMU",
        avatar: "/landing/channels/mlsp-cmu.jpg",
      },
      {
        name: "Sean Welleck",
        blurb: "Large language models, 11-667",
        href: "https://www.youtube.com/@wellecks",
        avatar: "/landing/channels/sean-welleck.jpg",
      },
    ],
  },
  {
    title: "Systems and databases",
    channels: [
      {
        name: "CMU Database Group",
        blurb: "Andy Pavlo, databases, 15-445/645 and 15-721",
        href: "https://www.youtube.com/@CMUDatabaseGroup",
        avatar: "/landing/channels/cmu-database-group.jpg",
      },
      {
        name: "Deep Learning Systems",
        blurb: "Zico Kolter and Tianqi Chen, 10-414/714",
        href: "https://www.youtube.com/channel/UC3-KIvmiIaZimgXMNt7F99g",
        avatar: "/landing/channels/deep-learning-systems.jpg",
      },
      {
        name: "MLC",
        blurb: "Tianqi Chen, machine learning compilation",
        href: "https://www.youtube.com/channel/UCaFhWrhI7aF65b43YmHQGKQ",
        avatar: "/landing/channels/mlc-ai.jpg",
      },
    ],
  },
  {
    title: "Theory and math",
    channels: [
      {
        name: "Anil Ada",
        blurb: "Great ideas in theoretical computer science, 15-251",
        href: "https://www.youtube.com/@anil_ada",
        avatar: "/landing/channels/anil-ada.jpg",
      },
      {
        name: "Ryan O'Donnell",
        blurb: "Theoretical computer science courses",
        href: "https://www.youtube.com/@RyanODonnellTeaching",
        avatar: "/landing/channels/ryan-odonnell.jpg",
      },
      {
        name: "Vipul Goyal",
        blurb: "Cryptography",
        href: "https://www.youtube.com/channel/UCH_TKbymPv-9NdCIroUSBiA",
        avatar: "/landing/channels/vipul-goyal.jpg",
      },
    ],
  },
  {
    title: "Programming and software",
    channels: [
      {
        name: "Bogdan Vasilescu",
        blurb: "Empirical methods in software engineering, 17-803",
        href: "https://www.youtube.com/@Empirical_Methods",
        avatar: "/landing/channels/bogdan-vasilescu.jpg",
      },
      {
        name: "Christian Kästner",
        blurb: "Machine learning in production, 17-445/645",
        href: "https://www.youtube.com/channel/UCLz1sYipcjQFKkpE76D-zRA",
        avatar: "/landing/channels/christian-kastner.jpg",
      },
      {
        name: "CMU 15-150",
        blurb: "Brandon Wu, functional programming",
        href: "https://www.youtube.com/@brandonofwu",
        avatar: "/landing/channels/brandon-wu.jpg",
      },
      {
        name: "David Kosbie",
        blurb: "Intro programming in Python, 15-112",
        href: "https://www.youtube.com/channel/UCLHiy3c8HsCTLafx2Nzb1Rg",
        avatar: "/landing/channels/david-kosbie.jpg",
      },
      {
        name: "Jonathan Aldrich",
        blurb: "Programming languages",
        href: "https://www.youtube.com/@JonathanAldrich",
        avatar: "/landing/channels/jonathan-aldrich.jpg",
      },
    ],
  },
  {
    title: "Graphics and vision",
    channels: [
      {
        name: "CMU Computational Imaging",
        blurb: "Ioannis Gkioulekas, computational photography, 15-463",
        href: "https://www.youtube.com/@cmu-computational-imaging",
        avatar: "/landing/channels/cmu-computational-imaging.jpg",
      },
      {
        name: "Keenan Crane",
        blurb: "Computer graphics and geometry, 15-462",
        href: "https://www.youtube.com/@keenancrane",
        avatar: "/landing/channels/keenan-crane.jpg",
      },
    ],
  },
  {
    title: "Computational biology",
    channels: [
      {
        name: "Bioinformatics Algorithms",
        blurb: "Phillip Compeau and Pavel Pevzner, textbook lectures",
        href: "https://www.youtube.com/@bioinfalgorithms",
        avatar: "/landing/channels/bioinformatics-algorithms.jpg",
      },
      {
        name: "Philomath",
        blurb: "Phillip Compeau, programming and algorithms courses",
        href: "https://www.youtube.com/@PhilomathLearning",
        avatar: "/landing/channels/philomath.jpg",
      },
      {
        name: "Phillip Compeau",
        blurb: "Computational biology and programming",
        href: "https://www.youtube.com/@PhillipCompeauPhD",
        avatar: "/landing/channels/phillip-compeau.jpg",
      },
    ],
  },
];

export const INSTITUTIONAL_CHANNEL_GROUPS: { title: string; channels: InstitutionalChannel[] }[] = [
  {
    title: "School and university",
    channels: [
      { name: "School of Computer Science", href: "https://www.youtube.com/@SCSatCMU" },
      { name: "Carnegie Mellon University", href: "https://www.youtube.com/@cmu" },
    ],
  },
  {
    title: "Departments",
    channels: [
      { name: "Computational Biology", href: "https://www.youtube.com/channel/UCYKomEbtMXWOVd-QNQFFL2Q" },
      { name: "Human-Computer Interaction Institute", href: "https://www.youtube.com/@cmu-hcii" },
      { name: "Language Technologies Institute", href: "https://www.youtube.com/@LTIatCMU" },
      { name: "Machine Learning", href: "https://www.youtube.com/@mldcmu" },
      { name: "Robotics Institute", href: "https://www.youtube.com/@cmurobotics" },
      { name: "Software and Societal Systems", href: "https://www.youtube.com/channel/UCniTLpXvGbFmG_TYPeamnjg" },
    ],
  },
  {
    title: "Programs and institutes",
    channels: [
      { name: "CMU CS Academy", href: "https://www.youtube.com/channel/UCAYr8VoHOluLfwDFu5RvBxw" },
      { name: "CMU Online", href: "https://www.youtube.com/@CMU-Online" },
      { name: "CyLab", href: "https://www.youtube.com/@cmuCyLab" },
    ],
  },
];
