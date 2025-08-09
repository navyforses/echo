import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Filter, BookOpen } from 'lucide-react';
import { HistoricalFigure, historicalFigures, getHistoricalFigure } from '../../data/historicalFigures';
import BookShelf from './BookShelf';
import VideoBookView from './VideoBookView';

const LibraryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as 'ka' | 'en';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState('');
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Filter figures based on search and era with loading state
  const filteredFigures = useMemo(() => {
    setIsSearching(true);
    
    let figures = historicalFigures;
    
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      figures = figures.filter(figure => 
        figure.name.ka.toLowerCase().includes(lowercaseQuery) ||
        figure.name.en.toLowerCase().includes(lowercaseQuery) ||
        figure.title.ka.toLowerCase().includes(lowercaseQuery) ||
        figure.title.en.toLowerCase().includes(lowercaseQuery) ||
        figure.description.ka.toLowerCase().includes(lowercaseQuery) ||
        figure.description.en.toLowerCase().includes(lowercaseQuery) ||
        figure.achievements.ka.some(achievement => 
          achievement.toLowerCase().includes(lowercaseQuery)
        ) ||
        figure.achievements.en.some(achievement => 
          achievement.toLowerCase().includes(lowercaseQuery)
        )
      );
    }
    
    if (selectedEra) {
      figures = figures.filter(figure => {
        const birthYear = figure.birthYear;
        switch (selectedEra) {
          case 'medieval':
            return birthYear >= 500 && birthYear < 1500;
          case 'renaissance':
            return birthYear >= 1300 && birthYear < 1600;
          case 'enlightenment':
            return birthYear >= 1600 && birthYear < 1800;
          case 'modern':
            return birthYear >= 1800;
          default:
            return true;
        }
      });
    }
    
    // Simulate search delay for better UX
    setTimeout(() => setIsSearching(false), 300);
    
    return figures;
  }, [searchQuery, selectedEra]);

  const handleBookClick = (figure: HistoricalFigure) => {
    setSelectedFigure(figure);
    setIsBookOpen(true);
  };

  const handleCloseBook = () => {
    setIsBookOpen(false);
    setSelectedFigure(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEra(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedEra('');
  };

  const eras = [
    { value: 'medieval', label: { ka: 'შუა საუკუნეები', en: 'Medieval' } },
    { value: 'renaissance', label: { ka: 'რენესანსი', en: 'Renaissance' } },
    { value: 'enlightenment', label: { ka: 'განმანათლებლობა', en: 'Enlightenment' } },
    { value: 'modern', label: { ka: 'ახალი დრო', en: 'Modern Era' } }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0908] via-[#1C1410] to-[#2A1810] relative overflow-hidden">
      {/* Candle glow effect */}
      <div className="candle-glow"></div>
      
      {/* Background ornaments */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 border border-[#D4A574]/20 rounded-full"></div>
        <div className="absolute top-40 right-40 w-32 h-32 border border-[#B08D57]/20 rounded-full"></div>
        <div className="absolute bottom-40 left-1/3 w-24 h-24 border border-[#D4A574]/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 border border-[#B08D57]/20 rounded-full"></div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-12 text-center relative z-10"
      >
        <h1 
          className={`text-4xl md:text-6xl font-bold text-[#D4A574] mb-6 ${
            i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
          }`}
          style={{
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 165, 116, 0.3)',
            letterSpacing: '3px'
          }}
        >
          {language === 'ka' ? 'ქრონიკების ბიბლიოთეკა' : 'Chronicles Library'}
        </h1>
        <p 
          className={`text-lg md:text-xl text-[#FFFEF2] max-w-3xl mx-auto px-6 ${
            i18n.language === 'ka' ? 'font-georgian' : 'font-body'
          }`}
          style={{
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            letterSpacing: '1px'
          }}
        >
          {language === 'ka' 
            ? 'ქართული ისტორიის უდიდესი მოღვაწეების ციფრული ქრონიკები'
            : 'Digital Chronicles of Georgian History\'s Greatest Figures'
          }
        </p>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto mb-12 px-6"
      >
        <div className="bg-gradient-to-r from-[#1C1410]/80 to-[#2A1810]/80 backdrop-blur-sm rounded-lg p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-2 border-[#D4A574]/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <label className={`block text-[#D4A574] mb-3 font-medium ${
                i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
              }`}
              style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                letterSpacing: '1px'
              }}>
                <Search className="inline w-4 h-4 mr-2" />
                {language === 'ka' ? 'ძიება' : 'Search'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={language === 'ka' ? 'ძიება მოღვაწეების მიხედვით...' : 'Search by figures...'}
                  className={`w-full px-4 py-3 bg-[#0A0908]/50 border-2 border-[#B08D57]/50 rounded-lg text-[#FFFEF2] placeholder-[#B08D57]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-300 ${
                    i18n.language === 'ka' ? 'font-georgian' : 'font-body'
                  }`}
                  style={{
                    letterSpacing: '1px'
                  }}
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#D4A574]"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Era Filter */}
            <div>
              <label className={`block text-[#D4A574] mb-3 font-medium ${
                i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
              }`}
              style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                letterSpacing: '1px'
              }}>
                <Filter className="inline w-4 h-4 mr-2" />
                {language === 'ka' ? 'საუკუნე' : 'Era'}
              </label>
              <select
                value={selectedEra}
                onChange={handleEraChange}
                className={`w-full px-4 py-3 bg-[#0A0908]/50 border-2 border-[#B08D57]/50 rounded-lg text-[#FFFEF2] focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-all duration-300 ${
                  i18n.language === 'ka' ? 'font-georgian' : 'font-body'
                }`}
                style={{
                  letterSpacing: '1px'
                }}
              >
                <option value="">
                  {language === 'ka' ? 'ყველა საუკუნე' : 'All Eras'}
                </option>
                {eras.map((era) => (
                  <option key={era.value} value={era.value}>
                    {era.label[language]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count and clear filters */}
          <div className="mt-6 flex justify-between items-center">
            <p className={`text-[#B08D57] ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-body'
            }`}
            style={{
              letterSpacing: '1px'
            }}>
              <BookOpen className="inline w-4 h-4 mr-2" />
              {language === 'ka' 
                ? `${filteredFigures.length} წიგნი ნაპოვნია`
                : `${filteredFigures.length} books found`
              }
            </p>
            {(searchQuery || selectedEra) && (
              <button
                onClick={clearFilters}
                className={`text-[#D4A574] hover:text-[#B08D57] transition-colors ${
                  i18n.language === 'ka' ? 'font-georgian' : 'font-body'
                }`}
                style={{
                  letterSpacing: '1px'
                }}
              >
                {language === 'ka' ? 'ფილტრების გასუფთავება' : 'Clear Filters'}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bookshelf */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="px-6 pb-12"
      >
        {isSearching ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A574] mx-auto mb-4"></div>
            <p className={`text-[#B08D57] ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-body'
            }`}
            style={{
              letterSpacing: '1px'
            }}>
              {language === 'ka' ? 'მიმდინარეობს ძიება...' : 'Searching...'}
            </p>
          </div>
        ) : filteredFigures.length > 0 ? (
          <BookShelf
            figures={filteredFigures}
            onBookClick={handleBookClick}
            title={language === 'ka' ? 'ისტორიული მოღვაწეები' : 'Historical Figures'}
          />
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 text-[#B08D57]">
              <BookOpen className="w-full h-full" />
            </div>
            <h3 className={`text-2xl font-bold text-[#D4A574] mb-4 ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
            }`}
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
              letterSpacing: '2px'
            }}>
              {language === 'ka' ? 'წიგნები ვერ მოიძებნა' : 'No Books Found'}
            </h3>
            <p className={`text-[#B08D57] mb-6 max-w-md mx-auto ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-body'
            }`}
            style={{
              letterSpacing: '1px'
            }}>
              {language === 'ka' 
                ? 'სამწუხაროდ, თქვენი ძიების კრიტერიუმების მიხედვით წიგნები ვერ მოიძებნა.'
                : 'Unfortunately, no books were found matching your search criteria.'
              }
            </p>
            {(searchQuery || selectedEra) && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-[#1C1410] to-[#2A1810] hover:from-[#2A1810] hover:to-[#1C1410] text-[#D4A574] font-bold rounded-lg transition-all duration-300 border-2 border-[#D4A574] hover:border-[#B08D57] hover:shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                style={{
                  fontFamily: i18n.language === 'ka' ? 'Noto Serif Georgian, serif' : 'Georgia, serif',
                  letterSpacing: '2px'
                }}
              >
                {language === 'ka' ? 'ყველა წიგნის ნახვა' : 'View All Books'}
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Book View Modal */}
      {selectedFigure && (
        <VideoBookView
          figure={selectedFigure}
          onClose={handleCloseBook}
          isOpen={isBookOpen}
        />
      )}

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#D4A574]/20"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#D4A574]/20"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#D4A574]/20"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#D4A574]/20"></div>
    </div>
  );
};

export default LibraryPage; 