import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar flex justify-between items-center p-4 bg-white shadow-md flex-wrap">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="Bee Icon" width={48} height={48} />
          <h1 className="text-2xl font-bold text-yellow-500">Bee</h1>
          <h1 className="text-2xl font-bold text-black">You Nail & Spa</h1>
        </div>
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-sm md:text-base md:space-x-8 flex-wrap justify-center md:justify-start">
        <Link href="/schedule">
          <li className="hover:underline cursor-pointer">BOOKING</li>
        </Link>
        <Link href="/menu">
          <li className="hover:underline cursor-pointer">OUR SERVICES</li>
        </Link>
        <li className="hover:underline cursor-pointer">DEAL & PROMOTION</li>
      </ul>

      {/* Buttons */}
      <div className="flex flex-wrap space-x-4 justify-center md:justify-start mt-4 md:mt-0">
      <Link href="/schedule">
          <button className="border px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors duration-300 w-full md:w-auto">
            BOOK APPOINTMENT
          </button>
        </Link>
        <a href="tel:+16194631064" className="flex items-center bg-purple-500 border-2 border-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 transition-colors duration-300 text-sm md:text-base w-full md:w-auto">
          📞 <span className="ml-2">Call Now</span>
        </a>
      </div>
    </nav>
  );
}