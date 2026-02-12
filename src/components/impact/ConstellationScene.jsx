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
  getGeoRegion,
} from "./constellationData";

// ────────────────────────────────────────────
// Cinematic ease curves
// ────────────────────────────────────────────
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInCubic(t) {
  return t * t * t;
}

// ────────────────────────────────────────────
// Camera position helpers
// ────────────────────────────────────────────

function getStartCameraPosition() {
  const scaPos = latLngToVector3(SCA_HOME.lat, SCA_HOME.lng, GLOBE_RADIUS, 0);
  const dir = scaPos.clone().normalize();
  return dir.multiplyScalar(ANIMATION.CAMERA_START_DISTANCE);
}

// Michigan camera centered on Michigan as a whole (~43.5°N, ~84.5°W)
function getMichiganCameraPosition() {
  const miCenter = latLngToVector3(43.5, -84.5, GLOBE_RADIUS, 0);
  const dir = miCenter.clone().normalize();
  return dir.multiplyScalar(ANIMATION.CAMERA_MICHIGAN_DISTANCE);
}

// Globe-distance camera above a lat/lng with slight upward bias
function getGlobeCameraPosition(lat, lng, upBias = 0.2) {
  const pos = latLngToVector3(lat, lng, GLOBE_RADIUS, 0);
  const dir = pos.clone().normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const finalDir = dir
    .clone()
    .multiplyScalar(0.75)
    .add(up.clone().multiplyScalar(upBias))
    .normalize();
  return finalDir.multiplyScalar(ANIMATION.CAMERA_END_DISTANCE);
}

// Spherical interpolation for camera positions (orbit around globe)
function slerpCameraPositions(from, to, t) {
  const fromDir = from.clone().normalize();
  const toDir = to.clone().normalize();
  const radius = from.length() + (to.length() - from.length()) * t;

  // Quaternion slerp for smooth great-circle interpolation
  const qFrom = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    fromDir
  );
  const qTo = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    toDir
  );
  const qInterp = qFrom.clone().slerp(qTo, t);
  const interpDir = new THREE.Vector3(0, 0, 1).applyQuaternion(qInterp);

  return interpDir.multiplyScalar(radius);
}

// ────────────────────────────────────────────
// Multi-phase Camera Animator
//
// phaseInfo fields:
//   phase: 0-11
//   miZoom: 0→1 during phase 1
//   globeZoom: 0→1 during phase 3
//   finalZoom: 0→1 during phase 10 (zoom into SCA)
//   viewRegion: "michigan" | "americas" | "asia-pacific" | "europe" | null
//   labelsOff: true when no labels should show
// ────────────────────────────────────────────
function CameraAnimator({ onPhaseInfo }) {
  const { camera } = useThree();
  const startedRef = useRef(false);
  const startTimeRef = useRef(0);

  const scaPos = useMemo(() => getStartCameraPosition(), []);
  const miPos = useMemo(() => getMichiganCameraPosition(), []);
  const naGlobePos = useMemo(
    () => getGlobeCameraPosition(SCA_HOME.lat, SCA_HOME.lng, 0.2),
    []
  );
  const asiaPos = useMemo(
    () =>
      getGlobeCameraPosition(
        ANIMATION.ASIA_CENTER.lat,
        ANIMATION.ASIA_CENTER.lng,
        0.15
      ),
    []
  );
  const euroPos = useMemo(
    () =>
      getGlobeCameraPosition(
        ANIMATION.EUROPE_CENTER.lat,
        ANIMATION.EUROPE_CENTER.lng,
        0.2
      ),
    []
  );

  // SCA position on globe surface (for final zoom target)
  const scaSurface = useMemo(
    () => latLngToVector3(SCA_HOME.lat, SCA_HOME.lng, GLOBE_RADIUS, 0.02),
    []
  );

  // Cumulative phase start times
  const phaseTimes = useMemo(() => {
    let t = 0;
    const p = {};
    p.miZoomStart = t; // phase 1 start
    t += ANIMATION.MICHIGAN_ZOOM_DURATION;
    p.miHoldStart = t; // phase 2 start
    t += ANIMATION.MICHIGAN_HOLD_DURATION;
    p.globeZoomStart = t; // phase 3 start
    t += ANIMATION.GLOBE_ZOOM_DURATION;
    p.naHoldStart = t; // phase 4 start
    t += ANIMATION.NA_HOLD_DURATION;
    p.orbitAsiaStart = t; // phase 5 start
    t += ANIMATION.ORBIT_TO_ASIA_DURATION;
    p.asiaHoldStart = t; // phase 6 start
    t += ANIMATION.ASIA_HOLD_DURATION;
    p.orbitEuropeStart = t; // phase 7 start
    t += ANIMATION.ORBIT_TO_EUROPE_DURATION;
    p.europeHoldStart = t; // phase 8 start
    t += ANIMATION.EUROPE_HOLD_DURATION;
    p.orbitNaStart = t; // phase 9 start
    t += ANIMATION.ORBIT_TO_NA_DURATION;
    p.finalZoomStart = t; // phase 10 start
    t += ANIMATION.FINAL_ZOOM_DURATION;
    p.doneStart = t; // phase 11
    return p;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // Wait for initial delay
    if (!startedRef.current) {
      if (elapsed < ANIMATION.INITIAL_DELAY) {
        camera.position.copy(scaPos);
        camera.lookAt(0, 0, 0);
        onPhaseInfo({
          phase: 0,
          miZoom: 0,
          globeZoom: 0,
          finalZoom: 0,
          viewRegion: "michigan",
          labelsOff: false,
        });
        return;
      }
      startedRef.current = true;
      startTimeRef.current = elapsed;
    }

    const t = elapsed - startTimeRef.current;

    // Phase 1: Zoom SCA → Michigan
    if (t < phaseTimes.miHoldStart) {
      const raw = t / ANIMATION.MICHIGAN_ZOOM_DURATION;
      const eased = easeInOutCubic(raw);
      camera.position.lerpVectors(scaPos, miPos, eased);
      camera.lookAt(0, 0, 0);
      onPhaseInfo({
        phase: 1,
        miZoom: eased,
        globeZoom: 0,
        finalZoom: 0,
        viewRegion: "michigan",
        labelsOff: false,
      });
      return;
    }

    // Phase 2: Hold at Michigan
    if (t < phaseTimes.globeZoomStart) {
      camera.position.copy(miPos);
      camera.lookAt(0, 0, 0);
      onPhaseInfo({
        phase: 2,
        miZoom: 1,
        globeZoom: 0,
        finalZoom: 0,
        viewRegion: "michigan",
        labelsOff: false,
      });
      return;
    }

    // Phase 3: Zoom Michigan → full globe
    if (t < phaseTimes.naHoldStart) {
      const raw = (t - phaseTimes.globeZoomStart) / ANIMATION.GLOBE_ZOOM_DURATION;
      const eased = easeInOutCubic(raw);
      camera.position.lerpVectors(miPos, naGlobePos, eased);
      camera.lookAt(0, 0, 0);
      onPhaseInfo({
        phase: 3,
        miZoom: 1,
        globeZoom: eased,
        finalZoom: 0,
        viewRegion: "americas",
        labelsOff: false,
      });
      return;
    }

    // Phase 4: Hold at NA globe view
    if (t < phaseTimes.orbitAsiaStart) {
      camera.position.copy(naGlobePos);
      camera.lookAt(0, 0, 0);
      onPhaseInfo({
        phase: 4,
        miZoom: 1,
        globeZoom: 1,
        finalZoom: 0,
        viewRegion: "americas",
        labelsOff: false,
      });
      return;
    }

    // Phase 5: Orbit to Asia/Pacific
    if (t < phaseTimes.asiaHoldStart) {
      const raw =
        (t - phaseTimes.orbitAsiaStart) / ANIMATION.ORBIT_TO_ASIA_DURATION;
      const eased = easeInOutCubic(raw);
      camera.position.copy(slerpCameraPositions(naGlobePos, asiaPos, eased));
      camera.lookAt(0, 0, 0);
      onPhaseInfo({
        phase: 5,
        miZoom: 1,
        globeZoom: 1,
        finalZoom: 0,
        viewRegion: eased > 0.4 ? "asia-pacific" : "americas",
        labelsOff: false,
      });
      return;
    }

    // Phase 6: Hold at Asia/Pacific
    if (t < phaseTimes.orbitEuropeStart) {
      camera.position.copy(asiaPos);
      camera.lookAt(0, 0, 0);
      onPhaseInfo({
        phase: 6,
        miZoom: 1,
        globeZoom: 1,
        finalZoom: 0,
        viewRegion: "asia-pacific",
        labelsOff: false,
      });
      return;
    }

    // Phase 7: Orbit to Europe
    if (t < phaseTimes.europeHoldStart) {
      const raw =
        (t - phaseTimes.orbitEuropeStart) / ANIMATION.ORBIT_TO_EUROPE_DURATION;
      const eased = easeInOutCubic(raw);
      camera.position.copy(slerpCameraPositions(asiaPos, euroPos, eased));
      camera.lookAt(0, 0, 0);
      onPhaseInfo({
        phase: 7,
        miZoom: 1,
        globeZoom: 1,
        finalZoom: 0,
        viewRegion: eased > 0.4 ? "europe" : "asia-pacific",
        labelsOff: false,
      });
      return;
    }

    // Phase 8: Hold at Europe
    if (t < phaseTimes.orbitNaStart) {
      camera.position.copy(euroPos);
      camera.lookAt(0, 0, 0);
      onPhaseInfo({
        phase: 8,
        miZoom: 1,
        globeZoom: 1,
        finalZoom: 0,
        viewRegion: "europe",
        labelsOff: false,
      });
      return;
    }

    // Phase 9: Orbit back to NA
    if (t < phaseTimes.finalZoomStart) {
      const raw =
        (t - phaseTimes.orbitNaStart) / ANIMATION.ORBIT_TO_NA_DURATION;
      const eased = easeInOutCubic(raw);
      camera.position.copy(slerpCameraPositions(euroPos, naGlobePos, eased));
      camera.lookAt(0, 0, 0);
      onPhaseInfo({
        phase: 9,
        miZoom: 1,
        globeZoom: 1,
        finalZoom: 0,
        viewRegion: null,
        labelsOff: true,
      });
      return;
    }

    // Phase 10: Zoom into SCA star
    if (t < phaseTimes.doneStart) {
      const raw =
        (t - phaseTimes.finalZoomStart) / ANIMATION.FINAL_ZOOM_DURATION;
      const eased = easeInCubic(raw); // accelerating zoom-in
      // Interpolate from globe position toward SCA surface
      camera.position.lerpVectors(naGlobePos, scaSurface, eased);
      camera.lookAt(0, 0, 0);
      onPhaseInfo({
        phase: 10,
        miZoom: 1,
        globeZoom: 1,
        finalZoom: eased,
        viewRegion: null,
        labelsOff: true,
      });
      return;
    }

    // Phase 11: Done — white screen
    camera.position.copy(scaSurface);
    camera.lookAt(0, 0, 0);
    onPhaseInfo({
      phase: 11,
      miZoom: 1,
      globeZoom: 1,
      finalZoom: 1,
      viewRegion: null,
      labelsOff: true,
    });
  });

  return null;
}

// ────────────────────────────────────────────
// Compute line & node timing
// ────────────────────────────────────────────
function computeTimings(nodes) {
  const scaVec = latLngToVector3(SCA_HOME.lat, SCA_HOME.lng, GLOBE_RADIUS, 0);

  const miNodes = nodes
    .filter((n) => n.region === "michigan")
    .map((node) => {
      const nodeVec = latLngToVector3(node.lat, node.lng, GLOBE_RADIUS, 0);
      return { ...node, angularDist: scaVec.angleTo(nodeVec) };
    })
    .sort((a, b) => a.angularDist - b.angularDist);

  const worldNodes = nodes
    .filter((n) => n.region === "world")
    .map((node) => {
      const nodeVec = latLngToVector3(node.lat, node.lng, GLOBE_RADIUS, 0);
      return { ...node, angularDist: scaVec.angleTo(nodeVec) };
    })
    .sort((a, b) => a.angularDist - b.angularDist);

  const timedMi = miNodes.map((node, idx) => {
    const lineStart =
      ANIMATION.INITIAL_DELAY +
      ANIMATION.MI_LINE_START_DELAY +
      idx * ANIMATION.MI_LINE_STAGGER;
    return {
      ...node,
      lineStartTime: lineStart,
      lineDuration: ANIMATION.MI_LINE_DRAW_DURATION,
      nodeRevealTime:
        lineStart +
        ANIMATION.MI_LINE_DRAW_DURATION -
        ANIMATION.NODE_REVEAL_OFFSET,
      timingMode: "absolute",
      geoRegion: "americas",
    };
  });

  const worldNodes2 = worldNodes.map((node, idx) => {
    const lineStart =
      ANIMATION.WORLD_LINE_START_DELAY + idx * ANIMATION.WORLD_LINE_STAGGER;
    return {
      ...node,
      lineStartTime: lineStart,
      lineDuration: ANIMATION.WORLD_LINE_DRAW_DURATION,
      nodeRevealTime:
        lineStart +
        ANIMATION.WORLD_LINE_DRAW_DURATION -
        ANIMATION.NODE_REVEAL_OFFSET,
      timingMode: "globeZoom",
      geoRegion: getGeoRegion(node.lat, node.lng),
    };
  });

  return [...timedMi, ...worldNodes2];
}

// ────────────────────────────────────────────
// Scene content
// ────────────────────────────────────────────
function SceneContent() {
  const phaseInfoRef = useRef({
    phase: 0,
    miZoom: 0,
    globeZoom: 0,
    finalZoom: 0,
    viewRegion: "michigan",
    labelsOff: false,
  });
  const [phaseInfo, setPhaseInfo] = useState({
    phase: 0,
    miZoom: 0,
    globeZoom: 0,
    finalZoom: 0,
    viewRegion: "michigan",
    labelsOff: false,
  });
  const clockRef = useRef(0);

  const timedNodes = useMemo(() => computeTimings(constellationNodes), []);

  const globeZoomStart = useMemo(
    () =>
      ANIMATION.INITIAL_DELAY +
      ANIMATION.MICHIGAN_ZOOM_DURATION +
      ANIMATION.MICHIGAN_HOLD_DURATION,
    []
  );

  const handlePhaseInfo = useCallback((info) => {
    phaseInfoRef.current = info;
    setPhaseInfo(info);
  }, []);

  useFrame((state) => {
    clockRef.current = state.clock.getElapsedTime();
  });

  return (
    <>
      {/* Minimal lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 8, 5]} intensity={0.6} color="#ffffff" />

      {/* Subtle background starfield */}
      <Stars
        radius={120}
        depth={60}
        count={1200}
        factor={1.5}
        saturation={0}
        fade
        speed={0.1}
      />

      <CameraAnimator onPhaseInfo={handlePhaseInfo} />

      <group>
        <Globe />
        <CentralStar phaseInfo={phaseInfo} />

        {timedNodes.map((node) => (
          <ConstellationNodeWithLine
            key={node.id}
            node={node}
            clockRef={clockRef}
            phaseInfo={phaseInfo}
            globeZoomStart={globeZoomStart}
          />
        ))}
      </group>

      {/* Full-screen white overlay for final zoom white-out */}
      {phaseInfo.finalZoom > 0 && <WhiteOutOverlay progress={phaseInfo.finalZoom} />}
    </>
  );
}

// ────────────────────────────────────────────
// White-out overlay — fullscreen quad that fades to white
// ────────────────────────────────────────────
function WhiteOutOverlay({ progress }) {
  const { camera } = useThree();
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      // Position the quad slightly in front of the camera
      meshRef.current.position.copy(camera.position);
      const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      meshRef.current.position.add(dir.multiplyScalar(0.2));
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  // Opacity ramps up in the last 25% of the zoom
  const opacity = Math.max(0, (progress - 0.75) / 0.25);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={opacity}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// ────────────────────────────────────────────
// Per-node wrapper
// ────────────────────────────────────────────
function ConstellationNodeWithLine({ node, clockRef, phaseInfo, globeZoomStart }) {
  const [lineProgress, setLineProgress] = useState(0);
  const [nodeReveal, setNodeReveal] = useState(0);

  const isMichigan = node.timingMode === "absolute";

  const sizeFactor = isMichigan ? 0.12 : 1.0;

  // Label visibility: based on whether this node's geoRegion matches the current viewRegion
  // Michigan nodes show labels during michigan viewRegion only (phases 0-2)
  // World nodes show labels when their geoRegion matches viewRegion
  // labelsOff overrides everything (final NA return + zoom)
  let labelVisible = 0;
  if (!phaseInfo.labelsOff) {
    if (isMichigan) {
      labelVisible = phaseInfo.viewRegion === "michigan" ? 1 : 0;
    } else {
      labelVisible = node.geoRegion === phaseInfo.viewRegion ? 1 : 0;
    }
  }

  useFrame(() => {
    const t = clockRef.current;

    if (isMichigan) {
      if (t >= node.lineStartTime) {
        const lp = Math.min(1, (t - node.lineStartTime) / node.lineDuration);
        setLineProgress(lp);
      }
      if (t >= node.nodeRevealTime) {
        const np = Math.min(1, (t - node.nodeRevealTime) / 0.8);
        setNodeReveal(np);
      }
    } else {
      const relT = t - globeZoomStart;
      if (relT >= node.lineStartTime) {
        const lp = Math.min(
          1,
          (relT - node.lineStartTime) / node.lineDuration
        );
        setLineProgress(lp);
      }
      if (relT >= node.nodeRevealTime) {
        const np = Math.min(1, (relT - node.nodeRevealTime) / 1.0);
        setNodeReveal(np);
      }
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
        sizeFactor={sizeFactor}
        fadeOpacity={1}
      />
      <ConstellationNode
        lat={node.lat}
        lng={node.lng}
        label={node.label}
        color="#d3b840"
        size={0.07}
        revealProgress={nodeReveal}
        sizeFactor={sizeFactor}
        isMichigan={isMichigan}
        labelVisible={labelVisible}
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
        position: getStartCameraPosition().toArray(),
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
