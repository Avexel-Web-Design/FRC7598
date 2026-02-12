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
// region: "michigan" nodes draw during the Michigan zoom phase
// region: "world" nodes draw during the full globe zoom phase
// ─────────────────────────────────────────────────────────────
export const constellationNodes = [
  // ── Michigan (nearby) ──
  { id: "bloomfield-hills", label: "Bloomfield Hills, MI", lat: 42.5837, lng: -83.2455, region: "michigan" },
  { id: "saginaw", label: "Saginaw, MI", lat: 43.4195, lng: -83.9508, region: "michigan" },
  { id: "flint", label: "Flint, MI", lat: 43.0125, lng: -83.6875, region: "michigan" },
  { id: "traverse-city", label: "Traverse City, MI", lat: 44.7631, lng: -85.6206, region: "michigan" },
  { id: "harbor-springs", label: "Harbor Springs, MI", lat: 45.4317, lng: -84.9922, region: "michigan" },
  { id: "leland", label: "Leland, MI", lat: 45.0231, lng: -85.65, region: "michigan" },
  { id: "holly", label: "Holly, MI", lat: 42.7920, lng: -83.6274, region: "michigan" },
  { id: "brighton", label: "Brighton, MI", lat: 42.5295, lng: -83.7802, region: "michigan" },
  { id: "white-lake", label: "White Lake, MI", lat: 42.6506, lng: -83.5469, region: "michigan" },
  { id: "jackson", label: "Jackson, MI", lat: 42.2459, lng: -84.4013, region: "michigan" },

  // ── United States ──
  { id: "mountain-view", label: "Mountain View, CA", lat: 37.3861, lng: -122.0839, region: "world" },
  { id: "winter-park", label: "Winter Park, FL", lat: 28.6000, lng: -81.3392, region: "world" },
  { id: "houston", label: "Houston, TX", lat: 29.7604, lng: -95.3698, region: "world" },
  { id: "dallas-ft-worth", label: "Dallas/Ft. Worth, TX", lat: 32.7767, lng: -96.7970, region: "world" },
  { id: "denver", label: "Denver, CO", lat: 39.7392, lng: -104.9903, region: "world" },
  { id: "naples-fl", label: "Naples, FL", lat: 26.1420, lng: -81.7948, region: "world" },
  { id: "miami", label: "Miami, FL", lat: 25.7617, lng: -80.1918, region: "world" },
  { id: "north-carolina", label: "North Carolina", lat: 35.7596, lng: -79.0193, region: "world" },
  { id: "new-jersey", label: "New Jersey", lat: 40.0583, lng: -74.4057, region: "world" },
  { id: "georgia", label: "Georgia", lat: 33.7490, lng: -84.3880, region: "world" },
  { id: "minnesota", label: "Minnesota", lat: 46.7296, lng: -94.6859, region: "world" },

  // ── Europe ──
  { id: "turin", label: "Turin, Italy", lat: 45.0703, lng: 7.6869, region: "world" },
  { id: "athens", label: "Athens, Greece", lat: 37.9838, lng: 23.7275, region: "world" },
  { id: "london", label: "London, United Kingdom", lat: 51.5074, lng: -0.1278, region: "world" },
  { id: "east-midlands", label: "East Midlands", lat: 52.8311, lng: -1.3278, region: "world" },
  { id: "wales", label: "Wales", lat: 52.1307, lng: -3.7837, region: "world" },
  { id: "switzerland", label: "Switzerland", lat: 46.8182, lng: 8.2275, region: "world" },
  { id: "spain", label: "Spain", lat: 40.4637, lng: -3.7492, region: "world" },

  // ── Asia & Pacific ──
  { id: "chiba", label: "Chiba, Japan", lat: 35.6074, lng: 140.1065, region: "world" },
  { id: "india", label: "India", lat: 20.5937, lng: 78.9629, region: "world" },
  { id: "malaysia", label: "Malaysia", lat: 4.2105, lng: 101.9758, region: "world" },
  { id: "busan", label: "Busan, South Korea", lat: 35.1796, lng: 129.0756, region: "world" },
  { id: "sydney", label: "Sydney, Australia", lat: -33.8688, lng: 151.2093, region: "world" },

  // ── Other ──
  { id: "manitoba", label: "Manitoba, Canada", lat: 53.7609, lng: -98.8139, region: "world" },
];

// ─────────────────────────────────────────────────────────────
// Geographic region classification for label visibility
// ─────────────────────────────────────────────────────────────
export function getGeoRegion(lat, lng) {
  if (lng > 45 || (lng >= -30 && lat <= 30) || lat < -10) return "asia-pacific";
  if (lng >= -30 && lng <= 45 && lat > 30) return "europe";
  return "americas";
}

// ─────────────────────────────────────────────────────────────
// Timing constants for animation orchestration
//
// Phase 0: Initial delay
// Phase 1: Zoom SCA → Michigan (MI lines draw)
// Phase 2: Hold at Michigan
// Phase 3: Zoom Michigan → full globe (world lines draw)
// Phase 4: Hold at NA globe view
// Phase 5: Orbit to Asia/Pacific
// Phase 6: Hold at Asia/Pacific
// Phase 7: Orbit to Europe
// Phase 8: Hold at Europe
// Phase 9: Orbit back to NA
// Phase 10: Zoom into SCA (star glow → white-out)
// Phase 11: Done (white screen)
// ─────────────────────────────────────────────────────────────
export const ANIMATION = {
  // Camera distances
  CAMERA_START_DISTANCE: 5.3,    // very tight on SCA (just above surface)
  CAMERA_MICHIGAN_DISTANCE: 5.6, // shows all of Michigan
  CAMERA_END_DISTANCE: 14.5,     // full globe view

  // Phase timing (phases 0-3: existing)
  INITIAL_DELAY: 0.3,
  MICHIGAN_ZOOM_DURATION: 3.5,
  MICHIGAN_HOLD_DURATION: 1.0,
  GLOBE_ZOOM_DURATION: 7.0,

  // Phase timing (phases 4-10: tour)
  NA_HOLD_DURATION: 0.5,          // hold at NA globe view before tour
  ORBIT_TO_ASIA_DURATION: 3.0,    // orbit from NA to Asia/Pacific
  ASIA_HOLD_DURATION: 1.0,        // hold at Asia/Pacific
  ORBIT_TO_EUROPE_DURATION: 3.0,  // orbit from Asia to Europe
  EUROPE_HOLD_DURATION: 1.0,      // hold at Europe
  ORBIT_TO_NA_DURATION: 3.0,      // orbit from Europe back to NA
  FINAL_ZOOM_DURATION: 3.0,       // zoom from globe into SCA star

  // Tour camera targets (lat, lng for orbit stops)
  ASIA_CENTER: { lat: 0, lng: 110 },
  EUROPE_CENTER: { lat: 45, lng: 10 },

  // Michigan line drawing (during Phase 1)
  MI_LINE_START_DELAY: 0.3,
  MI_LINE_STAGGER: 0.25,
  MI_LINE_DRAW_DURATION: 1.0,

  // World line drawing (during Phase 3)
  WORLD_LINE_START_DELAY: 0.3,
  WORLD_LINE_STAGGER: 0.15,
  WORLD_LINE_DRAW_DURATION: 1.5,

  // Node reveal
  NODE_REVEAL_OFFSET: 0.3,
};
