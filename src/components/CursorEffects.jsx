import { useEffect } from "react";

const CursorEffects = ({ isActive = true }) => {
  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e) => {
      const star = document.createElement("div");
      star.className = "cursor-trail";
      star.style.left = `${e.pageX}px`;
      star.style.top = `${e.pageY}px`;

      document.body.appendChild(star);
      setTimeout(() => star.remove(), 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive]);

  return null;
};

export default CursorEffects;
