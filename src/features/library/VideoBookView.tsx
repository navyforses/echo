import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HistoricalFigure } from '../../data/historicalFigures';
import Book from '../../components/Book/Book';

interface VideoBookViewProps {
  figure: HistoricalFigure;
  onClose: () => void;
  isOpen: boolean;
}

const VideoBookView: React.FC<VideoBookViewProps> = ({ figure, onClose, isOpen }) => {
  const { i18n } = useTranslation();
  const language = i18n.language as 'ka' | 'en';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 min-h-screen overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, rotateY: -90 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full h-screen bg-gradient-to-br from-[#1C1410] to-[#0A0908] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Atmospheric Background */}
            <div className="absolute inset-0 bg-[url('/textures/dark-wood-pattern.jpg')] opacity-20"></div>
            
            {/* Candle Glow Effect */}
            <div className="candle-glow"></div>
            
            {/* Dust Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="dust-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${15 + Math.random() * 10}s`
                  }}
                />
              ))}
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="close-button"
            >
              ✕
            </button>
            
            {/* New Book Component with Figure Data */}
            <Book character={figure} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoBookView; 