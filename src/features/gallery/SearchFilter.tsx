import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HistoricalFigure, categories, eras } from '../../data/historicalFigures';

interface SearchFilterProps {
  onFilterChange: (filteredFigures: HistoricalFigure[]) => void;
  allFigures: HistoricalFigure[];
}

/**
 * Search and filter component for historical figures gallery
 */
const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange, allFigures }) => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter figures based on search and filter criteria
  useEffect(() => {
    let filtered = allFigures;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(figure => 
        figure.name.ka.toLowerCase().includes(query) ||
        figure.name.en.toLowerCase().includes(query) ||
        figure.title.ka.toLowerCase().includes(query) ||
        figure.title.en.toLowerCase().includes(query) ||
        figure.description.ka.toLowerCase().includes(query) ||
        figure.description.en.toLowerCase().includes(query) ||
        figure.achievements.ka.some(achievement => 
          achievement.toLowerCase().includes(query)
        ) ||
        figure.achievements.en.some(achievement => 
          achievement.toLowerCase().includes(query)
        )
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(figure => {
        const categoryValue = categories.find(cat => cat.value === selectedCategory);
        return categoryValue && figure.category.ka === categoryValue.label.ka;
      });
    }

    // Apply era filter
    if (selectedEra !== 'all') {
      filtered = filtered.filter(figure => {
        const eraValue = eras.find(era => era.value === selectedEra);
        return eraValue && figure.era.ka === eraValue.label.ka;
      });
    }

    onFilterChange(filtered);
  }, [searchQuery, selectedCategory, selectedEra, allFigures, onFilterChange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedEra('all');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedEra !== 'all';

  return (
    <div className="bg-cream rounded-lg shadow-echo p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-sepia" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={i18n.language === 'ka' ? 'მოძებნეთ ისტორიული პიროვნებები...' : 'Search historical figures...'}
          className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent transition-all duration-300 ${
            i18n.language === 'ka' ? 'font-georgian' : 'font-body'
          }`}
          aria-label={i18n.language === 'ka' ? 'მოძებნეთ პიროვნებები' : 'Search figures'}
        />
      </div>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-bordeaux-950 text-cream rounded-lg hover:bg-bordeaux-800 transition-colors duration-300"
          aria-expanded={isFilterOpen}
          aria-label={i18n.language === 'ka' ? 'ფილტრების ჩვენება' : 'Show filters'}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" 
            />
          </svg>
          <span className={`${i18n.language === 'ka' ? 'font-georgian' : 'font-body'}`}>
            {i18n.language === 'ka' ? 'ფილტრები' : 'Filters'}
          </span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-bordeaux-950 hover:text-bordeaux-700 transition-colors duration-300"
            aria-label={i18n.language === 'ka' ? 'ფილტრების გასუფთავება' : 'Clear filters'}
          >
            <span className={`${i18n.language === 'ka' ? 'font-georgian' : 'font-body'}`}>
              {i18n.language === 'ka' ? 'გასუფთავება' : 'Clear'}
            </span>
          </button>
        )}
      </div>

      {/* Filter Options */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
              {/* Category Filter */}
              <div>
                <label className={`block text-sm font-medium text-sepia mb-2 ${
                  i18n.language === 'ka' ? 'font-georgian' : 'font-body'
                }`}>
                  {i18n.language === 'ka' ? 'კატეგორია' : 'Category'}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent transition-all duration-300 ${
                    i18n.language === 'ka' ? 'font-georgian' : 'font-body'
                  }`}
                  aria-label={i18n.language === 'ka' ? 'კატეგორიის არჩევა' : 'Select category'}
                >
                  <option value="all">
                    {i18n.language === 'ka' ? 'ყველა კატეგორია' : 'All Categories'}
                  </option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label[i18n.language as keyof typeof category.label]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Era Filter */}
              <div>
                <label className={`block text-sm font-medium text-sepia mb-2 ${
                  i18n.language === 'ka' ? 'font-georgian' : 'font-body'
                }`}>
                  {i18n.language === 'ka' ? 'ერა' : 'Era'}
                </label>
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent transition-all duration-300 ${
                    i18n.language === 'ka' ? 'font-georgian' : 'font-body'
                  }`}
                  aria-label={i18n.language === 'ka' ? 'ერის არჩევა' : 'Select era'}
                >
                  <option value="all">
                    {i18n.language === 'ka' ? 'ყველა ერა' : 'All Eras'}
                  </option>
                  {eras.map(era => (
                    <option key={era.value} value={era.value}>
                      {era.label[i18n.language as keyof typeof era.label]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gold-950 text-bordeaux-950">
                <span className={`${i18n.language === 'ka' ? 'font-georgian' : 'font-body'}`}>
                  {i18n.language === 'ka' ? 'ძიება' : 'Search'}: "{searchQuery}"
                </span>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-bordeaux-950 text-cream">
                <span className={`${i18n.language === 'ka' ? 'font-georgian' : 'font-body'}`}>
                  {categories.find(c => c.value === selectedCategory)?.label[i18n.language as keyof typeof categories[0]['label']]}
                </span>
              </span>
            )}
            {selectedEra !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-bordeaux-950 text-cream">
                <span className={`${i18n.language === 'ka' ? 'font-georgian' : 'font-body'}`}>
                  {eras.find(e => e.value === selectedEra)?.label[i18n.language as keyof typeof eras[0]['label']]}
                </span>
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchFilter; 