import React from 'react';

const LoadingSpinner = ({ size = 20, color = "#fff" }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `2px solid rgba(255,255,255,0.2)`,
        borderTop: `2px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );
};

export default LoadingSpinner;