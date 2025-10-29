# SAST Website — Design Document

## Purpose of This Document

This document defines the current design direction of the Society of Aerospace and Space Technology (SAST) website. It is meant to give any new contributor or reviewer a complete understanding of how the website is intended to function, how information should be structured, and what design philosophy governs decisions. The document is treated as a reference for implementation and future extensions while keeping the original intentions intact.

The site is not a casual blog. It is a representational surface of an academic and technical community. The design is expected to reflect credibility, clarity, and seriousness while promoting engagement.

## Design Goals

The design choices of the SAST website are made to support the following goals:

* Communicate the work, research, and identity of SAST effectively
* Build trust among external sponsors and collaborators
* Act as a technical archive for internal club guidelines and resources
* Provide a structured knowledge experience for the general public interested in astronomy
* Present the club’s events, projects, and community in a professional and traceable manner

The website aims to represent SAST as a student-driven but directionally serious society that values engineering clarity and openness.

## Audience Definition and Design Consequences

Different users expect different affordances. The design must reflect this:

### Students

Expect quick access to documentation, events, registration, and opportunities. The design for this group favors clarity and discoverability.

### Potential Sponsors

Expect immediate evidence of credibility — projects, research, structure, past activity, and seriousness. The design for this group favors strong presentation and reduced noise.

### General Public & Space Enthusiasts

Expect to learn or explore. The design for this group favors structured display, stable layout, and neutral tone.

## Structural Breakdown

### Landing Page

The landing page serves as the explanatory gate of the website. It is not a dumping ground of content.
It follows a deliberate sequence:

1. Hero — conveys identity without distraction
2. Statement video section — communicates purpose and motivation
3. Projects showcase — places proof of action upfront
4. Newsletter CTA — collects engaged users
5. Footer — provides navigation persistence

No additional decorative sections are included to maintain intent and reduce noise.

### Global Navigation Rationale

The global navigation reflects the informational architecture of the society:
Docs — internal structure and process transparency
Explore — outward-facing knowledge and activity
Community — people behind the system
Nebula — external initiative demonstrating engagement
Register — direct conversion point
Contact — external channel maintained off-site

The navigation order is chosen to move from internal foundation → external work → people → outreach → action.

### Documentation Section Design (Docs)

The Docs page centralizes all operational knowledge of SAST. It acts as the persistent reference for onboarding and governance. Its structure ensures independence from individuals. No visual embellishment beyond readability is prioritized here.

### Explore Section Breakdown

Each subsection is designed as a full page experience instead of partial previews to enforce clarity and proper focus.

Events — designed as a grid for temporal scanning with filtering by status
Projects — designed in a vertical panoramic layout to encourage deep reading
Astronomy News — designed as an updating feed for recent developments
Track — designed as a focused interactive interface rather than text-only representation

The Track feature has been intentionally isolated to avoid interference with the reading-heavy sections.

### Community Section Breakdown

Members — reflects responsibility structure
Contributors — tracks transparency of development and credit
Newsletter — combines publication context with conversion opportunity

Each is split for cognitive separation.

### Nebula

Nebula is given first-tier placement to signify open-source alignment as a core identity element rather than an optional initiative.

### Contact

External redirection is intentional to avoid secondary inbox maintenance.

## Visual and Brand Direction

* Dark, star-field based environment is chosen to align visually with the domain of astronomy and to separate the site from typical college club sites
* Clean, institutional typography and spacing strategy is used to control visual seriousness
* No animations or visual flourishes are required for identity; motion, if introduced later, must serve comprehension, not decoration

The tone of content is explicitly neutral and unembellished.

## Non-Goals and Explicit Exclusions

* The site is not a community chat or forum
* The site does not function as a social feed or live chat system
* The site is not a full learning portal or MOOC
* Gamification elements are intentionally excluded
* Persistent user accounts or dashboards are out of scope

Explicit exclusion prevents gradual drift and feature creep.

## Evolution Policy

The current design is treated as the fixed baseline. Future changes must:

* Preserve clarity of intent
* Not introduce casual or entertainment-based elements
* Justify new additions with reasoning that aligns with the original goals

The site may evolve, but not drift.

## Summary

This design document defines the conceptual and structural basis of the SAST website. It exists to ensure that any future implementer, designer, or maintainer understands not only what is built but why it is built in this manner. It replaces subjective memory with an explicit design contract.
