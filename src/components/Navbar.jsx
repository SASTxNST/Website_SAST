/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../index.css";
import logo from "../Landing_media/SAST.png";

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarHidden(currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((o) => !o);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`header ${isNavbarHidden ? "hidden-navbar" : ""}`}
        style={{ zIndex: 50 }}
      >
        <div
          className="container header-content"
          style={{ position: "relative", width: "100%" }}
        >
          <NavLink to="/" className="logo" onClick={closeMenu}>
            <img src={logo} alt="Logo" width="60" height="60" className="rounded-md" />
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

          <nav className={`main-nav ${menuOpen ? "active" : ""}`}>
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
              <li>
                <NavLink to="/news" onClick={closeMenu}>Astronomy News</NavLink>
              </li>
              <li>
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
