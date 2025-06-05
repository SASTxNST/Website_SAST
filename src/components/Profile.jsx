import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser, logout, getProfileData } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    // Fetch profile data from Firestore
    getProfileData(currentUser.uid).then((data) => setProfileData(data));
  }, [currentUser, getProfileData, navigate]);

  if (!currentUser) {
    return null;
  }

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>Name: {profileData.displayName || currentUser.displayName}</div>
      <div>Email: {currentUser.email}</div>
      <div>Date of Birth: {profileData.dob || "-"}</div>
      <div>Phone Number: {profileData.phone || "-"}</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
