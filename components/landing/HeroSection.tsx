import Image from "next/image";
import EmailSignupForm from "./EmailSignupForm";
import YouTubeSection from "./YouTubeSection";
import { SCS_LEARN_YOUTUBE_SUBSCRIBE_URL } from "./links";
import YouTubeIcon from "./ui/YouTubeIcon";

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-[480px] overflow-hidden text-white lg:min-h-[532px]">
        {/* Cover the hero and keep her face, which sits in the upper right of
            the photo, as the focus. */}
        <Image
          src="/landing/photos/learner-headphones-medium.jpg"
          alt="A student in headphones, focused on her laptop"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[78%_30%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.22)_100%)]"
        />
        <div className="relative mx-auto flex min-h-[480px] w-full max-w-[1440px] flex-col justify-end px-6 pt-28 pb-12 sm:px-12 lg:min-h-[532px] lg:px-24 lg:pt-36">
          <p className="text-5xl font-bold tracking-tight text-white lg:text-6xl">SCS Learn</p>
          <div aria-hidden className="mt-2.5 h-1 w-14 bg-primary" />
          <h1 className="mt-5 max-w-[800px] font-brand text-[2rem] font-semibold leading-[1.1] text-white sm:text-[2.5rem] lg:text-[3rem]">
            Computer science from Carnegie Mellon. Free, online, at your pace.
          </h1>
          <p className="mt-5 max-w-[640px] text-lg leading-relaxed text-white/90">
            Free lectures now, courseware coming soon. Sign up to hear first.
          </p>
          <div id="updates" className="mt-10 scroll-mt-32">
            <EmailSignupForm buttonLabel="Keep me posted" source="hero" />
          </div>
          <a
            href={SCS_LEARN_YOUTUBE_SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 text-lg font-semibold text-white hover:text-white/80"
          >
            <YouTubeIcon className="h-6 w-6" />
            <span className="link-swipe">Subscribe to SCS Learn on YouTube.</span>
          </a>
        </div>
      </section>

      <YouTubeSection />

    </>
  );
}
