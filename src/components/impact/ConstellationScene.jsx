import React, { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import Globe from "./Globe";
import CentralStar from "./CentralStar";
import ConstellationNode from "./ConstellationNode";
import ConstellationLine from "./ConstellationLine";
import {
  constellationNodes,
  ANIMATION,
  SCA_HOME,
  latLngToVector3,
  GLOBE_RADIUS,
} from "./constellationData";

// ────────────────────────────────────────────
// Cinematic ease-out curve
// ────────────────────────────────────────────
function cinematicEase(t) {
  return 1 - Math.pow(1 - t, 3.5);
}

// ────────────────────────────────────────────
// Compute initial camera position looking at SCA (Wixom, MI)
// ────────────────────────────────────────────
function getInitialCameraPosition() {
  // Get the direction from globe center toward Wixom, MI
  const scaPos = latLngToVector3(SCA_HOME.lat, SCA_HOME.lng, GLOBE_RADIUS, 0);
  const dir = scaPos.clone().normalize();
  // Camera starts close, looking directly at the SCA point on the globe
  return dir.multiplyScalar(ANIMATION.CAMERA_START_DISTANCE);
}

function getFinalCameraPosition() {
  // Pull back to see the full globe, slightly elevated and angled
  const scaPos = latLngToVector3(SCA_HOME.lat, SCA_HOME.lng, GLOBE_RADIUS, 0);
  const dir = scaPos.clone().normalize();
  // Mix in some upward and sideways offset so we see the globe from a nice angle
  const up = new THREE.Vector3(0, 1, 0);
  const finalDir = dir
    .clone()
    .multiplyScalar(0.6)
    .add(up.clone().multiplyScalar(0.45))
    .normalize();
  return finalDir.multiplyScalar(ANIMATION.CAMERA_END_DISTANCE);
}

// ────────────────────────────────────────────
// Camera Animator
// ────────────────────────────────────────────
function CameraAnimator({ onProgress }) {
  const { camera } = useThree();
  const startTime = useRef(null);
  const started = useRef(false);

  const startPos = useMemo(() => getInitialCameraPosition(), []);
  const endPos = useMemo(() => getFinalCameraPosition(), []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (!started.current && elapsed >= ANIMATION.ZOOM_START_DELAY) {
      startTime.current = elapsed;
      started.current = true;
    }

    if (!started.current) {
      camera.position.copy(startPos);
      camera.lookAt(0, 0, 0);
      onProgress(0);
      return;
    }

    const t = Math.min(
      1,
      (elapsed - startTime.current) / ANIMATION.ZOOM_DURATION
    );
    const eased = cinematicEase(t);

    // Interpolate camera position
    camera.position.lerpVectors(startPos, endPos, eased);
    camera.lookAt(0, 0, 0);

    onProgress(eased);
  });

  return null;
}

// ────────────────────────────────────────────
// Compute line & node timing (staggered by distance from SCA)
// ────────────────────────────────────────────
function computeTimings(nodes) {
  const scaVec = latLngToVector3(SCA_HOME.lat, SCA_HOME.lng, GLOBE_RADIUS, 0);

  // Sort by angular distance from SCA so nearby nodes light up first
  const withDistance = nodes.map((node) => {
    const nodeVec = latLngToVector3(node.lat, node.lng, GLOBE_RADIUS, 0);
    const angle = scaVec.angleTo(nodeVec);
    return { ...node, angularDist: angle };
  });

  withDistance.sort((a, b) => a.angularDist - b.angularDist);

  return withDistance.map((node, idx) => {
    const lineStartDelay =
      ANIMATION.LINE_START_DELAY + idx * ANIMATION.LINE_STAGGER;
    return {
      ...node,
      lineStartTime: lineStartDelay,
      lineEndTime: lineStartDelay + ANIMATION.LINE_DRAW_DURATION,
      nodeRevealTime:
        lineStartDelay +
        ANIMATION.LINE_DRAW_DURATION -
        ANIMATION.NODE_REVEAL_OFFSET,
    };
  });
}

// ────────────────────────────────────────────
// Scene content
// ────────────────────────────────────────────
function SceneContent() {
  const [zoomProgress, setZoomProgress] = useState(0);
  const clockRef = useRef(0);
  const globeGroupRef = useRef();

  const timedNodes = useMemo(() => computeTimings(constellationNodes), []);

  const handleProgress = useCallback((p) => {
    setZoomProgress(p);
  }, []);

  // Globe auto-rotation state
  const autoRotateRef = useRef(0);

  useFrame((state) => {
    clockRef.current = state.clock.getElapsedTime();

    // Slow auto-rotation after zoom completes
    if (zoomProgress >= 0.98 && globeGroupRef.current) {
      autoRotateRef.current += ANIMATION.GLOBE_AUTO_ROTATE_SPEED * 0.016; // ~60fps
      globeGroupRef.current.rotation.y = autoRotateRef.current;
    }
  });

  return (
    <>
      {/* Lighting — bright enough to show Earth texture clearly */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 8, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-8, -5, 10]} intensity={0.3} color="#d3b840" />

      {/* Background starfield */}
      <Stars
        radius={100}
        depth={80}
        count={2000}
        factor={3}
        saturation={0.1}
        fade
        speed={0.2}
      />

      {/* Camera animation */}
      <CameraAnimator onProgress={handleProgress} />

      {/* Globe + all surface elements rotate together */}
      <group ref={globeGroupRef}>
        {/* The Earth globe */}
        <Globe />

        {/* Central SCA Star (on globe surface) */}
        <CentralStar animationProgress={zoomProgress} />

        {/* Constellation lines and nodes */}
        {timedNodes.map((node) => (
          <ConstellationNodeWithLine
            key={node.id}
            node={node}
            clockRef={clockRef}
          />
        ))}
      </group>
    </>
  );
}

// ────────────────────────────────────────────
// Per-node wrapper that manages animation timing
// ────────────────────────────────────────────
function ConstellationNodeWithLine({ node, clockRef }) {
  const [lineProgress, setLineProgress] = useState(0);
  const [nodeReveal, setNodeReveal] = useState(0);

  useFrame(() => {
    const t = clockRef.current;

    if (t >= node.lineStartTime) {
      const lp = Math.min(
        1,
        (t - node.lineStartTime) / ANIMATION.LINE_DRAW_DURATION
      );
      setLineProgress(lp);
    }

    if (t >= node.nodeRevealTime) {
      const revealDuration = 1.2;
      const np = Math.min(1, (t - node.nodeRevealTime) / revealDuration);
      setNodeReveal(np);
    }
  });

  return (
    <>
      <ConstellationLine
        startLat={SCA_HOME.lat}
        startLng={SCA_HOME.lng}
        endLat={node.lat}
        endLng={node.lng}
        drawProgress={lineProgress}
        color="#d3b840"
        pulseEnabled={lineProgress >= 1}
      />
      <ConstellationNode
        lat={node.lat}
        lng={node.lng}
        label={node.label}
        color="#d3b840"
        size={0.09}
        revealProgress={nodeReveal}
      />
    </>
  );
}

// ────────────────────────────────────────────
// Main exported component
// ────────────────────────────────────────────
const ConstellationScene = () => {
  return (
    <Canvas
      camera={{
        position: getInitialCameraPosition().toArray(),
        fov: 50,
        near: 0.1,
        far: 300,
      }}
      dpr={[1, 2]}
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
      }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.NoToneMapping,
      }}
    >
      <SceneContent />
    </Canvas>
  );
};

export default ConstellationScene;
