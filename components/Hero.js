'use client';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dk9cq2dqn/image/upload/v1754770180/AdobeStock_340358917_o6kwt3.webp"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={60}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-6 md:px-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Bee You Nail & Spa
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl mb-6">
          Luxurious Nail Care & Beauty in El Cajon & La Mesa  
        </p>

        {/* Book Now Button */}
        <a
          href="https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start"
          className="inline-block bg-[#ff6f61] text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#bf2c74] transition-all"
        >
          Book An Appointment
        </a>
      </div>
    </section>
  );
}
