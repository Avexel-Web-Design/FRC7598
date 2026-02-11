import React, { useRef, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLOBE_RADIUS } from "./constellationData";

// ─────────────────────────────────────────────────────────────
// Atmosphere shader — soft Fresnel edge glow around the globe
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

const Globe = ({ rotationY = 0 }) => {
  const globeRef = useRef();

  // Load the NASA Blue Marble earth texture
  const earthTexture = useLoader(THREE.TextureLoader, "/textures/earth.jpg");

  // Configure texture for best quality
  useMemo(() => {
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = 8;
  }, [earthTexture]);

  const atmosphereUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#4a90d9") },
      uOpacity: { value: 0.5 },
    }),
    []
  );

  return (
    <group rotation={[0, rotationY, 0]}>
      {/* Main globe sphere with Earth texture */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Atmosphere glow (slightly larger sphere, back-face rendering) */}
      <mesh scale={1.08}>
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

      {/* Inner atmosphere — subtle blue-white Fresnel on front face */}
      <mesh scale={1.005}>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={{
            uColor: { value: new THREE.Color("#88bbee") },
            uOpacity: { value: 0.18 },
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
