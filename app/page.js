import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfoSection from "../components/InfoSection";
import ScrollingLogos from "@/components/ScrollingLogos"; // Import client component
import ServicesSlider from "@/components/ServicesSlider";
import LoyaltyProgram from "@/components/LoyaltyProgram";
import ContactSection from "@/components/ContactSection";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="bg-[rgb(250,246,242)] min-h-screen">
        <Hero />
        <InfoSection />
        <Gallery />
        <ServicesSlider />
        <LoyaltyProgram />
        <ContactSection />
      </div>
    </div>
  );
}