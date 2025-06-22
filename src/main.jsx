import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Landing from "./components/Landing.jsx";
import Navbar from "./components/Navbar.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Events from "./components/Events.jsx";
import Projects from "./components/Projects.jsx";
import Team from "./components/Team.jsx";
import Login from "./components/Login.jsx";
import Store from "./components/Store.jsx";

import ContributionRanks from "./pages/ContributionRanks.jsx";
import CursorEffects from "./components/CursorEffects.jsx";
import DiamondCursor from "./components/DiamondCursor.jsx";
import AstronomyNews from "./components/AstronomyNews.jsx";
import SatelliteTracker from "./components/tracking/SatelliteTracker.jsx";
import NotifierSat from "./components/NotifierSat.jsx";

import { Ion } from "cesium";

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;
const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/merch", "/contributions"];

  return (
    <>
      <CursorEffects />
      <DiamondCursor />
      <NotifierSat />
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/login" element={<Login />} />
        <Route path="/merch" element={<Store />} />
        <Route path="/contributions" element={<ContributionRanks />} />
        <Route path="/news" element={<AstronomyNews />} />
        <Route path="/track" element={<SatelliteTracker />} />
      </Routes>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
