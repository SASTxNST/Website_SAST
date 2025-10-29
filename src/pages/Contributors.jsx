/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getRepos,
  getContributorsByRepo,
  getAllContributors,
} from "../lib/contributors/data";
import FilterPill from "../components/FilterPill";

/* ---------------- Repo Filter Pill ---------------- */

function RepoPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-xl text-sm backdrop-blur transition ${
        active
          ? "border border-emerald-400/45 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20"
          : "border border-white/15 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/25"
      }`}
      style={{ padding: "0.5rem 1rem" }}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          active
            ? "bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,.15)]"
            : "bg-zinc-500"
        }`}
      />
      <span className="capitalize">{label}</span>
    </button>
  );
}

/* ---------------- Card ---------------- */

function ContributorCard({ c }) {
  return (
    <Link
      to={`/contributors/${c.slug}`}
      aria-label={`Open profile of ${c.name}`}
      className="group w-full max-w-[360px] rounded-2xl border border-[#2a2f37] bg-[#1b1e24] text-center transition hover:-translate-y-0.5 hover:border-[#39414d] hover:shadow-[0_10px_24px_rgba(0,0,0,.35)] focus:outline-none focus:ring-2 focus:ring-emerald-400"
      style={{ margin: "0 auto", padding: "2rem" }}
    >
      <div
        className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10"
        style={{ margin: "0 auto" }}
      >
        <img
          src={c.avatarUrl || "/images/members/_placeholder.jpg"}
          alt={c.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h3 className="truncate text-[22px] font-semibold text-white sm:text-2xl">
          {c.name}
        </h3>
        {c.role && (
          <p
            className="text-base text-white/75 sm:text-lg"
            style={{ marginTop: "0.5rem" }}
          >
            {c.role}
          </p>
        )}
      </div>

      {/* Repo badges */}
      {!!(c.repos || []).length && (
        <div
          className="flex flex-wrap justify-center gap-2"
          style={{ marginTop: "0.9rem" }}
        >
          {c.repos.map((r) => (
            <span
              key={r}
              className="rounded-full border border-emerald-400/30 bg-emerald-500/10 text-xs text-emerald-200"
              style={{
                padding: "0.3rem 0.7rem",
                fontSize: "0.85rem",
                letterSpacing: "0.01em",
                transition: "all 0.3s ease",
              }}
            >
              {r}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

/* ---------------- Page ---------------- */

export default function Contributors() {
  const repos = getRepos(); // e.g., ['meshery','docs','website', ...]
  const allContribs = getAllContributors();

  const [activeRepo, setActiveRepo] = useState(repos[0] || "all");
  const [activeFilters, setActiveFilters] = useState([]);

  // Extract unique values for each filterable field
  const availableFilters = useMemo(() => {
    const roles = [
      ...new Set(allContribs.map((c) => c.role).filter(Boolean)),
    ].sort();
    const locations = [
      ...new Set(allContribs.map((c) => c.location).filter(Boolean)),
    ].sort();

    return {
      role: roles,
      location: locations,
    };
  }, [allContribs]);

  const data = useMemo(() => {
    let filtered = allContribs;
    if (activeRepo && activeRepo !== "all") {
      filtered = getContributorsByRepo(activeRepo);
    }

    if (activeFilters.length > 0) {
      filtered = filtered.filter((contributor) => {
        return activeFilters.every((filter) => {
          const { key, value } = filter;

          if (key === "role") {
            return contributor.role === value;
          }
          if (key === "location") {
            return contributor.location === value;
          }

          return true;
        });
      });
    }

    return filtered;
  }, [activeRepo, activeFilters, allContribs]);

  return (
    <React.Fragment>
      <section
        className="w-full pt-44 md:pt-56 px-0"
        style={{ paddingBottom: "7rem" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          {/* Header */}
          <header
            className="relative w-full"
            style={{ marginTop: "3rem", marginBottom: "2rem" }}
          >
            <h1 className="text-center text-[38px] font-extrabold leading-tight tracking-[-0.02em] text-white md:text-6xl">
              Meet our Contributors
            </h1>
            <p
              className="text-center text-lg text-white/75 md:text-2xl"
              style={{ marginTop: "1rem" }}
            >
              Amazing people building SAST projects in the open.
            </p>
          </header>

          {/* Repo Filters (top + centered, like the Active pill on Members for mobile) */}
          <div
            className="flex w-full flex-wrap items-center justify-center gap-2"
            style={{ marginBottom: "1.5rem" }}
          >
            <RepoPill
              label="all"
              active={!activeRepo || activeRepo === "all"}
              onClick={() => setActiveRepo("all")}
            />
            {repos.map((r) => (
              <RepoPill
                key={r}
                label={r}
                active={activeRepo === r}
                onClick={() => setActiveRepo(r)}
              />
            ))}
          </div>

          {/* Advanced Filters */}
          <div style={{ marginBottom: "2.25rem" }}>
            <FilterPill
              activeFilters={activeFilters}
              onFiltersChange={setActiveFilters}
              availableFilters={availableFilters}
            />
          </div>

          {/* Results counter */}
          {(activeFilters.length > 0 || activeRepo !== "all") && (
            <div className="mb-4 text-center">
              <p className="text-sm text-white/60">
                Showing{" "}
                <span className="font-semibold text-emerald-400">
                  {data.length}
                </span>{" "}
                {data.length === 1 ? "contributor" : "contributors"}
              </p>
            </div>
          )}

          {/* Grid */}
          {data.length > 0 ? (
            <div
              className="grid w-full place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: "2.5rem" }}
            >
              {data
                .slice() 
                .sort((a, b) => a.name.localeCompare(b.name)) 
                .map((c) => (
                  <ContributorCard key={c.slug} c={c} />
                ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-white/60">
                No contributors found matching your filters.
              </p>
              <button
                onClick={() => {
                  setActiveFilters([]);
                  setActiveRepo("all");
                }}
                className="mt-4 rounded-xl border border-emerald-400/45 bg-emerald-500/15 px-6 py-2 text-emerald-200 backdrop-blur transition hover:bg-emerald-500/20"
              >
                Clear all filters
              </button>
            </div>
          )}

          <div style={{ marginTop: "3rem" }} />
        </div>
      </section>
    </React.Fragment>
  );
}
