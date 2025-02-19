import React, { useEffect, useState } from "react";
import "../styles/preloader.css"; 

const Preloader = ({ imageUrl }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true);
    }, 1800); // جعل التحميل يدوم 1.8 ثانية
  }, []);

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <img src={`http://localhost:3000/${imageUrl}`} alt="Website Logo" className="preloader-logo" />
    </div>
  );
};

export default Preloader;
