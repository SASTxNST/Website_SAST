import React, { useEffect, useState } from "react";
import "../index.css";
import logo from "../Landing_media/SAST.png";

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Set default to false

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsNavbarHidden(true);
      } else {
        setIsNavbarHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={`header ${isNavbarHidden ? "hidden-navbar" : ""}`}>
      <div className="container header-content">
        <a href="/" className="logo">
          <img src={logo} alt="Logo" width="60" height="60" />
        </a>

        {/* Navigation */}
        <nav className={`main-nav ${menuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li className="dropdown ">
              <a className="dropbtn">About</a>
              <div className="dropdown-content dc-1">
                <a href="#space-services">SATA Services</a>
                <a href="/team">Team</a>
              </div>
            </li>
            <li className="dropdown">
              <a className="dropbtn">Resources</a>
              <div className="dropdown-content dc-2">
                <a href="/newsletter">Newsletter</a>
                <a href="#products">Products</a>
                <a href="/merch">Merch</a>
              </div>
            </li>
            <li className="dropdown">
              <a className="dropbtn">Initiatives & Events</a>
              <div className="dropdown-content dc-3">
                <a href="/events">Events</a>
                <a href="/projects">Projects</a>
              </div>
            </li>
            <li className="dropdown">
              <a className="dropbtn">Get Involve</a>
              <div className="dropdown-content dc-4">
                <a href="/events">Contribute</a>
                <a href="/projects">Login</a>
              </div>
            </li>
          </ul>
        </nav>

        <a
          href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all"
          className="contact-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>

        {/* Hamburger Button */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
