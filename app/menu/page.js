"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const menuData = {
  pedicure: {
    image: "https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739741116/pedicure_menu_1_cvbgyz.jpg",
    items: [
      { name: "Classic pedicure", description: "A simple yet refreshing treatment! Enjoy a soothing foot soak, precise nail shaping, and cuticle care, followed by a relaxing lotion massage. Finish off with a warm towel wrap and your choice of polish for that perfect touch.   " },
      { name: "Callus pedicure", description: "Say goodbye to rough heels! This pedicure includes everything from the Classic, plus a callus treatment to smooth out hardened skin. Lotion massage, hot towel therapy, and polish complete the experience, leaving your feet feeling brand new." },
      { name: "Deluxe pedicure", description: "Indulge in a deeper level of relaxation. Along with a callus treatment, enjoy a gentle sugar scrub and a soothing peppermint mask to revitalize your feet. A warm lotion massage and hot towel wrap seal in the moisture, leaving your skin soft and refreshed." },
      { name: "Luxury pedicure", description: "Pamper your feet with a luxurious jelly soak that hydrates and soothes. This indulgent pedicure includes a sugar scrub, peppermint mask, paraffin wax bath, and an extended lotion massage for ultimate relaxation. Topped off with a hot towel wrap and polish, your feet will thank you!" },
      { name: "Bee You Signature pedicure", description: "The ultimate spa escape for your feet! Experience a 4-in-1 treatment with a sea salt soak, sugar scrub, mud mask, and deep lotion massage. Add a callus treatment and paraffin wax bath for silky-smooth skin, finished with a hot towel and your favorite polish." },
      { name: "** Additional Service **", description: " Add Gel Polish for a long-lasting, high-shine finish" },
    ],
  },
  manicure: {
    image: "https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739741400/manicure_menu_atzt2t.jpg",
    items: [
      { name: "Classic manicure", description: "A quick refresh for your hands! This manicure includes a soothing hand soak, expert nail trimming and shaping, cuticle care, a relaxing lotion massage, a warm towel wrap, and a flawless polish finish." },
      { name: "European manicure", description: "Upgrade your manicure with a touch of European luxury! Along with nail shaping and cuticle care, enjoy a gentle sugar scrub to exfoliate and soften your hands. A nourishing lotion massage, hot towel wrap, and polish complete this revitalizing treatment." },
      { name: "Luxury manicure", description: "Pamper your hands with an indulgent experience! This treatment includes everything from the European Manicure, plus a rejuvenating paraffin wax bath to deeply moisturize your skin. Relax as a warm towel wrap and polish complete the transformation." },
      { name: "Bee You Signature", description: "The ultimate hand spa experience! Enjoy a sugar scrub to exfoliate, a cooling peppermint mask to refresh, and a warm paraffin wax bath to deeply hydrate. A soothing lotion massage, hot towel wrap, and your choice of polish make this the perfect luxury treat." },
      { name: "** Additional Service **", description: "Add Gel Polish for a long-lasting, high-shine finish" },
    ],
},

  facial: {
    image: "https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739749924/facial_menu_wue1po.jpg",
    items: [
      { name: "Facial", description: "Experience rejuvenating facial treatments designed to nourish, hydrate, and revitalize your skin. Our services cater to all skin types, helping to cleanse, exfoliate, and restore your natural glow. Whether you're looking for deep hydration, anti-aging solutions, or a refreshing boost, our expert techniques will leave your skin feeling smooth, refreshed, and radiant. Treat yourself to the ultimate skincare experience!" },
    ],
  },
  eyelash: {
    image: "https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739741646/eyelash_menu_1_kgdsge.jpg",
    items: [
      { name: "Eyelash", description: "We offer a range of eyelash services to enhance your natural beauty. Whether you're looking for a subtle lift, a full-volume extension, or a classic lash enhancement, our professional treatments provide long-lasting, stunning results. From lifts and tints to customized extensions, we ensure your lashes look fuller, longer, and beautifully defined. Let your eyes shine with our expert eyelash services!" },
    ],
  },
  wax: {
    image: "https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739741945/wax_menu_vtb5qf.jpg",
    items: [
        { name: "Waxing", description: "We offer a variety of professional waxing services to keep your skin smooth and hair-free. From precise facial waxing, including eyebrows, lip, and chin, to full-body options like arms, legs, back, and chest, we cater to your grooming needs. Whether you're looking for a simple bikini wax or a full Brazilian, our services ensure a comfortable and long-lasting result. Experience smooth, flawless skin with our expert waxing treatments!" },
      ],
  },
};

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("pedicure");

  return (
    <div className="w-full">
      <Navbar />
      <div className="bg-[rgb(250,246,242)] min-h-screen flex">
        <div className="w-1/4 bg-white p-4">
          <div className="flex flex-col items-start">
            {Object.keys(menuData).map((category) => (
              <span
                key={category}
                className={`px-4 py-2 my-2 cursor-pointer ${
                  selectedCategory === category ? "text-blue-500 font-bold" : "text-gray-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            ))}
          </div>
        </div>
        <div className="w-3/4 p-8">
          <div className="flex flex-col items-center">
            <img
              src={menuData[selectedCategory].image}
              alt={selectedCategory}
              className="w-full h-auto aspect-[3/1] object-cover rounded-lg shadow-md mb-4"
            />
            <ul className="w-full">
              {menuData[selectedCategory].items.map((item, index) => (
                <li key={index} className="mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}