import React from 'react';
import img1 from "../images/main.png"
import '../styles/hero.css';

const Hero = ({ heroContent , img}) => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Welcome to My Portfolio</h1>
        <p>{heroContent}.</p>
        <button className="cta-button">Hire Me</button>
      </div>
      <div className="hero-image">
        <img src={`http://localhost:3000/${img}`} alt="Hero" />
      </div>
    </section>
  );
};

export default Hero;