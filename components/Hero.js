"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">
      
      {/* Optimized Background Image */}
      <Image
        src="https://res.cloudinary.com/dk9cq2dqn/image/upload/v1750618725/hero_sghtzh.jpg"
        alt="Hero Background"
        fill
        priority
        quality={75}
        className="object-cover object-center z-0"
        sizes="100vw"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-[rgba(255,255,255,0.3)] z-10" />

      {/* Content Box */}
      <div className="relative z-20 p-8 md:p-10 lg:p-14 rounded-xl shadow-xl bg-white/90 backdrop-blur-md max-w-3xl text-center animate-fadeIn">
        
        {/* Walk-in Welcome Animation */}
        <div className="text-2xl md:text-3xl font-bold text-[#d63384] animate-walk mb-4">
          👣 Walk-in Welcome! 👣
        </div>

        {/* Promotion Banner */}
        <a 
          href="/deals" 
          className="block bg-gradient-to-r from-[#ff7eb3] to-[#ff4081] text-white text-lg md:text-xl font-semibold px-4 py-2 rounded-lg shadow-md mb-4 transition-all hover:scale-105 animate-fadeIn"
        >
          🥂 Happy July 4th deals – <span className="underline">Explore More</span> 🥂 
        </a>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#d63384] drop-shadow-lg">
          Bee You Nail & Spa
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-700 font-semibold mt-3">
          Luxurious Nail Care & Beauty in El Cajon & La Mesa
        </p>

        {/* Description */}
        <h2 className="text-xl font-bold mt-4">Our Services</h2>
        <ul className="text-left mt-2 text-gray-800">
          <li><strong>Acrylic & Gel Nails</strong>: Durable and stylish nail enhancements.</li>
          <li><strong>Full Sets & Nail Art</strong>: Customized designs to express your style.</li>
          <li><strong>Spa Pedicure Packages</strong>: Relaxing treatments with exfoliation and foot massage.</li>
          <li><strong>Eyelash Extensions</strong>: Enhance your eyes with classic, hybrid, or volume lashes.</li>
          <li><strong>Waxing Services</strong>: Smooth, hair-free skin with professional waxing treatments.</li>
        </ul>
        <p className="mt-2">
          Our skilled technicians bring over 10 years of experience, ensuring top-notch services in a relaxing and stylish environment.
        </p>

        {/* Call to Action Button */}
        <a 
          href="https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start"
          className="inline-block mt-6 bg-[#d63384] text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#bf2c74] transition-all"
        >
          Book Now
        </a>
      </div>

      {/* Smooth Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }

        @keyframes walk {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-walk { animation: walk 1s ease-out; }
      `}</style>
    </section>
  );
}
