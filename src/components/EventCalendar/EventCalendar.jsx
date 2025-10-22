/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths, parseISO, isBefore, isAfter, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, ExternalLink, Tag, X } from "lucide-react";
import { cn } from "../../lib/events-calendar/utils";
import "./EventCalendar.css";

// EventCalendar Component - Pass events as props
const EventCalendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState("calendar"); // calendar or list
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest"); // newest or oldest

  // Get all categories from events
  const categories = useMemo(() => {
    const cats = new Set(events.map((event) => event.category));
    return ["all", ...Array.from(cats)];
  }, [events]);

  // Filter events based on status
  const getEventStatus = (event) => {
    const today = startOfDay(new Date());
    const startDate = startOfDay(parseISO(event.startDate));
    const endDate = startOfDay(parseISO(event.endDate));

    if (isBefore(endDate, today)) return "past";
    if (isAfter(startDate, today)) return "upcoming";
    return "ongoing";
  };

  // Get filtered events
  const filteredEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      const matchesCategory = filterCategory === "all" || event.category === filterCategory;
      const status = getEventStatus(event);
      const matchesStatus = filterStatus === "all" || status === filterStatus;
      return matchesCategory && matchesStatus;
    });

    // Sort events based on sortOrder
    filtered.sort((a, b) => {
      const dateA = parseISO(a.startDate);
      const dateB = parseISO(b.startDate);
      if (sortOrder === "newest") {
        return dateB - dateA; // Newest first
      } else {
        return dateA - dateB; // Oldest first
      }
    });

    return filtered;
  }, [events, filterCategory, filterStatus, sortOrder]);

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return filteredEvents.filter((event) => {
      const startDate = parseISO(event.startDate);
      const endDate = parseISO(event.endDate);
      return isSameDay(date, startDate) || isSameDay(date, endDate) ||
        (isAfter(date, startDate) && isBefore(date, endDate));
    });
  };

  // Calendar grid generation
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Adjust to start from Sunday
  const firstDayOfMonth = monthStart.getDay();
  const daysToAdd = Array(firstDayOfMonth).fill(null);
  const allDays = [...daysToAdd, ...calendarDays];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDateClick = (day) => {
    if (!day) return;
    setSelectedDate(day);
    const events = getEventsForDate(day);
    if (events.length === 1) {
      setSelectedEvent(events[0]);
    }
  };

  const getEventColor = (category) => {
    const colors = {
      Competition: "from-purple-500 to-pink-500",
      Exhibition: "from-blue-500 to-cyan-500",
      Workshop: "from-green-500 to-emerald-500",
      Observation: "from-orange-500 to-amber-500",
      Ceremony: "from-red-500 to-rose-500",
      Recruitment: "from-indigo-500 to-purple-500",
    };
    return colors[category] || "from-gray-500 to-slate-500";
  };

  const getStatusBadge = (event) => {
    const status = getEventStatus(event);
    const badges = {
      past: { text: "Completed", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
      ongoing: { text: "Ongoing", color: "bg-green-500/20 text-green-300 border-green-500/30" },
      upcoming: { text: "Upcoming", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    };
    const badge = badges[status];
    return (
      <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", badge.color)}>
        {badge.text}
      </span>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* View Toggle & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="calendar-filters"
        >
          {/* View Mode Toggle */}
          <div className="view-toggle-container">
            <button
              onClick={() => setViewMode("calendar")}
              className={cn(
                "px-6 py-2 flex flex-row items-center gap-2 rounded-lg transition-all duration-300 font-medium",
                viewMode === "calendar"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <Calendar className="inline w-4 h-4 mr-2" />
              Calendar
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "px-6 py-2 rounded-lg transition-all duration-300 font-medium",
                viewMode === "list"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-400 hover:text-white"
              )}
            >
              List View
            </button>
          </div>

          {/* Filters */}
          <div className="filter-dropdowns">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="past">Past</option>
              <option value="ongoing">Ongoing</option>
              <option value="upcoming">Upcoming</option>
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="calendar-view-container"
          >
            {/* Calendar Header */}
            <div className="calendar-month-header">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="calendar-month-title">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="calendar-day-headers">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="calendar-day-header">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              {allDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dayEvents = getEventsForDate(day);
                const hasEvents = dayEvents.length > 0;
                const isCurrentDay = isToday(day);
                const isSelected = selectedDate && isSameDay(day, selectedDate);

                return (
                  <motion.button
                    key={day.toString()}
                    onClick={() => handleDateClick(day)}
                    whileHover={{ scale: hasEvents ? 1.05 : 1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "aspect-square p-2 rounded-lg transition-all duration-300 relative",
                      "border border-white/10",
                      isCurrentDay && "ring-2 ring-cyan-400 bg-cyan-500/10",
                      isSelected && "bg-blue-500/20 ring-2 ring-blue-400",
                      hasEvents && !isCurrentDay && !isSelected && "bg-white/15 hover:bg-white/30",
                      !hasEvents && !isCurrentDay && !isSelected && "bg-transparent hover:bg-white/5",
                      !isSameMonth(day, currentDate) && "opacity-30"
                    )}
                  >
                    <span className={cn("text-base md:text-xl xl:text-2xl font-medium", isCurrentDay && "text-cyan-400")}>
                      {format(day, "d")}
                    </span>
                    {hasEvents && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                        {dayEvents.slice(0, 3).map((event, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-2.5 h-2.5 rounded-full bg-gradient-to-r",
                              getEventColor(event.category)
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Selected Date Events */}
            <AnimatePresence>
              {selectedDate && getEventsForDate(selectedDate).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="selected-date-events"
                >
                  <h3 className="selected-date-title">
                    Events on {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                  <div className="events-list">
                    {getEventsForDate(selectedDate).map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="event-card"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="event-card-header">
                          <div className="event-card-content">
                            <h4 className="event-card-title">{event.title}</h4>
                            <p className="event-card-time">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </p>
                          </div>
                          {getStatusBadge(event)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <>
            {/* Sort Controls */}
            <div className="sort-controls">
              <label className="sort-label">Sort by:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="newest" className="bg-gray-900">Newest First</option>
                <option value="oldest" className="bg-gray-900">Oldest First</option>
              </select>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="list-view-container"
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="list-event-card"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="list-event-content">
                    {/* Date Badge with Year */}
                    <div className="flex-shrink-0">
                      <div className={cn(
                        "list-event-date-badge bg-gradient-to-br",
                        getEventColor(event.category)
                      )}>
                        <span className="text-2xl font-bold date-day">
                          {format(parseISO(event.startDate), "d")}
                        </span>
                        <span className="text-xs uppercase date-month">
                          {format(parseISO(event.startDate), "MMM")}
                        </span>
                        <span className="text-xs font-semibold date-year">
                          {format(parseISO(event.startDate), "yyyy")}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="list-event-details">
                      <div className="list-event-header">
                        <h3 className="list-event-title">
                          {event.title}
                        </h3>
                        {getStatusBadge(event)}
                      </div>
                      <p className="list-event-description">{event.description}</p>
                      <div className="list-event-meta">
                        <span className="list-event-meta-item">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                        <span className="list-event-meta-item">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                        <span className="list-event-meta-item">
                          <Tag className="w-4 h-4" />
                          {event.category}
                        </span>
                      </div>
                      {event.tags && (
                        <div className="list-event-tags">
                          {event.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="list-event-tag"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

            {filteredEvents.length === 0 && (
              <div className="empty-state">
                <p className="empty-state-text">No events found matching your filters.</p>
              </div>
            )}
            </motion.div>
          </>
        )}
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Event Image */}
              {selectedEvent.image && (
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                  )} />
                </div>
              )}

              <div className="event-modal-content">
                {/* Header */}
                <div className="event-modal-header">
                  <div className="event-modal-title-row">
                    <h2 className="event-modal-title">
                      {selectedEvent.title}
                    </h2>
                    {getStatusBadge(selectedEvent)}
                  </div>
                  <div className={cn(
                    "inline-block px-4 py-2 rounded-lg bg-gradient-to-r",
                    getEventColor(selectedEvent.category)
                  )}>
                    <span className="font-semibold">{selectedEvent.category}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="event-modal-details">
                  <div className="event-modal-detail-row">
                    <Calendar className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="event-modal-detail-label">Date</p>
                      <p className="event-modal-detail-value">
                        {format(parseISO(selectedEvent.startDate), "MMMM d, yyyy")}
                        {selectedEvent.startDate !== selectedEvent.endDate &&
                          ` - ${format(parseISO(selectedEvent.endDate), "MMMM d, yyyy")}`}
                      </p>
                    </div>
                  </div>

                  <div className="event-modal-detail-row">
                    <Clock className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="event-modal-detail-label">Time</p>
                      <p className="event-modal-detail-value">{selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className="event-modal-detail-row">
                    <MapPin className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <p className="event-modal-detail-label">Location</p>
                      <p className="event-modal-detail-value">{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="event-modal-section">
                  <h3 className="event-modal-section-title">About this Event</h3>
                  <p className="event-modal-description">{selectedEvent.description}</p>
                </div>

                {/* Tags */}
                {selectedEvent.tags && (
                  <div className="event-modal-section">
                    <h3 className="event-modal-section-title">Tags</h3>
                    <div className="event-modal-tags">
                      {selectedEvent.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="event-modal-tag"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Registration Button */}
                {selectedEvent.registrationLink && getEventStatus(selectedEvent) !== "past" && (
                  <a
                    href={selectedEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventCalendar;
