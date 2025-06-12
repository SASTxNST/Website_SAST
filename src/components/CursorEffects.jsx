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


// import { useEffect } from "react";
// import "./cursor.css";

// const CursorEffects = () => {
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       // Add 3 mini asteroids per move with slight offset
//       for (let i = 0; i < 3; i++) {
//         const star = document.createElement("div");
//         star.className = "cursor-star";

//         const offsetX = (Math.random() - 0.5) * 10; // random -5 to +5
//         const offsetY = (Math.random() - 0.5) * 10;

//         star.style.left = `${e.pageX + offsetX}px`;
//         star.style.top = `${e.pageY + offsetY}px`;

//         document.body.appendChild(star);
//         setTimeout(() => star.remove(), 1000);
//       }
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return null;
// };

// export default CursorEffects;
