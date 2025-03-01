"use client";
export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex justify-center items-center">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-[url('/images/hero1.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-[rgba(255,255,255,0.3)]"></div>
      </div>

      {/* Content Box */}
      <div 
        className="relative p-8 md:p-10 lg:p-14 rounded-xl shadow-xl bg-white/90 backdrop-blur-md max-w-3xl text-center animate-fadeIn"
      >
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#d63384] drop-shadow-lg">
          Bee You Nail & Spa  
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-700 font-semibold mt-3">
          Luxurious Nail Care & Beauty in El Cajon & La Mesa
        </p>

        {/* Description with Keywords */}
        <p className="text-base md:text-lg lg:text-xl mt-4 text-gray-800 leading-relaxed">
          Treat yourself to **manicures**, **pedicures**,  
          **full sets**, **eyelash extensions**, and more!  
          Our skilled technicians offer **10+ years** of experience in a relaxing and stylish environment.  
          **Book today** and enjoy an exclusive offer!  
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out; }
      `}</style>
    </section>
  );
}
