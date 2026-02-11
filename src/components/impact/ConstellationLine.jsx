import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./constellationData";

const ARC_SEGMENTS = 64;
const ARC_HEIGHT_FACTOR = 0.12;
const LINE_RADIUS = 0.008;

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

  // Build great-circle arc from start to end
  const arcCurve = useMemo(() => {
    const startVec = latLngToVector3(startLat, startLng, GLOBE_RADIUS, 0.08);
    const endVec = latLngToVector3(endLat, endLng, GLOBE_RADIUS, 0.08);

    const angle = startVec.angleTo(endVec);
    const arcHeight = GLOBE_RADIUS * ARC_HEIGHT_FACTOR * (angle / Math.PI);

    const points = [];
    for (let i = 0; i <= ARC_SEGMENTS; i++) {
      const t = i / ARC_SEGMENTS;

      // Spherical interpolation
      const point = new THREE.Vector3()
        .copy(startVec)
        .lerp(endVec, t)
        .normalize();

      // Parabolic elevation
      const elevation = GLOBE_RADIUS + 0.08 + arcHeight * 4.0 * t * (1 - t);
      point.multiplyScalar(elevation);
      points.push(point);
    }

    return new THREE.CatmullRomCurve3(points);
  }, [startLat, startLng, endLat, endLng]);

  const fullGeometry = useMemo(() => {
    return new THREE.TubeGeometry(arcCurve, ARC_SEGMENTS, LINE_RADIUS, 4, false);
  }, [arcCurve]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const geom = meshRef.current.geometry;

    // Reveal progressively via draw range
    if (geom.index) {
      const vertsPerRing = 5; // radialSegments + 1
      const totalRings = ARC_SEGMENTS + 1;
      const visibleRings = Math.floor(drawProgress * totalRings);
      const indicesPerSegment = 4 * 6; // radialSegments * 6
      const visibleSegments = Math.max(0, visibleRings - 1);
      geom.setDrawRange(0, visibleSegments * indicesPerSegment);
    }

    // Clean opacity — no bloomy over-brightness
    materialRef.current.opacity = Math.min(1, drawProgress * 2) * 0.55;

    // Subtle steady-state pulse
    if (pulseEnabled && drawProgress >= 1.0) {
      const t = state.clock.getElapsedTime();
      materialRef.current.opacity = 0.3 + 0.15 * (0.5 + 0.5 * Math.sin(t * 1.2));
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
      />
    </mesh>
  );
};

export default React.memo(ConstellationLine);
