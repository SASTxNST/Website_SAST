/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import "../index.css";
import { Link } from "react-router-dom";
import Tars_png from "../Landing_media/TARS.jpg";
import MoonC_png from "../Landing_media/MoonC.webp";
import Cubesat2_png from "../Landing_media/Cubesatbg.jpg";
import Monocopter_png from "../Landing_media/monocopter.webp";
import Cubesat1_png from "../Landing_media/Cubesastr.jpeg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Projects = () => {
  const [filterType, setFilterType] = useState("all");
  const [atEnd, setAtEnd] = useState(false);
  const [rebuilding, setRebuilding] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    // Pin global navbar while on Projects page
    document.body.classList.add('pin-navbar');
    // Make navbar more transparent on projects page
    document.body.classList.add('projects-page');
    
    gsap.registerPlugin(ScrollTrigger);

    if (filterRef.current) {
      gsap.fromTo(
        filterRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 }
      );
    }

    const sections = gsap.utils.toArray(".project-section");

    sections.forEach((section) => {
      const imageEl = section.querySelector(".project-bg");
      const contentEl = section.querySelector(".project-content");

      if (contentEl) {
        gsap.fromTo(
          contentEl,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true
            }
          }
        );
      }

      if (imageEl) {
        gsap.to(imageEl, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: true
          }
        });
      }
    });

    // Note: snapping disabled to prevent jumps when switching filters

    // Stack-style cover transition: next fades/scales in, previous fades out
    sections.forEach((section, i) => {
      gsap.set(section, { opacity: i === 0 ? 1 : 0, scale: 1.01 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top+=1",
        onEnter: () =>
          gsap.to(section, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          }),
        onLeave: () =>
          gsap.to(section, {
            opacity: 0,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.inOut"
          }),
        onEnterBack: () =>
          gsap.to(section, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          }),
        onLeaveBack: () =>
          gsap.to(section, {
            opacity: 0,
            scale: 1.01,
            duration: 0.4,
            ease: "power2.in"
          })
      });
    });

    // Track if we're on the last slide to flip the arrow
    const updateAtEnd = () => {
      const all = Array.from(document.querySelectorAll('.project-section'));
      const last = all[all.length - 1];
      if (!last) return setAtEnd(false);
      const y = window.scrollY || window.pageYOffset;
      setAtEnd(y >= (last.offsetTop - 8));
    };
    updateAtEnd();
    window.addEventListener('scroll', updateAtEnd, { passive: true });
    window.addEventListener('resize', updateAtEnd);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener('scroll', updateAtEnd);
      window.removeEventListener('resize', updateAtEnd);
      document.body.classList.remove('pin-navbar');
      document.body.classList.remove('projects-page');
    };
  }, []);

  useEffect(() => {
    if (filterRef.current) {
      gsap.fromTo(filterRef.current, { scale: 0.98 }, { scale: 1, duration: 0.2, ease: "power2.out" });
    }
  }, [filterType]);

  // Project type constants for consistency
  const PROJECT_TYPES = {
    CURRENT: "current",
    UPCOMING: "upcoming",
    PAST: "past"
  };

  const projects = [
    { id: 1, title: "TARS AI", date: "2025-02-13", type: PROJECT_TYPES.CURRENT, imgSrc: Tars_png },
    { id: 2, title: "MOON CRAWLER", date: "2025-02-13", type: PROJECT_TYPES.CURRENT, imgSrc: MoonC_png },
    { id: 3, title: "SAT.V2", date: "2025-02-13", type: PROJECT_TYPES.CURRENT, imgSrc: Cubesat2_png },
    { id: 4, title: "VECTOR MONOCOPTER THRUSTER", date: "2026-02-13", type: PROJECT_TYPES.UPCOMING, imgSrc: Monocopter_png },
    { id: 5, title: "SAT.V1", date: "2024-11-12", type: PROJECT_TYPES.PAST, imgSrc: Cubesat1_png }
  ];

  const getFilteredProjects = () => {
    switch (filterType) {
      case "all":
        return projects;
      case "past":
        return projects.filter(project => project.type === PROJECT_TYPES.PAST);
      case "ongoing":
        return projects.filter(project => project.type === PROJECT_TYPES.CURRENT);
      case "future":
        return projects.filter(project => project.type === PROJECT_TYPES.UPCOMING);
      default:
        return [];
    }
  };

  const filtered = getFilteredProjects();

  const getProjectLink = (project) => {
    if (filterType === "ongoing" && project.type === PROJECT_TYPES.CURRENT && project.title === "MOON CRAWLER") {
      return "https://custom-link-for-moon-crawler.com";
    }
    return "https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/?viewAsMember=true";
  };

  // Reinitialize GSAP when filter changes to avoid stale triggers and blank states
  useEffect(() => {
    setRebuilding(true);
    // Temporarily lock scroll to prevent layout jumps while rebuilding triggers
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.scrollBehavior = 'auto';

    // Scroll to top so viewport isn't beyond new shorter content
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Kill any previous triggers
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const sections = gsap.utils.toArray('.project-section');

    // Content reveal per section
    sections.forEach((section, i) => {
      const imageEl = section.querySelector('.project-bg');
      const contentEl = section.querySelector('.project-content');

      // Reset initial visibility so first section shows
      gsap.set(section, { opacity: i === 0 ? 1 : 0, scale: 1.01 });

      if (contentEl) {
        gsap.fromTo(
          contentEl,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              once: true
            }
          }
        );
      }

      if (imageEl) {
        gsap.to(imageEl, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            scrub: true
          }
        });
      }

      // Stack-style transitions
      ScrollTrigger.create({
        trigger: section,
        start: 'top top+=1',
        onEnter: () =>
          gsap.to(section, {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out'
          }),
        onLeave: () =>
          gsap.to(section, {
            opacity: 0,
            scale: 1.02,
            duration: 0.45,
            ease: 'power2.inOut'
          }),
        onEnterBack: () =>
          gsap.to(section, {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out'
          }),
        onLeaveBack: () =>
          gsap.to(section, {
            opacity: 0,
            scale: 1.01,
            duration: 0.35,
            ease: 'power2.in'
          })
      });
    });

    // Update end-of-list indicator
    const updateAtEnd = () => {
      const all = Array.from(document.querySelectorAll('.project-section'));
      const last = all[all.length - 1];
      if (!last) return setAtEnd(false);
      const y = window.scrollY || window.pageYOffset;
      setAtEnd(y >= last.offsetTop - 8);
    };
    updateAtEnd();
    window.addEventListener('scroll', updateAtEnd, { passive: true });
    window.addEventListener('resize', updateAtEnd);

    // Refresh layout after DOM paint
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      // Restore scroll after refresh
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
      setRebuilding(false);
    });

    return () => {
      window.removeEventListener('scroll', updateAtEnd);
      window.removeEventListener('resize', updateAtEnd);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [filterType]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* Filter Buttons */}
      <div className="fixed top-[96px] left-1/2 transform -translate-x-1/2 z-[70] w-full max-w-md px-4" ref={filterRef}>
        <div className="flex items-center justify-center gap-3 m-4 p-3 rounded-full bg-black/30 border border-white/20 shadow-xl backdrop-blur-md">
          {["all", "past", "ongoing", "future"].map(type => (
            <button
              key={type}
              className={`flex-1 min-w-[70px] px-4 py-2 sm:py-3 text-white text-sm sm:text-lg leading-none rounded-full cursor-pointer transition-all duration-300 h-9 sm:h-12 flex items-center justify-center text-center ${
                filterType === type
                  ? "bg-white/30 font-semibold shadow-lg ring-2 ring-white/40"
                  : "bg-white/10 hover:bg-white/20"
              }`}
              onClick={(e) => {
                gsap.fromTo(e.currentTarget, { scale: 0.96 }, { scale: 1, duration: 0.18, ease: "power2.out" });
                setFilterType(type);
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Section - Stack style: each section sticks and next covers previous */}
      <section className="min-h-[100vh] " style={{ visibility: rebuilding ? 'hidden' : 'visible' }}>
        {filtered.map((project, idx) => (
          <div
            key={project.id}
            className="relative w-full h-screen sticky top-0 project-section"
            style={{ zIndex: filtered.length - idx }}
          >
              {/* Background Image */}
              <img
                src={project.imgSrc}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover project-bg"
              />
              {/* Light Overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Text Content */}
              <div className="absolute bottom-24 sm:bottom-40 left-6 sm:left-20 z-10 max-w-[90%] sm:max-w-xl text-left space-y-4 sm:space-y-6 project-content">
                <h6 className="text-base sm:text-2xl uppercase text-gray-300 tracking-wider">
                  {project.type === PROJECT_TYPES.PAST
                    ? "Past Project"
                    : project.type === PROJECT_TYPES.UPCOMING
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
      </section>

      {/* Down Arrow Indicator */}
      <button
        aria-label={atEnd ? "Scroll to top" : "Scroll to next project"}
        onClick={() => {
          if (atEnd) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          const sections = Array.from(document.querySelectorAll('.project-section'));
          const y = window.scrollY || window.pageYOffset;
          const next = sections.find((s) => s.offsetTop > y + 10);
          if (next) {
            window.scrollTo({ top: next.offsetTop, behavior: 'smooth' });
          }
        }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition animate-bounce"
      >
        {atEnd ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Projects;
