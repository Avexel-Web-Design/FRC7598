import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./constellationData";

// Tight, clean glow — no bloom blowout
const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center) * 2.0;

    // Sharp core, tight falloff
    float core = smoothstep(0.3, 0.0, dist);
    float glow = smoothstep(0.65, 0.15, dist) * 0.25;

    float alpha = (core + glow) * uOpacity;

    // Hard edge cutoff
    alpha *= smoothstep(1.0, 0.55, dist);

    vec3 color = mix(uColor, vec3(1.0), core * 0.5);
    gl_FragColor = vec4(color, alpha);
  }
`;

const NODE_ALTITUDE = 0.02;

const ConstellationNode = ({
  lat,
  lng,
  label,
  color = "#d3b840",
  size = 0.07,
  revealProgress = 0,
  sizeFactor = 1,
  isMichigan = false,
  labelVisible = 1,
}) => {
  const meshRef = useRef();
  const groupRef = useRef();

  const position = useMemo(
    () => latLngToVector3(lat, lng, GLOBE_RADIUS, NODE_ALTITUDE),
    [lat, lng]
  );

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 0 },
    }),
    [color]
  );

  const effectiveSize = size * sizeFactor;

  useFrame((state) => {
    uniforms.uOpacity.value = THREE.MathUtils.lerp(
      uniforms.uOpacity.value,
      revealProgress,
      0.1
    );

    if (meshRef.current) {
      meshRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  // Label opacity: combines reveal progress with region-based visibility
  const baseLabel = Math.max(0, (revealProgress - 0.4) / 0.6);
  const labelOpacity = baseLabel * labelVisible;

  const labelPos = [0, 0, 0];

  // Michigan: fixed tiny size, no distanceFactor (screen-pixel size).
  // World: uses distanceFactor so labels scale naturally with globe distance.
  const htmlProps = isMichigan
    ? {} // no distanceFactor = fixed screen pixels
    : { distanceFactor: 12 };

  const fontSize = isMichigan ? "8px" : "8px";
  const letterSpacing = isMichigan ? "0.4px" : "0.5px";

  return (
    <group ref={groupRef} position={position}>
      {/* Clean glow sprite */}
      <mesh ref={meshRef}>
        <planeGeometry args={[effectiveSize * 2.5, effectiveSize * 2.5]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Crisp core dot — fades in with reveal */}
      {revealProgress > 0.01 && (
        <mesh>
          <sphereGeometry args={[effectiveSize * 0.18, 10, 10]} />
          <meshBasicMaterial
            color="#fff"
            transparent
            opacity={revealProgress * 0.95}
          />
        </mesh>
      )}

      {/* Label */}
      <Html
        position={labelPos}
        center
        {...htmlProps}
        style={{
          opacity: labelOpacity,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize,
            fontWeight: 600,
            letterSpacing,
            color: "rgba(255,255,255,0.85)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
};

export default React.memo(ConstellationNode);
