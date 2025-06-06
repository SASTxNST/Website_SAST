import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Tars_png from "../Landing_media/TARS.jpg";
import MoonC_png from "../Landing_media/MoonC.webp";
import Cubesat2_png from "../Landing_media/Cubesatbg.jpg";
import Monocopter_png from "../Landing_media/monocopter.webp";
import Cubesat1_png from "../Landing_media/Cubesastr.jpeg";

const Projects = () => {
  const [filterType, setFilterType] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const projects = [
    { id: 1, title: "TARS AI", date: "2025-02-13", type: "current", imgSrc: Tars_png },
    { id: 2, title: "MOON CRAWLER", date: "2025-02-13", type: "current", imgSrc: MoonC_png },
    { id: 3, title: "SAT.V2", date: "2025-02-13", type: "current", imgSrc: Cubesat2_png },
    { id: 4, title: "VECTOR MONOCOPTER THRUSTER", date: "2026-02-13", type: "upcoming", imgSrc: Monocopter_png },
    { id: 5, title: "SAT.V1", date: "2024-11-12", type: "past", imgSrc: Cubesat1_png }
  ];

  const getFilteredProjects = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    return projects.filter(({ date }) => {
      if (filterType === "all") return true;
      if (filterType === "past") return date < currentDate;
      if (filterType === "ongoing") return date === currentDate;
      if (filterType === "future") return date > currentDate;
      return false;
    });
  };

  const filtered = getFilteredProjects();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filtered.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [filtered.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.offsetWidth * currentIndex,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full bg-black text-white overflow-hidden">
      {/* Filter Buttons */}
      <div className="fixed top-[120px] left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4">
        <div
          className="flex justify-center gap-4 m-6 p-4 rounded-full bg-white/10 shadow-[0_4px_15px_rgba(255,255,255,0.15)] backdrop-blur-sm opacity-35 hover:opacity-100 transition-opacity duration-300"
        >
          {["all", "past", "ongoing", "future"].map(type => (
            <button
              key={type}
              className={`flex-1 min-w-[70px] py-3 text-white text-base sm:text-lg rounded-full cursor-pointer transition-all duration-300 h-10 sm:h-16 ${
                filterType === type
                  ? "bg-white/30 font-semibold shadow-lg"
                  : "bg-transparent hover:bg-white/20"
              }`}
              onClick={() => {
                setFilterType(type);
                setCurrentIndex(0);
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Slideshow */}
      <section className="pt-[15vh]">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full h-[100vh]"
        >
          {filtered.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 snap-center w-screen h-screen relative"
            >
              <img
                src={project.imgSrc}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-20 left-10 sm:left-10 md:left-16 w-[85%] max-w-xl p-6 rounded-md">
                <p className="text-2xl sm:text-sm uppercase text-gray-300">
                  {project.type === "past" ? "Past Project" :
                   project.type === "upcoming" ? "Upcoming Project" : "Current Project"}
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{project.title}</h2>
                <Link to="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/?viewAsMember=true">
                  <div className="mt-3 inline-block text-xl sm:text-sm md:text-base px-4 py-2 hover:text-black transition rounded">
                    Learn More
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
