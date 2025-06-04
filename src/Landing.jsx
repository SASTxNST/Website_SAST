import React from 'react';
import './animations/LandingExplosion.css';

const Landing = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Explosion Animation */}
      <div className="blast-container">
        <div className="blast-base"></div>
        <div className="blast-glow1"></div>
        <div className="blast-glow2"></div>
      </div>

      {/* Optional content below */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Welcome</h1>
      </div>
    </div>
  );
};

export default Landing;
