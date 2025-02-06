

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfoSection from "../components/InfoSection";
import ScrollingLogos from "@/components/ScrollingLogos"; // Import client component
import ServicesSlider from "@/components/ServicesSlider";
import LoyaltyProgram from "@/components/LoyaltyProgram";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
  <div>
    <Navbar />
    <Hero />
    <InfoSection />
    <ServicesSlider /> 
    <LoyaltyProgram />
    <ContactSection />
    
  </div>

  );
}
