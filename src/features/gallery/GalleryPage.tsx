import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import HistoricalFigureCard from '../../components/shared/HistoricalFigureCard';
import SearchFilter from './SearchFilter';
import { historicalFigures, HistoricalFigure } from '../../data/historicalFigures';

/**
 * Gallery page for displaying historical figures with search and filter functionality
 */
const GalleryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [filteredFigures, setFilteredFigures] = useState<HistoricalFigure[]>(historicalFigures);
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);

  // Animation variants for staggered card animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const handleFigureClick = (figure: HistoricalFigure) => {
    setSelectedFigure(figure);
    // TODO: Navigate to individual figure page or open modal
  };

  const handleFilterChange = (newFilteredFigures: HistoricalFigure[]) => {
    setFilteredFigures(newFilteredFigures);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900">
      {/* Header Section */}
              <section className="bg-gradient-to-r from-dark-950 to-dark-800 text-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
            }`}>
              {i18n.language === 'ka' ? 'ისტორიული პიროვნებები' : 'Historical Figures'}
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-body'
            }`}>
              {i18n.language === 'ka' 
                ? 'გაეცანით საქართველოს უდიდეს ისტორიულ პიროვნებებს და მათ მიერ განხორციელებულ საქმეებს'
                : 'Discover Georgia\'s greatest historical figures and their remarkable achievements'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchFilter 
            onFilterChange={handleFilterChange}
            allFigures={historicalFigures}
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <p className={`text-lg text-sepia ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-body'
            }`}>
              {i18n.language === 'ka' 
                ? `ნაპოვნია ${filteredFigures.length} პიროვნება`
                : `Found ${filteredFigures.length} figure${filteredFigures.length !== 1 ? 's' : ''}`
              }
            </p>
          </motion.div>

          {/* No Results Message */}
          {filteredFigures.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className={`text-2xl font-bold text-bordeaux-950 mb-4 ${
                i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
              }`}>
                {i18n.language === 'ka' ? 'პიროვნება ვერ მოიძებნა' : 'No figures found'}
              </h3>
              <p className={`text-lg text-sepia max-w-md mx-auto ${
                i18n.language === 'ka' ? 'font-georgian' : 'font-body'
              }`}>
                {i18n.language === 'ka'
                  ? 'სცადეთ სხვა საძიებო ტერმინები ან ფილტრები'
                  : 'Try different search terms or filters'
                }
              </p>
            </motion.div>
          )}

          {/* Gallery Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filteredFigures.length} // Re-animate when results change
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredFigures.map((figure, index) => (
                <motion.div
                  key={figure.id}
                  variants={cardVariants}
                  layout
                  className="flex justify-center"
                >
                  <HistoricalFigureCard
                    figure={figure}
                    onClick={handleFigureClick}
                    className="w-full max-w-sm"
                    language={i18n.language as 'ka' | 'en'}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-bordeaux-950 to-bordeaux-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold text-cream mb-6 ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
            }`}>
              {i18n.language === 'ka' 
                ? 'მზად ხართ უფრო ღრმად გაეცნოთ?'
                : 'Ready to dive deeper?'
              }
            </h2>
            <p className={`text-xl text-gray-200 mb-8 ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-body'
            }`}>
              {i18n.language === 'ka'
                ? 'შეუერთდით ჩატს და უბრძოლეთ ისტორიულ პიროვნებებს პირდაპირ'
                : 'Join the chat and interact with historical figures directly'
              }
            </p>
            <button 
              className="px-10 py-4 bg-gold-950 text-bordeaux-950 font-bold rounded-lg 
                       hover:bg-gold-400 transition-all duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-gold-950/30"
              aria-label={i18n.language === 'ka' ? 'ჩატის დაწყება' : 'Start chatting'}
            >
              {i18n.language === 'ka' ? 'დაიწყეთ ჩატი' : 'Start Chatting'}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage; 