import Head from 'next/head';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfoSection from "../components/InfoSection";
import ScrollingLogos from "@/components/ScrollingLogos"; // Import client component
import ServicesSlider from "@/components/ServicesSlider";
import LoyaltyProgram from "@/components/LoyaltyProgram";
import ContactSection from "@/components/ContactSection";
import Gallery from "@/components/Gallery";
import Script from 'next/script';

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
        <meta property="og:url" content="https://beeyounail.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Nail Salon in La Mesa & El Cajon" />
        <meta name="twitter:description" content="Top nail services including manicures, pedicures, full set, fills, eyelash extensions, and waxing. Walk-ins welcome!" />
        <meta name="twitter:image" content="/images/nail-salon-preview.jpg" />

        <Script strategy="lazyOnload">   
        {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
          var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
          ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


            ttq.load('D05C1FJC77U7AMTK9460');
            ttq.page();
          }(window, document, 'ttq');
        `}
        </Script>

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
