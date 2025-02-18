import Link from 'next/link';

export default function InfoSection() {
  const items = [
    {
      image: "/images/nails1.jpg",
      title: "Booking Our Service",
      icon: "💎",
      link: "/schedule",
    },
    {
      image: "/images/nails2.jpg",
      title: "Menu",
      icon: "😊",
      link: "/menu",
    },
    {
      image: "/images/nails3.jpg",
      title: "Monthly Specials",
      icon: "❤️",
      link: "/specials",
    },
  ];

  return (
    <section className="bg-[#FAF6F2] py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {items.map((item, index) => (
          <Link href={item.link} key={index}>
            <div className="text-center block">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
              <div className="mt-4 flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-400">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}