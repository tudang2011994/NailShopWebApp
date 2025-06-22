import Image from 'next/image';

const DealItem = ({ title, description, image }) => (
  <div className="flex flex-col md:flex-row items-center border rounded-lg p-6 shadow-md bg-[#f9f6f2]">
    {/* Left Side: Text Content */}
    <div className="md:w-1/2 text-center md:text-left">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="text-lg text-gray-700 mt-2">{description}</p>

      {/* Book Now Button */}
      <a
        href="https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start"
        className="mt-4 inline-block bg-[#d63384] text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#bf2c74] transition-all"
      >
        Book Now
      </a>
    </div>

    {/* Right Side: Image */}
    <div className="md: w-1/2 mt-6 md:mt-0 flex justify-center">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
  </div>
);

export default DealItem;
