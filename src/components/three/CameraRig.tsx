"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CameraRigProps {
  reducedMotion: boolean;
  isTouch: boolean;
  active: boolean;
}

const REST_POSITION = new THREE.Vector3(0, 2.1, 7.2);
const LOOK_TARGET = new THREE.Vector3(0, 0.4, 0);

// How far the camera pulls back/up, and how far the look target drops, by
// the time the hero section has fully scrolled past — gives the pool a
// sense of depth opening up as the visitor scrolls, instead of the 3D scene
// just sitting static behind the content.
const SCROLL_PULLBACK_Z = 2.4;
const SCROLL_RISE_Y = 1.4;
const SCROLL_LOOK_DROP = 0.6;

export function CameraRig({ reducedMotion, isTouch, active }: CameraRigProps) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const introStarted = useRef(false);
  const introPlaying = useRef(!reducedMotion);
  const elapsed = useRef(0);
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (introStarted.current) return;
    introStarted.current = true;

    if (reducedMotion) {
      camera.position.copy(REST_POSITION);
      camera.lookAt(LOOK_TARGET);
      return;
    }

    camera.position.set(0, 5.2, 13.5);
    camera.lookAt(LOOK_TARGET);

    const state = { ...camera.position };
    gsap.to(state, {
      x: REST_POSITION.x,
      y: REST_POSITION.y,
      z: REST_POSITION.z,
      duration: 2.6,
      delay: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        camera.position.set(state.x, state.y, state.z);
        camera.lookAt(LOOK_TARGET);
      },
      onComplete: () => {
        introPlaying.current = false;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isTouch, reducedMotion]);

  // Scroll-linked camera depth: as the hero section scrolls past, the
  // camera eases back and up while the look target dips, in sync with
  // scroll position (scrub: true ties progress directly to scroll offset,
  // not to time) rather than a simple opacity/translate parallax.
  useEffect(() => {
    if (reducedMotion) return;

    const heroSection = document.getElementById("inicio");
    if (!heroSection) return;

    const trigger = ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  useFrame((_, delta) => {
    if (!active || reducedMotion || introPlaying.current) return;
    elapsed.current += delta;

    let offsetX = 0;
    let offsetY = 0;

    if (isTouch) {
      offsetX = Math.sin(elapsed.current * 0.18) * 0.22;
      offsetY = Math.cos(elapsed.current * 0.14) * 0.05;
    } else {
      offsetX = pointer.current.x * 0.35;
      offsetY = pointer.current.y * -0.18;
    }

    const progress = scrollProgress.current;
    const targetX = REST_POSITION.x + offsetX;
    const targetY = REST_POSITION.y + offsetY + progress * SCROLL_RISE_Y;
    const targetZ = REST_POSITION.z + progress * SCROLL_PULLBACK_Z;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.2, delta);

    const lookY = LOOK_TARGET.y - progress * SCROLL_LOOK_DROP;
    camera.lookAt(LOOK_TARGET.x, lookY, LOOK_TARGET.z);
  });

  return null;
}
