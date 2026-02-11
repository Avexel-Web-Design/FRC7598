// ─────────────────────────────────────────────────────────────
// Constellation data for the Impact page — Globe Edition
// Stars placed at real-world geographic coordinates
// ─────────────────────────────────────────────────────────────
import * as THREE from "three";

// Globe radius in Three.js units
export const GLOBE_RADIUS = 5;

// ─────────────────────────────────────────────────────────────
// Convert lat/lng (degrees) to 3D position on globe surface
// Returns [x, y, z] slightly above the globe surface
// ─────────────────────────────────────────────────────────────
export function latLngToVector3(lat, lng, radius = GLOBE_RADIUS, altitude = 0.05) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const r = radius + altitude;
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// Array version for components that need [x, y, z]
export function latLngToArray(lat, lng, radius = GLOBE_RADIUS, altitude = 0.05) {
  const v = latLngToVector3(lat, lng, radius, altitude);
  return [v.x, v.y, v.z];
}

// ─────────────────────────────────────────────────────────────
// SCA Home Base — Wixom, Michigan (near Bloomfield Hills)
// This is where St. Catherine of Siena Academy is located
// ─────────────────────────────────────────────────────────────
export const SCA_HOME = {
  id: "sca-home",
  label: "SCA",
  subtitle: "Constellations",
  lat: 42.5248,
  lng: -83.5363,
};

// ─────────────────────────────────────────────────────────────
// All constellation locations
// ─────────────────────────────────────────────────────────────
export const constellationNodes = [
  // ── Michigan (nearby) ──
  { id: "bloomfield-hills", label: "Bloomfield Hills, MI", lat: 42.5837, lng: -83.2455 },
  { id: "saginaw", label: "Saginaw, MI", lat: 43.4195, lng: -83.9508 },
  { id: "flint", label: "Flint, MI", lat: 43.0125, lng: -83.6875 },
  { id: "traverse-city", label: "Traverse City, MI", lat: 44.7631, lng: -85.6206 },
  { id: "harbor-springs", label: "Harbor Springs, MI", lat: 45.4317, lng: -84.9922 },
  { id: "leland", label: "Leland, MI", lat: 45.0231, lng: -85.7594 },
  { id: "holly", label: "Holly, MI", lat: 42.7920, lng: -83.6274 },
  { id: "brighton", label: "Brighton, MI", lat: 42.5295, lng: -83.7802 },
  { id: "white-lake", label: "White Lake, MI", lat: 42.6506, lng: -83.5469 },
  { id: "jackson", label: "Jackson, MI", lat: 42.2459, lng: -84.4013 },

  // ── United States ──
  { id: "mountain-view", label: "Mountain View, CA", lat: 37.3861, lng: -122.0839 },
  { id: "winter-park", label: "Winter Park, FL", lat: 28.6000, lng: -81.3392 },
  { id: "houston", label: "Houston, TX", lat: 29.7604, lng: -95.3698 },
  { id: "dallas-ft-worth", label: "Dallas/Ft. Worth, TX", lat: 32.7767, lng: -96.7970 },
  { id: "denver", label: "Denver, CO", lat: 39.7392, lng: -104.9903 },
  { id: "naples-fl", label: "Naples, FL", lat: 26.1420, lng: -81.7948 },
  { id: "miami", label: "Miami, FL", lat: 25.7617, lng: -80.1918 },
  { id: "north-carolina", label: "North Carolina", lat: 35.7596, lng: -79.0193 },
  { id: "new-jersey", label: "New Jersey", lat: 40.0583, lng: -74.4057 },
  { id: "georgia", label: "Georgia", lat: 33.7490, lng: -84.3880 },
  { id: "minnesota", label: "Minnesota", lat: 46.7296, lng: -94.6859 },

  // ── Europe ──
  { id: "turin", label: "Turin, Italy", lat: 45.0703, lng: 7.6869 },
  { id: "great-britain", label: "Great Britain", lat: 52.3555, lng: -1.1743 },
  { id: "athens", label: "Athens, Greece", lat: 37.9838, lng: 23.7275 },
  { id: "london", label: "London", lat: 51.5074, lng: -0.1278 },
  { id: "east-midlands", label: "East Midlands", lat: 52.8311, lng: -1.3278 },
  { id: "wales", label: "Wales", lat: 52.1307, lng: -3.7837 },
  { id: "switzerland", label: "Switzerland", lat: 46.8182, lng: 8.2275 },
  { id: "spain", label: "Spain", lat: 40.4637, lng: -3.7492 },

  // ── Asia & Pacific ──
  { id: "chiba", label: "Chiba, Japan", lat: 35.6074, lng: 140.1065 },
  { id: "india", label: "India", lat: 20.5937, lng: 78.9629 },
  { id: "malaysia", label: "Malaysia", lat: 4.2105, lng: 101.9758 },
  { id: "busan", label: "Busan, South Korea", lat: 35.1796, lng: 129.0756 },
  { id: "sydney", label: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },

  // ── Other ──
  { id: "manitoba", label: "Manitoba, Canada", lat: 53.7609, lng: -98.8139 },
];

// ─────────────────────────────────────────────────────────────
// Timing constants for animation orchestration
// ─────────────────────────────────────────────────────────────
export const ANIMATION = {
  // Camera zoom
  ZOOM_START_DELAY: 0.6,        // seconds before zoom begins
  ZOOM_DURATION: 8.0,           // total zoom-out duration (slow & cinematic)
  CAMERA_START_DISTANCE: 5.45,  // very tight on Michigan — see local nodes up close
  CAMERA_END_DISTANCE: 14.5,    // ending distance (see full globe)

  // Line drawing
  LINE_START_DELAY: 0.8,        // lines start sooner since we're already close
  LINE_STAGGER: 0.1,            // slightly tighter stagger
  LINE_DRAW_DURATION: 1.5,      // slightly snappier draws

  // Node reveal
  NODE_REVEAL_OFFSET: 0.4,      // node appears this many seconds before its line finishes

  // Globe rotation
  GLOBE_AUTO_ROTATE_SPEED: 0.025, // slightly slower rotation
};
