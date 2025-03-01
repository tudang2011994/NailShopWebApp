"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const deals = [
  "10% off new registered users",
  "10% off invite your buddy",
  "10% off Spring Special",
  "EventExclusive offers, every season, all year!",
];

export default function DealsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % deals.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div className="flex justify-center items-center h-16 overflow-hidden">
      <motion.div
        key={index} // Add key to motion div for smooth transition
        initial={{ opacity: 0, y: 20 }} // Initial state for fade and slide
        animate={{ opacity: 1, y: 0 }} // Animated state for fade and slide
        exit={{ opacity: 0, y: -20 }} // Exit state for fade and slide
        transition={{ duration: 0.5 }} // Transition duration
        className="text-xl font-bold"
      >
        {deals[index]}
      </motion.div>
    </div>
  );
}
