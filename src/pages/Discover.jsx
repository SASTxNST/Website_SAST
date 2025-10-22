import React from "react";

const Discover = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Discover</h1>

      {/* Images Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Images</h2>
        <p>Event highlights, posters, astronomy shots, etc.</p>
        {/* TODO: Add sample images or image grid */}
      </section>

      {/* Videos Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>
        <p>YouTube embeds, uploaded videos, or links.</p>
        {/* TODO: Add sample video embeds */}
      </section>

      {/* Event Highlights Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Event Highlights</h2>
        <p>Date-wise archive with cards or timeline layout.</p>
        {/* TODO: Add event cards or timeline */}
      </section>

      {/* Workshop & Session Recordings Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Workshop & Session Recordings</h2>
        <p>Recordings with title and description.</p>
        {/* TODO: Add recordings list or players */}
      </section>
    </div>
  );
};

export default Discover;
