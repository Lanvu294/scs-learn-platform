import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
// import CoursewareSection from "@/components/landing/CoursewareSection";
// import ProblemSection from "@/components/landing/ProblemSection";
// import ValuePropsSection from "@/components/landing/ValuePropsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
// import AiTutorSection from "@/components/landing/AiTutorSection";
// import EducatorsSection from "@/components/landing/EducatorsSection";
import OfferingsSection from "@/components/landing/OfferingsSection";
// Parked 10/19: belongs on the learn.cs.cmu.edu platform site, not the cs.cmu.edu/learn landing page.
// import ChannelsSection from "@/components/landing/ChannelsSection";
// import FinalCtaSection from "@/components/landing/FinalCtaSection";
import BuiltBySection from "@/components/landing/BuiltBySection";
import Footer from "@/components/landing/Footer";
import DesignNotes from "@/components/DesignNotes";

// Premiere tags ("Premieres Nov 3" / "Premiering now") depend on the date, so
// rebuild the static page daily.
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      {/* Lets keyboard users jump past the header's dozen links (WCAG 2.4.1). */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to main content
      </a>
      <NavBar />
      {/* Header and footer sit outside main so they keep their banner and contentinfo landmarks. */}
      <main id="main-content" tabIndex={-1} className="outline-none">
      <HeroSection />
      {/* <CoursewareSection /> */}
      {/* <ProblemSection /> */}
      {/* <ValuePropsSection /> */}
      <HowItWorksSection />
      {/* <AiTutorSection /> */}
      {/* <EducatorsSection /> */}
      <OfferingsSection />
      {/* <ChannelsSection /> */}
      {/* <FinalCtaSection /> */}
      <BuiltBySection />
      </main>
      <Footer />
      <DesignNotes />
    </>
  );
}
