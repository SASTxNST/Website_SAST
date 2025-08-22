/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import EarthViewer from "./EarthViewer";
import Loader from "./Loader";

function SatelliteTracker() {
  const [loading, setLoading] = useState(true);

  // EarthViewer will call setLoading(false) when ready
  return (
    <>
      {loading && (
        <Loader msg="Loading satellites and orbits. Please wait..." />
      )}
      <EarthViewer loading={loading} setLoading={setLoading} />
    </>
  );
}

export default SatelliteTracker;
