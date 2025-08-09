import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

interface LibrarySceneProps {
  mousePosition: { x: number; y: number };
}

const LibraryScene: React.FC<LibrarySceneProps> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const wallsRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Parallax effect based on mouse movement
      groupRef.current.rotation.y = mousePosition.x * 0.1;
      groupRef.current.rotation.x = mousePosition.y * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dark wood background walls */}
      <group ref={wallsRef}>
        {/* Back wall */}
        <mesh position={[0, 0, -10]}>
          <planeGeometry args={[20, 12]} />
          <meshStandardMaterial color="#1C1410" /> {/* Ebony */}
        </mesh>
        
        {/* Left wall */}
        <mesh position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[20, 12]} />
          <meshStandardMaterial color="#2A1F18" /> {/* Darker ebony */}
        </mesh>
        
        {/* Right wall */}
        <mesh position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[20, 12]} />
          <meshStandardMaterial color="#2A1F18" />
        </mesh>
        
        {/* Floor */}
        <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#0B3B2B" /> {/* Emerald */}
        </mesh>
        
        {/* Ceiling */}
        <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1C1410" />
        </mesh>
      </group>

      {/* Golden dome/ceiling ornament */}
      <group position={[0, 5, 0]}>
        <Sphere args={[3, 32, 32]}>
          <meshStandardMaterial color="#D4A574" wireframe opacity={0.3} transparent />
        </Sphere>
        
        {/* Golden rings */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0, 0, 0]} rotation={[0, 0, (i * Math.PI) / 5]}>
            <ringGeometry args={[2 + i * 0.2, 2.1 + i * 0.2, 32]} />
            <meshStandardMaterial color="#D4A574" opacity={0.2} transparent />
          </mesh>
        ))}
      </group>

      {/* Golden ornaments on walls */}
      <group>
        {/* Back wall ornaments */}
        {[...Array(6)].map((_, i) => (
          <group key={i} position={[-8 + i * 3, 2, -9.9]}>
            <Box args={[0.1, 0.5, 0.1]}>
              <meshStandardMaterial color="#D4A574" />
            </Box>
            <Box args={[0.5, 0.1, 0.1]} position={[0, 0.3, 0]}>
              <meshStandardMaterial color="#D4A574" />
            </Box>
            <Box args={[0.5, 0.1, 0.1]} position={[0, -0.3, 0]}>
              <meshStandardMaterial color="#D4A574" />
            </Box>
          </group>
        ))}
      </group>

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} color="#D4A574" />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#D4A574" />
      <pointLight position={[5, 5, 0]} intensity={0.3} color="#D4A574" />
      <pointLight position={[-5, 5, 0]} intensity={0.3} color="#D4A574" />
    </group>
  );
};

export default LibraryScene; 