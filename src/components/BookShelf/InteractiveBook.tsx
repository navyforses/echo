import React from 'react';
import { motion } from 'framer-motion';

interface Book {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  accentColor: string;
  era: string;
  category: string;
  description: string;
  achievements: string[];
}

interface InteractiveBookProps {
  book: Book;
  index: number;
  isHovered: boolean;
}

const InteractiveBook: React.FC<InteractiveBookProps> = ({ book, index, isHovered }) => {
  // წიგნის ყდის ორნამენტები
  const getBookOrnament = (category: string) => {
    switch (category) {
      case 'reformer':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold-500/60 rounded-full"></div>
            <div className="absolute w-4 h-4 bg-gold-500/40 rounded-full"></div>
          </div>
        );
      case 'artist':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border border-gold-500/60 transform rotate-45"></div>
            <div className="absolute w-3 h-3 bg-gold-500/40 transform rotate-45"></div>
          </div>
        );
      case 'scholar':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-6 border border-gold-500/60 rounded"></div>
            <div className="absolute w-2 h-2 bg-gold-500/40 rounded-full"></div>
          </div>
        );
      case 'ruler':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-8 border border-gold-500/60 transform rotate-45"></div>
            <div className="absolute w-2 h-2 bg-gold-500/40 rounded-full"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const bookVariants = {
    initial: {
      rotateY: 0,
      scale: 1,
      z: 0
    },
    hover: {
      rotateY: 15,
      scale: 1.05,
      z: 50,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const spineVariants = {
    initial: { opacity: 0.7 },
    hover: { opacity: 1 }
  };

  const coverVariants = {
    initial: { rotateY: 0 },
    hover: { rotateY: -5 }
  };

  return (
    <motion.div
      variants={bookVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      className="relative w-full h-80 perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* წიგნის ყდა */}
      <motion.div
        variants={coverVariants}
        className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${book.color} 0%, ${book.color}dd 100%)`,
          transform: 'rotateY(0deg) translateZ(2px)',
          border: `2px solid ${book.accentColor}40`
        }}
      >
        {/* ოქროს ორნამენტები */}
        <div className="absolute inset-0 p-4">
          {/* ზედა ორნამენტი */}
          <div className="absolute top-2 left-2 right-2 h-8 border-b border-gold-500/30"></div>
          
          {/* ცენტრალური ორნამენტი */}
          {getBookOrnament(book.category)}
          
          {/* ქვედა ორნამენტი */}
          <div className="absolute bottom-2 left-2 right-2 h-8 border-t border-gold-500/30"></div>
        </div>

        {/* წიგნის სათაური */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-bold text-gold-500 mb-2 font-georgian"
          >
            {book.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gold-400/80 font-georgian"
          >
            {book.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 px-3 py-1 bg-gold-500/20 rounded-full"
          >
            <span className="text-xs text-gold-300 font-georgian">{book.era}</span>
          </motion.div>
        </div>

        {/* ოქროს ნაწილაკები hover-ზე */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  x: Math.random() * 100 - 50, 
                  y: Math.random() * 100 - 50 
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  x: Math.random() * 200 - 100, 
                  y: Math.random() * 200 - 100 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
                className="absolute w-1 h-1 bg-gold-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* წიგნის ზურგი */}
      <motion.div
        variants={spineVariants}
        className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-700 to-gray-800 rounded-l"
        style={{
          background: `linear-gradient(to bottom, ${book.color}dd, ${book.color})`,
          transform: 'rotateY(-90deg) translateZ(1px)',
          borderRight: `1px solid ${book.accentColor}40`
        }}
      >
        {/* ზურგის ორნამენტები */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-gold-500/60 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* წიგნის ქვედა ნაწილი */}
      <div
        className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-gray-600 to-gray-700 rounded-b"
        style={{
          background: `linear-gradient(to right, ${book.color}dd, ${book.color})`,
          transform: 'rotateX(90deg) translateZ(1px)'
        }}
      />

      {/* ჩრდილი */}
      <div
        className="absolute inset-0 bg-black/20 rounded-lg"
        style={{
          transform: 'translateZ(-10px)',
          filter: 'blur(10px)'
        }}
      />

      {/* Hover ეფექტი */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 to-transparent rounded-lg blur-xl"
        />
      )}
    </motion.div>
  );
};

export default InteractiveBook; 