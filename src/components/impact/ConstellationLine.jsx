import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./constellationData";

const ARC_SEGMENTS = 80;
// How high above the globe surface the arc peaks (proportional to distance)
const ARC_HEIGHT_FACTOR = 0.15;
// Tube radius for thick lines
const LINE_RADIUS = 0.012;

const ConstellationLine = ({
  startLat,
  startLng,
  endLat,
  endLng,
  drawProgress = 0,
  color = "#d3b840",
  pulseEnabled = false,
}) => {
  const meshRef = useRef();
  const materialRef = useRef();

  // Build a great-circle arc path from start to end, elevated above the globe
  const arcCurve = useMemo(() => {
    const startVec = latLngToVector3(startLat, startLng, GLOBE_RADIUS, 0.15);
    const endVec = latLngToVector3(endLat, endLng, GLOBE_RADIUS, 0.15);

    // Angular distance between the two points
    const angle = startVec.angleTo(endVec);
    const arcHeight = GLOBE_RADIUS * ARC_HEIGHT_FACTOR * (angle / Math.PI);

    const points = [];

    for (let i = 0; i <= ARC_SEGMENTS; i++) {
      const t = i / ARC_SEGMENTS;

      // Spherical interpolation (great circle path)
      const point = new THREE.Vector3()
        .copy(startVec)
        .lerp(endVec, t)
        .normalize();

      // Elevation: parabolic arc peaking at midpoint
      const elevation = GLOBE_RADIUS + 0.15 + arcHeight * 4.0 * t * (1 - t);
      point.multiplyScalar(elevation);

      points.push(point);
    }

    return new THREE.CatmullRomCurve3(points);
  }, [startLat, startLng, endLat, endLng]);

  // Full tube geometry for the arc
  const fullGeometry = useMemo(() => {
    return new THREE.TubeGeometry(arcCurve, ARC_SEGMENTS, LINE_RADIUS, 6, false);
  }, [arcCurve]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const geom = meshRef.current.geometry;

    // Each ring of the tube has 7 vertices (6 radial segments + 1 to close).
    // There are (ARC_SEGMENTS + 1) rings along the tube.
    const vertsPerRing = 7; // radialSegments + 1
    const totalRings = ARC_SEGMENTS + 1;
    const totalVerts = totalRings * vertsPerRing;

    // Reveal vertices proportionally to drawProgress
    const visibleRings = Math.floor(drawProgress * totalRings);
    const visibleVerts = visibleRings * vertsPerRing;

    geom.setDrawRange(0, Math.max(0, visibleVerts * 2)); // *2 rough estimate for index count

    // For indexed geometry, control via index draw range instead
    if (geom.index) {
      // Each segment between rings generates radialSegments * 2 triangles = radialSegments * 6 indices
      const indicesPerSegment = 6 * 6; // radialSegments * 6
      const visibleSegments = Math.max(0, visibleRings - 1);
      const visibleIndices = visibleSegments * indicesPerSegment;
      geom.setDrawRange(0, visibleIndices);
    }

    // Material opacity
    materialRef.current.opacity = Math.min(1, drawProgress * 2.5) * 0.7;

    // Pulse when complete
    if (pulseEnabled && drawProgress >= 1.0) {
      const t = state.clock.getElapsedTime();
      materialRef.current.opacity =
        0.35 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.5));
    }
  });

  const lineColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <mesh ref={meshRef} geometry={fullGeometry}>
      <meshBasicMaterial
        ref={materialRef}
        color={lineColor}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default React.memo(ConstellationLine);
