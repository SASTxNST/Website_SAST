/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Landing from "./components/Landing.jsx";
import Navbar from "./components/Navbar.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Events from "./components/Events.jsx";
import EventCalendarPage from "./pages/EventCalendarPage.jsx";
import Projects from "./components/Projects.jsx";
import Store from "./components/Store.jsx";
import ContributionRanks from "./pages/ContributionRanks.jsx";
import CursorEffects from "./components/CursorEffects.jsx";
import DiamondCursor from "./components/DiamondCursor.jsx";
import AstronomyNews from "./components/AstronomyNews.jsx";
import SatelliteTracker from "./components/tracking/SatelliteTracker.jsx";
import NotifierSat from "./components/NotifierSat.jsx";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Footer from "./components/footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Members from "./pages/Members.jsx";
import MemberProfile from "./pages/MemberProfile.jsx";
import ContributorProfile from "./pages/ContributorProfile.jsx";
import Contributors from "./pages/Contributors.jsx";
import DocsHub from "./pages/DocsHub.jsx";
import SettingsMenu from "./components/SettingsMenu.jsx";
import ChatBot from "./components/ChatBot.jsx";
import { Ion } from "cesium";
import useSettings from "./hooks/UseSettings.jsx";
import Loader from "./components/Loader.jsx";
Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/merch", "/contributions"];
  const { settings, getSetting } = useSettings();
  const isPointerEnabled = getSetting("pointerAnimations");

  useEffect(() => {
    document.body.style.cursor = isPointerEnabled ? "none" : "auto";
  }, [isPointerEnabled]);

  return (
    <>
      {settings[0].enabled && <NotifierSat />}
      {isPointerEnabled && <CursorEffects isActive={isPointerEnabled} />}
      <DiamondCursor isActive={isPointerEnabled} />
      <Loader/>
      <ScrollToTop />
      <SettingsMenu />
      <ChatBot />
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <main className="">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/events" element={<Events />} />
          <Route path="/calendar" element={<EventCalendarPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/merch" element={<Store />} />
          <Route path="/contributions" element={<ContributionRanks />} />
          <Route path="/news" element={<AstronomyNews />} />
          <Route path="/track" element={<SatelliteTracker />} />
          <Route path="/register" element={<Register />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/community/members" element={<Members />} />
          <Route path="/community/members/:slug" element={<MemberProfile />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/contributors/:slug" element={<ContributorProfile />} />
          <Route path="/docs/*" element={<DocsHub />} />
        </Routes>
      </main>
    </>
  );
};

export default AppContent;
