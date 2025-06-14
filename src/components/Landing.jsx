import React, { useEffect } from "react";
import "../index.css";
import videoSource from "../Landing_media/newmaoinsast.mp4";
import videosource2 from "../Landing_media/Platforms_mobile.mp4";
import videosource3 from "../Landing_media/DeskSat_scrub.mp4";
import videosource4 from "../Landing_media/Modules_scrub.mp4";
import videosource5 from "../Landing_media/spacerealastro.mov";
import img1 from "../Landing_media/All-possible-through-our-state-of-the-art-space-service-2160x2170-4-2160x1660.webp";
import img2 from "../Landing_media/frequent_lines.webp";
import logo from "../Landing_media/SAST.png";
import helmet_png from "../Landing_media/helm.jpg";

import useLenis from '../utils/lenis'
import { FaYoutube, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";


const Landing = () => {
  useLenis();
  useEffect(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }

    const navbar = document.querySelector(".header");
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (navbar) {
        navbar.style.transform =
          currentScrollY > lastScrollY ? "translateY(-200%)" : "translateY(0)";
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    const imageWrapper = document.querySelector(".image-wrapper");
    if (imageWrapper) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            imageWrapper.classList.toggle("animate", entry.isIntersecting);
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(imageWrapper);
    }

    const hoverVideo = document.getElementById("hoverVideo");
    if (hoverVideo) {
      hoverVideo.addEventListener("mouseenter", () => hoverVideo.play());
      hoverVideo.addEventListener("mouseleave", () => hoverVideo.pause());
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (menuToggle && navLinks) {
        menuToggle.removeEventListener("click", () => {
          navLinks.classList.toggle("active");
        });
      }
      if (hoverVideo) {
        hoverVideo.removeEventListener("mouseenter", () => hoverVideo.play());
        hoverVideo.removeEventListener("mouseleave", () => hoverVideo.pause());
      }
    };
  }, []);

  return (
    <>
      <main>
        <section className="hero">
          <div className="black_space">
            <video autoPlay loop muted playsInline>
              <source src={videosource5} type="video/mp4" />
            </video>
          </div>
          <div className="container">
            <p className="subtitle p_classname">
              Pioneering Space <br /> and Beyond
            </p>
            <h1 className="main-heading">
              INSPIRING
              <br />
              NEXT GENERATION
              <br />
              OF SPACE EXPLORERS...
            </h1>
          </div>
        </section>

        <section className="video-section">
          <div className="video">
            <video id="myVideo" loop autoPlay muted playsInline>
              <source src={videoSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className="text-section" id="scrollText">
          <p className="space-text opacity-80 hover:opacity-100">
            Space exploration and technology have traditionally been exclusive
            to Governments, large organizations and elite institutions, but SAST
            is dedicated to breaking these barriers and making the cosmos
            accessible to all..
          </p>
        </section>

        <section className="image-section">
          <div className="image-wrapper">
            <div className="image-rectangle">
              <img
                src={img1}
                alt="Space Service Image"
                className="scroll-image"
              />
              <img src={img2} alt="Rotating Lines" className="rotate" />
            </div>
          </div>
        </section>

        <section className="stats-container">
          <div className="stats-wrapper">
            <div className="stats-header">
              <h2 className="stats-title">
                INNOVATIONS FEATURED IN ISRO STATE OF THE ART REPORT
              </h2>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <p className="stat-number">
                  0<sup>+</sup>
                </p>
                <p className="stat-label">MODULES IN ORBIT</p>
              </div>
              <div className="stat-item">
                <p className="stat-number">
                  0<sup>+</sup>
                </p>
                <p className="stat-label">DELIVERED SATELLITES</p>
              </div>
              <div className="stat-item">
                <p className="stat-number">
                  0<sup>+</sup>
                </p>
                <p className="stat-label">TB DATA DOWNLINKED</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="vbar opacity-20" />
        <section className="hero-section min-h-[70vh] py-20">
          <div className="video-container">
            <video autoPlay muted loop playsInline className="bg-video">
              <source src={videosource2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="content">
            <p className="subtitle">The FlatSat Redefined</p>
            <h1 className="title">CUBESAT</h1>
            <a
              href="Cubesat/Cubesat.html"
              className="cta-button"
              id="discoverBtn"
            >
              DISCOVER CUBESAT <span className="arrow">→</span>
            </a>
          </div>
        </section>
        <hr className="vbar opacity-20" />

        <section className="hero-section min-h-[70vh] py-20">
          <div className="video-container">
            <video autoPlay muted loop playsInline className="bg-video">
              <source src={videosource3} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="content">
            <p className="subtitle">The FlatSat Redefined</p>
            <h1 className="title">DESKSAT</h1>
            <a href="#" className="cta-button" id="discoverBtn">
              COMING SOON ...
              <span className="arrow">→</span>
            </a>
          </div>
        </section>
        <hr className="vbar opacity-20" />

        <section className="hero-section min-h-[70vh] py-20">
          <div className="video-container">
            <video autoPlay muted loop playsInline className="bg-video">
              <source src={videosource4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="content">
            <p className="subtitle">Cutting-edge avionics</p>
            <h1 className="title">SATELLITES</h1>
            <a href="#" className="cta-button" id="discoverBtn">
              COMING SOON...
              <span className="arrow">→</span>
            </a>
          </div>
        </section>
        <hr className="vbar opacity-20" />

        <section className="youtube-video-section h-[600px] px-4 bg-black text-white text-center flex flex-col justify-center items-center">
          <div className="w-full max-w-4xl flex justify-center items-center">
            <div
              className="relative w-full rounded-xl overflow-hidden shadow-xl border border-gray-700"
              style={{ paddingBottom: "55%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/HfuWuKACU8Q?autohide=1&showinfo=0&controls=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        <div
          className="w-full h-120 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: `url(${helmet_png})` }}
        ></div>

        <hr className="opacity-15" />
        <br />
        <br />

        <form className="w-full m-5">
          <div className="news flex flex-col md:flex-row justify-evenly gap-8">
            <div className="flex flex-col gap-8">
              <div className="text-2xl md:text-4xl font-bold max-w-[150px] md:max-w-none">
                SUBSCRIBE TO OUR SAST NEWSLETTER
              </div>
              <a href="./SAST Landing/newsletter.html">
                <div className="h-10 w-50 border border-[#00a1ff] text-sm font-bold flex justify-center items-center opacity-80 rounded hover:bg-[#00a1ff] transition duration-500">
                  READ NOW
                </div>
              </a>
            </div>

            <div className="flex flex-col justify-center gap-8 p-4 max-w-[500px]">
              <h3 className="text-sm md:text-base font-lighter">
                SUBSCRIBE AND NEVER MISS OUT ON WHAT WE'RE UP TO.
              </h3>
              <input
                className="h-10 w-full text-sm md:text-base border-b-2 border-[#00a1ff] font-bold bg-transparent"
                type="email"
                placeholder="EMAIL ADDRESS"
                name="email"
                required
              />
              <div className="gap-5 w-full flex flex-col md:flex-row justify-between">
                <input
                  className="h-10 w-full md:w-90 text-sm md:text-base border-b-2 border-[#00a1ff] font-bold bg-transparent"
                  type="text"
                  placeholder="FIRST NAME"
                  name="firstname"
                  required
                />
                <input
                  className="h-10 w-full md:w-90 text-sm md:text-base border-b-2 border-[#00a1ff] font-bold bg-transparent"
                  type="text"
                  placeholder="LAST NAME"
                  name="lastname"
                  required
                />
                <input
                  className="border border-[#00a1ff] h-10 w-full md:w-32 hover:bg-[#00a1ff] transition duration-500 rounded font-bold opacity-80 cursor-pointer"
                  type="submit"
                  value="SUBSCRIBE"
                  name="submit"
                />
              </div>
              <p className="text-xs font-lighter">
                You must be 13 years or older to opt-in to SAST emails.
              </p>
            </div>
          </div>
        </form>

        <br />
        <hr className="opacity-18" />

        <section className="space-section">
          <h1 className="space-heading">
            <span>SPACE IS CLOSER</span>
            <br />
            THAN YOU THINK
          </h1>
          <a
            href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            Get in touch
          </a>
        </section>
      </main>

<footer className="bg-transparent text-white">
  <div className="w-full foot flex flex-wrap md:flex-nowrap justify-start items-start gap-0 px-6 border border-white/15">
    {/* Logo + Socials */}
    <div
      className="flex-shrink-0 flex flex-col items-center w-full md:min-w-[300px] md:w-auto h-full border-r border-white/15 pt-4 md:pt-0"
      style={{ borderRightColor: "rgba(255,255,255,0.1)" }}
    >
      <div className="foot_logo flex justify-center items-center mb-4 w-full h-[80%]">
        <img className="w-full h-full object-cover opacity-70" src={logo} alt="SAST Logo" />
      </div>

      <div className="social_icons flex justify-center items-center pt-4 w-full h-[30%] gap-9">
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-red-600 transition" aria-label="YouTube"><FaYoutube /></a>
        <a href="https://www.instagram.com/sast.rishihood/" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-pink-600 transition" aria-label="Instagram"><FaInstagram /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-blue-600 transition" aria-label="LinkedIn"><FaLinkedinIn /></a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-sky-400 transition" aria-label="X"><FaTwitter /></a>
      </div>
    </div>

    {/* Section Columns */}
    <div className="hidden xl:flex flex-wrap w-full h-full justify-center items-center text-center">
      {[
        {
          title: "ABOUT",
          items: ["Mission", "SAST Locations", "History", "FAQs", "News & Events"],
        },
        {
          title: "CAREERS",
          items: ["Career Finder", "Benefits", "Education", "Training", "Life in SAST"],
        },
        {
          title: "CAPABILITIES",
          items: ["Protecting Satellites", "Facilitating Launches", "Education", "Experience a Launch", "Life in SAST"],
        },
        {
          title: "HOW TO JOIN",
          items: ["What to Expect", "For Families", "Live Chat", "Training", "Life in SAST"],
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

  {/* Bottom Footer Bar */}
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

    </>
  );
};

export default Landing;