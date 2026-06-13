import DealItem from '@/components/DealItem';
import Navbar from "@/components/Navbar";
import clsx from "clsx";

const DealsPage = () => {
  const deals = [
    {
      title: 'Free drink, tea or Vietnamese coffee',
      description: '',
      image: 'https://res.cloudinary.com/dk9cq2dqn/image/upload/v1780782297/coffee_hfsflu.jpg',
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
