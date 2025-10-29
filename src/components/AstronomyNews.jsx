/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useMemo, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import "../index.css";
import { fetchAstronomyNews } from "../utils/astronomy-news";

const PAGE_SIZE = 9;

export default function AstronomyNews() {
  const seenIds = useRef(new Set());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  // Helper to fetch a page by pageParam (offset)
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

  // Flatten pages into a single array
  const pages = data?.pages || [];
  const flattened = useMemo(() => pages.flatMap((p) => p.articles), [pages]);

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

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show scroll-to-top button when user has scrolled down at least 500px
      // This is much more sensitive for testing
      setShowScrollToTop(scrollPosition > 500);

      // Infinite scroll logic
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
    await new Promise(resolve => setTimeout(resolve, 2000));
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

  return (
    <div className="pt-44 md:pt-56 px-0">
      <div className="astronomy-news-container">
        <header className="astronomy-header">
          <h1 className="astronomy-title">Astronomy News</h1>
          <button
            className={`refresh-button ${isRefreshing || isFetching ? "loading" : ""}`}
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

        {/* Show loading overlay when refreshing with existing content */}
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
                className="news-card"
                onClick={() =>
                  window.open(item.url, "_blank", "noopener,noreferrer")
                }
              >
                <div className="news-image-container">
                  <img
                    src={item.image || "/vite.svg"}
                    alt={item.title}
                    className="news-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/vite.svg";
                    }}
                  />
                </div>

                <div className="news-content">
                  <h2 className="news-title">{item.title}</h2>
                  <p className="news-summary">{item.summary}</p>
                  {item.source && (
                    <div className="news-source">{item.source}</div>
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

      {/* Scroll to Top Button */}
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
