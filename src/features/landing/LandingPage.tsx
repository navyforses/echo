import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * LandingPage - XIX Century Academic Library Aesthetic
 */
const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0908] via-[#1C1410] to-[#2A1810] flex items-center justify-center relative overflow-hidden">
      {/* Candle glow effect */}
      <div className="candle-glow"></div>
      
      {/* Background ornaments - XIX century style */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-40 h-40 border border-[#D4A574]/30 rounded-full"></div>
        <div className="absolute top-40 right-40 w-32 h-32 border border-[#B08D57]/30 rounded-full"></div>
        <div className="absolute bottom-40 left-1/3 w-24 h-24 border border-[#D4A574]/30 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 border border-[#B08D57]/30 rounded-full"></div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#D4A574]/40 rounded-full"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#B08D57]/50 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-[#D4A574]/30 rounded-full"></div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center z-10 max-w-4xl mx-auto px-6"
      >
        {/* Echo Logo and Name */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12 flex items-center justify-center space-x-8"
        >
          <div className="relative">
            <img 
              src="/echo-logo.svg" 
              alt="Echo Logo" 
              className="w-48 h-48 drop-shadow-2xl rounded-full object-cover border-4 border-[#D4A574] shadow-[0_0_30px_rgba(212,165,116,0.3)]"
              onError={(e) => {
                e.currentTarget.src = "/echo-logo.jpg";
              }}
            />
            {/* Decorative border */}
            <div className="absolute inset-0 rounded-full border-2 border-[#B08D57]/50 animate-pulse"></div>
          </div>
          <motion.h1
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`text-7xl md:text-9xl font-bold text-[#D4A574] ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
            }`}
            style={{
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 165, 116, 0.3)',
              letterSpacing: '4px'
            }}
          >
            {i18n.language === 'ka' ? 'ექო' : 'Echo'}
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className={`text-2xl md:text-3xl text-[#B08D57] mb-8 ${
            i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
          }`}
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            letterSpacing: '2px'
          }}
        >
          {i18n.language === 'ka' 
            ? 'ქრონიკების ბიბლიოთეკა'
            : 'Chronicles Library'
          }
        </motion.h2>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className={`text-lg md:text-xl text-[#FFFEF2] mb-16 max-w-3xl mx-auto leading-relaxed ${
            i18n.language === 'ka' ? 'font-georgian' : 'font-body'
          }`}
          style={{
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            letterSpacing: '1px'
          }}
        >
          {i18n.language === 'ka' 
            ? 'ციფრული ხმა წარსულიდან - ქართული ისტორიის ცოცხალი ქრონიკები'
            : 'Digital Voice from the Past - Living Chronicles of Georgian History'
          }
        </motion.p>

        {/* Enter Library Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link
            to="/library"
            className="inline-block bg-gradient-to-r from-[#1C1410] to-[#2A1810] hover:from-[#2A1810] hover:to-[#1C1410] text-[#D4A574] font-bold py-6 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(212,165,116,0.4)] shadow-[0_8px_16px_rgba(0,0,0,0.5)] border-2 border-[#D4A574] hover:border-[#B08D57]"
            style={{
              fontFamily: i18n.language === 'ka' ? 'Noto Serif Georgian, serif' : 'Georgia, serif',
              letterSpacing: '2px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            {i18n.language === 'ka' ? 'ბიბლიოთეკაში შესვლა' : 'Enter Library'}
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          className="mt-20 flex justify-center space-x-12"
        >
          <div className="w-3 h-3 bg-[#D4A574] rounded-full shadow-[0_0_10px_rgba(212,165,116,0.5)]"></div>
          <div className="w-2 h-2 bg-[#B08D57] rounded-full shadow-[0_0_8px_rgba(176,141,87,0.4)]"></div>
          <div className="w-3 h-3 bg-[#D4A574] rounded-full shadow-[0_0_10px_rgba(212,165,116,0.5)]"></div>
        </motion.div>
      </motion.div>

      {/* Floating particles - XIX century style */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              opacity: [0, 0.6, 0], 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              delay: i * 1.2 
            }}
            className="absolute w-1 h-1 bg-[#D4A574] rounded-full shadow-[0_0_6px_rgba(212,165,116,0.6)]"
          />
        ))}
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#D4A574]/40"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#D4A574]/40"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#D4A574]/40"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#D4A574]/40"></div>
    </div>
  );
};

export default LandingPage; 