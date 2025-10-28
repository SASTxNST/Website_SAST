/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../Landing_media/SAST.png";
import {
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaRocket,
  FaSatellite,
  FaGlobe,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative w-full mt-32">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50"></div>
      
      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section with proper spacing */}
        <div className="w-full px-12 py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              
              {/* Brand Section */}
              <div className="lg:col-span-1 flex flex-col">
                <div className="mb-6">
                  <img
                    src={logo}
                    alt="SAST Logo"
                    className="h-14 w-auto"
                  />
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-8 max-w-xs">
                  Society for Aerospace and Space Technology - Pioneering the future of space exploration and aerospace innovation.
                </p>
                
                {/* Social Media Icons */}
                <div className="flex items-center space-x-3">
                  <a
                    href="https://www.linkedin.com/company/society-for-aerospace-and-space-technology/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 rounded-lg bg-white/5 hover:bg-blue-500/20 transition-all duration-200 border border-white/10 hover:border-blue-500/40"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn className="text-lg text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://www.instagram.com/sast.rishihood/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 rounded-lg bg-white/5 hover:bg-pink-500/20 transition-all duration-200 border border-white/10 hover:border-pink-500/40"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-lg text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 rounded-lg bg-white/5 hover:bg-red-500/20 transition-all duration-200 border border-white/10 hover:border-red-500/40"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="text-lg text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 rounded-lg bg-white/5 hover:bg-sky-500/20 transition-all duration-200 border border-white/10 hover:border-sky-500/40"
                    aria-label="X (Twitter)"
                  >
                    <FaTwitter className="text-lg text-white group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Explore Section */}
              <div className="flex flex-col">
                <div className="mb-7">
                  <h3 className="text-base font-semibold text-white flex items-center space-x-2 tracking-wide">
                    <FaRocket className="text-blue-400 text-lg" />
                    <span>Explore</span>
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Mission & Vision",
                    "Our History",
                    "News & Events",
                    "Projects",
                    "Gallery",
                    "Locations",
                  ].map((item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center"
                      >
                        <span className="w-0 h-0.5 bg-blue-400 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Section */}
              <div className="flex flex-col">
                <div className="mb-7">
                  <h3 className="text-base font-semibold text-white flex items-center space-x-2 tracking-wide">
                    <FaSatellite className="text-purple-400 text-lg" />
                    <span>Resources</span>
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Documentation",
                    "Research Papers",
                    "Tutorials",
                    "Contribute",
                    "Member Portal",
                    "Training Programs",
                  ].map((item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center"
                      >
                        <span className="w-0 h-0.5 bg-purple-400 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get Involved Section */}
              <div className="flex flex-col">
                <div className="mb-7">
                  <h3 className="text-base font-semibold text-white flex items-center space-x-2 tracking-wide">
                    <FaGlobe className="text-green-400 text-lg" />
                    <span>Get Involved</span>
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Join Our Team",
                    "Become a Member",
                    "Partnership",
                    "Volunteer",
                    "Contact Us",
                    "FAQs",
                  ].map((item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center"
                      >
                        <span className="w-0 h-0.5 bg-green-400 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with professional styling */}
        <div className="w-full px-12 py-8 border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Left side - Copyright */}
              <div className="flex items-center text-sm text-gray-400">
                <span className="text-white font-medium">© 2024 SAST.</span>
                <span className="mx-1">All rights reserved.</span>
              </div>
              
              {/* Right side - Links */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-400">
                <a 
                  href="#" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Accessibility
                </a>
                <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Sitemap
                </a>
                <div className="w-0.5 h-0.5 bg-gray-500 rounded-full"></div>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200 flex items-center space-x-1.5 group"
                >
                  <FaGithub className="group-hover:scale-110 transition-transform" />
                  <span>Open Source</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle decorative top border */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </footer>
  );
}

export default Footer;
