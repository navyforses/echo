import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HistoricalFigure } from '../../data/historicalFigures';
import BookCard from './BookCard';

interface BookShelfProps {
  figures: HistoricalFigure[];
  onBookClick: (figure: HistoricalFigure) => void;
  title?: string;
}

const BookShelf: React.FC<BookShelfProps> = ({ figures, onBookClick, title }) => {
  const { i18n } = useTranslation();
  const language = i18n.language as 'ka' | 'en';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Shelf title */}
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-3xl font-bold text-[#D4A574] mb-8 ${
            i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
          }`}
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            letterSpacing: '2px'
          }}
        >
          {title}
        </motion.h2>
      )}

      {/* XIX Century Wooden shelf container - Improved sizing */}
      <div className="relative bg-gradient-to-b from-[#8B4513] via-[#A0522D] to-[#8B4513] rounded-lg p-8 shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-2 border-[#654321]">
        {/* Wood grain texture */}
        <div 
          className="absolute inset-0 rounded-lg opacity-30"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 3px,
                rgba(0,0,0,0.2) 3px,
                rgba(0,0,0,0.2) 6px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 20px,
                rgba(0,0,0,0.1) 20px,
                rgba(0,0,0,0.1) 22px
              )
            `
          }}
        ></div>

        {/* Shelf edge - XIX century style */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[#654321] to-[#8B4513] rounded-t-lg border-b border-[#3E2723]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#654321] to-[#8B4513] rounded-b-lg border-t border-[#3E2723]"></div>

        {/* Books container - Improved spacing */}
        <div className="relative z-10 flex items-end justify-center space-x-3 min-h-[360px] px-4">
          {figures.map((figure, index) => (
            <BookCard
              key={figure.id}
              figure={figure}
              onClick={onBookClick}
              index={index}
            />
          ))}
        </div>

        {/* Shelf supports - XIX century style */}
        <div className="absolute bottom-0 left-6 right-6 h-6 bg-gradient-to-t from-[#3E2723] to-[#654321] rounded-b-lg border-t-2 border-[#2E1A1A]"></div>
        <div className="absolute bottom-0 left-12 right-12 h-3 bg-gradient-to-t from-[#2E1A1A] to-[#3E2723] border-t border-[#1A0F0F]"></div>
        
        {/* Decorative brass fittings */}
        <div className="absolute top-2 left-4 w-3 h-3 bg-[#B08D57] rounded-full shadow-[0_0_8px_rgba(176,141,87,0.6)]"></div>
        <div className="absolute top-2 right-4 w-3 h-3 bg-[#B08D57] rounded-full shadow-[0_0_8px_rgba(176,141,87,0.6)]"></div>
        <div className="absolute bottom-2 left-4 w-3 h-3 bg-[#B08D57] rounded-full shadow-[0_0_8px_rgba(176,141,87,0.6)]"></div>
        <div className="absolute bottom-2 right-4 w-3 h-3 bg-[#B08D57] rounded-full shadow-[0_0_8px_rgba(176,141,87,0.6)]"></div>
      </div>

      {/* Decorative elements - XIX century style */}
      <div className="absolute -top-3 left-6 w-12 h-3 bg-[#B08D57] rounded-full opacity-80 shadow-[0_0_10px_rgba(176,141,87,0.4)]"></div>
      <div className="absolute -top-3 right-6 w-12 h-3 bg-[#B08D57] rounded-full opacity-80 shadow-[0_0_10px_rgba(176,141,87,0.4)]"></div>
      
      {/* Shelf shadow - XIX century style */}
      <div className="absolute -bottom-6 left-4 right-4 h-6 bg-black/40 rounded-full blur-md"></div>
      <div className="absolute -bottom-8 left-8 right-8 h-4 bg-black/20 rounded-full blur-lg"></div>
    </motion.div>
  );
};

export default BookShelf; 