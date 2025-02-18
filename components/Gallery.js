"use client";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const CLOUD_NAME = "dk9cq2dqn"; // Replace with your Cloudinary cloud name
const FOLDER_NAME = "Gallery"; // Replace with your folder name (optional)

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [isChanging, setIsChanging] = useState(true); // Track if the sequence is active
  const [numImages, setNumImages] = useState(10); // Default to 10 images

  // Function to determine the number of images based on screen width
  const updateImageCount = () => {
    if (window.innerWidth < 640) {
      setNumImages(5); // Show only 5 images on mobile
    } else {
      setNumImages(10); // Show 10 images on larger screens
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

  useEffect(() => {
    let interval;

    if (isChanging) {
      let currentIndex = 0;
      const delayIncrement = 1000; // Increased delay to slow down the change time
      const totalImages = displayedImages.length;

      interval = setInterval(() => {
        setDisplayedImages((prevDisplayedImages) => {
          const newDisplayedImages = [...prevDisplayedImages];
          const remainingImages = images.filter(
            (img) => !prevDisplayedImages.includes(img)
          );

          if (remainingImages.length > 0) {
            newDisplayedImages[currentIndex] = remainingImages[0]; // Change only the current image
          }

          return newDisplayedImages;
        });

        // Increment the index and increase delay
        currentIndex = (currentIndex + 1) % totalImages; // Loop over the displayed images

      }, delayIncrement * (currentIndex + 1)); // Delay increases with each step

    } else {
      setTimeout(() => {
        setIsChanging(true);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [images, isChanging, numImages]);

  useEffect(() => {
    if (isChanging) {
      setTimeout(() => {
        setIsChanging(false);
      }, 15000);
    }
  }, [isChanging]);

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-purple-600 mb-6 ">Our Gallery</h2>
      <div className="gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
        {displayedImages.map((img) => (
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
        ))}
      </div>
    </div>
  );
};

export default Gallery;