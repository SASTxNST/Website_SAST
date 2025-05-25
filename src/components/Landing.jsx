import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView as useInViewHook } from "react-intersection-observer";
import {
  ArrowRight,
  Rocket,
  Satellite,
  Database,
  ExternalLink,
  Mail,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import "../index.css";
import videoSource from "../Landing_media/newmaoinsast.mp4";
import videosource2 from "../Landing_media/Platforms_mobile.mp4";
import videosource3 from "../Landing_media/DeskSat_scrub.mp4";
import videosource4 from "../Landing_media/Modules_scrub.mp4";
import videosource5 from "../Landing_media/spacerealastro.mp4";
import img1 from "../Landing_media/All-possible-through-our-state-of-the-art-space-service-2160x2170-4-2160x1660.webp";
import img2 from "../Landing_media//frequent_lines.webp";
import logo from "../Landing_media/SAST.png";
import helmet_png from "../Landing_media/helm.jpg";

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [heroRef, heroInView] = useInViewHook({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [statsRef, statsInView] = useInViewHook({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [textRef, textInView] = useInViewHook({
    threshold: 0.5,
    triggerOnce: true,
  });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const heroSectionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <main>
        <motion.section
          className="hero w-full max-w-8xl mx-auto px-4"
          ref={heroRef}
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          <motion.div className="black_space" style={{ y }}>
            <video autoPlay loop muted>
              <source src={videosource5} type="video/mp4" />
            </video>
          </motion.div>
          <div>
            <motion.h1 className="main-heading" variants={itemVariants}>
              INSPIRING
              <br />
              NEXT GENERATION
              <br />
              OF SPACE EXPLORERS...
            </motion.h1>
            <br />
            <motion.p variants={itemVariants}>
              Pioneering Space and Beyond
            </motion.p>
          </div>
        </motion.section>

        <motion.section
          className="video-section w-full max-w-8xl mx-auto px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="video">
            <video id="myVideo" loop autoPlay muted playsInline>
              <source src={videoSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.section>

        <motion.section
          className="text-section w-full max-w-8xl mx-auto px-4"
          id="scrollText"
          ref={textRef}
          initial={{ opacity: 0, y: 50 }}
          animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="space-text opacity-80 hover:opacity-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Space exploration and technology have traditionally been exclusive
            to Governments, large organizations and elite institutions, but SAST
            is dedicated to breaking these barriers and making the cosmos
            accessible to all.
          </motion.p>
        </motion.section>

        <motion.section
          className="image-section w-full max-w-8xl mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="image-wrapper">
            <div className="image-rectangle">
              <motion.img
                src={img1}
                alt="Space Service Image"
                className="scroll-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src={img2}
                alt="Rotating Lines"
                className="rotate"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          className="stats-container w-full max-w-8xl mx-auto px-4"
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
        >
          <div className="stats-wrapper">
            <motion.div className="stats-header" variants={itemVariants}>
              <h2 className="stats-title">
                INNOVATIONS FEATURED IN ISRO STATE OF THE ART REPORT
              </h2>
            </motion.div>
            <div className="stats-grid">
              <motion.div className="stat-item" variants={statsVariants}>
                <Satellite className="w-8 h-8 mb-2 text-blue-400" />
                <p className="stat-number">
                  0<sup>+</sup>
                </p>
                <p className="stat-label">MODULES IN ORBIT</p>
              </motion.div>
              <motion.div className="stat-item" variants={statsVariants}>
                <Rocket className="w-8 h-8 mb-2 text-blue-400" />
                <p className="stat-number">
                  0<sup>+</sup>
                </p>
                <p className="stat-label">DELIVERED SATELLITES</p>
              </motion.div>
              <motion.div className="stat-item" variants={statsVariants}>
                <Database className="w-8 h-8 mb-2 text-blue-400" />
                <p className="stat-number">
                  0<sup>+</sup>
                </p>
                <p className="stat-label">TB DATA DOWNLINKED</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <hr className="vbar opacity-20" />

        <motion.section
          className="hero-section w-full max-w-8xl mx-auto px-4"
          variants={heroSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="video-container">
            <video autoPlay muted loop playsInline id="bgVideo">
              <source src={videosource2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <motion.div className="content">
            <motion.p
              className="subtitle"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              The FlatSat Redefined
            </motion.p>
            <motion.h1
              className="title"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              CUBESAT
            </motion.h1>
            <motion.a
              href="Cubesat/Cubesat.html"
              className="cta-button group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              DISCOVER CUBESAT
              <motion.span
                className="arrow ml-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="inline w-4 h-4" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.section>

        <hr className="vbar opacity-20" />

        <motion.section
          className="hero-section w-full max-w-8xl mx-auto px-4"
          variants={heroSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="video-container">
            <video autoPlay muted loop playsInline id="bgVideo">
              <source src={videosource3} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <motion.div className="content">
            <motion.p
              className="subtitle"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              The FlatSat Redefined
            </motion.p>
            <motion.h1
              className="title"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              DESKSAT
            </motion.h1>
            <motion.a
              href="#"
              className="cta-button group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              COMING SOON ...
              <motion.span
                className="arrow ml-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="inline w-4 h-4" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.section>

        <hr className="vbar opacity-20" />

        <motion.section
          className="hero-section w-full max-w-8xl mx-auto px-4"
          variants={heroSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="video-container">
            <video autoPlay muted loop playsInline id="bgVideo">
              <source src={videosource4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <motion.div className="content">
            <motion.p
              className="subtitle"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Cutting-edge avionics
            </motion.p>
            <motion.h1
              className="title"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              SATELLITES
            </motion.h1>
            <motion.a
              href="#"
              className="cta-button group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              COMING SOON...
              <motion.span
                className="arrow ml-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="inline w-4 h-4" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.section>

        <hr className="vbar opacity-20" />

        <motion.div
          className="w-full max-w-8xl mx-auto px-4 h-120 bg-cover bg-center bg-no-repeat bg-fixed relative overflow-hidden"
          style={{ backgroundImage: `url(${helmet_png})` }}
          initial={{ opacity: 0, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        <hr className="opacity-15" />
        <br />
        <br />

        <motion.form
          className="w-full max-w-8xl mx-auto min-h-60 px-4 py-8 md:py-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="news flex flex-col lg:flex-row justify-center lg:justify-evenly items-center lg:items-start gap-8 lg:gap-4">
            <motion.div
              className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-md lg:max-w-lg flex flex-col lg:flex-row items-center gap-4">
                <Mail className="w-8 h-8 md:w-10 md:h-10 text-blue-400 flex-shrink-0" />
                <span>SUBSCRIBE TO OUR SAST NEWSLETTER</span>
              </div>
              <motion.a
                href="./SAST Landing/newsletter.html"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="self-center lg:self-start"
              >
                <div className="h-10 w-32 md:w-40 border border-[#00a1ff] text-sm font-bold flex justify-center items-center opacity-80 rounded hover:bg-[#00a1ff] transition duration-500">
                  READ NOW
                </div>
              </motion.a>
            </motion.div>

            <motion.div
              className="newsletter-container"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* Glassmorphism Header Card */}
              <motion.div
                className="newsletter-header-card"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="glass-backdrop">
                  <div className="floating-elements">
                    <div className="floating-orb orb-1"></div>
                    <div className="floating-orb orb-2"></div>
                    <div className="floating-orb orb-3"></div>
                  </div>
                  <h3 className="newsletter-title">
                    SUBSCRIBE AND NEVER MISS OUT ON WHAT WE&apos;RE UP TO.
                  </h3>
                  <div className="newsletter-stats">
                    <div className="stat-item">
                      <span className="stat-number">10K+</span>
                      <span className="stat-label">Subscribers</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <span className="stat-number">Weekly</span>
                      <span className="stat-label">Updates</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bento Grid Form Layout */}
              <div className="bento-form-grid">
                {/* Email Input - Large Bento Box */}
                <motion.div
                  className="bento-box email-box"
                  whileHover={{ scale: 1.02 }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="input-wrapper">
                    <motion.input
                      className="smart-input email-input"
                      type="email"
                      placeholder="your@email.com"
                      name="email"
                      required
                      whileFocus={{
                        boxShadow: "0 0 0 2px rgba(0, 161, 255, 0.3)",
                        borderColor: "#00a1ff",
                      }}
                      onFocus={(e) => {
                        e.target.parentElement.classList.add("focused");
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          e.target.parentElement.classList.remove("focused");
                        }
                      }}
                    />
                    <label className="floating-label">Email Address</label>
                    <div className="input-glow"></div>
                  </div>
                </motion.div>

                {/* Name Inputs - Medium Bento Boxes */}
                <motion.div
                  className="bento-box name-box"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="input-wrapper">
                    <motion.input
                      className="smart-input"
                      type="text"
                      placeholder="First"
                      name="firstname"
                      required
                      whileFocus={{
                        boxShadow: "0 0 0 2px rgba(0, 161, 255, 0.3)",
                        borderColor: "#00a1ff",
                      }}
                      onFocus={(e) => {
                        e.target.parentElement.classList.add("focused");
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          e.target.parentElement.classList.remove("focused");
                        }
                      }}
                    />
                    <label className="floating-label">First Name</label>
                    <div className="input-glow"></div>
                  </div>
                </motion.div>

                <motion.div
                  className="bento-box name-box"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="input-wrapper">
                    <motion.input
                      className="smart-input"
                      type="text"
                      placeholder="Last"
                      name="lastname"
                      required
                      whileFocus={{
                        boxShadow: "0 0 0 2px rgba(0, 161, 255, 0.3)",
                        borderColor: "#00a1ff",
                      }}
                      onFocus={(e) => {
                        e.target.parentElement.classList.add("focused");
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          e.target.parentElement.classList.remove("focused");
                        }
                      }}
                    />
                    <label className="floating-label">Last Name</label>
                    <div className="input-glow"></div>
                  </div>
                </motion.div>

                {/* Interactive Submit Button - Small Bento Box */}
                <motion.div
                  className="bento-box submit-box"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button
                    className="smart-submit-btn"
                    type="submit"
                    whileHover={{
                      background:
                        "linear-gradient(135deg, #00a1ff 0%, #0066cc 100%)",
                      boxShadow: "0 8px 32px rgba(0, 161, 255, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="btn-text">SUBSCRIBE</span>
                    <div className="btn-particles">
                      <div className="particle"></div>
                      <div className="particle"></div>
                      <div className="particle"></div>
                    </div>
                    <div className="btn-ripple"></div>
                  </motion.button>
                </motion.div>

                {/* Privacy Notice - Accent Bento Box */}
                <motion.div
                  className="bento-box privacy-box"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="privacy-content">
                    <div className="privacy-icon">🔒</div>
                    <p className="privacy-text">
                      You must be 13+ to subscribe. We respect your privacy and
                      never spam.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Success State Animation */}
              <motion.div
                className="success-animation"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                <div className="success-checkmark">✓</div>
                <p>Welcome to the SAST community!</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.form>

        <br />
        <hr className="opacity-18" />

        <motion.section
          className="space-section w-full max-w-8xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="space-heading"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span>SPACE IS CLOSER</span>
            <br />
            THAN YOU THINK
          </motion.h1>
          <motion.a
            href="https://www.linkedin.com/company/society-for-astrophysics-and-space-technology/posts/?feedView=all"
            target="_blank"
            className="cta-button flex items-center gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in touch
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.section>
      </main>

      <motion.footer
        className="w-full max-w-8xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          className="h-80 w-full foot flex justify-center items-center"
          style={{ border: "1px solid rgb(255,255,255,0.3)" }}
        >
          <motion.div
            className="h-full w-80"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="h-62 w-full flex justify-center items-center">
              <motion.img
                className="h-50 w-60 opacity-70"
                src={logo}
                whileHover={{ scale: 1.1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div
              className="h-18 w-full flex justify-evenly items-center"
              style={{ borderTop: "1px solid rgb(255,255,255,0.3)" }}
            >
              <motion.div
                whileHover={{ scale: 1.2, color: "#3b82f6" }}
                transition={{ duration: 0.2 }}
              >
                <Youtube className="w-6 h-6" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, color: "#3b82f6" }}
                transition={{ duration: 0.2 }}
              >
                <Instagram className="w-6 h-6" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, color: "#3b82f6" }}
                transition={{ duration: 0.2 }}
              >
                <Facebook className="w-6 h-6" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, color: "#3b82f6" }}
                transition={{ duration: 0.2 }}
              >
                <Twitter className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="h-full w-80 flex flex-col gap-5"
            style={{
              padding: "30px",
              borderLeft: "1px solid rgb(255,255,255,0.3)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-bold text-xl">ABOUT</h2>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Mission
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              SAST Locations
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              History
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              FAQs
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              News & Events
            </motion.h4>
          </motion.div>

          <motion.div
            className="h-full w-80 flex flex-col gap-5 margin-5 border-l-1 border-white-800"
            style={{
              padding: "30px",
              borderLeft: "1px solid rgb(255,255,255,0.3)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="font-bold text-xl">CAREERS</h2>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Career Finder
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Benefits
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Education
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Training
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Life in SAST
            </motion.h4>
          </motion.div>

          <motion.div
            className="h-full w-80 flex flex-col gap-5 border-l-1 border-white-800"
            style={{
              padding: "30px",
              borderLeft: "1px solid rgb(255,255,255,0.3)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="font-bold text-xl">CAPABILITIES</h2>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Protecting Satellites
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Facilitating Launches
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Education
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Experience a Launch
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Life in SAST
            </motion.h4>
          </motion.div>

          <motion.div
            className="h-full w-80 flex flex-col gap-5 border-l-1 border-white-800"
            style={{
              padding: "30px",
              borderLeft: "1px solid rgb(255,255,255,0.3)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="font-bold text-xl">HOW TO JOIN</h2>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              What to Expect
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              For Families
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Live Chat
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Training
            </motion.h4>
            <motion.h4
              className="font-lighter text-s cursor-pointer"
              whileHover={{ color: "#3b82f6", x: 5 }}
            >
              Life in SAST
            </motion.h4>
          </motion.div>
        </div>

        <motion.div
          className="h-20 w-full flex justify-evenly items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div
            className="text-xs font-bold cursor-pointer"
            whileHover={{ color: "#3b82f6", scale: 1.1 }}
          >
            SAST
          </motion.div>
          <motion.div
            className="text-xs font-bold cursor-pointer"
            whileHover={{ color: "#3b82f6", scale: 1.1 }}
          >
            PRIVACY POLICY
          </motion.div>
          <motion.div
            className="text-xs font-bold cursor-pointer"
            whileHover={{ color: "#3b82f6", scale: 1.1 }}
          >
            ACCESSIBILITY
          </motion.div>
          <motion.div
            className="text-xs font-bold cursor-pointer"
            whileHover={{ color: "#3b82f6", scale: 1.1 }}
          >
            WATCH VIDEOS
          </motion.div>
          <motion.div
            className="text-xs font-bold cursor-pointer"
            whileHover={{ color: "#3b82f6", scale: 1.1 }}
          >
            SITEMAP
          </motion.div>
          <motion.div
            className="text-xs font-bold cursor-pointer"
            whileHover={{ color: "#3b82f6", scale: 1.1 }}
          >
            COOKIE SETTINGS
          </motion.div>
        </motion.div>
      </motion.footer>
    </>
  );
};

export default Landing;
