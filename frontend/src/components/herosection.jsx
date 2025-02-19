import React from "react";
import img1 from "../images/main.png"
import "../styles/HeroSection.css";
const HeroSection = () => {
  return (
    <section className="hero">
    <div className="content">
      {/* النص */}
      <div className="main-content">
        <h1 className="fade-right">Hi! I Am</h1>
        <span className="fade-left">John Smith.</span>
        <p className="flip-up">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod deserunt consequuntur aut ea molestias.
        </p>

        <div className="buttons">
          <button className="zoom-in">Hire me</button>
          <button className="zoom-in">See my Work</button>
        </div>
      </div>

      {/* الصورة */}
      <div className="image">
        <img src={img1} alt="John Smith" className="zoom-out" />
      </div>
    </div>
  </section>
  );
};

export default HeroSection;
