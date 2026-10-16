"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const COLUMNS: {
  title: string;
  href?: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Connect",
    href: "https://www.cs.cmu.edu/directory/index",
    links: [
      { label: "Contact Us", href: "https://www.cs.cmu.edu/about/contact" },
      { label: "Give to SCS", href: "https://www.cs.cmu.edu/giving/index" },
      { label: "Partner With SCS", href: "https://www.cs.cmu.edu/partnerships/index" },
      { label: "Alumni Engagement", href: "https://www.cs.cmu.edu/alumni/index" },
      { label: "For The Media", href: "https://www.cs.cmu.edu/news/scs-media-kit-press-contacts" },
    ],
  },
  {
    title: "Prospective Student Resources",
    links: [
      { label: "Education at SCS", href: "https://www.cs.cmu.edu/education/index" },
      { label: "Undergraduate Admissions", href: "https://www.cs.cmu.edu/education/undergraduate/admissions" },
      { label: "Graduate Admissions", href: "https://www.cs.cmu.edu/education/graduate-admissions" },
      { label: "Directions, Maps & Parking", href: "https://www.cs.cmu.edu/about/directions-maps-parking" },
      { label: "Tour Policy", href: "https://www.cs.cmu.edu/about/scs-tour-policy" },
      { label: "Visit CMU", href: "https://www.cmu.edu/visit/", external: true },
    ],
  },
  {
    title: "Current Student Resources",
    links: [
      { label: "Schedule of Classes", href: "https://enr-apps.as.cmu.edu/open/SOC/SOCServlet/search", external: true },
      {
        label: "Undergraduate Course Catalog",
        href: "http://coursecatalog.web.cmu.edu/schools-colleges/schoolofcomputerscience/",
        external: true,
      },
      { label: "Student Affairs", href: "https://www.cmu.edu/student-affairs/", external: true },
      { label: "For International Students", href: "https://www.cmu.edu/oie/", external: true },
    ],
  },
  {
    title: "Administrative Resources",
    links: [
      { label: "Directory", href: "https://www.cs.cmu.edu/directory/index" },
      { label: "Building Facilities", href: "https://building.cs.cmu.edu/", external: true },
      { label: "Computing Facilities", href: "https://computing.cs.cmu.edu/", external: true },
      { label: "Business Office", href: "https://scsdean.cs.cmu.edu/", external: true },
      { label: "Lost and Found", href: "https://www.cs.cmu.edu/~lostfound/", external: true },
    ],
  },
];

const SOCIAL = [
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/scsatcmu.bsky.social",
    path: "M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/SCSatCMU",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/scsatcmu/",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/school/cmuscs/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@scsatcmu",
    path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z",
  },
  {
    label: "X",
    href: "https://x.com/SCSatCMU",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@CMUComputerScience",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    label: "RSS feed",
    href: "https://www.cs.cmu.edu/news/feed.rss",
    path: "M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z",
  },
];

const BOTTOM_LINKS = [
  { label: "Legal Info", href: "https://www.cmu.edu/legal/" },
  { label: "Contact Us", href: "https://www.cs.cmu.edu/about/contact" },
  { label: "CMU Miami", href: "https://miami.cmu.edu", external: true },
  { label: "Qatar Campus", href: "https://www.qatar.cmu.edu", external: true },
  { label: "Silicon Valley Campus", href: "https://www.cmu.edu/silicon-valley/", external: true },
];

function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

// Matches cs.cmu.edu: stacked wordmark, social row, four link columns under red
// rules, and the white legal bar.
export default function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="bg-gray-light">
        <div className="flex w-full flex-col gap-10 px-4 pt-14 pb-16 sm:px-6 md:px-12 lg:flex-row lg:gap-16 lg:pt-16 lg:pb-8">
          <div className="flex w-full max-w-xs flex-col items-start gap-6 lg:max-w-[12.5rem]">
            <a href="https://www.cmu.edu" {...external} className="-mt-14 mb-14 block w-[180px] lg:-mt-16 lg:mb-16 lg:w-[200px]">
              <Image
                src="/scs-2026-vertical-red.svg"
                alt="Carnegie Mellon University Kenneth C. Griffin School of Computer Science"
                width={229}
                height={409}
                className="h-auto w-full"
              />
            </a>
            <address className="text-sm leading-snug not-italic">
              5000 Forbes Avenue
              <br />
              Pittsburgh, PA 15213
            </address>
            <ul className="grid w-[180px] grid-cols-4 place-items-center gap-x-4 gap-y-4 lg:w-[200px] lg:gap-6">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    {...external}
                    className="block text-black transition-transform hover:scale-110"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6" fill="currentColor">
                      <path d={item.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://www.cmu.edu/"
              {...external}
              className="mb-2 inline-block border border-black px-5 py-3 text-sm font-semibold btn-fill-black hover:text-white"
            >
              CMU.EDU
            </a>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title} className="flex flex-col">
                <p className="border-b-[3px] border-primary pt-5 pb-3.5 text-base font-bold">
                  {column.href ? (
                    <a href={column.href} {...external} className="hover:text-primary">
                      {column.title}
                    </a>
                  ) : (
                    column.title
                  )}
                </p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.external ? external : {})}
                        className="block border-b border-[#6d6e71]/40 py-3.5 text-sm hover:border-black"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {column.title === "Administrative Resources" ? (
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="group relative mt-4 inline-flex min-h-[45px] w-full items-center self-end overflow-hidden border border-primary py-3 pr-5 pl-[calc(43px+1.25rem)] text-sm font-semibold lg:w-fit"
                  >
                    <span className="absolute inset-y-0 left-0 w-[43px] bg-primary transition-[width] duration-300 group-hover:w-full motion-reduce:transition-none" />
                    <span className="absolute inset-y-0 left-0 flex w-[43px] items-center justify-center text-white">
                      <ArrowUp size={18} strokeWidth={2} aria-hidden />
                    </span>
                    <span className="relative group-hover:text-white">Back to top</span>
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center gap-x-8 gap-y-2 px-4 py-6 text-sm font-semibold sm:px-6 md:px-12">
        <p>© Carnegie Mellon University {new Date().getFullYear()}</p>
        {BOTTOM_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? external : {})}
            className="underline decoration-1 underline-offset-4 hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
