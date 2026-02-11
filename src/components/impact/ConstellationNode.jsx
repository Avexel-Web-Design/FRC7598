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

const NODE_ALTITUDE = 0.1;

const ConstellationNode = ({
  lat,
  lng,
  label,
  color = "#d3b840",
  size = 0.07,
  revealProgress = 0,
}) => {
  const meshRef = useRef();
  const groupRef = useRef();

  const position = useMemo(
    () => latLngToVector3(lat, lng, GLOBE_RADIUS, NODE_ALTITUDE),
    [lat, lng]
  );

  const normal = useMemo(() => position.clone().normalize(), [position]);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 0 },
    }),
    [color]
  );

  useFrame((state) => {
    // Smooth reveal
    uniforms.uOpacity.value = THREE.MathUtils.lerp(
      uniforms.uOpacity.value,
      revealProgress,
      0.1
    );

    if (groupRef.current) {
      const targetScale = revealProgress > 0.05 ? 1 : 0;
      const currentScale = groupRef.current.scale.x;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(currentScale, targetScale, 0.08)
      );
    }

    // Billboard
    if (meshRef.current) {
      meshRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  const labelOpacity = Math.max(0, (revealProgress - 0.4) / 0.6);

  const labelPos = useMemo(
    () => [normal.x * 0.25, normal.y * 0.25, normal.z * 0.25],
    [normal]
  );

  return (
    <group ref={groupRef} position={position} scale={0}>
      {/* Clean glow sprite */}
      <mesh ref={meshRef}>
        <planeGeometry args={[size * 2.5, size * 2.5]} />
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
        <sphereGeometry args={[size * 0.18, 10, 10]} />
        <meshBasicMaterial
          color="#fff"
          transparent
          opacity={revealProgress * 0.95}
        />
      </mesh>

      {/* Label */}
      <Html
        position={labelPos}
        center
        distanceFactor={10}
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
            fontSize: "8px",
            fontWeight: 600,
            letterSpacing: "0.5px",
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
