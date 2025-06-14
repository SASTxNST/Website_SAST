import React, { useEffect, useState } from "react";
import "../index.css";
import { motion } from "framer-motion";
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

const Events = () => {
  const [filterType, setFilterType] = useState("all");
  useLenis();

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleHover = (event, action) => {
      const video = event.currentTarget.querySelector("video");
      if (!video) return;

      if (isMobile) {
        video.paused ? video.play() : video.pause();
        video.classList.toggle("opacity-60");
      } else {
        if (action === "play") video.play();
        else {
          video.pause();
          video.currentTime = 0;
        }
      }
    };

    const cards = document.querySelectorAll(".card");
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

  const filterEvents = (type) => setFilterType(type);

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

  const filterTypes = ["all", "past", "ongoing", "future"];
  const getLeftPosition = () => {
    const i = filterTypes.indexOf(filterType);
    const offsets = [0, 145, 280, 440];
    return `${offsets[i]}px`;
  };
  const getWidth = () => {
    const i = filterTypes.indexOf(filterType);
    return [140, 120, 145, 160][i] || 100;
  };

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

  const timelineData = [...events]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(({ date, title, description }) => ({
      date: date.slice(0, 7),
      title,
      description,
    }));

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={videoe1} type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 bg-black/80 min-h-screen pb-40">
        <section className="eventssec flex flex-col items-center mt-28 px-2">
          {/* Filter Bar */}
          <div
            className="relative h-18 w-full max-w-[90vw] sm:w-[600px] rounded-3xl flex justify-start sm:justify-between items-center overflow-x-auto no-scrollbar sm:overflow-visible flex-nowrap sm:flex-nowrap"
            style={{
              marginTop: "12%",
              backgroundColor: "rgba(255,255,255,0.08)",
              paddingLeft: "40px",
              paddingRight: "40px",
              boxShadow: "0 0 12px 4px rgba(59, 130, 246, 0.5)",
              gap: "16px",
            }}
          >
            <div
              className="h-20 absolute transition-all duration-500 ease-in-out bg-blue-500/30 backdrop-blur-sm shadow-lg hidden sm:block"
              style={{
                left: getLeftPosition(),
                width: `${getWidth()}px`,
              }}
            />
            {filterTypes.map((type) => (
              <button
                key={type}
                onClick={() => filterEvents(type)}
                className={`rounded-xl px-4 py-2 cursor-pointer z-10 whitespace-nowrap transition-all duration-300 ${
                  filterType === type
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {type === "all" && "All Events"}
                {type === "past" && "Past Events"}
                {type === "ongoing" && "Ongoing Events"}
                {type === "future" && "Future Events"}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="events flex flex-wrap justify-center gap-10 mt-10">
            {getFilteredEvents().map((event) => (
              <div
                key={event.id}
                className="card group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 w-[90vw] sm:w-[320px]"
              >
                <div className="relative">
                  <img
                    src={event.imgSrc}
                    alt={event.title}
                    className="card-img w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
                  />
                  <video
                    className="card-video absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-t-2xl"
                    loop
                    muted
                  >
                    <source src={event.videoSrc} type="video/mp4" />
                  </video>
                </div>
                <div className="card-info p-4 text-white">
                  <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                  <p className="text-sm text-gray-300">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>



      </div>
 
{/* EVENTS TIMELINE */}
<section className="timeline_sast">
  <div className="w-full max-w-5xl mb-40">
    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 text-gradient-to-r from-blue-400 to-sky-500">
      SAST Events Timeline
    </h2>

    <div className="relative">
      {/* Desktop Center Line */}
      <motion.div
        className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-sky-300 to-transparent z-0 animate-pulse"
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        viewport={{ once: true }}
      />

      {timelineData.map((event, index) => {
        const isLeft = index % 2 === 0;
        const year = event.date.split("-")[0];
        const prevYear = index > 0 ? timelineData[index - 1].date.split("-")[0] : null;
        const showYear = year !== prevYear;

        return (
          <div key={`event-${index}`}>
            {showYear && (
              <div className="text-center mb-12">
                <div className="inline-block px-8 py-3 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg text-blue-300/90 text-3xl font-bold tracking-wide">
                  {year}
                </div>
              </div>
            )}

            {/* Desktop Timeline Item */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.4 }}
              className="hidden lg:grid relative mb-24 grid-cols-9 items-start"
            >
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-4 z-10">
                <div className="w-5 h-5 bg-sky-400 rounded-full blur-[2px] animate-pulse-slow absolute inset-0" />
                <div className="w-5 h-5 bg-blue-500 rounded-full relative z-10 shadow-lg shadow-blue-500/30" />
              </div>

              {isLeft ? (
                <>
                  <div className="col-span-4 pr-6 text-right">
                    <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 min-h-[220px] w-full shadow-xl transition hover:scale-[1.015] duration-300">
                      <p className="text-sm text-blue-200 mb-1">{event.date}</p>
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-300 text-sm">{event.description}</p>
                    </div>
                  </div>
                  <div className="col-span-1" />
                  <div className="col-span-4" />
                </>
              ) : (
                <>
                  <div className="col-span-4" />
                  <div className="col-span-1" />
                  <div className="col-span-4 pl-6 text-left">
                    <div className="bg-gradient-to-bl from-white/5 via-white/10 to-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 min-h-[220px] w-full shadow-xl transition hover:scale-[1.015] duration-300">
                      <p className="text-sm text-blue-200 mb-1">{event.date}</p>
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-300 text-sm">{event.description}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* Mobile & Tablet Timeline Item */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              viewport={{ once: true, amount: 0.2 }}
              className="block lg:hidden relative flex items-start gap-4 px-4 mb-12"
            >
              {/* Timeline Line and Dot */}
              <div className="relative">
                <motion.div
                  className="w-[2px] h-full bg-gradient-to-b from-sky-400 via-blue-400 to-sky-200"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1.2 }}
                  viewport={{ once: true }}
                />
                {/* Dot */}
                <div className="absolute -left-[7px] top-1">
                  <div className="w-4 h-4 bg-sky-400 rounded-full blur-[1px] animate-pulse-slow absolute inset-0" />
                  <div className="w-4 h-4 bg-blue-500 rounded-full relative z-10 shadow-md shadow-blue-500/30" />
                </div>
              </div>

              {/* Event Card */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 shadow-md w-full transition hover:scale-[1.015]">
                <p className="text-sm text-blue-200">{event.date}</p>
                <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                <p className="text-gray-300">{event.description}</p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  </div>
</section>


    </>
  );
};

export default Events;




