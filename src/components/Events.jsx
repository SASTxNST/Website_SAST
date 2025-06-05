import React, { useEffect, useState } from "react";
import "../index.css";
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
  }, [filterType]);

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

  const filterTypes = ["all", "past", "ongoing", "future"];

  const getLeftPosition = () => {
    const i = filterTypes.indexOf(filterType);
    const offsets = [0, 145, 280, 440];
    return `${offsets[i]}px`;
  };

  const getWidth = () => {
    const i = filterTypes.indexOf(filterType);
    if (i === 0) return 140;
    if (i === 1) return 120;
    if (i === 2) return 145;
    if (i === 3) return 160;
    return 100;
  };

  const events = [
    {
      id: 1,
      title: "Water Rocket Launch",
      date: "2025-02-16",
      imgSrc: waterpng,
      videoSrc: watervid,
      description:
        "A thrilling competition where teams designed, built, and launched water-powered rockets, blending creativity with engineering.",
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
      description: "A unique exhibit showcasing the scientific wonders.",
    },
    {
      id: 4,
      title: "Club Onboarding",
      date: "2024-01-05",
      imgSrc: onboard_png,
      videoSrc: onboard_vid,
      description:
        "Welcoming passionate space enthusiasts to join the SAST Club and embark on a journey of research and innovation.",
    },
    {
      id: 5,
      title: "Guest Lecture - Dr. Rajkumar Vedam",
      date: "2025-02-13",
      imgSrc: rajkv_png,
      videoSrc: "assets/tsuchinshan.mp4",
      description:
        "An insightful session with Dr. Rajkumar Vedam on the scientific advancements shaping the future of space technology.",
    },
    {
      id: 6,
      title: "Tsuchinshan Comet Spotting",
      date: "2024-01-05",
      imgSrc: comet_png,
      videoSrc: comet_vid,
      description:
        "Witness the wonders of the universe with this celestial event.",
    },
    {
      id: 7,
      title: "SAST Official Launch",
      date: "2024-01-05",
      imgSrc: launch_png,
      videoSrc: launch_vid,
      description:
        "Marking the beginning of our journey, the official launch event introduced SAST's vision, mission, and upcoming projects.",
    },
  ];

  return (
    <>
      <div className="eventsbg">
        <video autoPlay loop muted>
          <source src={videoe1} />
        </video>
      </div>
      <section className="eventssec h-320 flex flex-col items-center mt-28">
        <div
          className="relative h-18 w-150 rounded-3xl flex justify-between items-center overflow-hidden"
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
            className="h-20 absolute transition-all duration-500 ease-in-out bg-blue-500/30 backdrop-blur-sm shadow-lg"
            style={{
              left: getLeftPosition(),
              width: `${getWidth()}px`,
            }}
          />
            {filterTypes.map((type) => (
              <button
                key={type}
                onClick={() => filterEvents(type)}
                className={`rounded-xl px-4 py-2 cursor-pointer z-10 transition-all duration-300 ${
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

        <div className="events gap-10">
          {getFilteredEvents().map((event) => (
           <div
              key={event.id}
              className="card group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300
                w-[400px] md:w-[320px] sm:w-[280px] xs:w-[240px]"
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
    </>
  );
};

export default Events;
