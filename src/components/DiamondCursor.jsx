import React, { useEffect, useRef } from "react";
import "./DiamondCursor.css";
const DiamondCursor = ({ isActive = true }) => {
  const cursorRef = useRef(null);

  // Move cursor
  useEffect(() => {
    if (!isActive) return;

    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isActive]);

  // Hide system cursor completely
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isActive) {
      html.style.cursor = "none";
      body.style.cursor = "none";
    } else {
      html.style.cursor = "auto";
      body.style.cursor = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      html.style.cursor = "auto";
      body.style.cursor = "auto";
    };
  }, [isActive]);

  return (
    <div
      className="cursor-diamond"
      ref={cursorRef}
      style={{ display: isActive ? "block" : "none" }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="50%" stopColor="#7e80ff" />
            <stop offset="100%" stopColor="#e14cff" />
          </linearGradient>
          <filter id="glow">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ffffff" />
          </filter>
        </defs>
        <path
          d="
            M100,0
            C120,50 150,80 200,100
            C150,120 120,150 100,200
            C80,150 50,120 0,100
            C50,80 80,50 100,0
            Z
          "
          fill="url(#geminiGradient)"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
};

export default DiamondCursor;
