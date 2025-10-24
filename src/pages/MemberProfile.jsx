/* eslint-disable react/prop-types */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getMemberBySlug } from "../lib/members/data";
import { Github, Linkedin, Globe, Twitter } from "lucide-react";

/* ---------- Social Icons ---------- */
function SocialIcons({ m }) {
  const items = [
    { k: "github", url: m.links?.github, label: "GitHub", Icon: Github },
    { k: "x", url: m.links?.x, label: "X (Twitter)", Icon: Twitter },
    { k: "linkedin", url: m.links?.linkedin, label: "LinkedIn", Icon: Linkedin },
    { k: "community", url: m.links?.community, label: "Community", Icon: Globe },
  ].filter((i) => !!i.url);

  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-4" style={{ marginTop: "1.75rem" }}>
      {items.map(({ k, url, label, Icon }) => (
        <a
          key={k}
          href={url}
          target="_blank"
          rel="noopener"
          aria-label={`${m.name} on ${label}`}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 text-white backdrop-blur transition hover:bg-white/10 hover:border-white/25"
          style={{ padding: "0.6rem 0.9rem" }}
        >
          <Icon className="h-6 w-6" />
          <span className="text-sm">{label}</span>
        </a>
      ))}
    </div>
  );
}

/* ---------- Page ---------- */
export default function MemberProfile() {
  const { slug } = useParams();
  const m = getMemberBySlug(slug);

  if (!m) {
    return (
      <div
        className="mx-auto max-w-3xl text-center"
        style={{ padding: "6rem 1.5rem" }}
      >
        <h1 className="text-3xl font-semibold text-white">Member not found</h1>
        <p className="text-white/70" style={{ marginTop: "0.75rem" }}>
          The profile you’re looking for doesn’t exist.
        </p>
        <Link
          to="/community/members"
          className="inline-block rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10"
          style={{ marginTop: "1.5rem", padding: "0.5rem 1rem" }}
        >
          Back to Members
        </Link>
      </div>
    );
  }

  return (
    <article
      className="w-full pt-30"
      style={{
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        paddingBottom: "6rem",
        
      }}
    >
      <div
        className="w-full"
        style={{ maxWidth: "1200px", margin: "0 auto 0.75rem auto" }}
      >
        <Link
          to="/community/members"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white"
        >
          ← Go Back
        </Link>
      </div>

      <div
        className="text-center font-bold text-[50px] tracking-wide text-emerald-200/90 pb-5 font-family-['arial']"
        style={{ marginBottom: "1.25rem"
        }
      
      }
      >
        SAST Community Member
      </div>

      <div
        className="flex flex-col md:flex-row md:items-start md:justify-center gap-10"
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 flex-shrink-0"
          style={{
            flex: "0 1 520px",
            maxWidth: "520px",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <img
            src={m.avatarUrl || "/images/members/_placeholder.jpg"}
            alt={m.name}
            className="object-cover w-full h-full"
            style={{ height: "100%", borderRadius: "1.25rem" }}
          />
        </div>

        <div
          className="min-w-0 text-left"
          style={{
            flex: "1 1 560px",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 className="text-5xl font-extrabold text-white md:text-6xl">
            {m.name}
          </h1>

          {m.role && (
            <p
              className="text-2xl italic text-emerald-300/90"
              style={{ marginTop: "0.6rem" }}
            >
              Member
            </p>
          )}

          <div
            className="h-1 w-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
            style={{ marginTop: "1rem", maxWidth: "660px" }}
          />

          {m.location && (
            <p
              className="font-semibold text-white/90"
              style={{ marginTop: "1rem" }}
            >
              {m.location}
            </p>
          )}

          {m.bio && (
            <p
              className="leading-7 text-white/85"
              style={{ marginTop: "1.25rem", fontSize: "1.05rem", maxWidth: "70ch" }}
            >
              {m.bio}
            </p>
          )}

          <SocialIcons m={m} />
        </div>
      </div>
    </article>
  );
}
