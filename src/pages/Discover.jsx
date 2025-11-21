import { useState } from "react";
import { motion } from "framer-motion";

const Discover = () => {
    const [activeTab, setActiveTab] = useState("all");

    // Dummy Data
    const images = [
        { id: 1, src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", title: "Starry Night", category: "images" },
        { id: 2, src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop", title: "Nebula", category: "images" },
        { id: 3, src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2022&auto=format&fit=crop", title: "Galaxy", category: "images" },
        { id: 4, src: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?q=80&w=2071&auto=format&fit=crop", title: "Astronaut", category: "images" },
    ];

    const videos = [
        { id: 1, src: "https://www.youtube.com/embed/libKVRa01L8", title: "Space Exploration", category: "videos" },
        { id: 2, src: "https://www.youtube.com/embed/uD4izuDMUQA", title: "Mars Mission", category: "videos" },
    ];

    const events = [
        { id: 1, date: "2023-10-15", title: "Stargazing Night", description: "A wonderful night under the stars.", category: "events" },
        { id: 2, date: "2023-11-20", title: "Rocket Workshop", description: "Learning how to build rockets.", category: "events" },
    ];

    const recordings = [
        { id: 1, title: "Intro to Astrophysics", duration: "45 min", category: "recordings" },
        { id: 2, title: "Black Holes Explained", duration: "60 min", category: "recordings" },
    ];

    const allContent = [...images, ...videos, ...events, ...recordings];

    const filteredContent = activeTab === "all" ? allContent : allContent.filter(item => item.category === activeTab);

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-8 lg:px-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                    Discover SAST
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Explore our gallery of images, videos, past events, and session recordings.
                </p>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {["all", "images", "videos", "events", "recordings"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredContent.map((item) => (
                    <motion.div
                        key={item.id + item.category}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-colors group"
                    >
                        {/* Images */}
                        {item.category === "images" && (
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                </div>
                            </div>
                        )}

                        {/* Videos */}
                        {item.category === "videos" && (
                            <div className="aspect-video">
                                <iframe
                                    src={item.src}
                                    title={item.title}
                                    className="w-full h-full"
                                    allowFullScreen
                                ></iframe>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                </div>
                            </div>
                        )}

                        {/* Events */}
                        {item.category === "events" && (
                            <div className="p-6 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-blue-400 text-sm font-mono mb-2">{item.date}</div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.description}</p>
                                </div>
                                <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-2">
                                    View Details →
                                </button>
                            </div>
                        )}

                        {/* Recordings */}
                        {item.category === "recordings" && (
                            <div className="p-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-500 text-sm">{item.duration}</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Discover;
