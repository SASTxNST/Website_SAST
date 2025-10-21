// JSON import requires "resolveJsonModule": true in tsconfig (usually enabled in Vite templates)
import members from "../../data/members.json";

type MemberLinks = Partial<{
  github: string;
  x: string;
  linkedin: string;
  community: string;
}>;

export type Member = {
  slug: string;
  name: string;
  role?: string;
  location?: string;
  bio?: string;
  status?: "active" | "inactive";
  avatarUrl?: string;
  links?: MemberLinks;
};

export function getAllMembers(): Member[] {
  return [...(members as Member[])].sort((a, b) => a.name.localeCompare(b.name));
}

export function getActiveMembers(): Member[] {
  return getAllMembers().filter((m) => (m.status ?? "active") === "active");
}

export function getMemberBySlug(slug: string): Member | undefined {
  return getAllMembers().find((m) => m.slug === slug);
}


// JSON import requires "resolveJsonModule": true in tsconfig (usually enabled in Vite templates)
import members from "../../data/members.json";

type MemberLinks = Partial<{
  github: string;
  x: string;
  linkedin: string;
  community: string;
}>;

export type Member = {
  slug: string;
  name: string;
  role?: string;
  location?: string;
  bio?: string;
  status?: "active" | "inactive";
  avatarUrl?: string;
  links?: MemberLinks;
};

// NOTE: Ideally, new members should be added to `members.json`.
// This local array is used to adhere to a plan that required modifying this file.
const additionalMembers: Member[] = [
  {
    slug: 'kunal-vats',
    name: 'Kunal Vats',
    location: 'Bhiwadi, Rajasthan',
    // bio is pending
    // avatarUrl is pending
    // status defaults to 'active' in `getActiveMembers`
    links: {
      github: 'https://github.com/1Kunalvats9',
      linkedin: 'https://www.linkedin.com/in/kunal-vats-b67aa2309/',
    },
  },
];

export function getAllMembers(): Member[] {
  // Combine members from the JSON file with any members defined locally.
  return [...(members as Member[]), ...additionalMembers].sort((a, b) => a.name.localeCompare(b.name));
}

export function getActiveMembers(): Member[] {
  return getAllMembers().filter((m) => (m.status ?? "active") === "active");
}

export function getMemberBySlug(slug: string): Member | undefined {
  return getAllMembers().find((m) => m.slug === slug);
}