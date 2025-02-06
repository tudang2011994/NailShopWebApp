import Image from 'next/image';
import ScrollingLogos from './ScrollingLogos';

export default function RoyaltyProgram() {
  return (
    <div className="bg-cream-100 text-center py-8 px-4">
      <h1 className="text-5xl font-bold mb-4">
        Join Our <span className="text-gradient">ROYALTY</span> Program
      </h1>
      <p className="text-xl mb-8">
        Experience exclusive perks every time you visit. Earn credits, unlock discounts, and enjoy a special birthday treat. Sign up now to discover how you can enjoy these exclusive rewards and make every visit even more delightful.
      </p>
      <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
        And more Coupons for Members
      </button>
      <ScrollingLogos />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <Image src="/pedicure-chairs.jpg" alt="Pedicure Chairs" fill className="object-cover" />
        </div>
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <Image src="/leg-treatment.jpg" alt="Leg Treatment" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}