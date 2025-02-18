"use client";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const CLOUD_NAME = "dk9cq2dqn"; // Replace with your Cloudinary cloud name
const FOLDER_NAME = "Gallery"; // Replace with your folder name (optional)

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [numImages, setNumImages] = useState(10); // Default to 10 images

  // Function to determine the number of images based on screen width
  const updateImageCount = () => {
    if (window.innerWidth < 640) {
      setNumImages(5); // Show only 5 images on mobile
      setIsMobile(true); // Set isMobile to true for mobile devices
    } else {
      setNumImages(10); // Show 10 images on larger screens
      setIsMobile(false); // Set isMobile to false for larger screens
    }
  };

  useEffect(() => {
    updateImageCount(); // Set the initial image count
    window.addEventListener("resize", updateImageCount); // Update on window resize

    return () => {
      window.removeEventListener("resize", updateImageCount);
    };
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${FOLDER_NAME}.json`
        );
        const data = await response.json();
        setImages(data.resources);
        setDisplayedImages(data.resources.slice(0, numImages)); // Show images dynamically
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [numImages]);

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-purple-600 mb-6 underline">Our Gallery</h2>
      <div className="gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
        {displayedImages.map((img) => (
          isMobile ? (
            <div key={img.public_id} className="gallery-item">
              <img
                src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,q_auto:best/${img.public_id}.jpg`}
                alt={img.public_id}
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          ) : (
            <Fade key={img.public_id} triggerOnce={true} duration={1000}>
              <div className="gallery-item">
                <img
                  src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,q_auto:best/${img.public_id}.jpg`}
                  alt={img.public_id}
                  loading="lazy"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </Fade>
          )
        ))}
      </div>
    </div>
  );
};

export default Gallery;