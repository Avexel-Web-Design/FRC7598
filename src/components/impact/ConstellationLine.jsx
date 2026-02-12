import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./constellationData";

const ARC_SEGMENTS = 64;
const ARC_HEIGHT_FACTOR = 0.12;
const LINE_RADIUS = 0.0012;

const ConstellationLine = ({
  startLat,
  startLng,
  endLat,
  endLng,
  drawProgress = 0,
  color = "#d3b840",
  pulseEnabled = false,
  sizeFactor = 1,
  fadeOpacity = 1,
}) => {
  const meshRef = useRef();
  const materialRef = useRef();

  // Build great-circle arc from start to end
  // Start altitude matches CentralStar (0.02), end matches ConstellationNode (0.02)
  const arcCurve = useMemo(() => {
    const START_ALT = 0.02;
    const END_ALT = 0.02;

    // Get unit-sphere directions for proper great-circle interpolation
    const startDir = latLngToVector3(startLat, startLng, 1, 0).normalize();
    const endDir = latLngToVector3(endLat, endLng, 1, 0).normalize();

    const angle = startDir.angleTo(endDir);
    const arcHeight = GLOBE_RADIUS * ARC_HEIGHT_FACTOR * (angle / Math.PI);

    const points = [];
    for (let i = 0; i <= ARC_SEGMENTS; i++) {
      const t = i / ARC_SEGMENTS;

      // Spherical interpolation on unit sphere
      const dir = new THREE.Vector3().copy(startDir).lerp(endDir, t).normalize();

      // Interpolate base altitude from start to end, plus parabolic arc
      const baseAlt = START_ALT * (1 - t) + END_ALT * t;
      const elevation = GLOBE_RADIUS + baseAlt + arcHeight * 4.0 * t * (1 - t);
      points.push(dir.multiplyScalar(elevation));
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

    // Opacity: includes fadeOpacity for Michigan fade-out
    const opacityScale = (0.5 + 0.5 * sizeFactor) * fadeOpacity;
    materialRef.current.opacity = Math.min(1, drawProgress * 2) * opacityScale;

    // Subtle steady-state pulse
    if (pulseEnabled && drawProgress >= 1.0) {
      const t = state.clock.getElapsedTime();
      materialRef.current.opacity = (0.85 + 0.15 * (0.5 + 0.5 * Math.sin(t * 1.2))) * opacityScale;
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
