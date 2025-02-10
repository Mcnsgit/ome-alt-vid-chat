/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useState, useMemo } from 'react';
import * as THREE from 'three';

const MaterialSphere = ({ hovered }) => {
  const color = useMemo(() => new THREE.Color("#00F5D4"), []);
  const emissive = useMemo(() => new THREE.Color("#00F5D4"), []);

  return (
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial
        color={color}
        emissiveIntensity={hovered ? 0.8 : 0.5}
        emissive={emissive}
        metalness={0.2}
        roughness={0.1}
      />
    </Sphere>
  );
};

const Avatar3D = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="h-96 w-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ height: '300px' }}
      >
        <ambientLight args={[0x404040]} intensity={0.5} />
        <pointLight args={[0xffffff]} position={[10, 10, 10]} />
        <MaterialSphere hovered={hovered} />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;