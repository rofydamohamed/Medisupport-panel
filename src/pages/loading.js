import { Helmet } from "react-helmet-async";
import "./loading.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heart from "../Images/loading.png";
import Heartl from "../Images/heartload.png";

// Icons array
const icons = [
  { id: 1, src: Heart, alt: "Icon 1" },
  { id: 2, src: Heart, alt: "Icon 2" },
  { id: 3, src: Heart, alt: "Icon 3" },
  { id: 4, src: Heartl, alt: "Icon 4" },
  { id: 5, src: Heart, alt: "Icon 5" },
  { id: 6, src: Heart, alt: "Icon 6" },
  { id: 7, src: Heart, alt: "Icon 7" },
];

// Loading component
const Loading = () => {
  const navigate = useNavigate();
  
  // Navigate to home page after all icons have been displayed
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/Dash"); // Adjust the path as needed
    }, icons.length * 1000 + 1000); // Each icon appears every 1s, +1s buffer

    return () => clearTimeout(timeoutId);
  }, [navigate]);
 
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  // Effect to cycle through icons
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    },450);
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Loading ♥</title>
        <meta name="description" content="Loading" />
      </Helmet>
      <div className="icons-container">
        {icons.map((icon, index) => (
          <img
            key={icon.id}
            src={icon.src}
            alt={icon.alt}
            className={`icon ${index === currentIconIndex ? "visible" : ""}`}
          />
        ))}
      </div>
    </>
  );
};

export default Loading;
