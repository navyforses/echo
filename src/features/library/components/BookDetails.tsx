import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HistoricalFigure } from '../../../data/historicalFigures';
import ChatInterface from '../../../components/ChatInterface';
import HTMLFlipBook from 'react-pageflip';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface BookDetailsProps {
  figure: HistoricalFigure;
  onClose: () => void;
  isOpen: boolean;
}

const BookDetails: React.FC<BookDetailsProps> = ({ figure, onClose, isOpen }) => {
  const { i18n } = useTranslation();
  const language = i18n.language as 'ka' | 'en';
  const flipBookRef = useRef<any>(null);
  
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
  const [currentPage, setCurrentPage] = useState(0);

  // ვიდეოების მასივი
  const videos = [
    {
      id: 1,
      title: language === 'ka' ? 'ილია ჭავჭავაძის დოკუმენტური ფილმი - ნაწილი 1' : 'Ilia Chavchavadze Documentary - Part 1',
      url: '/videos/ilia-1.mp4',
      description: language === 'ka' 
        ? 'ილია ჭავჭავაძის ცხოვრება და მოღვაწეობის პირველი ნაწილი'
        : 'First part of Ilia Chavchavadze\'s life and work'
    },
    {
      id: 2,
      title: language === 'ka' ? 'ილია ჭავჭავაძის დოკუმენტური ფილმი - ნაწილი 2' : 'Ilia Chavchavadze Documentary - Part 2',
      url: '/videos/ilia-2.mp4',
      description: language === 'ka' 
        ? 'საზოგადოებრივი მოღვაწეობა და ლიტერატურული შემოქმედება'
        : 'Public activity and literary work'
    },
    {
      id: 3,
      title: language === 'ka' ? 'ილია ჭავჭავაძის დოკუმენტური ფილმი - ნაწილი 3' : 'Ilia Chavchavadze Documentary - Part 3',
      url: '/videos/ilia-3.mp4',
      description: language === 'ka' 
        ? 'ლიტერატურული მემკვიდრეობა და ისტორიული მნიშვნელობა'
        : 'Literary heritage and historical significance'
    }
  ];

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

  const handlePageFlip = (pageNum: number) => {
    setCurrentPage(pageNum);
    // ყველა ვიდეოს პაუზა გვერდის გადაშლისას
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
  };

  const handleRightPageClick = () => {
    if (flipBookRef.current && flipBookRef.current.pageFlip) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const handleLeftPageClick = () => {
    if (flipBookRef.current && flipBookRef.current.pageFlip) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  // ვიდეოს კონტროლი გვერდების გადაშლისას
  useEffect(() => {
    const handlePageChange = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
      });
    };

    const flipBook = flipBookRef.current;
    if (flipBook && flipBook.on) {
      flipBook.on('flip', handlePageChange);
    }

    return () => {
      if (flipBook && flipBook.off) {
        flipBook.off('flip', handlePageChange);
      }
    };
  }, []);

  // გვერდების მასივი - მარჯვენა გვერდისთვის
  const pages = [
    {
      type: 'info',
      title: language === 'ka' ? 'ძირითადი ინფორმაცია' : 'Basic Information',
      content: 'character-info'
    }
  ];

  // მარჯვენა გვერდის კონტენტის რენდერი
  const renderRightPageContent = (pageIndex: number) => {
    const page = pages[pageIndex];
    
    switch (page.content) {
      case 'character-info':
        return (
          <div className="character-info-page">
            {/* პორტრეტი */}
            <div className="portrait-container">
              <img 
                src={figure.image} 
                alt={figure.name[language]}
                className="character-portrait"
              />
            </div>
            
            {/* ინფორმაცია */}
            <h1 className="character-name">{figure.name[language]}</h1>
            <p className="character-subtitle">{figure.title[language]}</p>
            <p className="life-years">{figure.birthYear} - {figure.deathYear}</p>
            
            <div className="biography">
              <p>{figure.description[language]}</p>
              
              <h3>{language === 'ka' ? 'მნიშვნელოვანი მიღწევები:' : 'Key Achievements:'}</h3>
              <ul>
                {figure.achievements[language].map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      

      

      
      default:
        return null;
    }
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

                        {/* Book content with HTMLFlipBook */}
            <div className="flex h-full">
              {/* Left page - Chat (Fixed) */}
              <div className="w-1/2 p-8 border-r border-gold-200 book-page chat-page">
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-bordeaux-600 mb-6 text-center">
                    {language === 'ka' ? `საუბარი ${figure.name.ka}-თან` : `Chat with ${figure.name.en}`}
                  </h2>
                  
                  <ChatInterface
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              {/* Right page - Character Info (Flippable) */}
              <div className="w-1/2 book-page info-page">
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={400}
                  height={600}
                  size="stretch"
                  minWidth={315}
                  maxWidth={400}
                  minHeight={400}
                  maxHeight={600}
                  showCover={false}
                  flippingTime={1000}
                  usePortrait={false}
                  startPage={0}
                  drawShadow={true}
                  className="demo-book"
                  startZIndex={0}
                  autoSize={true}
                  maxShadowOpacity={0.5}
                  mobileScrollSupport={true}
                  clickEventForward={false}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={true}
                  disableFlipByClick={false}
                  onFlip={(e) => handlePageFlip(e.data)}
                  style={{
                    margin: '0 auto',
                    height: '100%'
                  }}
                >
                  {/* პირველი გვერდი - ჩატი */}
                  <div className="demo-page chat-page" data-density="hard">
                    <div className="h-full flex flex-col">
                      <h2 className="text-2xl font-bold text-bordeaux-600 mb-6 text-center">
                        {language === 'ka' ? `საუბარი ${figure.name.ka}-თან` : `Chat with ${figure.name.en}`}
                      </h2>
                      
                      <ChatInterface
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>

                  {/* მეორე გვერდი - მოღვაწის ინფო */}
                  <div 
                    className="demo-page info-page" 
                    data-density="hard"
                    style={{
                      padding: '20px',
                      backgroundColor: '#F4E8D0',
                      border: '1px solid #D4A574'
                    }}
                  >
                    <div className="h-full overflow-y-auto">
                      {renderRightPageContent(0)}
                    </div>
                  </div>



                  {/* ვიდეო გვერდები */}
                  {videos.map((video, index) => (
                    <div 
                      key={`video-${video.id}`} 
                      className="demo-page video-page"
                      data-density="hard"
                      style={{
                        padding: '30px',
                        backgroundColor: '#F4E8D0',
                        border: '1px solid #D4A574'
                      }}
                    >
                      <div className="page-content">
                        <div className="page-header">
                          <h3 className="video-title">{video.title}</h3>
                          <span className="page-number">
                            {language === 'ka' ? 'გვერდი' : 'Page'} {index + 3}
                          </span>
                        </div>
                        
                        <div className="video-container">
                          <video 
                            controls 
                            className="book-video"
                            preload="metadata"
                          >
                            <source src={video.url} type="video/mp4" />
                            {language === 'ka' ? 'თქვენი ბრაუზერი არ მხარს უჭერს ვიდეოს' : 'Your browser does not support video'}
                          </video>
                        </div>
                        
                        <div className="video-description">
                          <p>{video.description}</p>
                        </div>
                        
                        {/* გადაფურცვლის ინდიკატორი */}
                        <div className="flip-hint">
                          👉
                        </div>
                      </div>
                    </div>
                  ))}
                </HTMLFlipBook>
              </div>
            </div>


          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookDetails; 