import React from 'react';
import { motion } from 'framer-motion';
import { HistoricalFigure } from '../../data/historicalFigures';

// Props interface for the component
interface HistoricalFigureCardProps {
  figure: HistoricalFigure;
  onClick?: (figure: HistoricalFigure) => void;
  className?: string;
  language?: 'ka' | 'en';
}

/**
 * HistoricalFigureCard - A reusable card component for displaying historical figures
 * Features hover animations and responsive design using the Echo color scheme
 */
const HistoricalFigureCard: React.FC<HistoricalFigureCardProps> = ({
  figure,
  onClick,
  className = '',
  language = 'ka'
}) => {
  // Animation variants for smooth hover effects
  const cardVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(114, 47, 55, 0.3)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3 } }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(figure);
    }
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-lg bg-dark-800 
        cursor-pointer transition-all duration-300
        border border-gold-600/20 hover:border-gold-500
        shadow-golden hover:shadow-golden-glow
        ${className}
      `}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${figure.name[language]}, ${figure.title[language]}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Image container with hover effect */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={figure.imageUrl}
          alt={`Portrait of ${figure.name[language]}`}
          className="w-full h-full object-cover"
          variants={imageVariants}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Era badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-medium text-dark-950 bg-gold-500 rounded-full">
            {figure.era[language]}
          </span>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4">
        {/* Name and title */}
        <h3 className="text-lg font-bold text-gold-500 mb-1">
          {figure.name[language]}
        </h3>
        <p className="text-sm text-cream-300 mb-2 italic">
          {figure.title[language]}
        </p>

        {/* Description */}
        <p className="text-sm text-cream-200 mb-3 line-clamp-2">
          {figure.description[language]}
        </p>

        {/* Key achievements */}
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-wide">
            {language === 'ka' ? 'მთავარი მიღწევები' : 'Key Achievements'}
          </h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {figure.achievements[language].slice(0, 2).map((achievement, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#FFD700] mr-1 mt-1">•</span>
                <span>{achievement}</span>
              </li>
            ))}
            {figure.achievements[language].length > 2 && (
              <li className="text-xs text-[#722F37] font-medium">
                +{figure.achievements[language].length - 2} {language === 'ka' ? 'მეტი მიღწევა' : 'more achievements'}
              </li>
            )}
          </ul>
        </div>

        {/* Hover indicator */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-[#722F37] font-medium">
            {language === 'ka' ? 'დააწკაპუნეთ მეტის სანახავად' : 'Click to learn more'}
          </span>
          <motion.div
            className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <svg 
              className="w-3 h-3 text-[#722F37]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoricalFigureCard; 