import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import ProfileLinks from "./ProfileLinks";
export default function ProfileCard({
  profile,
  setProfileField,
  editingField,
  setEditingField,
  handleFieldSave,
  loading,
  currentUser,
  logout,
}) {
  return (
    <div className="profile_details bg-gray-800 p-6 rounded-lg w-full md:w-1/2">
      <div className="profile_pic">
        <div className="welcome_nm flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Profile Image or Initials */}
          {profile.profilePic ? (
            <img
              src={profile.profilePic}
              alt="Profile"
              className="rounded-full w-32 h-32 sm:w-40 sm:h-40 object-cover border-2 border-gray-700 flex-shrink-0"
            />
          ) : (
            <div
              className="rounded-full w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center text-white font-bold text-xl border-2 border-gray-700 flex-shrink-0"
              style={{ background: "#222" }}
            >
              {(() => {
                const name = profile.displayName?.trim() || "";
                if (!name) return "";
                const parts = name.split(" ").filter(Boolean);
                if (parts.length > 1 && parts[0][0] && parts[1][0]) {
                  return (
                    (parts[0][0] || "").toUpperCase() +
                    (parts[1][0] || "").toUpperCase()
                  );
                } else if (name.length > 1) {
                  return name.slice(0, 2).toUpperCase();
                } else if (name.length === 1) {
                  return name[0].toUpperCase();
                } else {
                  return "";
                }
              })()}
            </div>
          )}

          {/* Name + Email + Button */}
          <div className="email_nm text-center sm:text-left flex flex-col gap-2 sm:gap-3">
            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-1">
              {editingField === "displayName" ? (
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) =>
                    setProfileField("displayName", e.target.value)
                  }
                  onBlur={() =>
                    handleFieldSave("displayName", profile.displayName, "")
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleFieldSave("displayName", profile.displayName, "");
                    }
                  }}
                  autoFocus
                  className="inp w-full p-1 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[220px]"
                  disabled={loading}
                />
              ) : (
                <span
                  onClick={() => setEditingField("displayName")}
                  style={{ cursor: loading ? "not-allowed" : "pointer" }}
                  title="Click to edit name"
                >
                  {profile.displayName}
                </span>
              )}
            </div>

            {/* Email under Name */}
            <div className="text-sm sm:text-base text-gray-300 break-all -mt-2">
              {currentUser.email}
            </div>

            {/* Edit & Logout Buttons */}
            <div className="change_button mt-2 sm:mt-4 flex gap-2">
              <button
                className="cursor-pointer w-20 sm:w-24 md:w-28 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 text-white rounded-md hover:border-white hover:shadow-md hover:shadow-white/20 transition duration-300 text-sm sm:text-base"
                onClick={logout}
                disabled={loading}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Link */}
        <div className="h-30 w-full py-4 px-3 sm:py-6 sm:px-6 left-4">
          <h1 className="text-lg sm:text-xl font-semibold text-white">
            Portfolio
          </h1>
          {editingField === "portfolio" ? (
            <input
              type="text"
              value={profile.portfolio}
              onChange={(e) => setProfileField("portfolio", e.target.value)}
              onBlur={() => handleFieldSave("portfolio", profile.portfolio, "")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFieldSave("portfolio", profile.portfolio, "");
                }
              }}
              autoFocus
              className="inp w-full p-1 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[220px] mt-2"
              disabled={loading}
            />
          ) : (
            <p
              className="text-sm sm:text-base text-gray-300 break-all mt-10 cursor-pointer"
              onClick={() => setEditingField("portfolio")}
              title="Click to set a portfolio"
            >
              {profile.portfolio
                ? profile.portfolio
                : "Click to set a portfolio"}
            </p>
          )}
        </div>

        {/* Social Links */}
        <div>
          <h1 className="font-inter text-white text-[20px] font-bold leading-[56px] mb-4">
            <ProfileLinks
              profile={profile}
              setProfileField={setProfileField}
              loading={loading}
              handleFieldSave={handleFieldSave}
            />
          </h1>
        </div>
      </div>
    </div>
  );
}
