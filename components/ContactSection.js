import Image from 'next/image';

export default function ContactSection() {
  return (
    <div className="bg-cream-100 text-center py-20 flex justify-center items-center min-h-screen">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-sm mb-4 font-semibold">
          <a href="https://www.google.com/maps/place/2352+Fletcher+Plwy,+El+Cajon,+Ca+92020" className="underline text-black" target="_blank" rel="noopener noreferrer">
          2352 Fletcher Pkwy, El Cajon, CA 92020
          </a>
        </p>
        <p className="text-sm mb-6 font-semibold">
        (619) 463-1064
        </p>
        <p className="text-sm mb-6">
          Monday – Saturday | 9 AM-7PM<br />Sunday | 10 AM-7PM
        </p>
        <a href="#" className="text-sm font-semibold underline block mb-6">BOOK APPOINTMENT</a>
        <p className="text-sm">
          For all other general inquiries: <a href="mailto:beeyou1227@gmail.com" className="underline">beeyou1227@gmail.com</a>
        </p>
      </div>
    </div>
  );
}