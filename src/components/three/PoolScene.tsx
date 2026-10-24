"use client";

import { useMemo } from "react";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { Water } from "./Water";
import { CameraRig } from "./CameraRig";

interface PoolSceneProps {
  reducedMotion: boolean;
  isTouch: boolean;
  lowPower: boolean;
  active: boolean;
}

function Deck() {
  return (
    <mesh position={[0, -0.12, 0]} receiveShadow>
      <boxGeometry args={[22, 0.2, 16]} />
      <meshStandardMaterial color="#e7e2d8" roughness={0.9} metalness={0} />
    </mesh>
  );
}

function PoolCoping() {
  const shapePoints = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 7.1;
    const d = 4.1;
    shape.moveTo(-w, -d);
    shape.lineTo(w, -d);
    shape.lineTo(w, d);
    shape.lineTo(-w, d);
    shape.lineTo(-w, -d);

    const hole = new THREE.Path();
    const hw = 6.6;
    const hd = 3.8;
    hole.moveTo(-hw, -hd);
    hole.lineTo(hw, -hd);
    hole.lineTo(hw, hd);
    hole.lineTo(-hw, hd);
    hole.lineTo(-hw, -hd);
    shape.holes.push(hole);
    return shape;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow castShadow>
      <extrudeGeometry args={[shapePoints, { depth: 0.14, bevelEnabled: false }]} />
      <meshStandardMaterial color="#cfc3ad" roughness={0.75} />
    </mesh>
  );
}

function PoolBasin() {
  return (
    <mesh position={[0, -0.32, 0]}>
      <boxGeometry args={[13.2, 0.4, 7.6]} />
      <meshStandardMaterial color="#04142f" roughness={0.6} />
    </mesh>
  );
}

function HouseBackdrop() {
  return (
    <group position={[0, 0, -6.4]}>
      <mesh position={[-3.2, 1.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 3.2, 1]} />
        <meshStandardMaterial color="#f3f0e8" roughness={0.85} />
      </mesh>
      <mesh position={[1.6, 1.5, 0.05]}>
        <boxGeometry args={[3.6, 2.2, 0.05]} />
        <meshStandardMaterial
          color="#ffcf8f"
          emissive="#ffb066"
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 3.35, 0.9]} castShadow>
        <boxGeometry args={[9.4, 0.12, 2.4]} />
        <meshStandardMaterial color="#061b46" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Lounger({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.32, 0]} castShadow>
        <boxGeometry args={[0.7, 0.08, 1.9]} />
        <meshStandardMaterial color="#f8f8f6" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.55, -0.8]} rotation={[0.5, 0, 0]} castShadow>
        <boxGeometry args={[0.7, 0.06, 0.5]} />
        <meshStandardMaterial color="#f8f8f6" roughness={0.6} />
      </mesh>
      {[-0.28, 0.28].map((x) =>
        [-0.8, 0.8].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.14, z]}>
            <cylinderGeometry args={[0.025, 0.025, 0.28]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Palm({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 1.8, 6]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.9} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          castShadow
          position={[Math.cos((i / 5) * Math.PI * 2) * 0.15, 1.9, Math.sin((i / 5) * Math.PI * 2) * 0.15]}
          rotation={[0.7, (i / 5) * Math.PI * 2, 0]}
        >
          <coneGeometry args={[0.18, 1.1, 4]} />
          <meshStandardMaterial color="#1f4d3a" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export function PoolScene({ reducedMotion, isTouch, lowPower, active }: PoolSceneProps) {
  return (
    <>
      <CameraRig reducedMotion={reducedMotion} isTouch={isTouch} active={active} />

      <hemisphereLight args={["#bcd9ff", "#061b46", 0.55]} />
      <directionalLight
        position={[6, 7, 4]}
        intensity={2.2}
        color="#ffb877"
        castShadow={!lowPower}
        shadow-mapSize-width={lowPower ? 512 : 1024}
        shadow-mapSize-height={lowPower ? 512 : 1024}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/*
        Procedural environment built from local Lightformers — no remote HDRI
        fetch (avoids an external CDN dependency and its load-time cost on
        the hero's critical path), while still giving the water and glass
        realistic specular reflections.
      */}
      {!lowPower && (
        <Environment resolution={lowPower ? 32 : 64}>
          <Lightformer
            form="rect"
            intensity={2.2}
            color="#bcd9ff"
            position={[0, 8, 0]}
            scale={[14, 14, 1]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={3}
            color="#ffb877"
            position={[8, 4, 6]}
            scale={[6, 4, 1]}
            rotation={[0, -Math.PI / 3, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1.2}
            color="#063e91"
            position={[-8, 2, -4]}
            scale={[8, 6, 1]}
            rotation={[0, Math.PI / 3, 0]}
          />
        </Environment>
      )}

      <Deck />
      <PoolBasin />
      <PoolCoping />
      <Water active={active} segments={lowPower ? 32 : 64} />
      <HouseBackdrop />

      <Lounger position={[-4.6, 0, 3.6]} />
      <Lounger position={[-4.6, 0, 2.1]} />

      <Palm position={[6.6, 0, 3.4]} scale={1.1} />
      <Palm position={[7.4, 0, -1.2]} scale={0.9} />
      <Palm position={[-7.2, 0, -2.4]} scale={1} />

      <fog attach="fog" args={["#e9f1f7", 14, 28]} />
    </>
  );
}
