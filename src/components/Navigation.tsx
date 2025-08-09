import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Menu, X, Home, BookOpen } from 'lucide-react';

const Navigation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ka' ? 'en' : 'ka');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-[#0A0908]/95 to-[#1C1410]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <div className="relative">
              <img
                src="/echo-logo.svg"
                alt="Echo"
                className="w-10 h-10 rounded-full border-2 border-[#D4A574] shadow-[0_0_15px_rgba(212,165,116,0.3)] group-hover:shadow-[0_0_20px_rgba(212,165,116,0.5)] transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/echo-logo.jpg";
                }}
              />
              <div className="absolute inset-0 rounded-full border border-[#B08D57]/50 animate-pulse"></div>
            </div>
            <span 
              className="text-[#D4A574] font-bold text-xl font-georgian"
              style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
                letterSpacing: '2px'
              }}
            >
              Echo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === '/'
                  ? 'bg-gradient-to-r from-[#1C1410] to-[#2A1810] text-[#D4A574] border-2 border-[#D4A574] shadow-[0_0_15px_rgba(212,165,116,0.3)]'
                  : 'text-[#FFFEF2] hover:text-[#D4A574] hover:bg-[#1C1410]/50 border-2 border-transparent hover:border-[#D4A574]/50'
              }`}
              style={{
                fontFamily: i18n.language === 'ka' ? 'Noto Serif Georgian, serif' : 'Georgia, serif',
                letterSpacing: '1px'
              }}
            >
              <Home className="w-4 h-4" />
              <span>{i18n.language === 'ka' ? 'მთავარი' : 'Home'}</span>
            </Link>

            <Link
              to="/library"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === '/library'
                  ? 'bg-gradient-to-r from-[#1C1410] to-[#2A1810] text-[#D4A574] border-2 border-[#D4A574] shadow-[0_0_15px_rgba(212,165,116,0.3)]'
                  : 'text-[#FFFEF2] hover:text-[#D4A574] hover:bg-[#1C1410]/50 border-2 border-transparent hover:border-[#D4A574]/50'
              }`}
              style={{
                fontFamily: i18n.language === 'ka' ? 'Noto Serif Georgian, serif' : 'Georgia, serif',
                letterSpacing: '1px'
              }}
            >
              <BookOpen className="w-4 h-4" />
              <span>{i18n.language === 'ka' ? 'ბიბლიოთეკა' : 'Library'}</span>
            </Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-[#FFFEF2] hover:text-[#D4A574] hover:bg-[#1C1410]/50 border-2 border-transparent hover:border-[#D4A574]/50 transition-all duration-300"
              style={{
                fontFamily: i18n.language === 'ka' ? 'Noto Serif Georgian, serif' : 'Georgia, serif',
                letterSpacing: '1px'
              }}
              aria-label={i18n.language === 'ka' ? 'Switch to English' : 'ქართულად შეცვლა'}
            >
              <span className="text-sm font-bold">
                {i18n.language === 'ka' ? 'EN' : 'KA'}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-[#FFFEF2] hover:text-[#D4A574] hover:bg-[#1C1410]/50 border-2 border-transparent hover:border-[#D4A574]/50 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gradient-to-b from-[#0A0908]/95 to-[#1C1410]/95 backdrop-blur-md border-t border-[#D4A574]/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === '/'
                    ? 'bg-gradient-to-r from-[#1C1410] to-[#2A1810] text-[#D4A574] border-2 border-[#D4A574]'
                    : 'text-[#FFFEF2] hover:text-[#D4A574] hover:bg-[#1C1410]/50 border-2 border-transparent hover:border-[#D4A574]/50'
                }`}
                onClick={closeMenu}
                style={{
                  fontFamily: i18n.language === 'ka' ? 'Noto Serif Georgian, serif' : 'Georgia, serif',
                  letterSpacing: '1px'
                }}
              >
                <Home className="w-5 h-5" />
                <span>{i18n.language === 'ka' ? 'მთავარი' : 'Home'}</span>
              </Link>

              <Link
                to="/library"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === '/library'
                    ? 'bg-gradient-to-r from-[#1C1410] to-[#2A1810] text-[#D4A574] border-2 border-[#D4A574]'
                    : 'text-[#FFFEF2] hover:text-[#D4A574] hover:bg-[#1C1410]/50 border-2 border-transparent hover:border-[#D4A574]/50'
                }`}
                onClick={closeMenu}
                style={{
                  fontFamily: i18n.language === 'ka' ? 'Noto Serif Georgian, serif' : 'Georgia, serif',
                  letterSpacing: '1px'
                }}
              >
                <BookOpen className="w-5 h-5" />
                <span>{i18n.language === 'ka' ? 'ბიბლიოთეკა' : 'Library'}</span>
              </Link>

              {/* Mobile Language Toggle */}
              <button
                onClick={() => {
                  toggleLanguage();
                  closeMenu();
                }}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#FFFEF2] hover:text-[#D4A574] hover:bg-[#1C1410]/50 border-2 border-transparent hover:border-[#D4A574]/50 transition-all duration-300 w-full text-left"
                style={{
                  fontFamily: i18n.language === 'ka' ? 'Noto Serif Georgian, serif' : 'Georgia, serif',
                  letterSpacing: '1px'
                }}
                aria-label={i18n.language === 'ka' ? 'Switch to English' : 'ქართულად შეცვლა'}
              >
                <span className="text-sm font-bold">
                  {i18n.language === 'ka' ? 'English' : 'ქართული'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation; 