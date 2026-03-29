import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function BotOS({ containerRef }) {
  const groupRef = useRef();
  const headRef = useRef();
  const antennaBulbRef = useRef();
  const antennaGroupRef = useRef();

  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  
  // Blink state
  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);

  // Idle Animation State
  const idleTimer = useRef(0);
  const idleOffset = useRef({ x: 0, y: 0 });

  // Gentle interaction state
  const [isHovered, setIsHovered] = useState(false);

  // Global pointer state tracks cursor relative to the robot's physical position
  const globalPointer = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      idleTimer.current = 0; // Reset idle tracker
      if (!containerRef.current) return;
      
      // Get the exact physical pixel location of the robot on the screen
      const rect = containerRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 2;
      
      // Calculate distance of mouse from the robot's face
      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // If the mouse is out of his vision range (e.g. over the apps on the left)
      // he loses interest and completely resets his posture forward.
      if (distance > 700) {
        globalPointer.current.x = 0;
        globalPointer.current.y = 0;
      } else {
        // Normalize the distance dynamically based on screen size so looking across the screen maxes out around -1 to 1
        globalPointer.current.x = (deltaX / window.innerWidth) * 2.5;
        globalPointer.current.y = -(deltaY / window.innerHeight) * 2.5; 
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    idleTimer.current += delta;
    
    // Complex Idle Animation (Looking around if abandoned)
    if (idleTimer.current > 3 && !isHovered) {
      // Robot starts looking around lazily
      idleOffset.current.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.6;
      idleOffset.current.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.4;
    } else {
      // Snap idle offsets back to 0 when user moves mouse or hovers
      idleOffset.current.x = THREE.MathUtils.lerp(idleOffset.current.x, 0, 0.1);
      idleOffset.current.y = THREE.MathUtils.lerp(idleOffset.current.y, 0, 0.1);
    }

    // Combine pointer with idle animations for a unified target
    const targetX = globalPointer.current.x + idleOffset.current.x; 
    const targetY = globalPointer.current.y + idleOffset.current.y;

    // 1. Mouse Tracking for the entire robot
    if (groupRef.current) {
      // Smooth body sway - Calibrated for natural real-world physics
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX * 1.5, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY * 1.5, 0.08);
      
      // Robot leans globally towards the target
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX * 0.6, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY * 0.6, 0.1);
    }
    
    // 2. Head specifically looks perfectly at the cursor
    if (headRef.current) {
      // Direct 1:1 mapping for the head rotation makes it hyper-accurate
      const headTargetX = targetX * 1.2;
      const headTargetY = targetY * 1.2;
      
      // Add slight idle breathing to the head when mouse isn't fully pulled
      const idleBreathingX = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      const idleBreathingY = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;

      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headTargetX + idleBreathingY, 0.15);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -headTargetY + idleBreathingX, 0.15);
      
      // If hovered, tilt head like a confused puppy
      const targetZ = isHovered ? Math.PI / 8 : 0;
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetZ, 0.1);

      // Eye shifting (eyes slide across the screen to track target precisely)
      if (leftEyeRef.current && rightEyeRef.current) {
         const eyeOffsetX = targetX * 0.15;
         const eyeOffsetY = targetY * 0.15;
         
         leftEyeRef.current.position.x = THREE.MathUtils.lerp(leftEyeRef.current.position.x, -0.35 + eyeOffsetX, 0.2);
         leftEyeRef.current.position.y = THREE.MathUtils.lerp(leftEyeRef.current.position.y, 0.1 + eyeOffsetY, 0.2);
         
         rightEyeRef.current.position.x = THREE.MathUtils.lerp(rightEyeRef.current.position.x, 0.35 + eyeOffsetX, 0.2);
         rightEyeRef.current.position.y = THREE.MathUtils.lerp(rightEyeRef.current.position.y, 0.1 + eyeOffsetY, 0.2);
      }
    }

    // 3. Spontaneous Blinking & Dog Petting Logic
    blinkTimer.current += delta;
    if (!isBlinking.current && blinkTimer.current > 3 && Math.random() > 0.98) {
       isBlinking.current = true;
       blinkTimer.current = 0;
    }
    
    // If hovered, he gets extremely happy and acts like a petted dog!
    if (isHovered) {
      // Pant/bounce from joy
      headRef.current.position.y = 1.2 + Math.abs(Math.sin(state.clock.elapsedTime * 15)) * 0.08;
      
      // Wag antenna rapidly like a tail
      if (antennaGroupRef.current) {
         antennaGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 25) * 0.25;
      }

      // Happy slanted dog eyes ^ ^ 
      if (leftEyeRef.current && rightEyeRef.current) {
         // Slant them outwards / \ and squish them to look like happy squints
         leftEyeRef.current.rotation.z = THREE.MathUtils.lerp(leftEyeRef.current.rotation.z, -Math.PI / 5, 0.2);
         rightEyeRef.current.rotation.z = THREE.MathUtils.lerp(rightEyeRef.current.rotation.z, Math.PI / 5, 0.2);
         
         // Squish scale for the "squint"
         leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, 0.4, 0.2);
         rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, 0.4, 0.2);
      }
    } else {
      // Return to calm neutral positions
      headRef.current.position.y = THREE.MathUtils.lerp(headRef.current.position.y, 1.2, 0.1);
      
      if (antennaGroupRef.current) {
         antennaGroupRef.current.rotation.z = THREE.MathUtils.lerp(antennaGroupRef.current.rotation.z, 0, 0.1);
      }

      // Restore eyes upright and full scale
      if (leftEyeRef.current && rightEyeRef.current) {
         leftEyeRef.current.rotation.z = THREE.MathUtils.lerp(leftEyeRef.current.rotation.z, 0, 0.2);
         rightEyeRef.current.rotation.z = THREE.MathUtils.lerp(rightEyeRef.current.rotation.z, 0, 0.2);
         
         if (!isBlinking.current) {
            leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, 1, 0.2);
            rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, 1, 0.2);
         }
      }
    }

    // Handle vertical squish scale for blinking (only if not doing the happy squint)
    if (isBlinking.current && leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, 0.05, 0.4);
        rightEyeRef.current.scale.y = leftEyeRef.current.scale.y;
        
        // Snap eyes back open
        if (leftEyeRef.current.scale.y < 0.1) {
           isBlinking.current = false;
        }
    }

    // 4. Antenna bulb pulsating
    if (antennaBulbRef.current) {
       antennaBulbRef.current.material.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 4);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.8}>
      <group 
        ref={groupRef} 
        onPointerOver={() => setIsHovered(true)} 
        onPointerOut={() => setIsHovered(false)}
      >
        
        {/* === HEAD GROUP === */}
        {/* Raised the head slightly to fit the new body */}
        <group ref={headRef} position={[0, 1.2, 0]}>
          
          {/* Main Casing */}
          <RoundedBox args={[1.8, 1.4, 1.4]} radius={0.2} smoothness={4}>
            <meshPhysicalMaterial 
              color="#e2e8f0" 
              metalness={0.2} 
              roughness={0.1} 
              clearcoat={1} 
              clearcoatRoughness={0.1}
            />
          </RoundedBox>

          {/* Screen Bezel (Dark Gray inner rim protruding slightly) */}
          <RoundedBox args={[1.65, 1.25, 0.1]} radius={0.05} smoothness={4} position={[0, 0, 0.72]}>
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </RoundedBox>

          {/* Black Glass Screen */}
          <RoundedBox args={[1.5, 1.1, 0.05]} radius={0.05} smoothness={4} position={[0, 0, 0.76]}>
             <meshPhysicalMaterial 
               color="#0f172a" 
               metalness={0.8} 
               roughness={0.1} 
               ior={1.8}
             />
          </RoundedBox>

          {/* Left Eye */}
          <mesh ref={leftEyeRef} position={[-0.35, 0.1, 0.81]}>
            <capsuleGeometry args={[0.08, 0.2, 8, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={isHovered ? 5 : 2} />
          </mesh>

          {/* Right Eye */}
          <mesh ref={rightEyeRef} position={[0.35, 0.1, 0.81]}>
            <capsuleGeometry args={[0.08, 0.2, 8, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={isHovered ? 5 : 2} />
          </mesh>

          {/* Blush (Cheeks) */}
          {isHovered && (
             <>
               <mesh position={[-0.6, -0.2, 0.8]}>
                  <circleGeometry args={[0.15, 32]} />
                  <meshBasicMaterial color="#fb7185" transparent opacity={0.6} />
               </mesh>
               <mesh position={[0.6, -0.2, 0.8]}>
                  <circleGeometry args={[0.15, 32]} />
                  <meshBasicMaterial color="#fb7185" transparent opacity={0.6} />
               </mesh>
             </>
          )}

          {/* === ANTENNA === */}
          <group ref={antennaGroupRef} position={[0, 0.7, 0]}>
            {/* Base */}
            <mesh position={[0, 0.05, 0]}>
               <cylinderGeometry args={[0.2, 0.25, 0.1, 16]} />
               <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Stem */}
            <mesh position={[0, 0.35, 0]}>
               <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
               <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Glowing Bulb */}
            <mesh ref={antennaBulbRef} position={[0, 0.7, 0]}>
               <sphereGeometry args={[0.15, 16, 16]} />
               <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
            </mesh>
          </group>

        </group>

        {/* === NEW DETAILED BODY === */}
        <group position={[0, -0.6, 0]}>
          
          {/* Neck joint connecting body and head */}
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.25, 0.35, 0.5, 32]} />
            <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
          </mesh>
          
          {/* Main Torso Block (Cute curved capsule body like Eve/Baymax) */}
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.85, 1.0, 32, 32]} />
            <meshPhysicalMaterial 
              color="#e2e8f0" 
              metalness={0.3} 
              roughness={0.2} 
              clearcoat={1} 
              clearcoatRoughness={0.1}
            />
          </mesh>

          {/* Cute Belly Screen or Logo Plate */}
          <mesh position={[0, 0.1, 0.83]}>
            <circleGeometry args={[0.35, 32]} />
            <meshPhysicalMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.1, 0.84]}>
            <circleGeometry args={[0.2, 32]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
          </mesh>

          {/* Hovering Left Arm */}
          <mesh position={[-1.2, 0.2, 0]} rotation={[0, 0, -Math.PI / 8]}>
            <capsuleGeometry args={[0.2, 0.6, 16, 16]} />
            <meshPhysicalMaterial color="#cbd5e1" metalness={0.4} roughness={0.2} clearcoat={1} />
          </mesh>

          {/* Hovering Right Arm */}
          <mesh position={[1.2, 0.2, 0]} rotation={[0, 0, Math.PI / 8]}>
            <capsuleGeometry args={[0.2, 0.6, 16, 16]} />
            <meshPhysicalMaterial color="#cbd5e1" metalness={0.4} roughness={0.2} clearcoat={1} />
          </mesh>

          {/* Robot Base/Pelvis joint */}
          <mesh position={[0, -1.0, 0]}>
            <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.5} />
          </mesh>

          {/* Under-glow thruster floating below him */}
          <mesh position={[0, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
             <torusGeometry args={[0.6, 0.08, 16, 64]} />
             <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={4} />
          </mesh>
        </group>

      </group>
    </Float>
  );
}

export default function AiMascot() {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="w-full h-full relative pointer-events-auto cursor-pointer">
      {/* Zoomed out camera slightly to accommodate larger body */}
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, 5, -5]} color="#38bdf8" intensity={20} distance={20} />
        
        <BotOS containerRef={containerRef} />
      </Canvas>
    </div>
  );
}
