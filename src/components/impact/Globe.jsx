import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLOBE_RADIUS } from "./constellationData";

// ─────────────────────────────────────────────────────────────
// Atmosphere shader — gives the globe a soft edge glow
// ─────────────────────────────────────────────────────────────
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float fresnel = 1.0 - dot(viewDir, vNormal);
    fresnel = pow(fresnel, 3.0);

    gl_FragColor = vec4(uColor, fresnel * uOpacity);
  }
`;

// ─────────────────────────────────────────────────────────────
// Globe surface shader — dark with subtle grid/continent hints
// ─────────────────────────────────────────────────────────────
const globeVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const globeFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uEdgeColor;

  // Simple noise for surface texture
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float fresnel = 1.0 - dot(viewDir, vNormal);

    // Latitude/longitude grid lines (very subtle)
    float lat = vUv.y * 3.14159;
    float lng = vUv.x * 6.28318;

    float gridLat = smoothstep(0.015, 0.0, abs(fract(vUv.y * 18.0) - 0.5) - 0.48);
    float gridLng = smoothstep(0.015, 0.0, abs(fract(vUv.x * 36.0) - 0.5) - 0.48);
    float grid = max(gridLat, gridLng) * 0.08;

    // Noise-based "continent" hints
    float n = noise(vUv * 12.0) * 0.5 + noise(vUv * 24.0) * 0.25 + noise(vUv * 48.0) * 0.125;
    float landMask = smoothstep(0.45, 0.55, n);

    // Base color with land areas slightly brighter
    vec3 color = uBaseColor;
    color += landMask * 0.025;
    color += grid * vec3(0.3, 0.2, 0.5);

    // Edge glow
    float edgeGlow = pow(fresnel, 2.5) * 0.3;
    color = mix(color, uEdgeColor, edgeGlow);

    // Very subtle pulse
    float pulse = 0.98 + 0.02 * sin(uTime * 0.5);

    gl_FragColor = vec4(color * pulse, 1.0);
  }
`;

const Globe = ({ rotationY = 0 }) => {
  const globeRef = useRef();
  const atmosphereRef = useRef();

  const globeUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBaseColor: { value: new THREE.Color("#080416") },
      uEdgeColor: { value: new THREE.Color("#2a1545") },
    }),
    []
  );

  const atmosphereUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#6b3fa0") },
      uOpacity: { value: 0.6 },
    }),
    []
  );

  useFrame((state) => {
    globeUniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <group rotation={[0, rotationY, 0]}>
      {/* Main globe sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          vertexShader={globeVertexShader}
          fragmentShader={globeFragmentShader}
          uniforms={globeUniforms}
        />
      </mesh>

      {/* Atmosphere glow (slightly larger sphere, back-face rendering) */}
      <mesh ref={atmosphereRef} scale={1.12}>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={atmosphereUniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner atmosphere (front-face, subtler) */}
      <mesh scale={1.01}>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={{
            uColor: { value: new THREE.Color("#471a67") },
            uOpacity: { value: 0.25 },
          }}
          transparent
          side={THREE.FrontSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default Globe;
