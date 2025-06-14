import React from "react";
import "./LandingLoader.css";
import "../index.css";

const STAR_COUNT = 40;
const stars = Array.from({ length: STAR_COUNT }).map((_, i) => {
  const style = {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${1.8 + Math.random() * 1.8}s`,
  };
  return <div className="loader-star" style={style} key={i} />;
});

const LandingLoader = () => (
  <div className="landing-loader">
    <div className="loader-stars-bg">{stars}</div>
    <div className="spinner"></div>
    <span className="loader-text">Loading...</span>
  </div>
);

export default LandingLoader;
