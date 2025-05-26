import React, { useEffect, useState } from "react";
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

  const events = [
    {
      id: 1,
      title: "Water Rocket Launch",
      date: "2025-02-16",
      imgSrc: waterpng,
      videoSrc: "assets/watervid.mp4",
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

      <section className="eventssec h-320 flex flex-col  items-center ">
        <div
          className=" h-18 w-200 rounded-3xl flex justify-evenly items-center"
          style={{ marginTop: "11%", backgroundColor: "rgb(255,255,255,0.08)" }}
        >
          <button
            className="rounded w-30 h-10 cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => filterEvents("all")}
          >
            All Events
          </button>
          <button
            className="rounded w-30 h-10 cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => filterEvents("past")}
          >
            Past Events
          </button>
          <button
            className="rounded w-35 h-10 cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => filterEvents("ongoing")}
          >
            Ongoing Events
          </button>
          <button
            className="rounded w-30 h-10 cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => filterEvents("future")}
          >
            Future Events
          </button>
        </div>

        <div className="events">
          {getFilteredEvents().map((event) => (
            <div key={event.id} className="card" data-date={event.date}>
              <div className="card-content">
                <div className="alignerevent">
                  <img
                    src={event.imgSrc}
                    alt={event.title}
                    className="card-img"
                  />
                </div>
                <video className="card-video" loop muted>
                  <source src={event.videoSrc} type="video/mp4" />
                </video>
                <div className="card-info">
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Events;
