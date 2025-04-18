import DealItem from '@/components/DealItem';
import Navbar from "@/components/Navbar";

const DealsPage = () => {
  const deals = [
    {
      title: 'Happy Easter',
      description: 'Enjoy Free Upgraded Services',
      image: 'https://res.cloudinary.com/dk9cq2dqn/image/upload/v1745018644/Pink_Yellow_Orange_Colorful_Easter_Egg_Hunt_Flyer_m3uxwb.png',
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
