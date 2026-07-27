import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Spotlight } from './Spotlight';
import DoveStatic from './ui/DoveStatic';

// NOTE: gsap and ScrollTrigger used to be imported here purely to call
// registerPlugin — nothing in this file ever used them (the dove runs on a
// plain requestAnimationFrame loop). That pulled all of gsap into the hero
// island's bundle. The page's real gsap usage lives in index.astro's script.

interface DoveSceneProps {
  scrollProgress?: number;
}

export default function DoveScene({ scrollProgress = 0 }: DoveSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const doveRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Fall back to a static hero if WebGL is unavailable (blocked GPU, old device).
    try {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl') || probe.getContext('experimental-webgl');
      if (!gl) {
        setSupported(false);
        return;
      }
    } catch {
      setSupported(false);
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    // No opaque background: the canvas sits over BeamsBackground, and filling
    // it with black hid the beams entirely on desktop.
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3.5;
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setSupported(false);
      return;
    }
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    // Cap at 2 — rendering a shadowed WebGL scene at 3x on a high-DPI phone
    // triples the fragment work with no perceptible gain.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(8, 8, 6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Gold spotlight accent
    const spotLight = new THREE.PointLight(0xd4a574, 1.2);
    spotLight.position.set(-6, 4, 4);
    spotLight.distance = 20;
    scene.add(spotLight);

    // ---- Dove ---------------------------------------------------------
    // Rebuilt from the original scaled-sphere-plus-lathe-spindles model, which
    // rendered as a lumpy body with two ear-shaped blades. Now: a lathe-profile
    // body that tapers to the tail and swells at the breast, a real neck, and
    // flat extruded wings and tail feathers.
    const doveGroup = new THREE.Group();

    const plumage = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8, metalness: 0.03, roughness: 0.62,
    });
    const plumageThin = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8, metalness: 0.03, roughness: 0.6, side: THREE.DoubleSide,
    });

    // Body. Both ends close at r=0 — an open profile leaves a hole at the
    // breast and tail that renders as a black disc into the hollow shell.
    const bodyProfile = [
      [0.000, -1.12], [0.045, -1.02], [0.110, -0.86], [0.185, -0.64],
      [0.258, -0.38], [0.318, -0.10], [0.348, 0.18], [0.348, 0.42],
      [0.322, 0.64], [0.268, 0.84], [0.195, 0.99], [0.120, 1.09],
      [0.055, 1.15], [0.000, 1.18],
    ].map(([r, z]) => new THREE.Vector2(r, z));
    const body = new THREE.Mesh(new THREE.LatheGeometry(bodyProfile, 48), plumage);
    body.rotation.x = Math.PI / 2;   // lathe spins about Y; lay the axis along Z
    body.scale.set(1.0, 1.0, 1.08);
    body.castShadow = true; body.receiveShadow = true;
    doveGroup.add(body);

    // Neck — the old model had none, which is most of why it read as a snowman.
    const neckProfile = [
      [0.215, 0.00], [0.190, 0.09], [0.163, 0.19], [0.152, 0.29],
      [0.158, 0.38], [0.175, 0.46],
    ].map(([r, y]) => new THREE.Vector2(r, y));
    const neck = new THREE.Mesh(new THREE.LatheGeometry(neckProfile, 36), plumage);
    neck.position.set(0, 0.22, 0.92);
    neck.rotation.x = -0.46;
    neck.castShadow = true;
    doveGroup.add(neck);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.225, 40, 32), plumage);
    head.position.set(0, 0.60, 1.16);
    head.scale.set(1, 0.98, 1.12);
    head.castShadow = true;
    doveGroup.add(head);

    const beak = new THREE.Mesh(
      new THREE.ConeGeometry(0.052, 0.30, 18),
      new THREE.MeshStandardMaterial({ color: 0xd4a574, metalness: 0.25, roughness: 0.45 })
    );
    beak.position.set(0, 0.585, 1.42);
    beak.rotation.x = Math.PI / 2;
    beak.castShadow = true;
    doveGroup.add(beak);

    const eyeGeo = new THREE.SphereGeometry(0.032, 20, 16);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.5, roughness: 0.25 });
    for (const sx of [-1, 1]) {
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(sx * 0.150, 0.655, 1.27);
      doveGroup.add(eye);
    }

    // Wings: flat extruded aerofoils laid in the XZ plane. The previous
    // LatheGeometry wings were rotational solids — spindles, not aerofoils.
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0.48);
    wingShape.bezierCurveTo(0.52, 0.56, 1.02, 0.44, 1.42, 0.16);
    wingShape.bezierCurveTo(1.55, 0.07, 1.56, -0.05, 1.42, -0.11);
    wingShape.bezierCurveTo(1.02, -0.27, 0.62, -0.42, 0.22, -0.55);
    wingShape.bezierCurveTo(0.11, -0.58, 0.02, -0.57, 0, -0.48);
    wingShape.closePath();
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, {
      depth: 0.05, bevelEnabled: true, bevelThickness: 0.028,
      bevelSize: 0.032, bevelSegments: 3, curveSegments: 24,
    });
    wingGeo.translate(0, 0, -0.025);
    wingGeo.rotateX(Math.PI / 2);   // +PI/2 so the leading edge faces +Z

    const leftWing = new THREE.Mesh(wingGeo, plumageThin);
    leftWing.position.set(-0.24, 0.24, 0.16);
    leftWing.rotation.y = Math.PI;  // mirror to span out along -X
    leftWing.castShadow = true; leftWing.receiveShadow = true;
    doveGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo.clone(), plumageThin);
    rightWing.position.set(0.24, 0.24, 0.16);
    rightWing.castShadow = true; rightWing.receiveShadow = true;
    doveGroup.add(rightWing);

    // Tail: flat forked fan rather than a cone.
    const tailShape = new THREE.Shape();
    tailShape.moveTo(0, 0.17);
    tailShape.lineTo(-1.02, 0.44);
    tailShape.lineTo(-0.80, 0.02);
    tailShape.lineTo(-1.02, -0.44);
    tailShape.lineTo(0, -0.17);
    tailShape.closePath();
    const tailGeo = new THREE.ExtrudeGeometry(tailShape, {
      depth: 0.045, bevelEnabled: true, bevelThickness: 0.02,
      bevelSize: 0.025, bevelSegments: 2, curveSegments: 12,
    });
    tailGeo.rotateX(-Math.PI / 2);
    tailGeo.rotateY(-Math.PI / 2);  // -PI/2, else the fan points out the front
    const tail = new THREE.Mesh(tailGeo, plumageThin);
    tail.position.set(0, 0.02, -1.00);
    tail.rotation.x = -0.12;
    tail.castShadow = true; tail.receiveShadow = true;
    doveGroup.add(tail);

    doveGroup.position.set(0, 0, 0);
    doveGroup.rotation.z = 0.08;    // slight bank, so it reads as gliding
    scene.add(doveGroup);
    doveRef.current = doveGroup;

    // Animation loop
    const clock = new THREE.Clock();
    let scrollY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Idle animations
      if (doveRef.current) {
        // Gentle yaw around a three-quarter view rather than a full turntable
        // spin. A continuous spin drags the bird through head-on and tail-on
        // angles where the wings are edge-on and it reads as a blob.
        doveRef.current.rotation.y = 0.55 + Math.sin(time * 0.25) * 0.45;

        // Gentle breathing motion
        doveRef.current.position.y = Math.sin(time * 0.6) * 0.25;

        // Smooth wing flapping. Uses the wing meshes directly rather than
        // children[5]/[6] — that index lookup silently grabbed the wrong parts
        // as soon as the model gained a neck.
        const wingFlap = Math.sin(time * 2.5) * 0.30;
        leftWing.rotation.z = -wingFlap;
        rightWing.rotation.z = wingFlap;

        // Scroll-based interaction
        const scrollFactor = Math.min(scrollY / window.innerHeight, 1);
        doveRef.current.rotation.x = scrollFactor * Math.PI * 0.3;
        doveRef.current.position.z = scrollFactor * 1.5;

        // Lighting response to scroll
        directionalLight.intensity = 1 + scrollFactor * 0.3;
        spotLight.intensity = 1.2 + scrollFactor * 0.4;
      }

      // Subtle camera drift, biased above the bird so the wing surfaces read
      // rather than being seen edge-on from bird level.
      camera.position.x = Math.sin(time * 0.2) * 0.3;
      camera.position.y = 0.95 + Math.cos(time * 0.25) * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    // Run the render loop only while the hero is on screen. It used to keep
    // rendering the WebGL scene for the entire session, burning CPU/GPU while
    // the user was reading sections far below it.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (animationIdRef.current === null) animate();
        } else if (animationIdRef.current !== null) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
      },
      { threshold: 0 }
    );
    visibility.observe(containerRef.current);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      visibility.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* h-full, not h-screen: the hero now sizes this slot responsively and a
          hardcoded viewport height would overflow it. */}
      {supported ? (
        <div
          ref={containerRef}
          className="w-full h-full relative overflow-hidden"
          style={{ position: 'relative', overflow: 'hidden' }}
        />
      ) : (
        /* WebGL unavailable (blocked GPU, old device) — fall back to the same
           static dove mobile gets, rather than a bare glow. */
        <DoveStatic />
      )}
      {/* Spotlight overlay */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#d4a574"
      />
    </div>
  );
}
