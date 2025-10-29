/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from "react";
import { Link, Routes, Route, useLocation, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FileText, Search, Book, ArrowLeft, CheckCircle } from "lucide-react";

// Import all markdown files
import aboutSast from "../components/docs/about-sast.md?raw";
import codeOfConduct from "../components/docs/code-of-conduct.md?raw";
import communityRoles from "../components/docs/community-roles.md?raw";
import contribution from "../components/docs/Contribution.md?raw";
import contributorsName from "../components/docs/contributors-name.md?raw";
import faqs from "../components/docs/faqs.md?raw";
import githubProcess from "../components/docs/github-process.md?raw";
import guidelines from "../components/docs/guidelines.md?raw";
import learning from "../components/docs/learning.md?raw";
import memberNames from "../components/docs/member-names.md?raw";

// Map of all docs with their content
const DOCS_MAP = {
  "about-sast": { title: "About SAST", content: aboutSast, category: "Introduction" },
  "guidelines": { title: "Guidelines", content: guidelines, category: "Getting Started" },
  "contribution": { title: "Contribution Guide", content: contribution, category: "Getting Started" },
  "code-of-conduct": { title: "Code of Conduct", content: codeOfConduct, category: "Getting Started" },
  "github-process": { title: "GitHub Process", content: githubProcess, category: "Development" },
  "community-roles": { title: "Community Roles", content: communityRoles, category: "Community" },
  "faqs": { title: "FAQs", content: faqs, category: "Help" },
  "learning": { title: "Learning Resources", content: learning, category: "Resources" },
  "contributors-name": { title: "Contributors", content: contributorsName, category: "Community" },
  "member-names": { title: "Members", content: memberNames, category: "Community" },
};

// Header Component
function DocsHeader() {
  return (
    <header className="docs-header">
      <div className="docs-header-badge">
        <Book size={20} />
        <span>Documentation</span>
      </div>
      <h1 className="docs-header-title">
        Community Handbook
      </h1>
      <p className="docs-header-description">
        Your comprehensive guide to contributing, learning, and growing with SAST.
      </p>
      <div className="docs-header-divider"></div>
      <div className="docs-header-tags">
        {["Open Source", "Community Guidelines", "Best Practices"].map((tag) => (
          <span key={tag} className="docs-header-tag">
            {tag}
          </span>
        ))}
      </div>
    </header>
  );
}

// Sidebar Component
function DocsSidebar({ docs, query, setQuery, activeId }) {
  const groupedDocs = useMemo(() => {
    const groups = {};
    docs.forEach(doc => {
      if (!groups[doc.category]) {
        groups[doc.category] = [];
      }
      groups[doc.category].push(doc);
    });
    return groups;
  }, [docs]);

  return (
    <aside className="docs-sidebar">
      <div className="docs-search">
        <Search size={18} className="docs-search-icon" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documentation..."
          className="docs-search-input"
        />
      </div>

      <nav className="docs-nav">
        {Object.entries(groupedDocs).map(([category, categoryDocs]) => (
          <div key={category} className="docs-nav-category">
            <div className="docs-nav-category-title">{category}</div>
            <div className="docs-nav-list">
              {categoryDocs.map((doc) => {
                const isActive = activeId === doc.id;
                return (
                  <Link
                    key={doc.id}
                    to={`/docs/${doc.id}`}
                    className={`docs-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <span className="docs-nav-indicator"></span>
                    <FileText size={16} className="docs-nav-icon" />
                    <span className="docs-nav-title">{doc.title}</span>
                    {isActive && <CheckCircle size={14} className="docs-nav-check" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="docs-sidebar-footer">
        <strong>Tip:</strong> Use the search bar to quickly find topics.
      </div>
    </aside>
  );
}

// Content Renderer Component
function DocRenderer({ doc }) {
  return (
    <article className="docs-content">
      <div className="docs-content-header">
        <span className="docs-content-category">{doc.category}</span>
        <h1 className="docs-content-title">{doc.title}</h1>
      </div>
      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {doc.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

// Doc Page Component
function DocPage({ docs }) {
  const { slug } = useParams();
  const doc = docs.find((d) => d.id === slug);
  
  if (!doc) {
    return (
      <div className="docs-not-found">
        <FileText size={48} />
        <h2>Document not found</h2>
        <p>The requested documentation page could not be found.</p>
        <Link to="/docs" className="docs-back-button">
          <ArrowLeft size={16} />
          Back to Documentation
        </Link>
      </div>
    );
  }
  
  return <DocRenderer doc={doc} />;
}

// Main DocsHub Component
export default function DocsHub() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [allDocs, setAllDocs] = useState([]);

  useEffect(() => {
    // Convert DOCS_MAP to array format
    const docsArray = Object.entries(DOCS_MAP).map(([id, data]) => ({
      id,
      title: data.title,
      content: data.content,
      category: data.category,
    }));
    setAllDocs(docsArray);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return allDocs.filter((d) =>
      d.title.toLowerCase().includes(q) || 
      d.category.toLowerCase().includes(q) ||
      d.content.toLowerCase().includes(q)
    );
  }, [query, allDocs]);

  const activeId = useMemo(() => {
    const parts = location.pathname.replace(/^\/+|\/+$/g, "").split("/");
    const last = parts[parts.length - 1];
    return allDocs.find((d) => d.id === last)?.id || null;
  }, [location.pathname, allDocs]);

  return (
    <section className="docs-page">
      <div className="docs-container">
        <DocsHeader />

        <div className="docs-layout">
          <DocsSidebar
            docs={filtered}
            query={query}
            setQuery={setQuery}
            activeId={activeId}
          />

          <main className="docs-main">
            <Routes>
              <Route
                index
                element={
                  filtered.length > 0 ? (
                    <Navigate to={`/docs/${filtered[0].id}`} replace />
                  ) : (
                    <div className="docs-empty">
                      <Search size={48} />
                      <h2>No documents found</h2>
                      <p>Try adjusting your search query.</p>
                    </div>
                  )
                }
              />
              <Route path=":slug" element={<DocPage docs={allDocs} />} />
            </Routes>
          </main>
        </div>
      </div>
    </section>
  );
}
