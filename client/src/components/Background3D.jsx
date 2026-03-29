import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

// 1. The Particle Field
function StarField(props) {
  const ref = useRef();
  
  // Generating a sphere of points
  const sphere = random.inSphere(new Float32Array(3000), { radius: 3 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6" // neon purple for cyberpunk feel
          size={0.007}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// 2. The Interactive Cyberpunk Core
function CyberCore() {
  const groupRef = useRef();

  // Gentle mouse parallax effect on the core
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.3;

      // Mouse tracking parallax for the core
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (state.pointer.y * Math.PI) / 6;
      
      groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
      groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
    }
  });

  return (
    <Float 
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={1.5} // Up/down float intensity
    >
      <group ref={groupRef}>
        {/* Outer Wireframe Mesh - Cyberpunk Style */}
        <mesh>
           <torusKnotGeometry args={[0.9, 0.25, 256, 32]} />
           <MeshDistortMaterial 
             color="#1e1b4b" 
             emissive="#3b82f6" // Neon blue glow
             emissiveIntensity={1.5}
             distort={0.25} // Distortion intensity
             speed={2}  // Distort speed
             roughness={0.2}
             metalness={0.8}
             wireframe={true} // Cyberpunk grid feel
           />
        </mesh>

        {/* Inner solid glowing core */}
        <mesh scale={0.7}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#8b5cf6" // Neon purple solid
            emissive="#8b5cf6"
            emissiveIntensity={1.2}
            wireframe={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

// 3. Dynamic Camera mapping mouse position
function CameraRig() {
  useFrame((state) => {
    // Make the entire camera shift slightly based on mouse
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.8, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.8, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Background3D() {
  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        {/* Intense neon directional lighting */}
        <pointLight position={[5, 4, 5]} color="#3b82f6" intensity={30} distance={20} />
        <pointLight position={[-5, -4, -5]} color="#8b5cf6" intensity={30} distance={20} />
        
        <CameraRig />
        <CyberCore />
        <StarField />
      </Canvas>
    </div>
  );
}
