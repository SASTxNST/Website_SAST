import React from "react";

const Explore = () => {
  return (
    <div style={{padding: "2rem"}}>
      <h1>Explore</h1>
      <section style={{marginBottom: "2rem"}}>
        <h2>Tracking</h2>
        <p>Track celestial events and objects here. (You can add APIs or mock data for live tracking.)</p>
      </section>
      <section style={{marginBottom: "2rem"}}>
        <h2>Astronomy News</h2>
        <p>Latest astronomy news will appear here. (Example: Integrate a news API or add static news articles.)</p>
      </section>
      <section>
        <h2>Media</h2>
        <p>Gallery of astronomy images and videos. (You can add images from your project, links, or embed videos.)</p>
      </section>
    </div>
  );
};

export default Explore;
