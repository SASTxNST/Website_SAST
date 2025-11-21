import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const [stars, setStars] = useState([]);

  // Generate random stars for background
  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: 150 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      }));
    };
    setStars(generateStars());
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center max-w-5xl mx-auto relative z-10">
        {/* 404 with Globe */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          <div className="text-[4rem] xs:text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-bold leading-none text-neutral-100">
            4
          </div>

          {/* Globe Image */}
          <div className="relative flex-shrink-0">
            <img
              src="https://img.freepik.com/free-photo/beautiful-glowing-gray-full-moon_181624-59870.jpg?t=st%3D1761801711~exp%3D1761805311~hmac%3D49a04bbffe10cb1d0b06ddbe2632ec96891b430fd54759ca5ad7243498767ccc&w=2000"
              alt="Earth from space"
              className="w-16 h-16 xs:w-20 xs:h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover"
            />
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl -z-10"></div>
          </div>

          <div className="text-[4rem] xs:text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-bold text-neutral-100 leading-none">
            4
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6 px-4">
          Oops! Lost in Space
        </h1>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Go Back Button */}
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gray-200 hover:bg-white text-black text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
        >
          <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          <span>Go Home</span>
        </button>
      </div>
    </div>
  );
}