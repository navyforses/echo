import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { HistoricalFigure } from '../../data/historicalFigures';

interface BookCardProps {
  figure: HistoricalFigure;
  onClick: (figure: HistoricalFigure) => void;
  index: number;
}

const BookCard: React.FC<BookCardProps> = ({ figure, onClick, index }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const language = i18n.language as 'ka' | 'en';

  // Determine book color based on figure
  const getBookColor = (figureId: string) => {
    switch (figureId) {
      case 'ilia-chavchavadze':
        return '#2C5530'; // Deep forest green
      case 'vazha-pshavela':
        return '#B5A492'; // Weathered tan/beige
      case 'shota-rustaveli':
        return '#8B1A1A'; // Aged burgundy/maroon
      case 'niko-nikoladze':
        return '#C17A5E'; // Dusty terracotta
      default:
        return '#8B4513'; // Default brown
    }
  };

  // Determine book thickness based on figure
  const getBookThickness = (figureId: string) => {
    switch (figureId) {
      case 'ilia-chavchavadze':
        return 4; // Increased thickness for better proportions
      case 'vazha-pshavela':
        return 3.5;
      case 'shota-rustaveli':
        return 4.5;
      case 'niko-nikoladze':
        return 4;
      default:
        return 4;
    }
  };

  const bookColor = getBookColor(figure.id);
  const bookThickness = getBookThickness(figure.id);

  const handleBookClick = () => {
    // Navigate to vintage book page
    navigate(`/vintage-book/${figure.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        z: 20,
        rotateY: 5,
        transition: { duration: 0.2 }
      }}
      onClick={handleBookClick}
      className="cursor-pointer group relative"
      style={{
        width: `${bookThickness * 25}px`, // Increased width for better proportions
        height: '320px', // Increased height for better text spacing
        perspective: '1000px'
      }}
    >
      {/* Book spine with XIX century aged leather texture */}
      <div
        className="relative w-full h-full rounded-sm shadow-lg transform transition-all duration-300 group-hover:shadow-2xl book-spine"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(0,0,0,0.2) 0%, 
              transparent 20%, 
              rgba(255,255,255,0.08) 50%, 
              transparent 80%, 
              rgba(0,0,0,0.3) 100%
            ),
            linear-gradient(135deg, 
              ${bookColor} 0%, 
              ${bookColor}dd 50%, 
              ${bookColor}aa 100%
            ),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.15) 3px,
              rgba(0,0,0,0.15) 6px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.1) 10px,
              rgba(0,0,0,0.1) 12px
            )
          `,
          border: '1px solid rgba(139,69,19,0.3)',
          borderRadius: '4px'
        }}
      >
        {/* XIX century leather texture overlay */}
        <div 
          className="absolute inset-0 rounded-sm opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at top, transparent 40%, rgba(139,69,19,0.15) 100%),
              repeating-radial-gradient(
                circle at 20% 30%,
                transparent 0,
                transparent 3px,
                rgba(139,69,19,0.08) 3px,
                rgba(139,69,19,0.08) 6px
              ),
              radial-gradient(ellipse at bottom, rgba(0,0,0,0.1) 0%, transparent 60%)
            `,
            mixBlendMode: 'multiply'
          }}
        ></div>

        {/* XIX century gold lettering on spine - Improved positioning */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
          <div className="text-center w-full">
            {/* Decorative top element */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4A574]/60 to-transparent mb-4"></div>
            
            {/* Main title */}
            <h3 
              className="text-base font-bold mb-3 font-georgian book-title"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(212,165,116,0.4)',
                background: 'linear-gradient(45deg, #D4A574 0%, #B08D57 50%, #8B7355 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'brightness(1.2)',
                letterSpacing: '1px',
                lineHeight: '1.2',
                maxHeight: '180px',
                overflow: 'hidden',
                display: 'block',
                margin: '0 auto'
              }}
            >
              {figure.name[language]}
            </h3>
            
            {/* Middle decorative element */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B08D57]/40 to-transparent my-3"></div>
            
            {/* Date range */}
            <p 
              className="text-xs text-[#D4A574]/90 font-georgian"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                letterSpacing: '0.5px',
                lineHeight: '1.1',
                margin: '0 auto',
                display: 'block'
              }}
            >
              {figure.birthYear} - {figure.deathYear}
            </p>
            
            {/* Bottom decorative element */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4A574]/40 to-transparent mt-4"></div>
          </div>
        </div>

        {/* XIX century book binding details */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-[#654321] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-[#654321] to-transparent"></div>
        
        {/* Decorative stitching - Adjusted positions */}
        <div className="absolute top-1/3 left-0 right-0 h-px bg-[#D4A574]/30"></div>
        <div className="absolute top-2/3 left-0 right-0 h-px bg-[#D4A574]/30"></div>
        
        {/* Corner wear */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-[#654321]/60 rounded-br-sm"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#654321]/60 rounded-bl-sm"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#654321]/60 rounded-tr-sm"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#654321]/60 rounded-tl-sm"></div>
      </div>

      {/* XIX century book glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse, rgba(212,165,116,0.2) 0%, transparent 70%)`,
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
          zIndex: -1
        }}
      ></div>

      {/* XIX century tooltip - Improved positioning */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-gradient-to-r from-[#1C1410] to-[#2A1810] text-[#D4A574] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.8)] border border-[#D4A574]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30"
        style={{
          fontFamily: i18n.language === 'ka' ? 'Noto Serif Georgian, serif' : 'Georgia, serif',
          letterSpacing: '1px',
          whiteSpace: 'nowrap',
          minWidth: '200px',
          textAlign: 'center'
        }}
      >
        <div className="text-sm font-bold mb-1">{figure.name[language]}</div>
        <div className="text-xs text-[#B08D57] mb-1">{figure.birthYear} - {figure.deathYear}</div>
        <div className="text-xs text-[#B08D57]/80">{figure.title[language]}</div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1C1410]"></div>
      </motion.div>
    </motion.div>
  );
};

export default BookCard; 