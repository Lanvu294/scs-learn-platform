import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
// import CoursewareSection from "@/components/landing/CoursewareSection";
// import ProblemSection from "@/components/landing/ProblemSection";
// import ValuePropsSection from "@/components/landing/ValuePropsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
// import AiTutorSection from "@/components/landing/AiTutorSection";
// import EducatorsSection from "@/components/landing/EducatorsSection";
import OfferingsSection from "@/components/landing/OfferingsSection";
// import FinalCtaSection from "@/components/landing/FinalCtaSection";
import BuiltBySection from "@/components/landing/BuiltBySection";
import Footer from "@/components/landing/Footer";

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
      {/* <FinalCtaSection /> */}
      <BuiltBySection />
      </main>
      <Footer />
    </>
  );
}
