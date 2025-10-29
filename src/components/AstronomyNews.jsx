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
        {/* Header Section */}
        <header className="flex flex-col items-center text-center space-y-6 mb-16 md:pb-12 pb-4 relative">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-sm text-gray-300 font-medium">Latest Updates</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white py-8">
            Astronomy News
          </h1>

          {/* Refresh Button - Positioned on the right */}
          <button
            className={`absolute top-0 right-4 md:right-8 px-6 py-2.5 bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm rounded-full bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-900 cursor-pointer ${
              isRefreshing || isFetching ? "opacity-50 cursor-not-allowed" : ""
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

        {/* Show loading overlay when refreshing with existing content */}
        {isRefreshing && flattened.length > 0 && (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}

        {flattened.length > 0 && (
          <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {flattened.map((item) => (
              <article
                key={item.id}
                className="group relative bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                  <img
                    src={item.image || "/vite.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/vite.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-white leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>

                  {item.source && (
                    <div className="text-xs text-gray-500 pt-2">
                      {item.source}
                    </div>
                  )}

                  {/* Read More Link */}
                  <button
                    onClick={() =>
                      window.open(item.url, "_blank", "noopener,noreferrer")
                    }
                    className="inline-flex items-center gap-2 text-white font-medium text-sm hover:text-blue-400 transition-colors duration-200 group/btn cursor-pointer"
                  >
                    <span>Read more</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
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
        className={`fixed bottom-8 right-25 w-14 h-14 md:w-12 md:h-12 bg-white/10 border border-white/20 rounded-full text-white cursor-pointer flex items-center justify-center z-[1000] backdrop-blur-md shadow-lg transition-all duration-300 ease-out ${
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