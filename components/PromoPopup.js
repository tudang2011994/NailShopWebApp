'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('promoDismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('promoDismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-[90vw] max-w-sm sm:max-w-md md:max-w-lg bg-white border border-pink-500 rounded-lg shadow-lg p-4 animate-slide-in">
      <button
        onClick={handleClose}
        aria-label="Close"
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
      >
        &times;
      </button>
      <div className="flex flex-col items-center">
        <Image
          src="https://res.cloudinary.com/dk9cq2dqn/image/upload/v1745688657/Brown_Simple_Mother_s_Day_Sale_Instagram_Post_tlx9zu.png"
          alt="Mother's Day Special"
          width={300}
          height={200}
          className="rounded w-full h-auto"
        />
        <a
          href="/deals"
          className="mt-4 px-4 py-2 bg-pink-500 text-white text-sm font-semibold rounded hover:bg-pink-600 transition w-full text-center"
        >
          View Offer
        </a>
      </div>
    </div>
  );
}
