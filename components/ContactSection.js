"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYelp, faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function ContactSection() {
  return (
    <div className="bg-cover bg-center bg-no-repeat text-center py-20 flex justify-center items-center min-h-screen" 
         style={{ backgroundImage: "url('https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739750150/about_nm8sqw.jpg')" }}>

      {/* Schema Markup for Local Business */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NailSalon",
          "name": "Bee You Nail & Spa",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2352 Fletcher Pkwy",
            "addressLocality": "El Cajon",
            "addressRegion": "CA",
            "postalCode": "92020",
            "addressCountry": "US"
          },
          "telephone": "+16194631064",
          "url": "https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start",
          "openingHours": ["Mo-Sa 09:00-19:00", "Su 10:00-19:00"],
          "image": "https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739750150/about_nm8sqw.jpg"
        }) 
      }} />

      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Bee You Nail & Spa</h2>
        
        {/* Address with "Get Directions" Button */}
        <p className="text-sm mb-4 font-semibold">
          <a href="https://maps.app.goo.gl/HriGcdmSQeNwFM2K9" className="underline text-black" target="_blank" rel="noopener noreferrer">
            2352 Fletcher Pkwy, El Cajon, CA 92020
          </a>
        </p>

        {/* Clickable "Call Now" Button */}
        <p className="text-sm mb-6 font-semibold">
          <a href="tel:+16194631064" className="underline text-black">📞 Call Now: (619) 463-1064</a>
        </p>

        {/* Operating Hours */}
        <p className="text-sm mb-6">
          Monday – Saturday | 9 AM-7 PM<br />Sunday | 10 AM-7 PM
        </p>

        {/* Appointment Booking Link */}
        <a href="https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start" 
           className="text-sm font-semibold underline block mb-6 text-blue-600">
          📅 Book an Appointment
        </a>

        {/* Email Contact */}
        <p className="text-sm mb-6">
          Have questions? Email us at: <a href="mailto:beeyou1227@gmail.com" className="underline text-black">beeyou1227@gmail.com</a>
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4">
          <a href="https://www.instagram.com/beeyounailandspa/" target="_blank" rel="noopener noreferrer" className="text-pink-600" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} size="2x" alt="Instagram" />
          </a>
          <a href="https://www.yelp.com/biz/bee-you-nail-and-spa-el-cajon" target="_blank" rel="noopener noreferrer" className="text-red-600" aria-label="Yelp">
            <FontAwesomeIcon icon={faYelp} size="2x" alt="Yelp" />
          </a>
          <a href="https://maps.app.goo.gl/HriGcdmSQeNwFM2K9" target="_blank" rel="noopener noreferrer" className="text-red-600" aria-label="Google Maps">
            <FontAwesomeIcon icon={faGoogle} size="2x" alt="Google Maps" />
          </a>
        </div>
      </div>
    </div>
  );
}
