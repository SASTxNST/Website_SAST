/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import videoe1 from "../Landing_media/satellitevid.mp4";
import waterpng from "../Landing_media/waterrocket.png";
import watervid from "../Landing_media/bharatmpvid.mp4";
import bharatmppng from "../Landing_media/bharatmp.jpeg";
import bharatmpvid from "../Landing_media/bharatmpvid.mp4";
import damrupng from "../Landing_media/DamruExhibit.jpeg";
import onboard_png from "../Landing_media/Onboarding_1.jpeg";
import onboard_vid from "../Landing_media/onboardentry.mp4";
import rajkv_png from "../Landing_media/rajkumarv.jpeg";
import comet_png from "../Landing_media/Tsuchinshan.jpeg";
import comet_vid from "../Landing_media/Comentvid.mp4";
import launch_png from "../Landing_media/offlaunch.jpeg";
import launch_vid from "../Landing_media/launchvid.mp4";
import useLenis from "../utils/lenis";
import Footer from "./footer";

const Events = () => {
  const [filterType, setFilterType] = useState("all");
  const timelineRef = useRef(null);
  
  // Use framer-motion's useScroll for smooth timeline animation
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"]
  });

  // Transform scroll progress to height percentage
  const heightProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  useLenis();

  useLenis();

  const filterEvents = (type) => setFilterType(type);

  const getFilteredEvents = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    return calendarEventsData.events
      .filter(({ id }) => id <= 7) // Only show events with images
      .map(event => ({
        ...event,
        imgSrc: events.find(e => e.id === event.id)?.imgSrc || '',
        videoSrc: events.find(e => e.id === event.id)?.videoSrc || ''
      }))
      .filter(({ startDate }) => {
        if (filterType === "all") return true;
        if (filterType === "past") return startDate < currentDate;
        if (filterType === "ongoing") return startDate === currentDate;
        if (filterType === "future") return startDate > currentDate;
        return true;
      });
  };

  const filterTypes = ["all", "past", "ongoing", "future"];

  const events = [
    {
      id: 1,
      title: "Water Rocket Launch",
      date: "2025-02-16",
      imgSrc: waterpng,
      videoSrc: watervid,
      description:
        "A thrilling competition where teams designed, built, and launched water-powered rockets.",
    },
    {
      id: 2,
      title: "Cubesat Showcase",
      date: "2024-12-12",
      imgSrc: bharatmppng,
      videoSrc: bharatmpvid,
      description: "Experience our latest CubeSat technology demonstration.",
    },
    {
      id: 3,
      title: "SAST Damru Exhibit",
      date: "2024-01-05",
      imgSrc: damrupng,
      videoSrc: "assets/damru.mp4",
      description: "A unique exhibit showcasing scientific wonders.",
    },
    {
      id: 4,
      title: "Club Onboarding",
      date: "2024-01-05",
      imgSrc: onboard_png,
      videoSrc: onboard_vid,
      description: "Welcoming space enthusiasts to SAST Club.",
    },
    {
      id: 5,
      title: "Guest Lecture - Dr. Rajkumar Vedam",
      date: "2025-02-13",
      imgSrc: rajkv_png,
      videoSrc: "assets/tsuchinshan.mp4",
      description: "Insights from Dr. Vedam on future space advancements.",
    },
    {
      id: 6,
      title: "Tsuchinshan Comet Spotting",
      date: "2024-01-05",
      imgSrc: comet_png,
      videoSrc: comet_vid,
      description: "Observe celestial phenomena in real-time.",
    },
    {
      id: 7,
      title: "SAST Official Launch",
      date: "2024-01-05",
      imgSrc: launch_png,
      videoSrc: launch_vid,
      description: "Inaugurating SAST's journey and vision.",
    },
  ];

  const calendarEventsData = 
  {
    "events": [
      {
        "id": 1,
        "title": "Water Rocket Launch",
        "startDate": "2025-02-16",
        "endDate": "2025-02-16",
        "time": "10:00 AM - 4:00 PM",
        "location": "University Campus Ground",
        "category": "Competition",
        "description": "A thrilling competition where teams designed, built, and launched water-powered rockets. Test your engineering skills and compete for glory!",
        "image": "/src/Landing_media/waterrocket.png",
        "status": "completed",
        "registrationLink": "",
        "tags": ["Competition", "Hands-on", "Team Event"]
      },
      {
        "id": 2,
        "title": "Cubesat Showcase",
        "startDate": "2024-12-12",
        "endDate": "2024-12-12",
        "time": "2:00 PM - 5:00 PM",
        "location": "Tech Exhibition Hall",
        "category": "Exhibition",
        "description": "Experience our latest CubeSat technology demonstration and learn about satellite systems and space exploration.",
        "image": "/src/Landing_media/bharatmp.jpeg",
        "status": "completed",
        "registrationLink": "",
        "tags": ["Exhibition", "Technology", "Space"]
      },
      {
        "id": 3,
        "title": "SAST Damru Exhibit",
        "startDate": "2024-01-05",
        "endDate": "2024-01-05",
        "time": "11:00 AM - 3:00 PM",
        "location": "Science Museum",
        "category": "Exhibition",
        "description": "A unique exhibit showcasing scientific wonders and innovative projects from SAST members.",
        "image": "/src/Landing_media/DamruExhibit.jpeg",
        "status": "completed",
        "registrationLink": "",
        "tags": ["Exhibition", "Innovation", "Science"]
      },
      {
        "id": 4,
        "title": "Club Onboarding 2025",
        "startDate": "2025-08-15",
        "endDate": "2025-08-15",
        "time": "5:00 PM - 7:00 PM",
        "location": "Main Auditorium",
        "category": "Recruitment",
        "description": "Welcoming space enthusiasts to SAST Club. Join us to explore opportunities in space technology and astronomy!",
        "image": "/src/Landing_media/Onboarding_1.jpeg",
        "status": "upcoming",
        "registrationLink": "https://forms.example.com/sast-onboarding",
        "tags": ["Recruitment", "Orientation", "Networking"]
      },
      {
        "id": 5,
        "title": "Guest Lecture - Dr. Rajkumar Vedam",
        "startDate": "2025-02-13",
        "endDate": "2025-02-13",
        "time": "4:00 PM - 6:00 PM",
        "location": "Conference Hall",
        "category": "Workshop",
        "description": "Insights from Dr. Vedam on future space advancements, satellite technology, and career opportunities in aerospace.",
        "image": "/src/Landing_media/rajkumarv.jpeg",
        "status": "completed",
        "registrationLink": "",
        "tags": ["Workshop", "Guest Lecture", "Career"]
      },
      {
        "id": 6,
        "title": "Tsuchinshan Comet Spotting",
        "startDate": "2024-10-20",
        "endDate": "2024-10-20",
        "time": "8:00 PM - 11:00 PM",
        "location": "Observatory Deck",
        "category": "Observation",
        "description": "Observe celestial phenomena in real-time. Join us for an unforgettable night of comet watching and stargazing.",
        "image": "/src/Landing_media/Tsuchinshan.jpeg",
        "status": "completed",
        "registrationLink": "",
        "tags": ["Observation", "Astronomy", "Night Event"]
      },
      {
        "id": 7,
        "title": "SAST Official Launch",
        "startDate": "2024-01-05",
        "endDate": "2024-01-05",
        "time": "10:00 AM - 1:00 PM",
        "location": "University Grounds",
        "category": "Ceremony",
        "description": "Inaugurating SAST's journey and vision. A historic moment marking the beginning of our space exploration endeavors.",
        "image": "/src/Landing_media/offlaunch.jpeg",
        "status": "completed",
        "registrationLink": "",
        "tags": ["Ceremony", "Launch", "Historic"]
      },
      {
        "id": 8,
        "title": "Annual Astronomy Quiz 2025",
        "startDate": "2025-11-10",
        "endDate": "2025-11-10",
        "time": "3:00 PM - 6:00 PM",
        "location": "Main Auditorium",
        "category": "Competition",
        "description": "Test your knowledge of astronomy, space science, and astrophysics in this exciting quiz competition with amazing prizes!",
        "image": "",
        "status": "upcoming",
        "registrationLink": "https://forms.example.com/astro-quiz",
        "tags": ["Competition", "Quiz", "Prizes"]
      },
      {
        "id": 9,
        "title": "Rocket Propulsion Workshop",
        "startDate": "2025-09-20",
        "endDate": "2025-09-22",
        "time": "9:00 AM - 5:00 PM",
        "location": "Engineering Lab",
        "category": "Workshop",
        "description": "A comprehensive 3-day workshop on rocket propulsion systems, engine design, and practical applications in space technology.",
        "image": "",
        "status": "upcoming",
        "registrationLink": "https://forms.example.com/rocket-workshop",
        "tags": ["Workshop", "Engineering", "Multi-day"]
      },
      {
        "id": 10,
        "title": "Satellite Hackathon 2025",
        "startDate": "2025-10-15",
        "endDate": "2025-10-17",
        "time": "24 Hours",
        "location": "Innovation Center",
        "category": "Competition",
        "description": "48-hour hackathon focused on satellite communication, data analysis, and space technology innovations. Form teams and compete!",
        "image": "",
        "status": "upcoming",
        "registrationLink": "https://forms.example.com/sat-hackathon",
        "tags": ["Competition", "Hackathon", "Team Event"]
      }
    ]
  };


  const timelineData = calendarEventsData.events
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .map(({ startDate, title, description, category, status }) => ({
      date: new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      title,
      description,
      category,
      status,
    }));

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleHover = (event, action) => {
      const card = event.currentTarget;
      const video = card.querySelector("video");
      if (!video) return;

      if (isMobile) {
        if (video.paused) {
          video.play().catch(err => console.log("Video play failed:", err));
        } else {
          video.pause();
        }
      } else {
        if (action === "play") {
          video.play().catch(err => console.log("Video play failed:", err));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    };

    const cards = document.querySelectorAll(".group");
    cards.forEach((card) => {
      if (isMobile) {
        card.addEventListener("click", (e) => handleHover(e, "toggle"));
      } else {
        card.addEventListener("mouseenter", (e) => handleHover(e, "play"));
        card.addEventListener("mouseleave", (e) => handleHover(e, "pause"));
      }
    });

    return () => {
      cards.forEach((card) => {
        if (isMobile) {
          card.removeEventListener("click", (e) => handleHover(e, "toggle"));
        } else {
          card.removeEventListener("mouseenter", (e) => handleHover(e, "play"));
          card.removeEventListener("mouseleave", (e) => handleHover(e, "pause"));
        }
      });
    };
  }, [filterType]);

  return (
    <>
      {/* Video Background - Fixed */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={videoe1} type="video/mp4" />
        </video>
      </div>

      {/* Main Content - Not constrained by video */}
      <div className="relative w-full min-h-screen pt-44 md:pt-56 pb-40">
        <section className="w-full flex flex-col items-center mt-28">

          {/* 🌌 Filter Navbar */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full mt-8 px-4 py-4 md:py-12 sm:py-6 gap-4 md:gap-0 md:relative">
            <div className="md:absolute md:left-8 lg:left-40 w-full md:w-auto">
              <Link
                to="/calendar"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 text-sm text-white/90 backdrop-blur hover:bg-white/10 transition-colors duration-200 px-4 py-2 w-full md:w-auto"
              >
                <span>Calendar</span>
              </Link>
            </div>

            <div className="relative flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-md px-3 py-2 sm:px-4 sm:py-3 overflow-x-auto no-scrollbar w-full max-w-[95vw] sm:max-w-md md:max-w-lg">
              {filterTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => filterEvents(type)}
                  className={`relative text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap font-medium ${
                    filterType === type
                      ? "text-blue-400 font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {type === "all" && "All Events"}
                  {type === "past" && "Past Events"}
                  {type === "ongoing" && "Ongoing Events"}
                  {type === "future" && "Future Events"}
                </button>
              ))}

              {/* Animated underline */}
              <motion.div
                className="absolute bottom-1 left-0 h-[3px] bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                layoutId="underline"
                initial={false}
                animate={{
                  left:
                    filterType === "all"
                      ? "5%"
                      : filterType === "past"
                      ? "25%"
                      : filterType === "ongoing"
                      ? "48%"
                      : "77%",
                  width:
                    filterType === "all"
                      ? "80px"
                      : filterType === "past"
                      ? "95px"
                      : filterType === "ongoing"
                      ? "120px"
                      : "110px",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 px-4 sm:px-6 md:px-8 w-full max-w-7xl mx-auto">
            {getFilteredEvents().map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <img
                    src={event.imgSrc}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-0"
                  />
                  <video
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    loop
                    muted
                    playsInline
                  >
                    <source src={event.videoSrc} type="video/mp4" />
                  </video>
                  
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                    <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-lg">
                      <p className="text-xs sm:text-sm font-semibold">
                        {new Date(event.startDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 w-full p-3 sm:p-4 md:p-5 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                    <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-1.5 md:mb-2 line-clamp-1 drop-shadow-lg">
                      {event.title}
                    </h2>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-200 line-clamp-2 leading-relaxed drop-shadow-md">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Timeline Section */}
      <section ref={timelineRef} className="timeline_sast relative w-full">
        <div className="timeline-container">
          <h2 className="timeline-title">
            SAST Events Timeline
          </h2>
          
          <div className="timeline-wrapper">
            {/* Animated Timeline line - Desktop */}
            <div className="timeline-line-desktop relative">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-sky-400 to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.6),0_0_40px_rgba(59,130,246,0.4)]"
                style={{
                  height: heightProgress,
                  transformOrigin: "top",
                  filter: "blur(0.5px)"
                }}
              />
              {/* Glow effect at the end of the line */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-sky-400"
                style={{
                  top: heightProgress,
                  boxShadow: "0 0 20px 8px rgba(56, 189, 248, 0.8), 0 0 40px 12px rgba(59, 130, 246, 0.75)",
                }}
              />
            </div>
            
            {/* Animated Mobile timeline line */}
            <div className="timeline-line-mobile relative">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-sky-400 to-blue-500 shadow-[0_0_15px_rgba(56,189,248,0.7),0_0_30px_rgba(59,130,246,0.6)]"
                style={{
                  height: heightProgress,
                  transformOrigin: "top",
                  filter: "blur(0.2px)"
                }}
              />
              {/* Glow effect at the end of the line */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-300"
                style={{
                  top: heightProgress,
                  boxShadow: "0 0 15px 6px rgba(56, 189, 248, 0.8), 0 0 30px 10px rgba(59, 130, 246, 0.8)",
                }}
              />
            </div>

            {timelineData.map((event, index) => {
              // Calculate when each item should appear based on scroll progress
              const itemOffset = index / (timelineData.length - 1);
              const itemProgress = useTransform(
                scrollYProgress,
                [Math.max(0, itemOffset - 0.15), Math.min(1, itemOffset + 0.05)],
                [0, 1]
              );
              
              return (
                <motion.div
                  key={index}
                  style={{
                    opacity: itemProgress,
                  }}
                  className={`timeline-item ${index % 2 === 0 ? 'reverse' : ''}`}
                >
                {/* Timeline dot with scale animation */}
                <motion.div
                  style={{
                    scale: itemProgress,
                  }}
                  className={`timeline-dot ${event.status === 'upcoming' ? 'pulse' : ''}`}
                >
                  {event.status === 'upcoming' && (
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-full bg-blue-400"
                    />
                  )}
                </motion.div>

                {/* Content card */}
                <motion.div
                  style={{
                    opacity: itemProgress,
                    x: index % 2 === 0 ? useTransform(itemProgress, [0, 1], [50, 0]) : useTransform(itemProgress, [0, 1], [-50, 0])
                  }}
                  className={`timeline-content ${index % 2 === 0 ? 'reverse' : 'normal'}`}
                >
                  <div className="timeline-card">
                    <div className={`timeline-card-inner ${index % 2 === 0 ? 'reverse' : ''}`}>
                      <span className={`timeline-badge ${event.status === 'completed' ? 'completed' : 'upcoming'}`}>
                        {event.category} • {event.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </span>
                      <h3 className="timeline-event-title">{event.title}</h3>
                      <p className="timeline-event-date">{event.date}</p>
                      <p className="timeline-event-description">{event.description}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Spacer for desktop */}
                <div className="timeline-spacer"></div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Events;
