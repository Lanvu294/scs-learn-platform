// Placeholder until the real channel URL is settled - every YouTube link on the
// landing page (nav, "Ready for more?", footer) reads this one constant.
export const SCS_LEARN_YOUTUBE_URL = "https://www.youtube.com/@CMULearn";
// Opens the channel with YouTube's "Subscribe?" confirmation for signed-in viewers.
export const SCS_LEARN_YOUTUBE_SUBSCRIBE_URL = `${SCS_LEARN_YOUTUBE_URL}?sub_confirmation=1`;

// The 11-character id from a youtube.com/watch?v=... link. Placeholder (Randy
// Pausch's Last Lecture) until an CS Learn video is picked.
export const SCS_LEARN_FEATURED_VIDEO_ID = "ji5_MqicxSo";

// The School of Computer Science's own sections. The landing page carries them
// in its header; course pages keep a slim product nav and list them in the footer.
export const SCS_SITE_LINKS = [
  { label: "About", href: "https://www.cs.cmu.edu/about/index" },
  { label: "Education", href: "https://www.cs.cmu.edu/education/index" },
  { label: "Research", href: "https://www.cs.cmu.edu/research/index" },
  { label: "News & Events", href: "https://www.cs.cmu.edu/news/index" },
  { label: "Industry & Entrepreneurship", href: "https://www.cs.cmu.edu/partnerships/index" },
  { label: "Giving", href: "https://www.cs.cmu.edu/giving/index" },
];

// Next steps past free courseware, shared by "Ready for more?" and the course pages.
export const CMU_ONLINE_URL = "https://www.cmu.edu/online/";
export const SCS_EXEC_ED_URL = "https://exec.cs.cmu.edu/";
export const SCS_ADMISSIONS_URL = "https://www.cs.cmu.edu/education";
