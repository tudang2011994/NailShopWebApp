"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex justify-center items-center">
      {/* Preload Hero Image */}
      <link rel="preload" href="/images/hero1.webp" as="image" type="image/jpeg" />
      
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-[url('/images/hero1.webp')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-[rgba(255,255,255,0.3)]"></div>
      </div>

      {/* Content Box */}
      <div className="relative p-8 md:p-10 lg:p-14 rounded-xl shadow-xl bg-white/90 backdrop-blur-md max-w-3xl text-center animate-fadeIn">
        
        {/* Walk-in Welcome Animation */}
        <div className="text-2xl md:text-3xl font-bold text-[#d63384] animate-walk mb-4">
          👣 Walk-in Welcome! 👣
        </div>

        {/* Promotion Banner */}
        <a 
          href="/deals" 
          className="block bg-gradient-to-r from-[#ff7eb3] to-[#ff4081] text-white text-lg md:text-xl font-semibold px-4 py-2 rounded-lg shadow-md mb-4 transition-all hover:scale-105 animate-fadeIn"
        >
           💝 Special Offer For Mother Day – <span className="underline">Explore More</span> 💝
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
        <p className="text-base md:text-lg lg:text-xl mt-4 text-gray-800 leading-relaxed">
          Treat yourself to <strong>manicures</strong>, <strong>pedicures</strong>,  
          <strong>full sets</strong>, <strong>eyelash extensions</strong>, and more!  
          Our skilled technicians offer <strong>10+ years</strong> of experience in a relaxing and stylish environment.  
          <strong>Book today</strong> and enjoy an exclusive offer!  
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
