export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex justify-center items-center">
      {/* Use double quotes for the url */}
      <div className='absolute inset-0 bg-[url("/images/hero1.jpg")] bg-cover opacity-50'></div>
      <div className="relative p-8 rounded-xl shadow-lg max-w-2xl text-center"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}>
        <p className="text-lg">
          Located on the Fletcher Parkway in El Cajon city, Bee You Nail & Spa is a new, hip, and unique concept salon focused on growing the popularity of nail art using artists trained in special Japanese nail art techniques.
        </p>
        <button className="mt-4 px-6 py-2 bg-black text-white rounded-full">About us</button>
      </div>
    </section>
  );
}
