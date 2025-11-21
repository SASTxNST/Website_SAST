/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useMemo, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import "../index.css";
import { fetchAstronomyNews } from "../utils/astronomy-news";

const PAGE_SIZE = 9;

const spaceImages = [
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1447433819943-74a20887a81e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
];

export default function AstronomyNews() {
  const seenIds = useRef(new Set());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const fetchPage = async ({ pageParam = 0 }) => {
    const res = await fetchAstronomyNews({
      limit: PAGE_SIZE,
      offset: pageParam,
    });
    if (res.error) throw new Error(res.error);
    return {
      articles: res.news,
      nextOffset: pageParam + res.news.length,
      total: res.total,
    };
  };

  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["astronomyNews"],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.articles.length < PAGE_SIZE) return undefined;
      return lastPage.nextOffset;
    },
    initialPageParam: 0,
  });

  const pages = data?.pages || [];
  const flattened = useMemo(() => pages.flatMap((p) => p.articles), [pages]);

  // 🌌 Assign a consistent random fallback per article
  const fallbackImages = useMemo(() => {
    const map = new Map();
    flattened.forEach((item) => {
      map.set(
        item.id,
        spaceImages[Math.floor(Math.random() * spaceImages.length)]
      );
    });
    return map;
  }, [flattened]);

  useEffect(() => {
    if (!data) return;

    if (seenIds.current.size === 0) {
      flattened.forEach((a) => seenIds.current.add(a.id));
      return;
    }

    const latestPage = data.pages[0]?.articles || [];
    const newItems = latestPage.filter((a) => !seenIds.current.has(a.id));
    if (newItems.length > 0) {
      newItems.forEach((a) => seenIds.current.add(a.id));
    }
  }, [data, flattened]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowScrollToTop(scrollPosition > 500);
      if (windowHeight + scrollPosition >= document.body.offsetHeight - 300) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    seenIds.current.clear();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await queryClient.invalidateQueries({ queryKey: ["astronomyNews"] });
    setIsRefreshing(false);
  };

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  function getRandomAstronomyImage() {
    const images = [
      "https://images-assets.nasa.gov/image/PIA12235/PIA12235~orig.jpg",
      "https://apod.nasa.gov/apod/image/1901/IC405_Abolfath_3952.jpg",
      "https://images-assets.nasa.gov/image/PIA04921/PIA04921~orig.jpg",
      "https://apod.nasa.gov/apod/image/1807/NGC6744-HaLRGBpugh1024.jpg",
      "https://images-assets.nasa.gov/image/PIA03606/PIA03606~orig.jpg",
      "https://apod.nasa.gov/apod/image/1701/OrionNebula_Hubble_960.jpg",
      "https://apod.nasa.gov/apod/image/1902/MilkyWayPanorama_Merzlyakov_2000.jpg",
      "https://apod.nasa.gov/apod/image/1709/LagoonTrifid_Vargas_1824.jpg",
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  return (
    <div className="pt-20 md:pt-15 px-0">
      <div className="astronomy-news-container">
        <header className="astronomy-header">
          <h1 className="astronomy-title">Astronomy News</h1>
          <button
            className={`refresh-button ${
              isRefreshing || isFetching ? "loading" : ""
            }`}
            onClick={handleRefresh}
            disabled={isRefreshing || isFetching}
          >
            {isRefreshing || isFetching ? "Loading..." : "Refresh"}
          </button>
        </header>

        {(isFetching || isRefreshing) && flattened.length === 0 && (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-message">{error.message || String(error)}</p>
          </div>
        )}

        {!isFetching && !error && flattened.length === 0 && (
          <div className="empty-state">
            <p>No news articles found.</p>
          </div>
        )}

        {isRefreshing && flattened.length > 0 && (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}

        {flattened.length > 0 && (
          <div className="news-grid">
            {flattened.map((item) => (
              <article
                key={item.id}
                className="news-card relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-pointer"
                onClick={() =>
                  window.open(item.url, "_blank", "noopener,noreferrer")
                }
              >
                <div className="news-image-container relative">
                  <img
                    src={item.image || fallbackImages.get(item.id)}
                    alt={item.title}
                    className="news-image w-full h-56 object-cover rounded-t-2xl opacity-90 transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = fallbackImages.get(item.id);
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl"></div>
                </div>

                <div className="news-content p-4 backdrop-blur-sm bg-white/5 rounded-b-2xl border-t border-white/10">
                  <h2 className="news-title text-white text-lg font-semibold mb-2">
                    {item.title}
                  </h2>
                  <p className="news-summary text-gray-300 text-sm line-clamp-3">
                    {item.summary}
                  </p>
                  {item.source && (
                    <div className="news-source text-blue-400 text-xs mt-2">
                      {item.source}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {isFetchingNextPage && (
          <div className="loading-more">
            <div className="spinner small"></div>
            <span>Loading more articles...</span>
          </div>
        )}

        {!hasNextPage && flattened.length > 0 && (
          <div className="end-message">
            <p>You've reached the end of the articles</p>
          </div>
        )}
      </div>

      <button
        className={`fixed bottom-30 right-10 w-14 h-14 md:w-12 md:h-12 bg-white/10 border border-white/20 rounded-full text-white cursor-pointer flex items-center justify-center z-[1000] backdrop-blur-md shadow-lg transition-all duration-300 ease-out ${
          showScrollToTop
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-5"
        } hover:bg-white/15 hover:border-white/30 hover:-translate-y-1 hover:shadow-xl`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 ease-out hover:-translate-y-0.5"
        >
          <path
            d="M12 19V5M5 12L12 5L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
