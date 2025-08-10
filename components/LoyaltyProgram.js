'use client';
import ScrollingLogos from './ScrollingLogos';
import Image from 'next/image';

export default function RoyaltyProgram() {
  return (
    <section className="bg-cream-100 text-center py-8 px-4">
    <section className="bg-white py-12 px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-[#black]">Ultimate Relaxation</h2>
              <p className="text-2xl font-semibold text-[#black] mt-4">Spa Pedicures</p>
              <p className="text-lg text-gray-700 mt-4">
                Seasonal Scents | Organic Options | Callus Removal | Relaxing Massages | Paraffin & More!
              </p>
                <a
                href="https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start"
                className="inline-block bg-[#ff6f61] text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md hover:bg-[#bf2c74] transition-all"
              >
                Book Your Pedicure
              </a>
            </div>
          </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="flex justify-center items-center w-full rounded-lg overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739750492/Beeyou_package_vs2r0s.jpg"
            alt="Bee You Package"
            width={500}
            height={500}
            className="object-contain w-full h-auto max-h-[500px]"
          />
        </div>
        <div className="flex justify-center items-center w-full rounded-lg overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739752665/bee_you_package_2_etyahj.jpg"
            alt="Leg Treatment"
            width={500}
            height={500}
            className="object-contain w-full h-auto max-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
}
