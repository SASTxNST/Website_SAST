import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Rocket,
  Star,
  Play,
  Filter,
} from "lucide-react";
import "../index.css";
import videoe1 from "../Landing_media/satellitevid.mp4";
import waterpng from "../Landing_media/waterrocket.png";
import bharatmppng from "../Landing_media/bharatmp.jpeg";
import bharatmpvid from "../Landing_media/bharatmpvid.mp4";
import damrupng from "../Landing_media/DamruExhibit.jpeg";
import onboard_png from "../Landing_media/Onboarding.jpeg";
import onboard_vid from "../Landing_media/onboardentry.mp4";
import rajkv_png from "../Landing_media/rajkumarv.jpeg";
import comet_png from "../Landing_media/Tsuchinshan.jpeg";
import comet_vid from "../Landing_media/Comentvid.mp4";
import launch_png from "../Landing_media/offlaunch.jpeg";
import launch_vid from "../Landing_media/launchvid.mp4";

const Events = () => {
  const [filterType, setFilterType] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleHover = (event, action) => {
      const video = event.currentTarget.querySelector("video");
      if (video) {
        if (action === "play") video.play();
        else {
          video.pause();
          video.currentTime = 0;
        }
      }
    };

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => handleHover(e, "play"));
      card.addEventListener("mouseleave", (e) => handleHover(e, "pause"));
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", (e) => handleHover(e, "play"));
        card.removeEventListener("mouseleave", (e) => handleHover(e, "pause"));
      });
    };
  }, []);

  const filterEvents = (type) => {
    setFilterType(type);
  };

  const getFilteredEvents = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    return events.filter(({ date }) => {
      if (filterType === "all") return true;
      if (filterType === "past") return date < currentDate;
      if (filterType === "ongoing") return date === currentDate;
      if (filterType === "future") return date > currentDate;
      return true;
    });
  };

  const getEventStatus = (date) => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (date < currentDate)
      return { status: "past", color: "text-gray-400", icon: Clock };
    if (date === currentDate)
      return { status: "ongoing", color: "text-green-400", icon: Play };
    return { status: "future", color: "text-blue-400", icon: Calendar };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const events = [
    {
      id: 1,
      title: "Water Rocket Launch",
      date: "2025-02-16",
      imgSrc: waterpng,
      videoSrc: null,
      description:
        "A thrilling competition where teams designed, built, and launched water-powered rockets, blending creativity with engineering.",
      category: "Competition",
      icon: Rocket,
    },
    {
      id: 2,
      title: "Cubesat Showcase",
      date: "2024-12-12",
      imgSrc: bharatmppng,
      videoSrc: bharatmpvid,
      description: "Experience our latest CubeSat technology demonstration.",
      category: "Showcase",
      icon: Star,
    },
    {
      id: 3,
      title: "SAST Damru Exhibit",
      date: "2024-01-05",
      imgSrc: damrupng,
      videoSrc: "assets/damru.mp4",
      description: "A unique exhibit showcasing the scientific wonders.",
      category: "Exhibition",
      icon: Star,
    },
    {
      id: 4,
      title: "Club Onboarding",
      date: "2024-01-05",
      imgSrc: onboard_png,
      videoSrc: onboard_vid,
      description:
        "Welcoming passionate space enthusiasts to join the SAST Club and embark on a journey of research and innovation.",
      category: "Onboarding",
      icon: Users,
    },
    {
      id: 5,
      title: "Guest Lecture - Dr. Rajkumar Vedam",
      date: "2025-02-13",
      imgSrc: rajkv_png,
      videoSrc: "assets/tsuchinshan.mp4",
      description:
        "An insightful session with Dr. Rajkumar Vedam on the scientific advancements shaping the future of space technology.",
      category: "Lecture",
      icon: Users,
    },
    {
      id: 6,
      title: "Tsuchinshan Comet Spotting",
      date: "2024-01-05",
      imgSrc: comet_png,
      videoSrc: comet_vid,
      description:
        "Witness the wonders of the universe with this celestial event.",
      category: "Observation",
      icon: Star,
    },
    {
      id: 7,
      title: "SAST Official Launch",
      date: "2024-01-05",
      imgSrc: launch_png,
      videoSrc: launch_vid,
      description:
        "Marking the beginning of our journey, the official launch event introduced SAST's vision, mission, and upcoming projects.",
      category: "Launch",
      icon: Rocket,
    },
  ];

  const filterButtons = [
    { key: "all", label: "All Events", icon: Filter },
    { key: "past", label: "Past Events", icon: Clock },
    { key: "ongoing", label: "Ongoing Events", icon: Play },
    { key: "future", label: "Future Events", icon: Calendar },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <motion.div
        className="eventsbg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <video autoPlay loop muted>
          <source src={videoe1} />
        </video>
        <motion.div
          className="absolute inset-0 bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      <section className="eventssec h-320 flex flex-col items-center">
        <motion.div
          className="h-18 w-200 rounded-3xl flex justify-evenly items-center backdrop-blur-lg"
          style={{ marginTop: "11%", backgroundColor: "rgb(255,255,255,0.08)" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {filterButtons.map((button) => {
            const IconComponent = button.icon;
            return (
              <motion.button
                key={button.key}
                className={`rounded w-30 h-10 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 ${
                  filterType === button.key
                    ? "bg-blue-600 text-white opacity-100"
                    : "opacity-80 hover:opacity-100 hover:bg-blue-500/20"
                }`}
                onClick={() => filterEvents(button.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent size={16} />
                <span className="text-sm">{button.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          className="events"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {getFilteredEvents().map((event) => {
              const eventStatus = getEventStatus(event.date);
              const EventIcon = event.icon;
              const StatusIcon = eventStatus.icon;

              return (
                <motion.div
                  key={event.id}
                  className="card relative overflow-hidden"
                  data-date={event.date}
                  variants={cardVariants}
                  layout
                  onMouseEnter={() => setHoveredCard(event.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-content relative">
                    {/* Status Badge */}
                    <motion.div
                      className={`absolute top-4 right-4 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm ${eventStatus.color}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <StatusIcon size={12} />
                      <span className="text-xs capitalize">
                        {eventStatus.status}
                      </span>
                    </motion.div>

                    {/* Category Badge */}
                    <motion.div
                      className="absolute top-4 left-4 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-blue-600/80 backdrop-blur-sm text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <EventIcon size={12} />
                      <span className="text-xs">{event.category}</span>
                    </motion.div>

                    <div className="alignerevent relative">
                      <motion.img
                        src={event.imgSrc}
                        alt={event.title}
                        className="card-img"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Video Play Indicator */}
                      {event.videoSrc && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: hoveredCard === event.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="bg-black/50 rounded-full p-3 backdrop-blur-sm"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Play className="w-6 h-6 text-white" />
                          </motion.div>
                        </motion.div>
                      )}
                    </div>

                    {event.videoSrc && (
                      <video className="card-video" loop muted>
                        <source src={event.videoSrc} type="video/mp4" />
                      </video>
                    )}

                    <motion.div
                      className="card-info"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <motion.h2
                          className="flex items-center gap-2"
                          whileHover={{ color: "#3b82f6" }}
                        >
                          <EventIcon size={18} />
                          {event.title}
                        </motion.h2>
                      </div>

                      <motion.div
                        className="flex items-center gap-2 mb-3 text-sm opacity-70"
                        whileHover={{ opacity: 1 }}
                      >
                        <Calendar size={14} />
                        <span>{formatDate(event.date)}</span>
                      </motion.div>

                      <motion.p
                        className="text-sm opacity-80"
                        whileHover={{ opacity: 1 }}
                      >
                        {event.description}
                      </motion.p>

                      {/* Hover Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 pointer-events-none"
                        animate={{ opacity: hoveredCard === event.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
};

export default Events;
