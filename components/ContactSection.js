"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYelp, faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function ContactSection() {
  return (
    <div className="bg-cover bg-center bg-no-repeat text-center py-20 flex justify-center items-center min-h-screen" style={{ backgroundImage: "url('https://res.cloudinary.com/dk9cq2dqn/image/upload/v1739750150/about_nm8sqw.jpg')" }}>
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Bee You Nail & Spa</h2>
        <p className="text-sm mb-4 font-semibold">
          <a href="https://www.google.com/maps/place/2352+Fletcher+Plwy,+El+Cajon,+Ca+92020" className="underline text-black" target="_blank" rel="noopener noreferrer">
            2352 Fletcher Pkwy, El Cajon, CA 92020
          </a>
        </p>
        <p className="text-sm mb-6 font-semibold">
          <a href="tel:+16194631064" className="underline text-black">(619) 463-1064</a>
        </p>
        <p className="text-sm mb-6">
          Monday – Saturday | 9 AM-7PM<br />Sunday | 10 AM-7PM
        </p>
        <a href="#" className="text-sm font-semibold underline block mb-6">BOOK APPOINTMENT</a>
        <p className="text-sm mb-6">
          For all other general inquiries: <a href="mailto:beeyou1227@gmail.com" className="underline">beeyou1227@gmail.com</a>
        </p>
        <div className="flex justify-center space-x-4">
          {/* <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a> */}
          <a href="https://www.instagram.com/beeyounailandspa/" target="_blank" rel="noopener noreferrer" className="text-pink-600">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://www.yelp.com/biz/bee-you-nail-and-spa-el-cajon" target="_blank" rel="noopener noreferrer" className="text-red-600">
            <FontAwesomeIcon icon={faYelp} size="2x" />
          </a>
          <a href="https://maps.app.goo.gl/HriGcdmSQeNwFM2K9" target="_blank" rel="noopener noreferrer" className="text-red-600">
            <FontAwesomeIcon icon={faGoogle} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
}