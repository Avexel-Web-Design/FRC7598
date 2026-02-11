import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./constellationData";

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
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center) * 2.0;

    float pulse = 0.92 + 0.08 * sin(uTime * 2.0 + dist * 5.0);

    float core = smoothstep(0.45 * pulse, 0.0, dist);
    float glow = smoothstep(0.9, 0.15, dist) * 0.45;

    float alpha = (core + glow) * uOpacity;
    vec3 color = mix(uColor, vec3(1.0), core * 0.6);

    gl_FragColor = vec4(color, alpha);
  }
`;

// Altitude above globe surface for nodes
const NODE_ALTITUDE = 0.15;

const ConstellationNode = ({
  lat,
  lng,
  label,
  color = "#d3b840",
  size = 0.09,
  revealProgress = 0,
}) => {
  const meshRef = useRef();
  const groupRef = useRef();

  const position = useMemo(
    () => latLngToVector3(lat, lng, GLOBE_RADIUS, NODE_ALTITUDE),
    [lat, lng]
  );

  // Normal direction (pointing away from globe center) for label offset
  const normal = useMemo(() => position.clone().normalize(), [position]);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 0 },
      uTime: { value: 0 },
    }),
    [color]
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    uniforms.uTime.value = t;

    // Smoothly animate reveal
    uniforms.uOpacity.value = THREE.MathUtils.lerp(
      uniforms.uOpacity.value,
      revealProgress,
      0.08
    );

    if (groupRef.current) {
      const targetScale = revealProgress > 0.05 ? 1 : 0;
      const currentScale = groupRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.07);
      groupRef.current.scale.setScalar(newScale);
    }

    // Billboard: always face camera
    if (meshRef.current) {
      meshRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  const labelOpacity = Math.max(0, (revealProgress - 0.3) / 0.7);

  // Label position: offset along surface normal
  const labelPos = useMemo(
    () => [normal.x * 0.35, normal.y * 0.35, normal.z * 0.35],
    [normal]
  );

  return (
    <group ref={groupRef} position={position} scale={0}>
      {/* Glow sprite (billboard) */}
      <mesh ref={meshRef}>
        <planeGeometry args={[size * 3, size * 3]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Bright core dot */}
      <mesh>
        <sphereGeometry args={[size * 0.2, 12, 12]} />
        <meshBasicMaterial
          color="#fffef0"
          transparent
          opacity={revealProgress * 0.9}
          depthTest={false}
        />
      </mesh>

      {/* Label */}
      <Html
        position={labelPos}
        center
        distanceFactor={10}
        style={{
          opacity: labelOpacity,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "1px",
            color: "#fff",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            textShadow:
              "0 0 8px rgba(211, 184, 64, 0.5), 0 2px 6px rgba(0,0,0,0.9)",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
};

export default React.memo(ConstellationNode);
