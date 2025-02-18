"use client";
import { motion } from 'framer-motion';
import useWindowSize from '../hooks/useWindowSize';

const services = [
  { name: 'Manicure', image: '/images/manicure1.png' },
  { name: 'Pedicure', image: '/images/pedicure2.png' },
  { name: 'Wax', image: '/images/wax1.png' },
  { name: 'Eyelash Extension', image: '/images/eyelash2.png' },
  { name: 'Make You Happy', image: '/images/happy1.png' }
];

export default function ServicesSlider() {
  const size = useWindowSize();

  // Do not render the component if the screen width is less than 768px (mobile devices)
  if (size.width < 768) {
    return null;
  }

  return (
    <div className='overflow-hidden bg-pink-100 py-8'>
      <motion.div
        className='flex space-x-10' // Adjusted space-x for tighter gap
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{ ease: 'linear', duration: 40, repeat: Infinity }} // Adjusted duration for smoother movement
      >
        {services.map((service, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center w-64 h-64 border-4 border-white rounded-full bg-pink-200 shadow-lg'
          >
            <img src={service.image} alt={service.name} className='w-24 h-24 mb-4' />
            <p className='text-2xl text-white font-bold'>{service.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}