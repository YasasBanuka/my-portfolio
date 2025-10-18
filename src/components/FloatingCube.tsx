'use client';

import { Canvas } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function Cube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.3}
        emissive="#6366f1"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function FloatingSpheres() {
  const sphere1Ref = useRef<Mesh>(null);
  const sphere2Ref = useRef<Mesh>(null);
  const sphere3Ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 3;
      sphere1Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 2;
      sphere1Ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      sphere1Ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.2) * -4;
      sphere2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 3;
      sphere2Ref.current.rotation.x = state.clock.elapsedTime * -0.4;
      sphere2Ref.current.rotation.y = state.clock.elapsedTime * 0.6;
    }
    if (sphere3Ref.current) {
      sphere3Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.4) * 5;
      sphere3Ref.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * -3;
      sphere3Ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      sphere3Ref.current.rotation.z = state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <>
      <Sphere ref={sphere1Ref} args={[0.5, 32, 32]} position={[0, 0, -8]}>
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Sphere ref={sphere2Ref} args={[0.3, 32, 32]} position={[0, 0, -6]}>
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.5}
          emissive="#06b6d4"
          emissiveIntensity={0.2}
        />
      </Sphere>
      <Sphere ref={sphere3Ref} args={[0.4, 32, 32]} position={[0, 0, -7]}>
        <meshStandardMaterial
          color="#f59e0b"
          transparent
          opacity={0.3}
          emissive="#f59e0b"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      <Cube />
      <FloatingSpheres />
    </>
  );
}

const FloatingCube = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  );
};

export default FloatingCube;

