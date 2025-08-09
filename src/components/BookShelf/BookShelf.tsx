import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import InteractiveBook from './InteractiveBook';

// წიგნების მონაცემები
const books = [
  {
    id: 'ilia',
    title: 'ილია ჭავჭავაძე',
    subtitle: 'თერგდალეულების ხელმძღვანელი',
    color: 'var(--book-ilia)',
    accentColor: 'var(--secondary-gold)',
    era: 'XIX-XX საუკუნე',
    category: 'reformer',
    description: 'ქართული ნაციონალური მოძრაობის ლიდერი',
    achievements: [
      'თერგდალეულების მოძრაობის ხელმძღვანელობა',
      'ქართული ლიტერატურის განვითარება',
      'საზოგადოებრივი რეფორმების გატარება'
    ]
  },
  {
    id: 'vazha',
    title: 'ვაჟა ფშაველა',
    subtitle: 'ქართული პოეზიის კლასიკოსი',
    color: 'var(--book-vazha)',
    accentColor: 'var(--secondary-gold)',
    era: 'XIX-XX საუკუნე',
    category: 'artist',
    description: 'ქართული ლიტერატურის კლასიკოსი',
    achievements: [
      'ქართული რომანტიზმის განვითარება',
      'ალუდა ქეთელაურის შექმნა',
      'ქართული პოეზიის მოდერნიზაცია'
    ]
  },
  {
    id: 'niko',
    title: 'ნიკო ნიკოლაძე',
    subtitle: 'ქართული მეცნიერების ფუნდატორი',
    color: 'var(--book-niko)',
    accentColor: 'var(--secondary-gold)',
    era: 'XIX-XX საუკუნე',
    category: 'scholar',
    description: 'ქართული მეცნიერების ფუნდატორი',
    achievements: [
      'თბილისის უნივერსიტეტის დაარსება',
      'ქართული მეცნიერების განვითარება',
      'საგანმანათლებლო რეფორმების გატარება'
    ]
  },
  {
    id: 'shota',
    title: 'შოთა რუსთაველი',
    subtitle: 'ვეფხისტყაოსნის ავტორი',
    color: 'var(--book-shota)',
    accentColor: 'var(--secondary-gold)',
    era: 'XII საუკუნე',
    category: 'artist',
    description: 'ქართული ლიტერატურის უდიდესი პოეტი',
    achievements: [
      'ვეფხისტყაოსნის შექმნა',
      'ქართული ლიტერატურის განვითარება',
      'მსოფლიო ლიტერატურის კლასიკოსი'
    ]
  },
  {
    id: 'david',
    title: 'დავით აღმაშენებელი',
    subtitle: 'საქართველოს უდიდესი მეფე',
    color: 'var(--book-david)',
    accentColor: 'var(--secondary-gold)',
    era: 'XI-XII საუკუნე',
    category: 'ruler',
    description: 'საქართველოს უდიდესი მეფე',
    achievements: [
      'საქართველოს გაერთიანება',
      'გელათის აკადემიის დაარსება',
      'ქართული კულტურის აყვავება'
    ]
  },
  {
    id: 'akaki',
    title: 'აკაკი წერეთელი',
    subtitle: 'სულიკოს ავტორი',
    color: 'var(--book-akaki)',
    accentColor: 'var(--secondary-gold)',
    era: 'XIX-XX საუკუნე',
    category: 'artist',
    description: 'ქართული ლიტერატურის კლასიკოსი',
    achievements: [
      'სულიკოს შექმნა',
      'ქართული პოეზიის განვითარება',
      'ფოლკლორული მოტივების ლიტერატურაში შეტანა'
    ]
  }
];

interface BookShelfProps {
  onBookSelect: (bookId: string) => void;
}

const BookShelf: React.FC<BookShelfProps> = ({ onBookSelect }) => {
  const { t, i18n } = useTranslation();
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const bookVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      y: -20,
      rotateY: 5,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ebony-950 via-ebony-900 to-ebony-800 relative overflow-hidden">
      {/* ფონის ორნამენტები */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold-500/20 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-gold-500/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-gold-500/20 rounded-full"></div>
      </div>

      {/* მთავარი კონტენტი */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* სათაური */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl md:text-7xl font-bold text-gold-500 mb-6 ${
            i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
          }`}>
            ქრონიკების ბიბლიოთეკა
          </h1>
          <p className={`text-xl md:text-2xl text-cream-300 max-w-3xl mx-auto ${
            i18n.language === 'ka' ? 'font-georgian' : 'font-body'
          }`}>
            აირჩიეთ წიგნი და დაიწყეთ საუბარი ისტორიულ მოღვაწეებთან
          </p>
        </motion.div>

        {/* წიგნების თარო */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              variants={bookVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredBook(book.id)}
              onHoverEnd={() => setHoveredBook(null)}
              onClick={() => onBookSelect(book.id)}
              className="cursor-pointer perspective-1000"
            >
              <InteractiveBook
                book={book}
                index={index}
                isHovered={hoveredBook === book.id}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ქვედა ნაწილი */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-center mt-16"
        >
          <p className={`text-cream-400 text-lg ${
            i18n.language === 'ka' ? 'font-georgian' : 'font-body'
          }`}>
            ყველა წიგნი შეიცავს უნიკალურ ცოდნას და გამოცდილებას
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BookShelf; 