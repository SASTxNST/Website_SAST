/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import "../index.css";
import { Link } from "react-router-dom";
import Tars_png from "../Landing_media/TARS.jpg";
import MoonC_png from "../Landing_media/MoonC.webp";
import Cubesat2_png from "../Landing_media/Cubesatbg.jpg";
import Monocopter_png from "../Landing_media/monocopter.webp";
import Cubesat1_png from "../Landing_media/Cubesastr.jpeg";

const Projects = () => {
  const [filterType, setFilterType] = useState("all");

  const projects = [
    { id: 1, title: "TARS AI", date: "2025-02-13", type: "current", imgSrc: Tars_png },
    { id: 2, title: "MOON CRAWLER", date: "2025-02-13", type: "current1", imgSrc: MoonC_png },
    { id: 3, title: "SAT.V2", date: "2025-02-13", type: "current", imgSrc: Cubesat2_png },
    { id: 4, title: "VECTOR MONOCOPTER THRUSTER", date: "2026-02-13", type: "upcoming", imgSrc: Monocopter_png },
    { id: 5, title: "SAT.V1", date: "2024-11-12", type: "past", imgSrc: Cubesat1_png }
  ];

  const getFilteredProjects = () => {
    if (filterType === "all") return projects;
    if (filterType === "past") return projects.filter(project => project.type === "past");
    if (filterType === "ongoing") return projects.filter(project => project.type === "current1");
    if (filterType === "future") return projects.filter(project => project.type === "upcoming") ;
    return [];
  };

  const filtered = getFilteredProjects();

  const getProjectLink = (project) => {
    if (filterType === "ongoing" && project.title === "MOON CRAWLER") {
      return "https://custom-link-for-moon-crawler.com";
    }
    return "https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/?viewAsMember=true";
  };

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Filter Buttons */}
      <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4">
        <div className="flex justify-center gap-4 m-6 p-4 rounded-full bg-white/10 shadow-[0_4px_15px_rgba(255,255,255,0.15)] backdrop-blur-sm opacity-35 hover:opacity-100 transition-opacity duration-300">
          {["all", "past", "ongoing", "future"].map(type => (
            <button
              key={type}
              className={`flex-1 min-w-[70px] py-2 sm:py-3 text-white text-sm sm:text-lg rounded-full cursor-pointer transition-all duration-300 h-10 sm:h-16 ${
                filterType === type
                  ? "bg-white/30 font-semibold shadow-lg"
                  : "bg-transparent hover:bg-white/20"
              }`}
              onClick={() => setFilterType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Section */}
      <section className="h-screen ">
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="relative w-full h-screen snap-start"
            >
              {/* Background Image */}
              <img
                src={project.imgSrc}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Light Overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Text Content */}
              <div className="absolute bottom-24 sm:bottom-40 left-6 sm:left-20 z-10 max-w-[90%] sm:max-w-xl text-left space-y-4 sm:space-y-6">
                <h6 className="text-base sm:text-2xl uppercase text-gray-300 tracking-wider">
                  {project.type === "past"
                    ? "Past Project"
                    : project.type === "upcoming"
                    ? "Upcoming Project"
                    : "Current Project"}
                </h6>
                <h1 className="text-2xl sm:text-6xl font-bold text-white">
                  {project.title}
                </h1>
                <a
                  href={getProjectLink(project)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learn_more h-15 w-40 sm:w-48 ml-1 sm:ml-4 text-sm sm:text-xl font-bold border border-white px-4 py-2 sm:px-8 sm:py-3 hover:scale-105 transition duration-150 flex justify-center items-center gap-1"
                >
                  <p>LEARN </p>
                  <p>MORE</p>
                </a>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
