import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/brain.svg'; //

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-text fade-in">
        <h1>Ready to Test Your Knowledge?</h1>
        <p>Take our quiz and challenge yourself!</p>
        <button onClick={() => navigate('/quiz')}>Start Quiz</button>
      </div>
      <div className="hero-img float">
        <img src={heroImg} alt="Quiz" />
      </div>
    </section>
  );
}

export default HeroSection;
