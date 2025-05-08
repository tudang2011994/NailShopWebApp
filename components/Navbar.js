import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar flex justify-between items-center p-4 bg-white shadow-md flex-wrap" aria-label="Main Navigation">
      {/* Logo */}
      <Link href="/" aria-label="Homepage">
        <div className="flex items-center space-x-2">
          <Image 
            src="/images/logo.png" 
            alt="Bee You Nail & Spa Logo - A bee icon representing our services" 
            width={48} 
            height={48} 
            priority
          />
          <h1 className="text-2xl font-bold text-yellow-500">Bee</h1>
          <h1 className="text-2xl font-bold text-black">You Nail & Spa</h1>
        </div>
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-sm md:text-base md:space-x-8 flex-wrap justify-center md:justify-start">
        <li>
          <Link href="https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start" title="Book an appointment" className="hover:underline cursor-pointer">
            BOOKING
          </Link>
        </li>
        <li>
          <Link href="/menu" title="Explore our services" className="hover:underline cursor-pointer">
            OUR SERVICES
          </Link>
        </li>
        <li>
          <Link href="/deals" title="Check out deals and promotions" className="hover:underline cursor-pointer">
            DEAL & PROMOTION
          </Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center md:justify-start mt-4 md:mt-0 w-full md:w-auto">
        <Link href="https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start" passHref>
          <button
            className="border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors duration-300 w-full md:w-auto"
            title="Book your appointment now"
          >
            BOOK APPOINTMENT
          </button>
        </Link>
        <a
          href="tel:+16194631064"
          className="flex items-center bg-purple-500 border-2 border-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 transition-colors duration-300 text-sm md:text-base w-full md:w-auto"
          title="Call us now"
        >
          📞 <span className="ml-2">Call Now</span>
        </a>
      </div>
    </nav>
  );
}
