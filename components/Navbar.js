'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import clsx from 'clsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header   className="text-[#333333] bg-[radial-gradient(circle_at_center,_#ff6f61_0%,_#ff6f61_25%,_#ffffff_100%)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Name */}
        <a href="/" aria-label="Home" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
          <div>
            <div className="text-3xl font-extrabold text-white">Bee</div>
            <div className="text-2xl font-semibold text-white">You Nail & Spa</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="/menu" className="text-sm font-medium text-white hover:text-yellow-200 transition duration-300">
            OUR SERVICES
          </a>
          <a href="/deals" className="text-sm font-medium text-white hover:text-yellow-200 transition duration-300">
            DEAL & PROMOTION
          </a>
          <a href="/policies" className="text-sm font-medium text-white hover:text-yellow-200 transition duration-300">
            POLICIES
          </a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-yellow-500 transition duration-300"
          >
            BOOK
          </a>
          <a
            href="tel:+16194631064"
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300"
          >
            Call Now
          </a>
          <a
            href="https://www.instagram.com/nailspaelmsford/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-200 transition duration-300"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
        >
          <div
            className={clsx(
              'w-6 h-0.5 bg-white transition-transform',
              open && 'rotate-45 translate-y-1'
            )}
          />
          <div
            className={clsx(
              'w-6 h-0.5 bg-white transition-opacity',
              open && 'opacity-0'
            )}
          />
          <div
            className={clsx(
              'w-6 h-0.5 bg-white transition-transform',
              open && '-rotate-45 -translate-y-1'
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'md:hidden bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 border-t',
          open ? 'block' : 'hidden'
        )}
      >
        <div className="px-4 py-4 flex flex-col gap-3">
          <a
            href="/menu"
            className="text-base font-medium text-white hover:text-yellow-200 transition duration-300"
            onClick={() => setOpen(false)}
          >
            OUR SERVICES
          </a>
          <a
            href="/deals"
            className="text-base font-medium text-white hover:text-yellow-200 transition duration-300"
            onClick={() => setOpen(false)}
          >
            DEAL & PROMOTION
          </a>
          <a
            href="/policies"
            className="text-base font-medium text-white hover:text-yellow-200 transition duration-300"
            onClick={() => setOpen(false)}
          >
            INFO + POLICIES
          </a>
          <a
            href="https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-4 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-yellow-500 transition duration-300"
          >
            BOOK APPOINTMENT
          </a>
          <a
            href="tel:+16194631064"
            className="block text-center px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300"
          >
            Call Now
          </a>
          <a
            href="https://www.instagram.com/beeyounailandspa/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-white hover:text-yellow-200 transition duration-300"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>
    </header>
  );
}
