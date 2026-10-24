"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WaterProps {
  width?: number;
  depth?: number;
  segments?: number;
  active: boolean;
}

const WAVES = [
  { dirX: 1, dirY: 0.4, freq: 0.55, amp: 0.045, speed: 0.6 },
  { dirX: -0.6, dirY: 1, freq: 0.9, amp: 0.025, speed: 0.9 },
  { dirX: 0.3, dirY: -0.8, freq: 1.4, amp: 0.015, speed: 1.3 },
];

export function Water({ width = 13, depth = 7.5, segments = 64, active }: WaterProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const clock = useRef(0);

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(width, depth, segments, Math.round(segments * 0.6)),
    [width, depth, segments]
  );

  const basePositions = useMemo(
    () => (geometry.attributes.position as THREE.BufferAttribute).array.slice(),
    [geometry]
  );

  useFrame((_, delta) => {
    if (!active || !meshRef.current) return;
    clock.current += delta;

    const positionAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const normalAttr = meshRef.current.geometry.attributes.normal as THREE.BufferAttribute;
    const positions = positionAttr.array as Float32Array;
    const normals = normalAttr.array as Float32Array;

    // Height (z) and its analytic partial derivatives are computed directly
    // from the wave sum, which gives correct-looking lighting far cheaper
    // than geometry.computeVertexNormals() (an O(triangles) pass over every
    // face every frame).
    for (let i = 0; i < positions.length; i += 3) {
      const x = basePositions[i];
      const y = basePositions[i + 1];
      let z = 0;
      let dzdx = 0;
      let dzdy = 0;
      for (const wave of WAVES) {
        const phase = x * wave.freq * wave.dirX + y * wave.freq * wave.dirY + clock.current * wave.speed;
        z += Math.sin(phase) * wave.amp;
        const slope = Math.cos(phase) * wave.amp * wave.freq;
        dzdx += slope * wave.dirX;
        dzdy += slope * wave.dirY;
      }
      positions[i + 2] = z;

      const nx = -dzdx;
      const ny = -dzdy;
      const nz = 1;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      normals[i] = nx / len;
      normals[i + 1] = ny / len;
      normals[i + 2] = nz / len;
    }

    positionAttr.needsUpdate = true;
    normalAttr.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshPhysicalMaterial
        color="#00c8f8"
        roughness={0.12}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.55}
        thickness={1.4}
        ior={1.33}
        envMapIntensity={1.4}
        attenuationColor="#063e91"
        attenuationDistance={2.5}
      />
    </mesh>
  );
}
