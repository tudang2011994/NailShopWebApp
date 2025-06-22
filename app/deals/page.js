import DealItem from '@/components/DealItem';
import Navbar from "@/components/Navbar";

const DealsPage = () => {
  const deals = [
    {
      title: 'Happy July 4th',
      description: 'Get 5% OFF for each U.S. flag color your outfit matches!',
      image: 'https://res.cloudinary.com/dk9cq2dqn/image/upload/v1750615775/July4_oto9tv.png',
    },
    // Add more deals as needed
  ];

  return (
    <div>
        <Navbar />
        <div className="py-12 bg-[#FAF6F2]">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-6 underline text-center">
            Our Latest Deals
        </h1>
        <div className="space-y-8">
            {deals.map((deal, index) => (
            <DealItem
                key={index}
                title={deal.title}
                description={deal.description}
                image={deal.image}
            />
            ))}
        </div>
        </div>
    </div>
  );
};

export default DealsPage;
