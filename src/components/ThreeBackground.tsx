import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

const ParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={theme === 'dark' ? '#a8dadc' : '#457b9d'}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const FloatingGeometry: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[1]) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.3, 1]} />
      <meshStandardMaterial
        color={theme === 'dark' ? '#457b9d' : '#1d3557'}
        transparent
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
};

const ThreeBackground: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={theme === 'dark' ? 0.3 : 0.5} />
        <pointLight position={[10, 10, 10]} intensity={theme === 'dark' ? 0.8 : 1} />
        <ParticleField />
        <FloatingGeometry position={[-2, 1, -2]} />
        <FloatingGeometry position={[2, -1, -1]} />
        <FloatingGeometry position={[0, 2, -3]} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;