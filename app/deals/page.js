import DealItem from '@/components/DealItem';
import Navbar from "@/components/Navbar";

const DealsPage = () => {
  const deals = [
    {
      title: 'Small Gift For Your Mom',
      description: 'Enjoy 20% more value when you buy a gift card!',
      image: 'https://res.cloudinary.com/dk9cq2dqn/image/upload/v1745688657/Brown_Simple_Mother_s_Day_Sale_Instagram_Post_tlx9zu.png',
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
