/* eslint-disable react/prop-types */
import React from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMembers } from "../lib/members/data";
import { Search } from "lucide-react";

/* ---------------- Search Bar ---------------- */

function SearchBar({ value, onChange, placeholder = "Search members..." }) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-white/50 backdrop-blur transition focus:border-emerald-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
      />
    </div>
  );
}

/* ---------------- Status Filter Pills ---------------- */

function StatusPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-xl text-sm backdrop-blur transition ${
        label === "Inactive"
          ? active
            ? "border border-red-400/45 bg-red-500/15 text-red-200 hover:bg-red-500/20"
            : "border border-white/15 bg-white/5 text-white/90 hover:bg-red-400/15 hover:border-red-400/25"
          : active
            ? "border border-emerald-400/45 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20"
            : "border border-white/15 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/25"
      }`}
      style={{ padding: "0.5rem 1rem" }}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          label === "Inactive"
            ? active
              ? "bg-red-400 shadow-[0_0_0_3px_rgba(239,68,68,.15)]"
              : "bg-zinc-500"
            : active
              ? "bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,.15)]"
              : "bg-zinc-500"
        }`}
      />
      <span className="capitalize">{label}</span>
    </button>
  );
}

/* ---------------- Card ---------------- */

function MemberCard({ m }) {
  return (
    <Link
      to={`/community/members/${m.slug}`}
      aria-label={`Open profile of ${m.name}`}
      className="group w-full max-w-[360px] rounded-2xl border border-[#2a2f37] bg-[#1b1e24] text-center transition hover:-translate-y-0.5 hover:border-[#39414d] hover:shadow-[0_10px_24px_rgba(0,0,0,.35)] focus:outline-none focus:ring-2 focus:ring-emerald-400"
      style={{ margin: "0 auto", padding: "2rem" }}
    >
      <div
        className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10"
        style={{ margin: "0 auto" }}
      >
        <img
          src={m.avatarUrl || "/images/members/_placeholder.jpg"}
          alt={m.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h3 className="truncate text-[22px] font-semibold text-white sm:text-2xl">
          {m.name}
        </h3>
        {m.role && (
          <p className="text-base text-white/75 sm:text-lg" style={{ marginTop: "0.5rem" }}>
            {m.role}
          </p>
        )}
      </div>
    </Link>
  );
}

/* ---------------- Page ---------------- */

export default function Members() {
  const all = getAllMembers();

  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(true);

  // Source data based on filters
  const data = useMemo(() => {
    let filtered = all;

    // Filter by status (active/inactive)
    if (showActive && !showInactive) {
      filtered = filtered.filter((m) => (m.status ?? "active") === "active");
    } else if (!showActive && showInactive) {
      filtered = filtered.filter((m) => (m.status ?? "active") === "inactive");
    } else if (!showActive && !showInactive) {
      filtered = [];
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((member) =>
        member.name.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [searchTerm, showActive, showInactive, all]);

  return (
    <React.Fragment>
      <section className="w-full pt-15 md:pt-30 px-0" style={{ paddingBottom: "7rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          <header
            className="relative w-full"
            style={{ marginTop: "3rem", marginBottom: "3.75rem" }}
          >
            <h1 className="text-center text-[38px] font-extrabold leading-tight tracking-[-0.02em] text-white md:text-6xl">
              Meet our Community Members
            </h1>
            <p
              className="text-center text-lg text-white/75 md:text-2xl"
              style={{ marginTop: "1rem" }}
            >
              A warm and welcoming collection of open sourcers
            </p>

          </header>

          {/* Search and Filter Controls */}
          <div
            className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-center"
            style={{ marginBottom: "2rem" }}
          >
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <div className="flex items-center gap-2">
              <StatusPill
                label="Active"
                active={showActive}
                onClick={() => setShowActive(!showActive)}
              />
              <StatusPill
                label="Inactive"
                active={showInactive}
                onClick={() => setShowInactive(!showInactive)}
              />
            </div>
          </div>

          {/* Results counter */}
          {(searchTerm.trim() || !showActive || !showInactive) && (
            <div className="mb-4 text-center">
              <p className="text-sm text-white/60">
                Showing <span className="font-semibold text-emerald-400">{data.length}</span>{" "}
                {data.length === 1 ? "member" : "members"}
              </p>
            </div>
          )}

          {/* Grid */}
          {data.length > 0 ? (
            <div
              className="grid w-full place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: "2.5rem" }}
            >
              {data.map((m) => (
                <MemberCard key={m.slug} m={m} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-white/60">
                No members found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setShowActive(true);
                  setShowInactive(true);
                }}
                className="mt-4 rounded-xl border border-red-400/45 bg-red-500/15 px-6 py-2 text-red-200 backdrop-blur transition hover:bg-red-500/20"
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
