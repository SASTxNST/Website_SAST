/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import logo from "../Landing_media/SAST.png";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction = current - (previous || 0);
      if (current < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

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

  return (
    <>
      {/* Desktop Navbar */}
      <AnimatePresence mode="wait">
        <motion.header
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-fit"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1)]">
            <NavLink to="/" className="flex items-center mr-2">
              <img src={logo} alt="SAST Logo" className="w-8 h-8" />
            </NavLink>

            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => cn("relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200", isActive ? "text-blue-400 bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5")}>
                {item.name}
              </NavLink>
            ))}

            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-colors duration-200">
                Explore
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl overflow-hidden">
                  {exploreItems.map((item) => (
                    <NavLink key={item.path} to={item.path} className={({ isActive }) => cn("block px-4 py-2.5 text-sm transition-colors duration-200", isActive ? "text-blue-400 bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5")}>
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-colors duration-200">
                Community
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl overflow-hidden">
                  {communityItems.map((item) => (
                    <NavLink key={item.path} to={item.path} className={({ isActive }) => cn("block px-4 py-2.5 text-sm transition-colors duration-200", isActive ? "text-blue-400 bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5")}>
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <a href="https://nebula.sastclub.tech/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-colors duration-200">
              Nebula
            </a>

            <NavLink to={registerItem.path} className={({ isActive }) => cn("px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200", isActive ? "text-blue-400 bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5")}>
              {registerItem.name}
            </NavLink>

            <a href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="relative ml-2 px-4 py-1.5 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all duration-200">
              <span>Contact</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px h-px" />
            </a>
          </div>
        </motion.header>
      </AnimatePresence>

      {/* Mobile Navbar */}
      <div className="md:hidden px-6">
        <div className="fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-md border-b border-white/10 z-[9999]">
          <div className="flex items-center justify-between h-full px-6">
            <NavLink to="/" onClick={closeMenu} className="flex items-center">
              <img src={logo} alt="SAST Logo" className="w-12 h-12" />
            </NavLink>
            <button 
              onClick={toggleMenu} 
              className="relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${menuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}></span>
              <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 top-16 bg-black/95 backdrop-blur-lg z-[9998] overflow-y-auto"
          >
            <ul className="flex flex-col p-6 space-y-3 max-w-md mx-auto">
              <li className="pb-3 pl-2 mb-2 border-b border-white/10">
                <div className="text-lg font-bold text-white px-2">Menu</div>
              </li>

              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path} onClick={closeMenu} className={({ isActive }) => cn("block px-5 py-3.5 text-base font-medium rounded-xl transition-all duration-200", isActive ? "text-blue-400 bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5 hover:pl-6")}>
                    {item.name}
                  </NavLink>
                </li>
              ))}

              <li>
                <button onClick={toggleExplore} className="w-full flex items-center justify-between px-5 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 hover:pl-6">
                  Explore
                  <svg className={`w-5 h-5 transition-transform duration-300 ease-in-out ${exploreOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {exploreOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 ml-4 space-y-1 overflow-hidden"
                  >
                    {exploreItems.map((item) => (
                      <li key={item.path}>
                        <NavLink to={item.path} onClick={closeMenu} className={({ isActive }) => cn("block px-5 py-3 text-sm rounded-xl transition-all duration-200", isActive ? "text-blue-400 bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5 hover:pl-6")}>
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </li>

              <li>
                <button onClick={toggleCommunity} className="w-full flex items-center justify-between px-5 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 hover:pl-6">
                  Community
                  <svg className={`w-5 h-5 transition-transform duration-300 ease-in-out ${communityOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {communityOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 ml-4 space-y-1 overflow-hidden"
                  >
                    {communityItems.map((item) => (
                      <li key={item.path}>
                        <NavLink to={item.path} onClick={closeMenu} className={({ isActive }) => cn("block px-5 py-3 text-sm rounded-xl transition-all duration-200", isActive ? "text-blue-400 bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5 hover:pl-6")}>
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </li>

              <li>
                <a href="https://nebula.sastclub.tech/" target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="block px-5 py-3.5 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 hover:pl-6">
                  Nebula
                </a>
              </li>

              <li>
                <NavLink to={registerItem.path} onClick={closeMenu} className={({ isActive }) => cn("block px-5 py-3.5 text-base font-medium rounded-xl transition-all duration-200", isActive ? "text-blue-400 bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5 hover:pl-6")}>
                  {registerItem.name}
                </NavLink>
              </li>

              <li className='flex flex-col justify-center items-center px-2'>
                <a href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all" target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="w-1/2 px-3 py-3.5 text-base font-medium text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all duration-200 text-center shadow-lg hover:shadow-xl hover:scale-[1.02]">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Navbar;
