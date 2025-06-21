import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../Landing_media/SAST.png";

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarHidden(currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
useEffect(() => {
  const dropdown = document.getElementById("dropdown");
  const menu = document.getElementById("dropdownMenu");

  if (!dropdown || !menu) return;

  let hideTimeout;

  const handleEnter = () => {
    clearTimeout(hideTimeout);
    menu.classList.add("show");
  };

  const handleLeave = () => {
    hideTimeout = setTimeout(() => {
  menu.classList.remove("show");
}, 200);

  };

  dropdown.addEventListener("mouseenter", handleEnter);
  dropdown.addEventListener("mouseleave", handleLeave);

  return () => {
    dropdown.removeEventListener("mouseenter", handleEnter);
    dropdown.removeEventListener("mouseleave", handleLeave);
  };
}, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className={`header ${isNavbarHidden ? "hidden-navbar" : ""}`}>
        <div className="container header-content">
          <a href="/" className="logo">
            <img
              src={logo}
              alt="Logo"
              width="60"
              height="60"
              className="rounded-md"
            />
          </a>

          {isMobile && (
            <button className={`hamburger-menu ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          )}

       <nav className={`main-nav ${menuOpen ? "active" : ""}`}>
  <ul className="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/events">Events</a></li>
    <li><a href="/projects">Projects</a></li>
    <li className="dropdown" id="dropdown">
      <span className="explore">Explore</span>
      <ul className="dropdown-content" id="dropdownMenu">
        <li><a href="/newsletter">Newsletter</a></li>
        <li><a href="/team">Team</a></li>
        <li><a href="/news">Astronomy News</a></li>
        <li><a href="/track">Track</a></li>
      </ul>
    </li>

    <li>
      <Link to="/login" className="login_bt">Login</Link>
    </li>
  </ul>
</nav>

              {/* <li><a href="#products">Products</a></li> */}

              {/* <li><Link to="/contributions">Contribute</Link></li> */}
              {/* <li className="text-s"><a href="/merch">Shop</a></li> */}
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

