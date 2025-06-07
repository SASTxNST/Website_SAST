import React, { useState } from "react";

const GITHUB_ICON = (
  <svg
    width="24"
    height="24"
    fill="currentColor"
    className="inline-block mr-2 text-white"
  >
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.34 9.34 0 0 1 12 6.84c.85.004 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.57.69.47C19.13 20.56 22 16.75 22 12.26 22 6.58 17.52 2 12 2z" />
  </svg>
);

const LINKEDIN_ICON = (
  <svg
    width="24"
    height="24"
    fill="currentColor"
    className="inline-block mr-2 text-white"
  >
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.74z" />
  </svg>
);

function getSocialType(url) {
  if (!url) return null;
  if (/github\.com/i.test(url)) return "github";
  if (/linkedin\.com/i.test(url)) return "linkedin";
  return null;
}

export default function ProfileLinks({
  profile,
  setProfileField,
  loading,
  handleFieldSave,
}) {
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const githubSet = !!profile.github;
  const linkedinSet = !!profile.linkedin;
  const bothSet = githubSet && linkedinSet;

  const handleAddClick = () => {
    setInput("");
    setEditing("");
    setShowAddInput(true);
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const saveSocial = async (type, url, revertValue) => {
    setProfileField(type, url);
    setInput("");
    setEditing("");
    setShowAddInput(false);
    try {
      if (handleFieldSave) await handleFieldSave(type, url, revertValue);
    } catch (err) {
      setProfileField(type, revertValue);
      alert("Failed to save social link. " + (err.message || ""));
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      const url = input.trim();
      let type = editing;
      if (!type) type = getSocialType(url);
      setInput("");
      setEditing("");
      setShowAddInput(false);
      if (!url && editing) {
        saveSocial(editing, "", profile[editing]);
      } else if (type && url) {
        saveSocial(type, url, profile[type]);
      }
    }
  };

  const handleInputBlur = () => {
    setInput("");
    setEditing("");
    setShowAddInput(false);
  };

  const handleIconRightClick = (type, e) => {
    e.preventDefault();
    setInput(profile[type]);
    setEditing(type);
    setShowAddInput(false);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <h1 className="font-inter text-white text-[20px] font-bold leading-[56px]">
          Social Links
        </h1>
        {!bothSet && (
          <button
            className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 shadow-lg border border-gray-700 hover:scale-110 hover:shadow-xl transition-all duration-200 focus:outline-none"
            title="Add Social Link"
            onClick={handleAddClick}
            disabled={editing || loading || showAddInput}
            style={{
              fontSize: "1.7rem",
              color: "#fff",
              fontWeight: 600,
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.18)",
            }}
          >
            <span
              style={{
                display: "block",
                lineHeight: 1,
                marginTop: -2,
                fontFamily: "Inter, Arial, sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.05em",
              }}
            >
              +
            </span>
          </button>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
            onContextMenu={(e) => handleIconRightClick("github", e)}
            title="Right click to edit"
          >
            {GITHUB_ICON}
          </a>
        )}
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
            onContextMenu={(e) => handleIconRightClick("linkedin", e)}
            title="Right click to edit"
          >
            {LINKEDIN_ICON}
          </a>
        )}
      </div>
      {(showAddInput || editing) && (
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={
              editing
                ? `Edit ${
                    editing.charAt(0).toUpperCase() + editing.slice(1)
                  } URL (leave empty to remove)`
                : "Paste GitHub or LinkedIn URL"
            }
            disabled={loading}
            autoFocus
            onBlur={handleInputBlur}
          />
        </div>
      )}
    </div>
  );
}
