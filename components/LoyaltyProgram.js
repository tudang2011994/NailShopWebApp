"use client";
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
      
      {/* New Description Above Images */}
      <p className="text-2xl font-semibold mt-12">
        Trying our <span className="text-gradient font-playfair">Bee You Pedicure Package</span> won’t let you down!  
        Enjoy a relaxing massage that melts away stress and leaves you feeling refreshed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="flex justify-center items-center w-full rounded-lg overflow-hidden">
          <img
            src="https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739750492/Beeyou_package_vs2r0s.jpg"
            alt="Bee You Package"
            className="object-contain w-full h-auto max-h-[500px]"
          />
        </div>
        <div className="flex justify-center items-center w-full rounded-lg overflow-hidden">
          <img
            src="https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739752665/bee_you_package_2_etyahj.jpg"
            alt="Leg Treatment"
            className="object-contain w-full h-auto max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}
