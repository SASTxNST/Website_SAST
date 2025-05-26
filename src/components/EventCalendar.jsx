import React, { useState, useEffect } from "react";
import "./EventCalendar.scss";
const dummyEvents = [
  {
    title: "Water Rocket Launch",
    start: "2025-05-20T10:00:00",
    end: "2025-05-20T12:00:00",
    description: "A thrilling competition for water-powered rockets.",
  },
  {
    title: "CubeSat Showcase",
    start: "2025-05-25T14:00:00",
    end: "2025-05-25T16:00:00",
    description: "Experience our latest CubeSat technology.",
  },
  {
    title: "Astronomy Night",
    start: "2025-05-26T20:00:00",
    end: "2025-05-26T23:00:00",
    description: "Join us for a night of stargazing and learning about the cosmos.",
  },
  {
    title: "Satellite Design Workshop",
    start: "2025-05-30T09:00:00",
    end: "2025-05-30T17:00:00",
    description: "A hands-on workshop on designing and building small satellites.",
  },
];

const EventCalendar = ({ events = dummyEvents }) => {
  const [categorizedEvents, setCategorizedEvents] = useState({
    past: [],
    ongoing: [],
    upcoming: [],
  });

  useEffect(() => {
    const now = new Date();

    const past = [];
    const ongoing = [];
    const upcoming = [];

    events.forEach((event) => {
      const start = new Date(event.start);
      const end = new Date(event.end);

      if (end < now) {
        past.push(event);
      } else if (start <= now && end >= now) {
        ongoing.push(event);
      } else {
        upcoming.push(event);
      }
    });

    setCategorizedEvents({ past, ongoing, upcoming });
  }, [events]);

  const renderEvents = (eventList, type) =>
    eventList.length > 0 ? (
      <div className="event-list">
        {eventList.map((event, i) => (
          <div
            key={i}
            className={`event-card ${
              type === "past"
                ? "event-past"
                : type === "ongoing"
                ? "event-ongoing"
                : "event-upcoming"
            }`}
          >
            <h3 className="event-title">{event.title}</h3>
            <p className="event-time">
              {new Date(event.start).toLocaleString()} -{" "}
              {new Date(event.end).toLocaleString()}
            </p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="no-events">No {type} events</p>
    );

  return (
    <div className="event-calendar-container">
      <h1 className="event-calendar-title">Event Calendar</h1>
      {events.length === 0 ? (
        <p className="no-events-message">No events available at the moment.</p>
      ) : (
        <div className="event-grid">
          <div className="event-category">
            <h2 className="category-title">Past Events</h2>
            {renderEvents(categorizedEvents.past, "past")}
          </div>
          <div className="event-category">
            <h2 className="category-title">Ongoing Events</h2>
            {renderEvents(categorizedEvents.ongoing, "ongoing")}
          </div>
          <div className="event-category">
            <h2 className="category-title">Upcoming Events</h2>
            {renderEvents(categorizedEvents.upcoming, "upcoming")}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
