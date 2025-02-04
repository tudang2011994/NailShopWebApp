export default function InfoSection() {
    const items = [
      {
        image: "/images/nails1.jpg",
        title: "How to Book",
        icon: "💎",
      },
      {
        image: "/images/nails2.jpg",
        title: "Services",
        icon: "😊",
      },
      {
        image: "/images/nails3.jpg",
        title: "Monthly Specials",
        icon: "❤️",
      },
    ];
  
    return (
      <section className="bg-[#FAF6F2] py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
              <div className="mt-4 flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-400">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <p className="mt-2 text-lg font-semibold">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }