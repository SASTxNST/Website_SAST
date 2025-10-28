/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../Landing_media/SAST.png";

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Docs", path: "/docs" },
  ];

  const exploreItems = [
    { name: "Events", path: "/events" },
    { name: "Projects", path: "/projects" },
    { name: "Astronomy News", path: "/news" },
    { name: "Track", path: "/track" },
  ];

  const communityItems = [
    { name: "Members", path: "/community/members" },
    { name: "Contributors", path: "/contributors" },
    { name: "Newsletter", path: "/newsletter" },
  ];

  const registerItem = { name: "Register", path: "/register" };

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setScrolled(currentScrollY > 8);
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        setMenuOpen(false);
        setExploreOpen(false);
        setCommunityOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setExploreOpen(false);
        setCommunityOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((o) => !o);
  const closeMenu = () => {
    setMenuOpen(false);
    setExploreOpen(false);
    setCommunityOpen(false);
  };

  const toggleExplore = () => setExploreOpen((o) => !o);
  const toggleCommunity = () => setCommunityOpen((o) => !o);

  // Close any open menus when the route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <header className={`navbar-header ${isNavbarHidden ? "hidden" : ""} ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-content">
        {/* Logo */}
        <NavLink to="/" onClick={closeMenu} className="navbar-logo" aria-label="Go to home">
          <img src={logo} alt="SAST Logo" width="60" height="60" />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {item.name}
            </NavLink>
          ))}

          {/* Explore Dropdown */}
          <div className="dropdown">
            <button className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
              Explore
              <svg
                className="dropdown-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="dropdown-menu">
              {exploreItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `dropdown-item ${isActive ? "active" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Community Dropdown */}
          <div className="dropdown">
            <button className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
              Community
              <svg
                className="dropdown-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="dropdown-menu">
              {communityItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `dropdown-item ${isActive ? "active" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <a
            href="https://nebula.sastclub.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="nebula-link"
          >
            Nebula
          </a>

          <NavLink
            to={registerItem.path}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {registerItem.name}
          </NavLink>
        </nav>

        {/* Contact Button - Desktop */}
        <a
          href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          Contact
        </a>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className={`hamburger-menu ${menuOpen ? "open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile Menu */}
        <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? "active" : ""}`}>
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item mobile-nav-header">
              <div className="mobile-nav-header-title">Menu</div>
            </li>

            {navItems.map((item) => (
              <li key={item.path} className="mobile-nav-item">
                <NavLink
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? "active" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            {/* Mobile Explore Dropdown */}
            <li className="mobile-nav-item">
              <button onClick={toggleExplore} className="mobile-dropdown-toggle">
                Explore
                <svg
                  className={`mobile-dropdown-icon ${exploreOpen ? "open" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {exploreOpen && (
                <ul className="mobile-dropdown-menu">
                  {exploreItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `mobile-dropdown-item ${isActive ? "active" : ""}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Mobile Community Dropdown */}
            <li className="mobile-nav-item">
              <button
                onClick={toggleCommunity}
                className="mobile-dropdown-toggle"
              >
                Community
                <svg
                  className={`mobile-dropdown-icon ${communityOpen ? "open" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {communityOpen && (
                <ul className="mobile-dropdown-menu">
                  {communityItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `mobile-dropdown-item ${isActive ? "active" : ""}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className="mobile-nav-item">
              <a
                href="https://nebula.sastclub.tech/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mobile-nebula-link"
              >
                Nebula
              </a>
            </li>

            <li className="mobile-nav-item">
              <NavLink
                to={registerItem.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
              >
                {registerItem.name}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
