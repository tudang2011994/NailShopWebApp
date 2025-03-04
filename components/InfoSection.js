import Link from 'next/link';

export default function InfoSection() {
  const items = [
    {
      image: "/images/nails1.jpg",
      title: "Booking Our Service",
      icon: "💎",
      link: "https://app.squareup.com/appointments/book/z3cutw95ioa0kc/LJWTNTQ6EXXFA/start",
      description: "Book our nail services easily through our online booking system.",
      altText: "Image showing the booking service for nail treatments"
    },
    {
      image: "/images/nails2.jpg",
      title: "Menu",
      icon: "😊",
      link: "/menu",
      description: "Explore our wide range of nail services and treatments.",
      altText: "Image showing the nail services menu"
    },
    {
      image: "/images/nails3.jpg",
      title: "Monthly Specials",
      icon: "❤️",
      link: "/deals",
      description: "Check out our monthly specials and discounts on nail services.",
      altText: "Image showing the monthly specials for nails"
    },
  ];

  return (
    <section className="bg-[#FAF6F2] py-12" aria-labelledby="info-section">
      <h2 id="info-section" className="sr-only">Explore Our Services</h2> {/* Invisible heading for SEO */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {items.map((item, index) => (
          <article key={index} className="text-center block" aria-labelledby={`item-${index}`}>
            <Link href={item.link} passHref>
              <header>
                <img
                  src={item.image}
                  alt={item.altText}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  loading="lazy"
                />
                <h3 className="text-xl font-bold mt-4">
                  {item.icon} {item.title}
                </h3>
              </header>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
