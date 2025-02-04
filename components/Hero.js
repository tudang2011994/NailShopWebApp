export default function Hero() {
    return (
      <section className="relative w-full h-screen bg-gray-200 flex justify-center items-center">
        {/* Use double quotes for the url */}
        <div className='absolute inset-0 bg-[url("/images/hero1.jpg")] bg-cover opacity-50'></div>
        <div className="relative bg-white p-8 rounded-xl shadow-lg max-w-2xl text-center">
          <p className="text-lg text-gray-700">
            Located on the Lower East Side in New York, AKIKO Nails is a new, hip, and unique concept salon focused on growing the popularity of nail art using artists trained in special Japanese nail art techniques.
          </p>
          <button className="mt-4 px-6 py-2 bg-black text-white rounded-full">LEARN MORE</button>
        </div>
      </section>
    );
  }