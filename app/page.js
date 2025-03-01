import Head from 'next/head';
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
      <Head>
        {/* Optimized SEO Title */}
        <title>Best Nail Salon in La Mesa & El Cajon | Manicure, Pedicure, Eyelash Extensions</title>

        {/* Optimized Meta Description */}
        <meta 
          name="description" 
          content="Looking for the best nail salon in La Mesa & El Cajon? We offer manicures, pedicures, full sets, fills, eyelash extensions, and waxing. Book your appointment today!"
        />

        {/* Keywords Meta Tag */}
        <meta 
          name="keywords" 
          content="nail salon La Mesa, nail salon El Cajon, manicure, pedicure, full set nails, nail fill, eyelash extensions, waxing, beauty salon, best nails near me"
        />

        {/* Mobile Responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph for Social Media Sharing */}
        <meta property="og:title" content="Best Nail Salon in La Mesa & El Cajon | Manicure, Pedicure, Eyelash Extensions" />
        <meta property="og:description" content="Visit our top-rated nail salon in La Mesa & El Cajon! Get professional manicures, pedicures, full set nails, fills, eyelash extensions, and waxing." />
        <meta property="og:image" content="/images/nail-salon-preview.jpg" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Nail Salon in La Mesa & El Cajon" />
        <meta name="twitter:description" content="Top nail services including manicures, pedicures, full set, fills, eyelash extensions, and waxing. Walk-ins welcome!" />
        <meta name="twitter:image" content="/images/nail-salon-preview.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
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
