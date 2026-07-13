import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xd4a574, 0.5);
    pointLight.position.set(-5, 3, 3);
    scene.add(pointLight);

    // Create dove (simplified geometry)
    const doveGroup = new THREE.Group();

    // Body
    const bodyGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      metalness: 0.1,
      roughness: 0.6,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    doveGroup.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      metalness: 0.1,
      roughness: 0.6,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 0.5, 0.8);
    head.castShadow = true;
    head.receiveShadow = true;
    doveGroup.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.3,
      roughness: 0.3,
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 0.65, 1.1);
    leftEye.castShadow = true;
    doveGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 0.65, 1.1);
    rightEye.castShadow = true;
    doveGroup.add(rightEye);

    // Wings
    const wingGeometry = new THREE.BoxGeometry(0.3, 1.2, 2.2);
    const wingMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      metalness: 0.08,
      roughness: 0.7,
    });

    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-0.8, 0, 0);
    leftWing.castShadow = true;
    leftWing.receiveShadow = true;
    leftWing.rotation.z = 0.3;
    doveGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0.8, 0, 0);
    rightWing.castShadow = true;
    rightWing.receiveShadow = true;
    rightWing.rotation.z = -0.3;
    doveGroup.add(rightWing);

    // Tail
    const tailGeometry = new THREE.ConeGeometry(0.4, 0.8, 16);
    const tailMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f1e8,
      metalness: 0.1,
      roughness: 0.7,
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(0, 0, -1.2);
    tail.rotation.x = Math.PI / 2;
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

      // Idle breathing animation
      if (doveRef.current) {
        doveRef.current.rotation.y += 0.005;

        // Subtle up/down bob
        doveRef.current.position.y = Math.sin(time * 0.8) * 0.3;

        // Wing flutter
        const leftWing = doveRef.current.children[3];
        const rightWing = doveRef.current.children[4];
        if (leftWing && rightWing) {
          leftWing.rotation.z = 0.3 + Math.sin(time * 4) * 0.2;
          rightWing.rotation.z = -0.3 + Math.sin(time * 4 + Math.PI) * 0.2;
        }

        // Scroll-based rotation
        const scrollFactor = Math.min(scrollY / window.innerHeight, 1);
        doveRef.current.rotation.x = scrollFactor * Math.PI * 0.5;

        // Glow based on scroll
        directionalLight.intensity = 0.8 + scrollFactor * 0.4;
        pointLight.intensity = 0.5 + scrollFactor * 0.5;
      }

      // Camera slight pan
      camera.position.x = Math.sin(time * 0.3) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
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
    <div
      ref={containerRef}
      className="w-full h-screen bg-gradient-to-b from-black to-charcoal relative"
      style={{ position: 'relative', overflow: 'hidden' }}
    />
  );
}
