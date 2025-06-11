import { useEffect } from "react";

const CursorEffects = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const star = document.createElement("div");
      star.className = "cursor-star";
      star.style.left = `${e.pageX}px`;
      star.style.top = `${e.pageY}px`;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 1000); // 1 second fade
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
};

export default CursorEffects;
