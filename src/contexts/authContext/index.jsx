import React, { useState, useEffect, createContext, useContext } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase-config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = (email, password, username) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) =>
      updateProfile(user, { displayName: username })
    );

  const logout = () => signOut(auth);

  // Save extra profile data in Firestore
  const updateProfileData = async (data) => {
    if (!auth.currentUser) throw new Error("No user");
    // Update displayName in Firebase
    if (data.displayName) {
      await updateProfile(auth.currentUser, { displayName: data.displayName });
    }
    // Save extra fields in Firestore
    const userData = {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      displayName: data.displayName || auth.currentUser.displayName,
      ...(data.dob !== undefined ? { dob: data.dob } : {}),
      ...(data.phone !== undefined ? { phone: data.phone } : {}),
      ...(data.about !== undefined ? { about: data.about } : {}),
      ...(data.skills !== undefined ? { skills: data.skills } : {}),
      ...(data.linkedin !== undefined ? { linkedin: data.linkedin } : {}),
      ...(data.github !== undefined ? { github: data.github } : {}),
      ...(data.portfolio !== undefined ? { portfolio: data.portfolio } : {}),
      ...(data.educationLevel !== undefined
        ? { educationLevel: data.educationLevel }
        : {}),
      ...(data.experience !== undefined ? { experience: data.experience } : {}),
      ...(data.techStack !== undefined ? { techStack: data.techStack } : {}), // add this line
    };
    await setDoc(doc(db, "profiles", auth.currentUser.uid), userData, {
      merge: true,
    });
  };

  // Helper to fetch profile data from Firestore
  const getProfileData = async (uid) => {
    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return {};
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        updateProfileData,
        getProfileData,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
