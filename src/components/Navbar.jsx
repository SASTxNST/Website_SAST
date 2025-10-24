/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../index.css";
import logo from "../Landing_media/SAST.png";

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : true);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarHidden(currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((o) => !o);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`header ${isNavbarHidden ? "hidden-navbar" : ""} `}
        style={{ zIndex: 50 }}
      >
        <div
          className="container header-content w-max flex justify-between items-center gap-8"
          style={{ position: "relative", width: "100%" }}
          
        >
          <NavLink to="/" className="logo" onClick={closeMenu}>
  <img
    src={logo}
    alt="Logo"
    className="logo-img rounded-md"
  />
</NavLink>

          {isMobile && (
            <button
              className={`hamburger-menu ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          )}

          <nav className={`main-nav ${menuOpen ? "active" : ""} flex justify-center items-center w-max `}>
            <ul className="nav-links">

             
              <li><NavLink to="/docs" onClick={closeMenu}>Docs</NavLink></li>

              <li>
                <NavLink to="/" onClick={closeMenu}>Home</NavLink>
              </li>

              <li>
                <NavLink to="/newsletter" onClick={closeMenu}>Newsletter</NavLink>
              </li>
              <li>
                <NavLink to="/events" onClick={closeMenu}>Events</NavLink>
              </li>
              <li>
                <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
              </li>
              <li>
                <NavLink to="/community/members" onClick={closeMenu}>Members</NavLink>
              </li>
               <li className="nebula-link">
                <a href="https://nebula.sastclub.tech/" target="_blank" rel="noopener noreferrer">
                  Nebula
                </a>
              </li>
              <li>
                <NavLink to="/contributors" onClick={closeMenu}>Contributors</NavLink>
              </li>
              <li>
                <NavLink to="/register" onClick={closeMenu}>Register</NavLink>
              </li>
              <li className="w-max">
                <NavLink to="/news" onClick={closeMenu} >Astronomy News</NavLink>
              </li>
              <li className="">
                <NavLink to="/track" onClick={closeMenu}>Track</NavLink>
              </li>


            </ul>
          </nav>

          {!isMobile && (
            <a
              href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all"
              className="contact-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
