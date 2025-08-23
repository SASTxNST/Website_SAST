/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../Landing_media/SAST.png";
import {
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <div>
        <footer className="bg-transparent text-white">
            <div className="w-full foot flex flex-wrap md:flex-nowrap justify-start items-start gap-0 px-6 h-80 border border-white/15">
            {/* Logo + Socials */}
            <div
                className="flex-shrink-0 flex flex-col items-center w-full md:min-w-[300px] md:w-auto h-full border-r border-white/15 pt-4 md:pt-0"
                style={{ borderRightColor: "rgba(255,255,255,0.1)" }}
            >
                <div className="foot_logo flex justify-center items-center mb-4 w-full h-[80%]">
                <img
                    className="w-full h-full object-cover opacity-70"
                    src={logo}
                    alt="Logo"
                />
                </div>

                <div className="social_icons flex justify-center items-center pt-4 w-full h-[30%] gap-9">
                <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:text-red-600 transition"
                    aria-label="YouTube"
                >
                    <FaYoutube />
                </a>
                <a
                    href="https://www.instagram.com/sast.rishihood/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:text-pink-600 transition"
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:text-blue-600 transition"
                    aria-label="LinkedIn"
                >
                    <FaLinkedinIn />
                </a>
                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:text-sky-400 transition"
                    aria-label="X"
                >
                    <FaTwitter />
                </a>
                </div>
            </div>

            {/* Sections - completely hidden below xl */}
            <div className="hidden xl:flex flex-wrap w-full h-full justify-center items-center text-center">
                {[
                {
                    title: "ABOUT",
                    items: [
                    "Mission",
                    "SAST Locations",
                    "History",
                    "FAQs",
                    "News & Events",
                    ],
                },
                {
                    title: "CAREERS",
                    items: [
                    "Career Finder",
                    "Benefits",
                    "Education",
                    "Training",
                    "Life in SAST",
                    ],
                },
                {
                    title: "CAPABILITIES",
                    items: [
                    "Protecting Satellites",
                    "Facilitating Launches",
                    "Education",
                    "Experience a Launch",
                    "Life in SAST",
                    ],
                },
                {
                    title: "HOW TO JOIN",
                    items: [
                    "What to Expect",
                    "For Families",
                    "Live Chat",
                    "Training",
                    "Life in SAST",
                    ],
                },
                ].map(({ title, items }, idx) => (
                <div
                    key={title}
                    className={`flex flex-col justify-center items-center gap-8 h-full min-w-[150px] flex-1 px-4 text-white
                ${idx === 0 ? "mr-4" : ""}
                ${idx !== 3 ? "border-r border-white/15" : ""}
            `}
                    style={{ borderRightColor: "rgba(255,255,255,0.1)" }}
                >
                    <h2 className="font-bold text-xl">{title}</h2>
                    {items.map((item) => (
                    <h4
                        key={item}
                        className="font-light text-sm cursor-pointer hover:underline whitespace-nowrap text-center"
                    >
                        {item}
                    </h4>
                    ))}
                </div>
                ))}
            </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-20 w-full flex flex-wrap justify-evenly items-center gap-2 px-6 bg-transparent">
            {[
                "SAST",
                "PRIVACY POLICY",
                "ACCESSIBILITY",
                "WATCH VIDEOS",
                "SITEMAP",
                "COOKIE SETTINGS",
            ].map((text) => (
                <div
                key={text}
                className="text-xs font-bold whitespace-nowrap cursor-pointer hover:underline"
                >
                {text}
                </div>
            ))}
            </div>
      </footer>
      
    </div>
  )
}

export default Footer
