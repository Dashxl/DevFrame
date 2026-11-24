import { LogoIntro } from "@/components/sections/LogoIntro";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Expertise } from "@/components/sections/Expertise";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { PanelTransition } from "@/components/ui/PanelTransition";

export default function Home() {
  return (
    <div className="flex flex-col">
      <LogoIntro />
      <Navbar />
      <Hero />
      <PanelTransition title={{ en: "Experience", es: "Experiencia" }} />
      <Experience />
      <Expertise />
      <Work />
      <Footer />
    </div>
  );
}
