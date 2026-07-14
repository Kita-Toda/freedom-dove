import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Spotlight } from './Spotlight';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
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

    // Create refined dove
    const doveGroup = new THREE.Group();

    // Body (larger, more refined)
    const bodyGeometry = new THREE.SphereGeometry(1.0, 64, 48);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      metalness: 0.05,
      roughness: 0.65,
      envMapIntensity: 0.5,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1, 0.85, 1.3); // Elongated body
    body.castShadow = true;
    body.receiveShadow = true;
    doveGroup.add(body);

    // Head (smaller, better proportioned)
    const headGeometry = new THREE.SphereGeometry(0.28, 64, 48);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      metalness: 0.08,
      roughness: 0.6,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 0.6, 1.1);
    head.castShadow = true;
    head.receiveShadow = true;
    doveGroup.add(head);

    // Beak
    const beakGeometry = new THREE.ConeGeometry(0.08, 0.4, 16);
    const beakMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4a574,
      metalness: 0.2,
      roughness: 0.5,
    });
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.set(0, 0.55, 1.35);
    beak.rotation.x = Math.PI / 2;
    beak.castShadow = true;
    doveGroup.add(beak);

    // Eyes (with shine)
    const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 24);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.6,
      roughness: 0.2,
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.12, 0.7, 1.25);
    leftEye.castShadow = true;
    doveGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.12, 0.7, 1.25);
    rightEye.castShadow = true;
    doveGroup.add(rightEye);

    // Refined wings with realistic bird wing geometry
    const wingMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      metalness: 0.02,
      roughness: 0.65,
      side: THREE.DoubleSide,
      flatShading: false,
    });

    // Realistic bird wing shape profile - tapering to a point
    const wingPoints = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.12, 0.15),
      new THREE.Vector2(0.28, 0.4),
      new THREE.Vector2(0.42, 0.7),
      new THREE.Vector2(0.48, 1.0),
      new THREE.Vector2(0.45, 1.3),
      new THREE.Vector2(0.38, 1.55),
      new THREE.Vector2(0.28, 1.75),
      new THREE.Vector2(0.15, 1.85),
      new THREE.Vector2(0.05, 1.9),
      new THREE.Vector2(0, 1.92),
    ];

    const leftWingGeometry = new THREE.LatheGeometry(wingPoints, 16);
    const leftWing = new THREE.Mesh(leftWingGeometry, wingMaterial);
    leftWing.position.set(-0.85, 0.15, -0.15);
    leftWing.scale.set(0.9, 1.1, 0.6);
    leftWing.rotation.z = 0.35;
    leftWing.rotation.y = 0.15;
    leftWing.castShadow = true;
    leftWing.receiveShadow = true;
    doveGroup.add(leftWing);

    const rightWingGeometry = new THREE.LatheGeometry(wingPoints, 16);
    const rightWing = new THREE.Mesh(rightWingGeometry, wingMaterial);
    rightWing.position.set(0.85, 0.15, -0.15);
    rightWing.scale.set(-0.9, 1.1, 0.6);
    rightWing.rotation.z = -0.35;
    rightWing.rotation.y = -0.15;
    rightWing.castShadow = true;
    rightWing.receiveShadow = true;
    doveGroup.add(rightWing);

    // Tail feathers
    const tailGeometry = new THREE.ConeGeometry(0.5, 1.2, 32);
    const tailMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      metalness: 0.04,
      roughness: 0.68,
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(0, -0.2, -1.3);
    tail.rotation.x = Math.PI / 2.2;
    tail.castShadow = true;
    tail.receiveShadow = true;
    doveGroup.add(tail);

    doveGroup.position.set(0, 0, 0);
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
        doveRef.current.rotation.y += 0.004;

        // Gentle breathing motion
        doveRef.current.position.y = Math.sin(time * 0.6) * 0.25;

        // Smooth wing flapping
        const leftWing = doveRef.current.children[5];
        const rightWing = doveRef.current.children[6];
        if (leftWing && rightWing) {
          const wingFlap = Math.sin(time * 2.5) * 0.25;
          leftWing.rotation.z = 0.4 + wingFlap;
          rightWing.rotation.z = -0.4 - wingFlap;
        }

        // Scroll-based interaction
        const scrollFactor = Math.min(scrollY / window.innerHeight, 1);
        doveRef.current.rotation.x = scrollFactor * Math.PI * 0.3;
        doveRef.current.position.z = scrollFactor * 1.5;

        // Lighting response to scroll
        directionalLight.intensity = 1 + scrollFactor * 0.3;
        spotLight.intensity = 1.2 + scrollFactor * 0.4;
      }

      // Subtle camera drift
      camera.position.x = Math.sin(time * 0.2) * 0.3;
      camera.position.y = Math.cos(time * 0.25) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

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
      <div
        ref={containerRef}
        className="w-full h-screen bg-gradient-to-b from-black to-charcoal relative overflow-hidden"
        style={{ position: 'relative', overflow: 'hidden' }}
      />
      {/* Spotlight overlay */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#d4a574"
      />
    </div>
  );
}
