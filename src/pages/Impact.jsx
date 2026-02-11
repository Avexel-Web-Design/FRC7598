import React, { Suspense } from "react";
import ConstellationScene from "../components/impact/ConstellationScene";

const Impact = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 30,
        background: "#000",
      }}
    >
      {/* Loading state while Three.js initializes */}
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0a0012",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "2px solid rgba(211, 184, 64, 0.2)",
                  borderTopColor: "#d3b840",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 16px",
                }}
              />
              <div
                style={{
                  color: "rgba(211, 184, 64, 0.6)",
                  fontSize: "12px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                Mapping Constellations
              </div>
            </div>
          </div>
        }
      >
        <ConstellationScene />
      </Suspense>
    </div>
  );
};

export default Impact;
