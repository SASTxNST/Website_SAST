import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../Landing_media/SAST.png";
import { useAuth } from "../contexts/authContext";

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`header ${isNavbarHidden ? "hidden-navbar" : ""}`}>
        <div className="container header-content">
          <a href="/" className="logo">
            <img src={logo} alt="Logo" width="60" height="60" />
          </a>

          <nav className={`main-nav ${menuOpen ? "active" : ""}`}>
            <ul className="nav-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#space-service">SAST Services</a>
              </li>
              <li>
                <a href="/newsletter">Newsletter</a>
              </li>
              <li>
                <a href="#products">Products</a>
              </li>
              <li>
                <a href="/events">Events</a>
              </li>
              <li>
                <a href="/projects">Projects</a>
              </li>
              <li>
                <a href="/team">Team</a>
              </li>
              <li>
                <Link to="/contributions">Contribute</Link>
              </li>
              {/* <li className="text-s"><a href="/merch">Shop</a></li> */}
              {currentUser ? (
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
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
        </div>
      </header>
    </>
  );
};

export default Navbar;
