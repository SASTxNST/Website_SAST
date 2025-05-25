import React from "react";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ExternalLink,
  Home,
  Calendar,
  Users,
  Briefcase,
  ShoppingBag,
  Mail,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import "../index.css";
import "./Navbar.css";
import logo from "../Landing_media/SAST.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(currentScrollY / windowHeight, 1);

      setScrollProgress(progress);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
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

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      description: "Return to homepage",
    },
    {
      href: "#space-service",
      label: "Services",
      icon: Briefcase,
      description: "Our space technology services",
      hasDropdown: true,
      dropdownItems: [
        { href: "#research", label: "Research & Development" },
        { href: "#consulting", label: "Space Consulting" },
        { href: "#technology", label: "Technology Solutions" },
      ],
    },
    {
      href: "/newsletter",
      label: "Newsletter",
      icon: Mail,
      description: "Stay updated with our latest news",
    },
    {
      href: "#products",
      label: "Products",
      icon: Briefcase,
      description: "Explore our space products",
    },
    {
      href: "/events",
      label: "Events",
      icon: Calendar,
      description: "Upcoming space events",
    },
    {
      href: "/projects",
      label: "Projects",
      icon: Briefcase,
      description: "Our space projects",
    },
    {
      href: "/team",
      label: "Team",
      icon: Users,
      description: "Meet our space experts",
    },
    {
      href: "/merch",
      label: "Shop",
      icon: ShoppingBag,
      description: "SAST merchandise store",
    },
  ];

  const navbarVariants = {
    visible: {
      y: 0,
      opacity: 1,
      backdropFilter: "blur(20px)",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))",
      transition: {
        duration: 0.6,
        ease: "easeOut",
        rotate: {
          duration: 0.8,
          ease: "easeInOut",
        },
      },
    },
  };

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      backdropFilter: "blur(20px)",
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
        delayChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
        staggerDirection: -1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    closed: {
      opacity: 0,
      x: 20,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: scrollProgress }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1 }}
      />

      <motion.header
        className={`navbar-header ${isNavbarHidden ? "hidden-navbar" : ""}`}
        variants={navbarVariants}
        animate={isNavbarHidden ? "hidden" : "visible"}
        initial="visible"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                className="logo-container"
                variants={logoVariants}
                whileHover="hover"
              >
                <motion.img
                  src={logo}
                  alt="SAST Logo"
                  width="50"
                  height="50"
                  className="logo-image"
                />
                <motion.div
                  className="logo-overlay"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.div
                className="logo-text-container"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="logo-title">SAST</h1>
                <p className="logo-subtitle">Space Technology</p>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.href}
                    className="nav-item-wrapper"
                    onMouseEnter={() =>
                      item.hasDropdown && setActiveDropdown(item.label)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <motion.a
                        href={item.href}
                        className="nav-item"
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={item.description}
                      >
                        {/* Hover Effect Background */}
                        <motion.div
                          className="nav-item-bg"
                          transition={{ duration: 0.3 }}
                        />

                        {/* Content */}
                        <motion.div
                          className="nav-item-content"
                          whileHover={{ x: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconComponent size={16} className="nav-item-icon" />
                          <span className="nav-item-text">{item.label}</span>
                          {item.hasDropdown && (
                            <ChevronDown
                              size={14}
                              className="nav-item-chevron"
                            />
                          )}
                        </motion.div>

                        {/* Sparkle Effect on Hover */}
                        <motion.div
                          className="nav-item-sparkle"
                          initial={{ scale: 0, rotate: 0 }}
                          whileHover={{ scale: 1, rotate: 180 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Sparkles size={12} className="text-blue-400" />
                        </motion.div>
                      </motion.a>
                    </motion.div>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === item.label && (
                        <motion.div
                          className="dropdown-menu"
                          variants={dropdownVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          {item.dropdownItems?.map((dropdownItem, idx) => (
                            <motion.a
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="dropdown-item"
                              whileHover={{ x: 4 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              {dropdownItem.label}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Contact Button */}
              <motion.a
                href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all"
                className="contact-button"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                aria-label="Contact us on LinkedIn"
              >
                {/* Animated Background */}
                <motion.div
                  className="contact-button-bg"
                  transition={{ duration: 0.3 }}
                />

                <motion.span
                  className="contact-button-text"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Contact
                </motion.span>
                <motion.div
                  whileHover={{ x: 2, rotate: 15 }}
                  transition={{ duration: 0.2 }}
                  className="contact-button-icon"
                >
                  <ExternalLink size={16} />
                </motion.div>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                className="mobile-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <motion.div
                  className="mobile-menu-button-bg"
                  transition={{ duration: 0.3 }}
                />

                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mobile-menu-icon"
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mobile-menu-icon"
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.nav
                className="mobile-menu-nav"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      variants={itemVariants}
                      className="mobile-nav-item"
                    >
                      <motion.a
                        href={item.href}
                        className="mobile-nav-link"
                        onClick={() => setMenuOpen(false)}
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={item.description}
                      >
                        <motion.div
                          className="mobile-nav-link-bg"
                          transition={{ duration: 0.3 }}
                        />

                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                          className="mobile-nav-icon"
                        >
                          <IconComponent size={22} />
                        </motion.div>
                        <div className="mobile-nav-content">
                          <span className="mobile-nav-title">{item.label}</span>
                          <p className="mobile-nav-description">
                            {item.description}
                          </p>
                        </div>
                      </motion.a>
                    </motion.div>
                  );
                })}

                {/* Mobile Contact Button */}
                <motion.div
                  variants={itemVariants}
                  className="mobile-contact-container"
                >
                  <motion.a
                    href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all"
                    className="mobile-contact-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Contact us on LinkedIn"
                  >
                    <motion.div
                      className="mobile-contact-button-bg"
                      transition={{ duration: 0.3 }}
                    />

                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="mobile-contact-icon"
                    >
                      <ExternalLink size={20} />
                    </motion.div>
                    <span className="mobile-contact-text">Contact Us</span>
                  </motion.a>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
