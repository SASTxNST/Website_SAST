// src/lib/contributors/data.ts

// If your tsconfig has "resolveJsonModule": true, this import just works.
// If not, enable it or change this to a dynamic import in a useEffect for JS-only.
import contributorsJson from "../../data/contributors.json";

export type SocialLinks = {
  github?: string;
  x?: string;           // Twitter / X
  linkedin?: string;
  community?: string;   // e.g., forum/Discord/Slack profile
  website?: string;
};

export type Contributor = {
  slug: string;
  name: string;
  role?: string;
  location?: string;
  bio?: string;
  avatarUrl?: string;
  links?: SocialLinks;
  repos?: string[];     // repo or project keys the contributor belongs to
  active?: boolean;     // defaults to true when omitted
};

// Coerce the JSON to our runtime array and clone to keep it mutable for filters/maps.
const LIST: Contributor[] = (contributorsJson as unknown as Contributor[]).slice();

/** All contributors (no filtering). */
export function getAllContributors(): Contributor[] {
  return LIST.slice();
}

/** Active contributors (treat missing `active` as true). */
export function getActiveContributors(): Contributor[] {
  return LIST.filter((c) => c.active !== false);
}

/** Find one contributor by slug. */
export function getContributorBySlug(slug?: string): Contributor | null {
  if (!slug) return null;
  return LIST.find((c) => c.slug === slug) ?? null;
}

/** Unique, sorted list of repo/project keys present in the data. */
export function getRepos(): string[] {
  return ["Website", "Orbion", "FTM", "Nebula"];
}

/** All contributors that belong to a given repo/project key. */
export function getContributorsByRepo(repo: string): Contributor[] {
  if (!repo) return [];
  return LIST.filter((c) => (c.repos ?? []).includes(repo));
}

/* ── Optional aliases (useful if some files imported older names) ──────────── */
export const getAll = getAllContributors;
export const getBySlug = getContributorBySlug;
export const listRepos = getRepos;
