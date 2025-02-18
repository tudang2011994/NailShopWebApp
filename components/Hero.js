export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex justify-center items-center">
      <div className='absolute inset-0 bg-[url("/images/hero1.jpg")] bg-cover bg-center opacity-50'></div>
      <div className="relative p-6 md:p-8 lg:p-12 rounded-xl shadow-lg max-w-2xl text-center"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}>
        <p className="text-base md:text-lg lg:text-xl">
        Bee You Nail & Spa is all about helping you look and feel your best. Whether you're in the mood for a fresh set of nails, a relaxing pedicure, stunning eyelash extensions, or smooth waxing, our experienced team (10+ years in the business!) is here to pamper you. Step into a peaceful, welcoming space where you can unwind and treat yourself. Come by and see us—exclusive offers are waiting!        </p>
        {/* <button className="mt-4 px-4 py-2 md:px-6 md:py-2 lg:px-8 lg:py-3 bg-black text-white rounded-full">About us</button> */}
      </div>
    </section>
  );
}