import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ThreeDBook from './ThreeDBook';
import LibraryScene from './LibraryScene';

// წიგნების მონაცემები
const books = [
  {
    id: 'ilia',
    title: 'ილია ჭავჭავაძე',
    subtitle: 'თერგდალეულების ხელმძღვანელი',
    color: '#0B3B2B', // ღრმა მწვანე
    accentColor: '#D4A574',
    era: 'XIX-XX საუკუნე',
    category: 'reformer'
  },
  {
    id: 'vazha',
    title: 'ვაჟა ფშაველა',
    subtitle: 'ქართული პოეზიის კლასიკოსი',
    color: '#8B7355', // რუხი ქვის ფერი
    accentColor: '#D4A574',
    era: 'XIX-XX საუკუნე',
    category: 'artist'
  },
  {
    id: 'niko',
    title: 'ნიკო ნიკოლაძე',
    subtitle: 'ქართული მეცნიერების ფუნდატორი',
    color: '#A0522D', // ღია ყავისფერი
    accentColor: '#D4A574',
    era: 'XIX-XX საუკუნე',
    category: 'scholar'
  },
  {
    id: 'shota',
    title: 'შოთა რუსთაველი',
    subtitle: 'ვეფხისტყაოსნის ავტორი',
    color: '#8B0000', // ალუბლისფერი
    accentColor: '#D4A574',
    era: 'XII საუკუნე',
    category: 'artist'
  },
  {
    id: 'david',
    title: 'დავით აღმაშენებელი',
    subtitle: 'საქართველოს უდიდესი მეფე',
    color: '#1E3A8A', // მუქი ლურჯი
    accentColor: '#D4A574',
    era: 'XI-XII საუკუნე',
    category: 'ruler'
  },
  {
    id: 'akaki',
    title: 'აკაკი წერეთელი',
    subtitle: 'სულიკოს ავტორი',
    color: '#3B82F6', // ღია ლურჯი
    accentColor: '#D4A574',
    era: 'XIX-XX საუკუნე',
    category: 'artist'
  }
];

interface ThreeDBookShelfProps {
  onBookSelect: (bookId: string) => void;
}

const ThreeDBookShelf: React.FC<ThreeDBookShelfProps> = ({ onBookSelect }) => {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    
    setMousePosition({
      x: (clientX / innerWidth) * 2 - 1,
      y: -(clientY / innerHeight) * 2 + 1
    });
  };

  const handleBookClick = (bookId: string) => {
    onBookSelect(bookId);
  };

  return (
    <div 
      className="h-screen w-full bg-gradient-to-br from-ebony-950 via-ebony-900 to-ebony-800"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Library scene with parallax effect */}
        <LibraryScene mousePosition={mousePosition} />
        
        {/* Bookshelf */}
        <group position={[0, -1, 0]}>
          {/* Shelf base */}
          <mesh position={[0, -1.5, 0]}>
            <boxGeometry args={[20, 0.5, 2]} />
            <meshStandardMaterial color="#1C1410" />
          </mesh>
          
          {/* Books */}
          {books.map((book, index) => (
            <ThreeDBook
              key={book.id}
              book={book}
              index={index}
              isHovered={hoveredBook === book.id}
              onClick={() => handleBookClick(book.id)}
            />
          ))}
        </group>

        {/* Lighting */}
        <ambientLight intensity={0.4} color="#D4A574" />
        <pointLight position={[0, 5, 5]} intensity={0.6} color="#D4A574" />
        <pointLight position={[5, 5, 0]} intensity={0.4} color="#D4A574" />
        <pointLight position={[-5, 5, 0]} intensity={0.4} color="#D4A574" />
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 right-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gold-500 mb-6 font-georgian">
            ქრონიკების ბიბლიოთეკა
          </h1>
          <p className="text-xl md:text-2xl text-cream-300 max-w-3xl mx-auto font-georgian">
            აირჩიეთ წიგნი და დაიწყეთ საუბარი ისტორიულ მოღვაწეებთან
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThreeDBookShelf; 