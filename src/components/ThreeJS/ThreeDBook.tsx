import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Book {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  accentColor: string;
  era: string;
  category: string;
}

interface ThreeDBookProps {
  book: Book;
  index: number;
  isHovered: boolean;
  onClick: () => void;
}

const ThreeDBook: React.FC<ThreeDBookProps> = ({ book, index, isHovered, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      // Hover animation
      if (isHovered && !isAnimating) {
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 2, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0.2, 0.1);
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1));
      } else {
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
      }
    }
  });

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
  };

  // Book spine ornament based on category
  const getSpineOrnament = () => {
    switch (book.category) {
      case 'reformer':
        return (
          <group position={[0, 0, 0.11]}>
            <Box args={[0.8, 0.1, 0.01]}>
              <meshStandardMaterial color="#D4A574" />
            </Box>
            <Box args={[0.1, 0.8, 0.01]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#D4A574" />
            </Box>
          </group>
        );
      case 'artist':
        return (
          <group position={[0, 0, 0.11]}>
            <Box args={[0.6, 0.6, 0.01]} rotation={[0, 0, Math.PI / 4]}>
              <meshStandardMaterial color="#D4A574" />
            </Box>
          </group>
        );
      case 'scholar':
        return (
          <group position={[0, 0, 0.11]}>
            <Box args={[0.8, 0.6, 0.01]}>
              <meshStandardMaterial color="#D4A574" />
            </Box>
            <Box args={[0.1, 0.1, 0.01]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#D4A574" />
            </Box>
          </group>
        );
      case 'ruler':
        return (
          <group position={[0, 0, 0.11]}>
            <Box args={[0.6, 0.8, 0.01]} rotation={[0, 0, Math.PI / 4]}>
              <meshStandardMaterial color="#D4A574" />
            </Box>
          </group>
        );
      default:
        return null;
    }
  };

  return (
    <group position={[index * 2.5 - 6, 0, 0]}>
      {/* Main book cover */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = 'default';
        }}
      >
        <Box args={[1.5, 2, 0.2]}>
          <meshStandardMaterial 
            color={book.color}
            roughness={0.8}
            metalness={0.1}
          />
        </Box>
        
        {/* Book spine */}
        <Box args={[0.2, 2, 0.2]} position={[-0.65, 0, 0]}>
          <meshStandardMaterial 
            color={book.color}
            roughness={0.9}
            metalness={0.05}
          />
        </Box>
        
        {/* Book back */}
        <Box args={[1.5, 2, 0.2]} position={[0, 0, -0.2]}>
          <meshStandardMaterial 
            color={book.color}
            roughness={0.8}
            metalness={0.1}
          />
        </Box>
        
        {/* Spine ornament */}
        {getSpineOrnament()}
        
        {/* Golden border on cover */}
        <Box args={[1.6, 2.1, 0.01]} position={[0, 0, 0.11]}>
          <meshStandardMaterial 
            color="#D4A574"
            opacity={0.3}
            transparent
          />
        </Box>
      </mesh>

      {/* Book title (floating text) */}
      {isHovered && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.3}
          color="#D4A574"
          anchorX="center"
          anchorY="middle"
          font="/fonts/bpg-nino-mtavruli.woff2"
        >
          {book.title}
        </Text>
      )}

      {/* Hover glow effect */}
      {isHovered && (
        <mesh position={[0, 0, -0.5]}>
          <Box args={[2, 2.5, 0.1]}>
            <meshStandardMaterial 
              color="#D4A574"
              opacity={0.2}
              transparent
            />
          </Box>
        </mesh>
      )}
    </group>
  );
};

export default ThreeDBook; 