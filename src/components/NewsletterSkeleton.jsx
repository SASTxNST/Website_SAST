import React from 'react';

const NewsletterSkeleton = () => {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        height: "100%",
      }}
    >
      <div style={{ padding: 32 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              animation: "pulse 1.5s infinite",
            }}
          />
          <div
            style={{
              width: 60,
              height: 24,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 50,
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            width: "70%",
            height: 32,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 8,
            marginBottom: 16,
            animation: "pulse 1.5s infinite",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            width: "50%",
            height: 24,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 8,
            marginBottom: 24,
            animation: "pulse 1.5s infinite",
          }}
        />

        {/* Description */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              width: "100%",
              height: 16,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              marginBottom: 8,
              animation: "pulse 1.5s infinite",
            }}
          />
          <div
            style={{
              width: "90%",
              height: 16,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              marginBottom: 8,
              animation: "pulse 1.5s infinite",
            }}
          />
          <div
            style={{
              width: "80%",
              height: 16,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              width: 100,
              height: 20,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              animation: "pulse 1.5s infinite",
            }}
          />
          <div
            style={{
              width: 120,
              height: 40,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsletterSkeleton;