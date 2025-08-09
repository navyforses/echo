import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HistoricalFigure } from '../../data/historicalFigures';
import ChatInterface from '../../components/ChatInterface';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface BookViewProps {
  figure: HistoricalFigure;
  onClose: () => void;
  isOpen: boolean;
}

const BookView: React.FC<BookViewProps> = ({ figure, onClose, isOpen }) => {
  const { i18n } = useTranslation();
  const language = i18n.language as 'ka' | 'en';
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'ka' 
        ? `გამარჯობა! მე ვარ ${figure.name.ka}. როგორ შემიძლია დაგეხმაროთ?`
        : `Hello! I am ${figure.name.en}. How can I help you?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'ka' 
          ? `მადლობა თქვენი შეკითხვისთვის. ეს არის პასუხი ${figure.name.ka}-სგან.`
          : `Thank you for your question. This is a response from ${figure.name.en}.`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, rotateY: -90 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-6xl h-[80vh] bg-gradient-to-br from-cream-50 to-cream-100 rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-bordeaux-600 hover:bg-bordeaux-700 text-cream-100 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Book content */}
            <div className="flex h-full">
              {/* Left page - Figure information */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-1/2 p-8 border-r border-gold-200 book-page"
              >
                <div className="h-full flex flex-col">
                  {/* Figure image */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden profile-image">
                      <img
                        src={figure.imageUrl}
                        alt={figure.name[language]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gold-500 rounded-full"></div>
                  </div>

                  {/* Figure details */}
                  <div className="text-center mb-6">
                    <h2 
                      className={`text-3xl font-bold mb-2 book-text ${
                        i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
                      }`}
                    >
                      {figure.name[language]}
                    </h2>
                    <p 
                      className={`text-lg mb-1 book-text ${
                        i18n.language === 'ka' ? 'font-georgian' : 'font-body'
                      }`}
                    >
                      {figure.title[language]}
                    </p>
                    <div 
                      className="inline-block px-3 py-1 bg-gold-100 rounded-full text-sm font-medium era-text"
                    >
                      {figure.era[language]}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 
                      className={`text-lg font-semibold mb-3 book-text ${
                        i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
                      }`}
                    >
                      {language === 'ka' ? 'ბიოგრაფია' : 'Biography'}
                    </h3>
                    <p 
                      className={`leading-relaxed book-text ${
                        i18n.language === 'ka' ? 'font-georgian' : 'font-body'
                      }`}
                    >
                      {figure.description[language]}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="flex-1">
                    <h3 
                      className={`text-lg font-semibold mb-3 book-text ${
                        i18n.language === 'ka' ? 'font-georgian' : 'font-heading'
                      }`}
                    >
                      {language === 'ka' ? 'ძირითადი მიღწევები' : 'Key Achievements'}
                    </h3>
                    <ul className="space-y-2">
                      {figure.achievements[language].map((achievement, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                          className={`flex items-start space-x-2 ${
                            i18n.language === 'ka' ? 'font-georgian' : 'font-body'
                          }`}
                        >
                          <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="book-text">
                            {achievement}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Right page - Chat interface */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-1/2 h-full book-page"
              >
                <ChatInterface
                  onSendMessage={handleSendMessage}
                  messages={messages}
                  isLoading={isLoading}
                  placeholder={language === 'ka' 
                    ? `დაწერეთ ${figure.name.ka}-სთან საუბრისთვის...`
                    : `Write to chat with ${figure.name.en}...`
                  }
                />
              </motion.div>
            </div>

            {/* Book binding effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold-400 via-gold-600 to-gold-400 shadow-lg"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookView; 