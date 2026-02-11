import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./constellationData";

// Clean, tight glow shader — no excessive bloom
const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  uniform vec3 uColorInner;
  uniform vec3 uColorOuter;
  uniform float uOpacity;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center) * 2.0;

    // Tight core with minimal spread
    float core = smoothstep(0.35, 0.0, dist);
    float glow = smoothstep(0.7, 0.2, dist) * 0.3;

    // Subtle pulse — barely perceptible
    float pulse = 0.97 + 0.03 * sin(uTime * 1.0);
    core *= pulse;

    vec3 color = mix(uColorOuter, uColorInner, core);
    float alpha = (core + glow) * uOpacity;

    // Hard cutoff to prevent hazy edges
    alpha *= smoothstep(1.0, 0.6, dist);

    gl_FragColor = vec4(color, alpha);
  }
`;

const CENTRAL_ALTITUDE = 0.12;

const CentralStar = ({ animationProgress = 0 }) => {
  const meshRef = useRef();

  const basePosition = useMemo(
    () => latLngToVector3(42.5248, -83.5363, GLOBE_RADIUS, CENTRAL_ALTITUDE),
    []
  );

  const uniforms = useMemo(
    () => ({
      uColorInner: { value: new THREE.Color("#fffbe6") },
      uColorOuter: { value: new THREE.Color("#d3b840") },
      uOpacity: { value: 1.0 },
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  const labelOpacity = Math.min(1, animationProgress * 3);

  return (
    <group position={basePosition}>
      {/* Single clean glow — no separate oversized halo */}
      <mesh ref={meshRef}>
        <planeGeometry args={[0.35, 0.35]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Crisp core dot */}
      <mesh>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#fffef0" />
      </mesh>

      {/* Label */}
      <Html
        position={[0, -0.3, 0]}
        center
        distanceFactor={8}
        style={{
          opacity: labelOpacity,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "3px",
              color: "#d3b840",
              textShadow: "0 0 6px rgba(211, 184, 64, 0.4)",
            }}
          >
            SCA
          </div>
          <div
            style={{
              fontSize: "7px",
              fontWeight: 500,
              letterSpacing: "2.5px",
              color: "rgba(211, 184, 64, 0.6)",
              marginTop: "2px",
              textTransform: "uppercase",
            }}
          >
            Constellations
          </div>
        </div>
      </Html>
    </group>
  );
};

export default CentralStar;
