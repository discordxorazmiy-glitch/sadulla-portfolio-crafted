import Navbar from "@/components/Navbar";
import HeroFuturistic from "@/components/ui/hero-futuristic";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroFuturistic />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
