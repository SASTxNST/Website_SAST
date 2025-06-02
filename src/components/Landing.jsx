import React, { useEffect } from "react";
import "../index.css";
import videoSource from "../Landing_media/newmaoinsast.mp4";
import videosource2 from "../Landing_media/Platforms_mobile.mp4";
import videosource3 from "../Landing_media/DeskSat_scrub.mp4";
import videosource4 from "../Landing_media/Modules_scrub.mp4";
import videosource5 from "../Landing_media/spacerealastro.mov";
import img1 from "../Landing_media/All-possible-through-our-state-of-the-art-space-service-2160x2170-4-2160x1660.webp";
import img2 from "../Landing_media//frequent_lines.webp";
import logo from "../Landing_media/SAST.png";
import helmet_png from "../Landing_media/helm.jpg";
import useLenis from '../utils/lenis'

const Landing = () => {
  useLenis();
  useEffect(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle) {
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
      if (menuToggle) menuToggle.removeEventListener("click", () => {});
      if (hoverVideo) {
        hoverVideo.removeEventListener("mouseenter", () => {});
        hoverVideo.removeEventListener("mouseleave", () => {});
      }
    };
  }, []);

  return (
    <>
      <main>
        <section className="hero">
          <div className="black_space">
            <video autoPlay loop muted>
              <source src={videosource5} type="video/mp4" />
            </video>
          </div>
          <div className="container">
            <p className="subtitle pclassName">
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
            to Governments,large organizations and elite institutions, but SAST
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
        <section className="hero-section">
          <div className="video-container">
            <video autoPlay muted loop playsInline id="bgVideo">
              <source src={videosource2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="content">
            <p className="subtitle">The FlatSat Redefined </p>
            <h1 className="title">CUBESAT</h1>
            <a
              href="Cubesat/Cubesat.html"
              className="cta-button"
              id="discoverBtn"
            >
              DISCOVER CUBESAT
              <span className="arrow">→</span>
            </a>
          </div>
        </section>
        <hr className="vbar opacity-20" />

        <section className="hero-section">
          <div className="video-container">
            <video autoPlay muted loop playsInline id="bgVideo">
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

        <section className="hero-section">
          <div className="video-container">
            <video autoPlay muted loop playsInline id="bgVideo">
              <source src={videosource4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="content">
            <p className="subtitle">Cutting-edge avionics</p>
            <h1 className="title">SATELITTES</h1>
            <a href="#" className="cta-button" id="discoverBtn">
              COMING SOON...
              <span className="arrow">→</span>
            </a>
          </div>
        </section>
        <hr className="vbar opacity-20" />

        <div
          className="w-full h-120 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: `url(${helmet_png})` }}
        ></div>
        <main></main>

        <hr className="opacity-15" />
        <br />
        <br />

        <form className="w-full h-60 m5">
          <div className="news flex justify-evenly ">
            <div className="flex flex-col gap-8">
              <div className="text-4xl font-bold w-150 ">
                SUBSCRIBE TO OUR SAST NEWSLETTER
              </div>
              <a href="./SAST Landing/newsletter.html">
                <div className="h-10 w-50 border border-[#00a1ff] text-s font-bold flex justify-center items-center opacity-80 rounded hover:bg-[#00a1ff] transition duration-500">
                  READ NOW
                </div>
              </a>
            </div>

            <div className="h-50 w-200  flex flex-col justify-center gap-8 p-4">
              <h3 className="text-l font-lighter">
                SUBSCRIBE AND NEVER MISS OUT ON WHAT WE’RE UP TO.
              </h3>
              <input
                className="h-10 w-166 text-xl border-b-2 border-[#00a1ff] font-bold"
                type="email"
                placeholder="EMAIL ADDRESS"
                name="email"
                required
              />
              <div className="gap-5 w-full flex jus-between">
                <input
                  className="h-10 w-90 text-xl border-b-2 border-[#00a1ff] font-bold"
                  type="text"
                  placeholder="FIRST NAME"
                  name="firstname"
                  required
                />
                <input
                  className="h-10 w-90 text-xl border-b-2 border-[#00a1ff] font-bold"
                  type="text"
                  placeholder="LAST NAME"
                  name="lastname"
                  required
                />
                <input
                  className="border border-[#00a1ff] h-10 w-32 hover:bg-[#00a1ff] transition duration-500 rounded font-bold opacity-80"
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
            className="cta-button"
          >
            Get in touch
          </a>
        </section>
      </main>

      <footer>
        <div
          className="h-80 w-full foot flex justify-center items-center "
          style={{ border: "1px solid rgb(255,255,255,0.3)" }}
        >
          <div className="h-full w-80 ">
            <div className="h-62 w-full flex justify-center items-center">
              <img className="h-50 w-60 opacity-70" src={logo} />
            </div>

            <div
              className="h-18 w-full flex justify-evenly items-center"
              style={{ borderTop: "1px solid rgb(255,255,255,0.3)" }}
            >
              <div>
                <svg
                  viewBox="0 0 23 23"
                  focusable="false"
                  className="chakra-icon css-20vzky"
                >
                  <path
                    d="M21.537 6.383a2.636 2.636 0 0 0-1.842-1.914C18.044 4 11.518 4 11.518 4s-6.564 0-8.215.469a2.636 2.636 0 0 0-1.841 1.914C1 8.023 1 11.539 1 11.539s0 3.477.462 5.156c.23.938.959 1.64 1.843 1.875 1.65.43 8.214.43 8.214.43s6.526 0 8.176-.43a2.583 2.583 0 0 0 1.843-1.875c.462-1.68.462-5.156.462-5.156s0-3.516-.462-5.156Zm-12.169 8.32V8.375l5.451 3.164-5.45 3.164h-.001Z"
                    fillRule="nonzero"
                  ></path>
                </svg>
              </div>
              <div>
                <svg
                  viewBox="0 0 23 23"
                  focusable="false"
                  className="chakra-icon css-20vzky"
                >
                  <path
                    d="M11.518 7.118a4.365 4.365 0 0 0-4.363 4.364 4.34 4.34 0 0 0 4.363 4.363 4.365 4.365 0 0 0 4.364-4.363c0-2.39-1.973-4.364-4.364-4.364Zm0 7.21a2.843 2.843 0 0 1-2.846-2.846c0-1.557 1.253-2.808 2.846-2.808a2.8 2.8 0 0 1 2.808 2.808c0 1.593-1.251 2.846-2.808 2.846Zm5.54-7.362a1.02 1.02 0 0 0-1.024-1.025 1.02 1.02 0 0 0-1.024 1.025 1.02 1.02 0 0 0 1.024 1.024 1.02 1.02 0 0 0 1.025-1.024Zm2.885 1.024c-.076-1.366-.379-2.58-1.366-3.567-.987-.985-2.201-1.29-3.567-1.366-1.405-.076-5.616-.076-7.02 0-1.367.076-2.543.379-3.568 1.366-.986.987-1.29 2.201-1.365 3.567-.076 1.405-.076 5.617 0 7.02.076 1.367.379 2.543 1.366 3.568 1.024.986 2.2 1.29 3.566 1.365 1.405.076 5.616.076 7.021 0 1.366-.076 2.58-.379 3.567-1.366.986-1.025 1.29-2.201 1.366-3.567.076-1.404.076-5.616 0-7.02Zm-1.821 8.5c-.267.76-.874 1.329-1.594 1.633-1.14.455-3.795.342-5.01.342-1.253 0-3.908.113-5.009-.342a2.878 2.878 0 0 1-1.632-1.632c-.455-1.101-.342-3.757-.342-5.01 0-1.214-.113-3.87.342-5.008A2.927 2.927 0 0 1 6.51 4.879c1.101-.456 3.757-.342 5.01-.342 1.214 0 3.87-.114 5.008.341.721.267 1.29.874 1.594 1.594.456 1.14.342 3.795.342 5.01 0 1.253.114 3.908-.341 5.009Z"
                    fillRule="nonzero"
                  ></path>
                </svg>
              </div>
              <div>
                <svg
                  viewBox="0 0 23 23"
                  focusable="false"
                  className="chakra-icon css-20vzky"
                >
                  <path
                    d="M21 11.558c0-2.535-1-4.966-2.782-6.759A9.469 9.469 0 0 0 11.5 2a9.469 9.469 0 0 0-6.718 2.799A9.586 9.586 0 0 0 2 11.559c0 4.778 3.448 8.747 8.007 9.441v-6.667H7.593v-2.775h2.413V9.476c0-2.388 1.418-3.737 3.562-3.737 1.073 0 2.146.193 2.146.193v2.35h-1.188c-1.187 0-1.57.733-1.57 1.503v1.773h2.643l-.422 2.776h-2.222V21C17.514 20.306 21 16.337 21 11.558Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <svg
                  viewBox="0 0 1200 1227"
                  focusable="false"
                  className="chakra-icon css-1m5ng7y"
                >
                  <path
                    d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div
            className="h-full w-80  flex flex-col gap-5 "
            style={{
              padding: "30px",
              borderLeft: "1px solid rgb(255,255,255,0.3)",
            }}
          >
            <h2 className="font-bold text-xl">ABOUT</h2>
            <h4 className="font-lighter text-s">Mission</h4>
            <h4 className="font-lighter text-s">SAST Locations</h4>
            <h4 className="font-lighter text-s">History</h4>
            <h4 className="font-lighter text-s">FAQs</h4>
            <h4 className="font-lighter text-s">News & Events</h4>
          </div>

          <div
            className="h-full w-80  flex flex-col gap-5 margin-5 border-l-1 border-white-800"
            style={{
              padding: "30px",
              borderLeft: "1px solid rgb(255,255,255,0.3)",
            }}
          >
            <h2 className="font-bold text-xl">CAREERS</h2>
            <h4 className="font-lighter text-s">Career Finder</h4>
            <h4 className="font-lighter text-s">Benefits</h4>
            <h4 className="font-lighter text-s">Education</h4>
            <h4 className="font-lighter text-s">Training</h4>
            <h4 className="font-lighter text-s">Life in SAST</h4>
          </div>

          <div
            className="h-full w-80  flex flex-col gap-5 border-l-1 border-white-800"
            style={{
              padding: "30px",
              borderLeft: "1px solid rgb(255,255,255,0.3)",
            }}
          >
            <h2 className="font-bold text-xl">CAPABILITIES</h2>
            <h4 className="font-lighter text-s">Protecting Satellites</h4>
            <h4 className="font-lighter text-s">Facilitating Launches</h4>
            <h4 className="font-lighter text-s">Education</h4>
            <h4 className="font-lighter text-s">Experience a Launch</h4>
            <h4 className="font-lighter text-s">Life in SAST</h4>
          </div>

          <div
            className="h-full w-80  flex flex-col gap-5 border-l-1 border-white-800"
            style={{
              padding: "30px",
              borderLeft: "1px solid rgb(255,255,255,0.3)",
            }}
          >
            <h2 className="font-bold text-xl">HOW TO JOIN</h2>
            <h4 className="font-lighter text-s">What to Expect</h4>
            <h4 className="font-lighter text-s">For Families</h4>
            <h4 className="font-lighter text-s">Live Chat</h4>
            <h4 className="font-lighter text-s">Training</h4>
            <h4 className="font-lighter text-s">Life in SAST</h4>
          </div>
        </div>
        <div className="h-20 w-full flex justify-evenly items-center">
          <div className="text-xs font-bold">SAST</div>
          <div className="text-xs font-bold">PRIVACY POLICY</div>
          <div className="text-xs font-bold">ACCESSIBILITY</div>
          <div className="text-xs font-bold">WATCH VIDEOS</div>
          <div className="text-xs font-bold">SITEMAP</div>
          <div className="text-xs font-bold">COOKIE SETTINGS</div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
