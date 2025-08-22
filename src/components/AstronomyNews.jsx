/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from "react";
import "../index.css";
import { fetchAstronomyNews } from "../utils/astronomy-news";

const PAGE_SIZE = 9;

export default function AstronomyNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const seenIds = useRef(new Set());

  const loadInitial = useCallback(() => {
    setLoading(true);
    setError(null);
    setOffset(0);
    seenIds.current = new Set();
    fetchAstronomyNews({ limit: PAGE_SIZE, offset: 0 })
      .then((res) => {
        if (res.error) setError(res.error);
        else {
          setNews(res.news);
          res.news.forEach((item) => seenIds.current.add(item.id));
          setHasMore(res.news.length === PAGE_SIZE);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch news.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  useEffect(() => {
    if (!hasMore || loadingMore) return;
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        !loadingMore &&
        hasMore
      ) {
        setLoadingMore(true);
        fetchAstronomyNews({ limit: PAGE_SIZE, offset: news.length })
          .then((res) => {
            if (res.error) setError(res.error);
            else {
              const newArticles = res.news.filter(
                (item) => !seenIds.current.has(item.id)
              );
              newArticles.forEach((item) => seenIds.current.add(item.id));
              setNews((prev) => [...prev, ...newArticles]);
              setHasMore(newArticles.length === PAGE_SIZE);
            }
            setLoadingMore(false);
          })
          .catch(() => {
            setError("Failed to load more news.");
            setLoadingMore(false);
          });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [news.length, hasMore, loadingMore]);

  const handleRefresh = () => {
    loadInitial();
  };

  return (
    <>
      <div className="astronomy-news-container">
        <header className="astronomy-header">
          <h1 className="astronomy-title">Astronomy News</h1>
          <button
            className={`refresh-button ${loading ? "loading" : ""}`}
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </header>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="empty-state">
            <p>No news articles found.</p>
          </div>
        )}

        {news.length > 0 && (
          <div className="news-grid">
            {news.map((item) => (
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

        {loadingMore && (
          <div className="loading-more">
            <div className="spinner small"></div>
            <span>Loading more articles...</span>
          </div>
        )}

        {!hasMore && news.length > 0 && (
          <div className="end-message">
            <p>You've reached the end of the articles</p>
          </div>
        )}
      </div>
    </>
  );
}
