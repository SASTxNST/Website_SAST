/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function Loader({ msg }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          border: "8px solid #f3f3f3",
          borderTop: "8px solid #3498db",
          borderRadius: "50%",
          width: 60,
          height: 60,
          animation: "spin 1s linear infinite",
        }}
      />
      {msg && (
        <div
          style={{
            color: "#fff",
            marginTop: 24,
            fontSize: 18,
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          {msg}
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
