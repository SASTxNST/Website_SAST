/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Landing from "./components/Landing.jsx";
import Navbar from "./components/Navbar.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Events from "./components/Events.jsx";
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
import SettingsMenu from "./components/SettingsMenu.jsx";
import Discover from "./pages/Discover.jsx";

import { Ion } from "cesium";
import useSettings from "./hooks/UseSettings.jsx";
Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/merch", "/contributions"];
  const { settings } = useSettings();
  return (
    <>
      {settings[1].enabled && <CursorEffects />}
      {settings[0].enabled && <NotifierSat />}
      <DiamondCursor />
      <ScrollToTop />
      <SettingsMenu />

      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <main className="pt-44 md:pt-56 px-0">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/events" element={<Events />} />
          <Route path="/discover" element={<Discover />} />
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
        </Routes>
      </main>
    </>
  );
};

export default AppContent;
