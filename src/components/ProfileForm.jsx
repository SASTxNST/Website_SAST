import React from "react";
import TechStackSelector from "./TechStackSelector";

export default function ProfileForm({
  profile,
  setProfileField,
  editingField,
  setEditingField,
  handleFieldSave,
  loading,
}) {
  return (
    <div className="w-full">
      <div className="profile_detail space-y-8">
        {/* About */}
        <div className="about mb-8">
          <label htmlFor="about" className="block mb-2 font-medium">
            About Me
          </label>
          <div className="w-full h-25 rounded-md p-2" id="about-me">
            {editingField === "about" ? (
              <textarea
                value={profile.about}
                onChange={(e) => setProfileField("about", e.target.value)}
                onBlur={() => handleFieldSave("about", profile.about, "")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleFieldSave("about", profile.about, "");
                  }
                }}
                autoFocus
                rows={5}
                className="w-full h-full min-h-[100px] max-h-[200px] rounded border border-gray-600 bg-gray-700 text-base sm:text-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                disabled={loading}
                style={{ minHeight: 100, height: 100, maxHeight: 200 }}
                placeholder="Write something about yourself..."
              />
            ) : (
              <div
                className="text-base sm:text-lg text-gray-800 whitespace-pre-line cursor-pointer min-h-[100px] h-full flex items-center"
                onClick={() => setEditingField("about")}
                title="Click to edit About Me"
                style={{ minHeight: 100, textAlign: "start" }}
              >
                <p className="text-sm sm:text-base text-gray-300 break-all mt-10 cursor-pointer">
                  {profile.about ? (
                    profile.about
                  ) : (
                    <span className="text-gray-400">Click to add about me</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="about mb-8">
          <label htmlFor="education" className="block mb-2 font-medium">
            Education
          </label>
          <div className="w-full h-10 rounded-md p-2 flex items-center">
            {editingField === "educationLevel" ? (
              <select
                value={profile.educationLevel || ""}
                onChange={(e) => {
                  setProfileField("educationLevel", e.target.value);
                  handleFieldSave("educationLevel", e.target.value, "");
                }}
                autoFocus
                className="w-full h-full rounded border border-gray-600 bg-gray-700 text-base sm:text-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="" disabled>
                  Select your education level
                </option>
                <option value="under 12th">Under 12th</option>
                <option value="in 12th">In 12th</option>
                <option value="done 12th">Done 12th</option>
              </select>
            ) : (
              <div
                className="text-base sm:text-lg text-gray-800 cursor-pointer w-full"
                onClick={() => setEditingField("educationLevel")}
                title="Click to edit education"
                style={{ textAlign: "start" }}
              >
                <p className="text-sm sm:text-base text-gray-300 break-all mt-10 cursor-pointer">
                  {profile.educationLevel ? (
                    profile.educationLevel
                  ) : (
                    <span className="text-gray-400">
                      Click to select education level
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="about mb-8">
          <label htmlFor="experience" className="block mb-2 font-medium">
            Experience
          </label>
          <div className="w-full h-10 rounded-md p-2 flex items-center">
            {editingField === "experience" ? (
              <input
                type="text"
                value={profile.experience || ""}
                onChange={(e) => setProfileField("experience", e.target.value)}
                onBlur={() =>
                  handleFieldSave("experience", profile.experience, "")
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleFieldSave("experience", profile.experience, "");
                  }
                }}
                autoFocus
                className="w-full h-full rounded border border-gray-600 bg-gray-700 text-base sm:text-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
                placeholder="Enter your experience"
              />
            ) : (
              <div
                className="text-base sm:text-lg text-gray-800 cursor-pointer w-full"
                onClick={() => setEditingField("experience")}
                title="Click to edit experience"
                style={{ textAlign: "start" }}
              >
                <p className="text-sm sm:text-base text-gray-300 break-all mt-10 cursor-pointer">
                  {profile.experience ? (
                    profile.experience
                  ) : (
                    <span className="text-gray-400">
                      Click to add experience
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="about mb-8">
          <label htmlFor="techstack" className="block mb-2 font-medium">
            Tech Stack
          </label>
          <TechStackSelector
            profile={profile}
            setProfileField={setProfileField}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
