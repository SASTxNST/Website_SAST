import React, { useState, useEffect } from 'react';
import "../index.css";
import { Link } from "react-router-dom";
import Tars_png from "../Landing_media/TARS.jpg"
import MoonC_png from "../Landing_media/MoonC.webp"
import Cubesat2_png from "../Landing_media/Cubesatbg.jpg"
import Monocopter_png from "../Landing_media/monocopter.webp"
import Cubesat1_png from "../Landing_media/Cubesastr.jpeg"
import useLenis from '../utils/lenis'


const Projects = () => {
    const [filterType, setFilterType] = useState("all");
    useLenis();

    const projects = [
        { id: 1, title: "TARS AI", date: "2025-02-13", type: "current", imgSrc: Tars_png },
        { id: 2, title: "MOON CRAWLER", date: "2025-02-13", type: "current", imgSrc: MoonC_png },
        { id: 3, title: "SAT.V2", date: "2025-02-13", type: "current", imgSrc: Cubesat2_png },
        { id: 4, title: "VECTOR MONOCOPTER THRUSTER", date: "2026-02-13", type: "upcoming", imgSrc: Monocopter_png },
        { id: 5, title: "SAT.V1", date: "2024-11-12", type: "past", imgSrc: Cubesat1_png }
    ];

    // Function to filter projects
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

    return (
        <>
            {/* Filter Buttons */}
<div className="fixed top-40 right-120 left-120 z-50 align-center items-center">
  <div className="flex flex-row items-left justify-left gap-10 rounded-3xl backdrop-blur-sm shadow-[0_0_10px_rgba(250,250,250,0.3)] bg-white/10 px-4 py-4">
    <button
      className="w-28 h-12 rounded-4xl cursor-pointer opacity-80 hover:opacity-100 bg-white/20 text-white font-medium "
      onClick={() => setFilterType('all')}
    >
      All
    </button>
    <button
      className="w-28 h-12 rounded-4xl cursor-pointer opacity-80 hover:opacity-100 bg-white/20 text-white font-medium"
      onClick={() => setFilterType('past')}
    >
      Past
    </button>
    <button
      className="w-28 h-12 rounded-4xl cursor-pointer opacity-80 hover:opacity-100 bg-white/20 text-white font-medium"
      onClick={() => setFilterType('ongoing')}
    >
      Ongoing
    </button>
    <button
      className="w-28 h-12 rounded-4xl cursor-pointer opacity-80 hover:opacity-100 bg-white/20 text-white font-medium"
      onClick={() => setFilterType('future')}
    >
      Future
    </button>
  </div>
</div>



            {/* Project Section */}
            <section>
                <div className="projects">
                    {getFilteredProjects().map((project) => (
                        <div className="project h-200 w-380" key={project.id} data-date={project.date} style={{margin:"0",padding:"0"}}>
                            <img className='w-380 h-200 object-cover' src={project.imgSrc} alt={project.title} />
                            <div className="w-140 h-41 relative bottom-75 left-20">
                                <div className="w-full h-full flex flex-col justify-center">
                                    <h6 className="w-full h-8 text-m uppercase">{project.type === "past" ? "Past Project" : project.type === "upcoming" ? "Upcoming Project" : "Current Project"}</h6>
                                    <h1 className="text-5xl font-bold">{project.title}</h1>
                                </div>
                                <a href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/?viewAsMember=true">
                                    <div className="text-s font-bold border border-white-800 w-40 h-15 flex justify-center items-center hover:scale-105 transition duration-150">
                                        LEARN MORE
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Projects;
