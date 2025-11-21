/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import EventCalendar from "../components/EventCalendar/EventCalendar";
import eventsData from "../data/calendarEvents.json";
import "../components/EventCalendar/EventCalendar.css";

const EventCalendarPage = () => {
  return (
    <div className="event-calendar-page ">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="calendar-header"
      >
        <h1 className="calendar-title ">
          Event Calendar
        </h1>
        <p className="calendar-subtitle">
          Explore past, ongoing, and upcoming events at SAST
        </p>
      </motion.div>

      <EventCalendar events={eventsData.events} />
    </div>
  );
};

export default EventCalendarPage;
