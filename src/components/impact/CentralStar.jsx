import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./constellationData";

// Glow shader for the central star — billboard sprite that always faces camera
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

    float pulse = 0.95 + 0.05 * sin(uTime * 1.5);

    float core = smoothstep(0.5 * pulse, 0.0, dist);
    float inner = smoothstep(0.8, 0.1, dist) * 0.6;
    float outer = smoothstep(1.0, 0.3, dist) * 0.25;

    vec3 color = mix(uColorOuter, uColorInner, core);
    float alpha = (core + inner + outer) * uOpacity;

    float shimmer = 0.02 * sin(uTime * 3.0 + dist * 10.0);
    color += shimmer;

    gl_FragColor = vec4(color, alpha);
  }
`;

// Altitude above globe surface for the central star
const CENTRAL_ALTITUDE = 0.18;

const CentralStar = ({ animationProgress = 0, globeRotationY = 0 }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const haloRef = useRef();

  // Position on globe surface: Wixom, MI
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
    const t = state.clock.getElapsedTime();
    uniforms.uTime.value = t;

    if (meshRef.current) {
      // Always face the camera (billboard)
      meshRef.current.quaternion.copy(state.camera.quaternion);
      const breathe = 1.0 + 0.06 * Math.sin(t * 1.2);
      meshRef.current.scale.setScalar(breathe);
    }

    // Billboard the outer halo too
    if (haloRef.current) {
      haloRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  const labelOpacity = Math.min(1, animationProgress * 4);

  return (
    <group ref={groupRef} position={basePosition}>
      {/* Outer purple halo — billboard */}
      <mesh ref={haloRef}>
        <planeGeometry args={[0.7, 0.7]} />
        <shaderMaterial
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={{
            uColorInner: { value: new THREE.Color("#8b5cf6") },
            uColorOuter: { value: new THREE.Color("#471a67") },
            uOpacity: { value: 0.5 },
            uTime: uniforms.uTime,
          }}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main gold glow — billboard */}
      <mesh ref={meshRef}>
        <planeGeometry args={[0.5, 0.5]} />
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

      {/* Bright core */}
      <mesh>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial
          color="#fffef0"
          transparent
          opacity={0.95}
          depthTest={false}
        />
      </mesh>

      {/* Label */}
      <Html
        position={[0, -0.45, 0]}
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
              fontSize: "20px",
              fontWeight: 800,
              letterSpacing: "4px",
              background:
                "linear-gradient(135deg, #d3b840 0%, #fffbe6 50%, #d3b840 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 12px rgba(211, 184, 64, 0.6))",
            }}
          >
            SCA
          </div>
          <div
            style={{
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "3px",
              color: "rgba(211, 184, 64, 0.7)",
              marginTop: "3px",
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
