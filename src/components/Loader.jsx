import React, { useEffect, useState } from "react";

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // total visible time reduced to ~3s
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        .loader {
          background-color: rgb(0, 0, 0);
          top: 0%;
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          transition: opacity 0.6s ease-in-out;
          z-index: 1001;
          opacity: 1;
        }

        .loader.fade-out {
          animation: fadeOut 0.6s ease-in-out 2.4s forwards;
        }

        .loader h1 {
          z-index: 10000;
          font-size: 8vw;
          color: white;
          position: absolute;
          opacity: 0;
          animation-name: lulu;
          animation-timing-function: linear;
          animation-duration: 0.6s;
          animation-delay: 0.4s;
          animation-fill-mode: forwards;
        }

        .loader h1:nth-child(2) {
          animation-delay: 1s;
        }

        .loader h1:nth-child(3) {
          animation-duration: 0.7s;
          animation-delay: 1.6s;
        }

        @keyframes lulu {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>

      <div className="loader fade-out">
        <h1>Vision</h1>
        <h1>Innovation</h1>
        <h1>Collaboration</h1>
      </div>
    </>
  );
};

export default Loader;