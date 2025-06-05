import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../index.css";
import logo from "../Landing_media/SAST.png";

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarHidden(currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSidebar = () => setMenuOpen(false);

  return (
    <>

      {/* Top Navbar - Hidden when sidebar is open */}
      {!menuOpen && (
        <header className={`header ${isNavbarHidden ? "hidden-navbar" : ""}`}>
          <div className="container header-content">
            <a href="/" className="logo">
              <img src={logo} alt="Logo" width="60" height="60" />
            </a>

            {/* Desktop Navigation */}
            <nav className="main-nav hidden md:block">
              <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="#space-service">SAST Services</a></li>
                <li><a href="/newsletter">Newsletter</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/team">Team</a></li>
                <li><Link to="/contributions">Contribute</Link></li>
                <Link to="/login">Login</Link>
              </ul>
            </nav>

            {/* Hamburger Icon - Mobile */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
                <Menu size={28} />
              </button>
            </div>

            {/* Contact Button */}
            <a
              href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all"
              className="contact-button hidden md:inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </div>
        </header>
      )}{/* Sidebar for Mobile */}
<div
  className={`fixed top-0 left-0 h-full w-44 bg-[#0c1a2b80] text-white shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  } md:hidden`}
>
  <div className="flex items-center justify-between px-3 py-2 border-b border-gray-600">
    <img src={logo} alt="Logo" width="40" height="40" />
    <button onClick={closeSidebar} aria-label="Close Menu">
      <X size={20} />
    </button>
  </div>


  <nav className="flex flex-col px-4 py-4 space-y-3 text-sm font-medium">
    <a href="/" onClick={closeSidebar} className="hover:text-blue-400">Home</a>
    <a href="#space-service" onClick={closeSidebar} className="hover:text-blue-400">SAST Services</a>
    <a href="/newsletter" onClick={closeSidebar} className="hover:text-blue-400">Newsletter</a>
    <a href="#products" onClick={closeSidebar} className="hover:text-blue-400">Products</a>
    <a href="/events" onClick={closeSidebar} className="hover:text-blue-400">Events</a>
    <a href="/projects" onClick={closeSidebar} className="hover:text-blue-400">Projects</a>
    <a href="/team" onClick={closeSidebar} className="hover:text-blue-400">Team</a>
    <Link to="/contributions" onClick={closeSidebar} className="hover:text-blue-400">Contribute</Link>
    <Link to="/login" onClick={closeSidebar} className="hover:text-blue-400">Login</Link>
    <a
      href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all"
      target="_blank"
      rel="noopener noreferrer"
      onClick={closeSidebar}
      className="text-blue-400 hover:underline"
    >
      Contact
    </a>
  </nav>
</div>

       {/* Backdrop behind sidebar */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default Navbar;
