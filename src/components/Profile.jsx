import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import ProfileLinks from "./ProfileLinks";

const Profile = () => {
  const { currentUser, logout, getProfileData, updateProfileData } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    displayName: "",
    about: "",
    skills: "",
    linkedin: "",
    github: "",
    dob: "",
    phone: "",
    portfolio: "",
    educationLevel: "",
    experience: "",
    techStack: [],
  });
  const [editingField, setEditingField] = useState(""); // e.g. "displayName", "about", etc.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    getProfileData(currentUser.uid).then((data) => {
      setProfile({
        displayName: data.displayName || currentUser.displayName || "",
        about: data.about || "",
        skills: data.skills || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        dob: data.dob || "",
        phone: data.phone || "",
        portfolio: data.portfolio || "",
        educationLevel: data.educationLevel || "",
        experience: data.experience || "",
        techStack: data.techStack || [],
      });
    });
  }, [currentUser, getProfileData, navigate]);

  if (!currentUser) return null;

  const isValidUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Generic field update handler
  const setProfileField = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save handler for all fields
  const handleFieldSave = async (field, value, revertValue) => {
    setEditingField("");
    setLoading(true);
    try {
      await updateProfileData({ ...profile, [field]: value });
      // Optionally refresh profile from backend here
    } catch (err) {
      setProfile((prev) => ({
        ...prev,
        [field]: revertValue,
      }));
      alert("Failed to save profile changes. " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main_profile p-6 min-h-screen text-white">
      <div className="flex flex-wrap md:flex-nowrap gap-8">
        <ProfileCard
          profile={profile}
          setProfileField={setProfileField}
          editingField={editingField}
          setEditingField={setEditingField}
          handleFieldSave={handleFieldSave}
          loading={loading}
          currentUser={currentUser}
          logout={logout}
        />
        <ProfileForm
          profile={profile}
          setProfileField={setProfileField} // use the same function
          editingField={editingField}
          setEditingField={setEditingField}
          handleFieldSave={handleFieldSave}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Profile;
