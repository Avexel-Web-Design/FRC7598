import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./constellationData";

// Build a 5-pointed star Shape
function createStarShape(outerRadius = 1, innerRadius = 0.4, points = 5) {
  const shape = new THREE.Shape();
  const step = Math.PI / points;

  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step - Math.PI / 2;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  return shape;
}

// Glow shader for the brightening aura during final zoom
const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  uniform float uOpacity;
  uniform float uBrightness;
  uniform vec3 uColorInner;
  uniform vec3 uColorOuter;
  varying vec2 vUv;

  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center) * 2.0;

    float core = smoothstep(0.5, 0.0, dist);
    float glow = smoothstep(1.0, 0.1, dist) * 0.4;

    vec3 color = mix(uColorOuter, uColorInner, core);
    color = mix(color, vec3(1.0), uBrightness * 0.8);
    float alpha = (core + glow) * uOpacity;
    alpha *= smoothstep(1.0, 0.5, dist);

    gl_FragColor = vec4(color, alpha);
  }
`;

const CENTRAL_ALTITUDE = 0.02;

const CentralStar = ({ phaseInfo = { phase: 0, miZoom: 0, globeZoom: 0, finalZoom: 0 } }) => {
  const starRef = useRef();
  const glowRef = useRef();

  const basePosition = useMemo(
    () => latLngToVector3(42.5248, -83.5363, GLOBE_RADIUS, CENTRAL_ALTITUDE),
    []
  );

  const starShape = useMemo(() => createStarShape(1, 0.42, 5), []);

  const glowUniforms = useMemo(
    () => ({
      uColorInner: { value: new THREE.Color("#fffbe6") },
      uColorOuter: { value: new THREE.Color("#d3b840") },
      uOpacity: { value: 0 },
      uBrightness: { value: 0 },
    }),
    []
  );

  // Scale: tiny at Michigan close-up, grows at globe view
  const sizeFactor = 0.04 + 0.96 * phaseInfo.globeZoom;
  const starScale = sizeFactor * 0.06;

  // During final zoom, the camera zooms INTO the star — no scale change needed.
  // Just shift color toward white as it gets brighter (delayed to last 50%).
  const finalZoom = phaseInfo.finalZoom || 0;
  const brighten = Math.max(0, (finalZoom - 0.5) / 0.5);
  const starColor = brighten > 0
    ? new THREE.Color("#d4a843").lerp(new THREE.Color("#ffffff"), brighten)
    : new THREE.Color("#d4a843");

  // Glow: appears late in final zoom to add a brightening aura
  const glowScale = starScale * 5;
  const glowOpacity = Math.max(0, (finalZoom - 0.5) / 0.5);

  // Billboard: always face the camera
  useFrame((state) => {
    if (starRef.current) {
      starRef.current.quaternion.copy(state.camera.quaternion);
    }
    if (glowRef.current) {
      glowRef.current.quaternion.copy(state.camera.quaternion);
      glowUniforms.uOpacity.value = glowOpacity;
      glowUniforms.uBrightness.value = finalZoom;
    }
  });

  return (
    <group position={basePosition}>
      {/* Star shape — constant size, camera zooms into it */}
      <mesh ref={starRef} scale={starScale}>
        <shapeGeometry args={[starShape]} />
        <meshBasicMaterial
          color={starColor}
          side={THREE.DoubleSide}
          depthWrite={false}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Brightening glow during final zoom */}
      {finalZoom > 0 && (
        <mesh ref={glowRef} scale={glowScale}>
          <planeGeometry args={[1, 1]} />
          <shaderMaterial
            vertexShader={glowVertexShader}
            fragmentShader={glowFragmentShader}
            uniforms={glowUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
};

export default CentralStar;
