import React, { useState } from "react";

const ALL_TECHS = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "TypeScript",
  "Python",
  "Django",
  "Flask",
  "PostgreSQL",
  "MySQL",
  "GraphQL",
  "Docker",
];

export default function TechStackSelector({
  profile,
  setProfileField,
  loading,
}) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    if (val) {
      setSuggestions(
        ALL_TECHS.filter(
          (tech) =>
            tech.toLowerCase().includes(val.toLowerCase()) &&
            !(profile.techStack || []).includes(tech)
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const addTech = (tech) => {
    const newStack = [...(profile.techStack || []), tech];
    setProfileField("techStack", newStack);
    setInput("");
    setSuggestions([]);
  };

  const removeTech = (tech) => {
    const newStack = (profile.techStack || []).filter((t) => t !== tech);
    setProfileField("techStack", newStack);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {(profile.techStack || []).map((tech) => (
          <span
            key={tech}
            className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 min-w-[80px] min-h-[38px] text-white text-sm font-medium transition-all"
            style={{
              backgroundColor: "#0F2940",
              borderColor: "#1a2332",
              boxSizing: "border-box",
            }}
          >
            <span className="truncate">{tech}</span>
            <button
              type="button"
              onClick={() => removeTech(tech)}
              className="ml-2 w-6 h-6 flex items-center justify-center rounded bg-gray-900 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition text-white"
              style={{
                backgroundColor: "#0F2940",
                borderColor: "#1a2332",
                fontWeight: "bold",
                fontSize: "1.1rem",
                lineHeight: 1,
                padding: 0,
              }}
              disabled={loading}
              aria-label={`Remove ${tech}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="inp w-full p-1 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
        value={input}
        onChange={handleInputChange}
        placeholder="Type to add tech stack (e.g., React, Node.js)"
        disabled={loading}
      />
      {suggestions.length > 0 && (
        <ul className="mt-1 bg-gray-800 border border-gray-600 rounded max-h-48 overflow-y-auto z-10 relative">
          {suggestions.map((tech) => (
            <li
              key={tech}
              className="p-2 hover:bg-gray-700 cursor-pointer text-white"
              onClick={() => addTech(tech)}
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
