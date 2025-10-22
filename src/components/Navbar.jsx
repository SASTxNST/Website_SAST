/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../Landing_media/SAST.png";

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
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
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src={logo} alt="Logo" width="60" height="60" className="rounded-md" />
          </Link>

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
              <li><Link to="/" onClick={closeMenu}>Home</Link></li>
              <li><Link to="/newsletter" onClick={closeMenu}>Newsletter</Link></li>
              <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
              <li><Link to="/projects" onClick={closeMenu}>Projects</Link></li>
              <li><Link to="/community/members" onClick={closeMenu}>Members</Link></li>
              <li className="nebula-link">
                <a href="https://nebula.sastclub.tech/" target="_blank" rel="noopener noreferrer">Nebula</a>
              </li>

              {/* Discover Dropdown */}
              <li className="dropdown">
                <button onClick={toggleDropdown} className="dropdown-toggle" type="button" aria-haspopup="true" aria-expanded={dropdownOpen}>
                  Discover
                </button>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/discover/images" onClick={() => { closeMenu(); setDropdownOpen(false); }}>Images</Link></li>
                    <li><Link to="/discover/videos" onClick={() => { closeMenu(); setDropdownOpen(false); }}>Videos</Link></li>
                    <li><Link to="/discover/events" onClick={() => { closeMenu(); setDropdownOpen(false); }}>Event Highlights</Link></li>
                    <li><Link to="/discover/recordings" onClick={() => { closeMenu(); setDropdownOpen(false); }}>Recordings</Link></li>
                  </ul>
                )}
              <li>
                <Link to="/" onClick={closeMenu}>Home</Link>
              </li>

              <li>
                <Link to="/newsletter" onClick={closeMenu}>Newsletter</Link>
              </li>
              <li>
                <Link to="/events" onClick={closeMenu}>Events</Link>
              </li>
              <li>
                <Link to="/projects" onClick={closeMenu}>Projects</Link>
              </li>
              <li>
                <Link to="/community/members" onClick={closeMenu}>Members</Link>
              </li>
               <li className="nebula-link">
                <a href="https://nebula.sastclub.tech/" target="_blank" rel="noopener noreferrer">
                  Nebula
                </a>
              </li>
              <li>
                <Link to="/contributors" onClick={closeMenu}>Contributors</Link>
              </li>
              <li>
                <Link to="/register" onClick={closeMenu}>Register</Link>
              </li>
              <li>
                <Link to="/news" onClick={closeMenu}>Astronomy News</Link>
              </li>
              <li>
                <Link to="/track" onClick={closeMenu}>Track</Link>
              </li>

              <li><Link to="/news" onClick={closeMenu}>Astronomy News</Link></li>
              <li><Link to="/track" onClick={closeMenu}>Track</Link></li>
              <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
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
