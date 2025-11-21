import React from "react";
import {
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

// Import your logo - update the path as needed
import logo from "../Landing_media/SAST.png";

function Footer() {
  const sections = [
    {
      title: "ABOUT",
      items: ["Mission", "Locations", "History", "FAQs", "News"],
    },
    {
      title: "CAREERS",
      items: ["Career Finder", "Benefits", "Education", "Training", "Life at SAST"],
    },
    {
      title: "CAPABILITIES",
      items: ["Satellites", "Launches", "Education", "Experience", "Innovation"],
    },
    {
      title: "JOIN US",
      items: ["Expectations", "For Families", "Chat", "Training", "Culture"],
    },
  ];

  const socialLinks = [
    { Icon: FaYoutube, href: "https://youtube.com", color: "hover:text-red-500", label: "YouTube" },
    { Icon: FaInstagram, href: "https://www.instagram.com/sast.rishihood/", color: "hover:text-pink-500", label: "Instagram" },
    { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/society-for-aerospace-and-space-technology/?viewAsMember=true", color: "hover:text-blue-500", label: "LinkedIn" },
    { Icon: FaTwitter, href: "https://x.com", color: "hover:text-sky-400", label: "X" },
  ];

  const bottomLinks = [
    "Privacy Policy",
    "Accessibility",
    "Sitemap",
    "Cookie Settings",
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black/40 via-black/60 to-black text-white w-full overflow-hidden">
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      {/* Main Footer Content */}
      <div className="relative z-10 w-full px-8 lg:px-16 xl:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 xl:gap-12">
          
          {/* Logo & Social Section */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-10">
            <div className="space-y-8 pb-2">
              {/* Logo with SAST text */}
              <div className="flex flex-col gap-4 group cursor-pointer">
                {/* Logo with glow effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl group-hover:bg-blue-400/40 transition-all duration-500"></div>
                  <img 
                    src={logo} 
                    alt="SAST Logo" 
                    className="relative h-20 w-20 object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  />
                </div>
                {/* SAST Text - Futuristic Style */}
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 group-hover:tracking-wide transition-all duration-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    SAST
                  </div>
                  <div className="text-xs font-light tracking-[0.3em] text-cyan-400/80 uppercase">
                    Society for Aerospace & Space Technology
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs font-light">
                Pioneering aerospace innovation and space exploration for a better tomorrow.
              </p>
            </div>
            
            {/* Social Icons - Futuristic Style */}
            <div className="flex gap-5">
              {socialLinks.map(({ Icon, href, color, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative w-11 h-11 flex items-center justify-center rounded-full border border-cyan-400/30 text-white/80 ${color} hover:border-cyan-400/60 transition-all duration-300 hover:scale-110 hover:-translate-y-1 backdrop-blur-sm bg-white/5 group`}
                  aria-label={label}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/0 to-blue-500/0 group-hover:from-cyan-400/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
                  <Icon className="relative text-lg z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections - Futuristic Design */}
          {sections.map(({ title, items }) => (
            <div key={title} className="space-y-6">
              <h3 className="text-base font-bold tracking-[0.2em] text-cyan-300 pb-2 border-b border-cyan-500/20 relative">
                {title}
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
              </h3>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item} className="group">
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-cyan-300 transition-all duration-300 inline-flex items-center gap-2 relative font-light"
                    >
                      <span className="w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-4 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 relative">
                        {item}
                        <span className="absolute inset-0 blur-sm bg-cyan-400/0 group-hover:bg-cyan-400/20 transition-all duration-300"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Futuristic Divider */}
      <div className="relative z-10 w-full px-8 lg:px-16 xl:px-24">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent relative">
          <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
        </div>
      </div>

      {/* Bottom Bar - Futuristic */}
      <div className="relative z-10 w-full px-8 lg:px-16 xl:px-24 py-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-light">
            © {new Date().getFullYear()} SAST. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            {bottomLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-gray-500 hover:text-cyan-400 transition-all duration-300 relative group font-light tracking-wider"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;