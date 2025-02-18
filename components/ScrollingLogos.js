"use client"
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const deals = [
  "15% off first booking",
  "15% off new registered users",
  "15% off invite your buddy",
  "15% off Happy Monday",
];

export default function DealsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % deals.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-16 overflow-hidden">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold"
      >
        {deals[index]}
      </motion.div>
    </div>
  );
}
