import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
// import CoursewareSection from "@/components/landing/CoursewareSection";
// import ProblemSection from "@/components/landing/ProblemSection";
import ValuePropsSection from "@/components/landing/ValuePropsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
// import AiTutorSection from "@/components/landing/AiTutorSection";
// import EducatorsSection from "@/components/landing/EducatorsSection";
import OfferingsSection from "@/components/landing/OfferingsSection";
// import FinalCtaSection from "@/components/landing/FinalCtaSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      {/* <CoursewareSection /> */}
      {/* <ProblemSection /> */}
      <ValuePropsSection />
      <HowItWorksSection />
      {/* <AiTutorSection /> */}
      {/* <EducatorsSection /> */}
      <OfferingsSection />
      {/* <FinalCtaSection /> */}
      <Footer />
    </main>
  );
}
