import React, { useState, useRef, useEffect } from 'react';
import CharacterInfoPage from './pages/CharacterInfoPage';
import VideoPage from './pages/VideoPage';
import { HistoricalFigure } from '../../data/historicalFigures';
import HTMLFlipBook from 'react-pageflip';
import './Book.css';
import './pages/BookSpread.css';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

interface BookProps {
  character?: HistoricalFigure;
}

const Book: React.FC<BookProps> = ({ character }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: character?.greeting || "გამარჯობა! მე ვარ ილია ჭავჭავაძე. მეკითხეთ რამე ჩემს ცხოვრებაზე, მუშაობაზე და იდეალებზე.",
      sender: 'bot',
      time: '09:27 AM'
    }
  ]);
  const [input, setInput] = useState<string>('');
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Default character data if none provided
  const defaultCharacter: HistoricalFigure = {
    id: "ilia-chavchavadze",
    name: {
      ka: "ილია ჭავჭავაძე",
      en: "Ilia Chavchavadze"
    },
    title: {
      ka: "საზოგადო მოღვაწე, მწერალი, პუბლიცისტი",
      en: "Public Figure, Writer, Publicist"
    },
    birthYear: 1837,
    deathYear: 1907,
    image: "/images/figures/ilia-chavchavadze.jpg",
    imageUrl: "/images/figures/ilia-chavchavadze.jpg",
    description: {
      ka: "XIX საუკუნის ქართველი საზოგადო მოღვაწე, მწერალი, პუბლიცისტი და პოლიტიკოსი. ის იყო თერგდალეულების ხელმძღვანელი და ქართული ეროვნული მოძრაობის ერთ-ერთი მთავარი იდეოლოგი.",
      en: "19th century Georgian public figure, writer, publicist and politician. He was the leader of Tergdaleulebi and one of the main ideologists of the Georgian national movement."
    },
    achievements: {
      ka: [
        "ქართული ენისა და კულტურის განვითარება",
        "საზოგადოებრივი აზრის ფორმირება",
        "ლიტერატურული მემკვიდრეობის შექმნა",
        "ეროვნული თვითშეგნების აღზრდა"
      ],
      en: [
        "Development of Georgian language and culture",
        "Formation of public opinion",
        "Creation of literary heritage",
        "Raising national self-awareness"
      ]
    },
    historicalRole: "ილია ჭავჭავაძე ითვლება ქართული ეროვნული აღორძინების მთავარ ფიგურად.",
    greeting: "გამარჯობა! მე ვარ ილია ჭავჭავაძე. შეგიძლიათ მკითხოთ ჩემს ცხოვრებაზე, მუშაობაზე და იდეალებზე.",
    era: {
      ka: "XIX საუკუნე",
      en: "19th Century"
    },
    category: {
      ka: "მწერლები",
      en: "Writers"
    },
    videos: [
      {
        number: 1,
        title: "დოკუმენტური ფილმი ნაწილი 1",
        description: "ილია ჭავჭავაძის ცხოვრება და მოღვაწეობა",
        url: "/videos/ilia-1.mp4"
      },
      {
        number: 2,
        title: "დოკუმენტური ფილმი ნაწილი 2",
        description: "საზოგადოებრივი მოღვაწეობა",
        url: "/videos/ilia-2.mp4"
      },
      {
        number: 3,
        title: "დოკუმენტური ფილმი ნაწილი 3",
        description: "ლიტერატურული მემკვიდრეობა",
        url: "/videos/ilia-3.mp4"
      },
      {
        number: 4,
        title: "დოკუმენტური ფილმი ნაწილი 4",
        description: "ეროვნული მემკვიდრეობა",
        url: "/videos/ilia-4.mp4"
      },
      {
        number: 5,
        title: "დოკუმენტური ფილმი ნაწილი 5",
        description: "ქართული კულტურის განვითარება",
        url: "/videos/ilia-5.mp4"
      },
      {
        number: 6,
        title: "დოკუმენტური ფილმი ნაწილი 6",
        description: "ისტორიული მნიშვნელობა",
        url: "/videos/ilia-6.mp4"
      },
      {
        number: 7,
        title: "დოკუმენტური ფილმი ნაწილი 7",
        description: "ლიტერატურული შემოქმედება",
        url: "/videos/ilia-7.mp4"
      },
      {
        number: 8,
        title: "დოკუმენტური ფილმი ნაწილი 8",
        description: "საზოგადოებრივი მოღვაწეობის შედეგები",
        url: "/videos/ilia-8.mp4"
      }
    ]
  };

  const char = character || defaultCharacter;
  const totalPages = 5; // Changed from 6 to 5

  // Improved scroll event handler with debouncing
  const handleScroll = () => {
    if (!bookContainerRef.current || isScrolling) return;
    
    const container = bookContainerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    
    // Calculate current page based on scroll position
    const pageHeight = container.scrollHeight / totalPages;
    const currentPageIndex = Math.floor(scrollTop / pageHeight);
    
    const newPage = Math.min(currentPageIndex, totalPages - 1);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  // გვერდების სტრუქტურა და ნავიგაცია
  const pageStructure = {
    totalPages: 5,
    fixedPages: [0, 1], // ფიქსირებული გვერდები (ჩატი და ინფო)
    videoPages: [3, 4], // ვიდეო გვერდები
    spreadPages: [2] // გაშლილი გვერდები (ციტატები)
  };

  // გვერდების ნავიგაციის ლოგიკა
  const canNavigateToPage = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= pageStructure.totalPages) return false;
    
    // ფიქსირებული გვერდები ყოველთვის ხელმისაწვდომია
    if (pageStructure.fixedPages.includes(pageIndex)) return true;
    
    // ვიდეო გვერდები მხოლოდ მაშინ, როცა ვიდეოები ხელმისაწვდომია
    if (pageStructure.videoPages.includes(pageIndex)) {
      return char.videos && char.videos.length > 0;
    }
    
    return true;
  };

  // Navigate to specific page with improved logic
  const goToPage = (pageIndex: number) => {
    if (!bookContainerRef.current || !canNavigateToPage(pageIndex)) {
      console.log(`Cannot navigate to page ${pageIndex + 1}`);
      return;
    }
    
    setIsScrolling(true);
    const container = bookContainerRef.current;
    const pageHeight = container.scrollHeight / pageStructure.totalPages;
    const targetScrollTop = pageIndex * pageHeight;
    
    // Add smooth scrolling with better timing
    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });
    
    setCurrentPage(pageIndex);
    
    // Reset scrolling flag after animation with longer delay
    setTimeout(() => {
      setIsScrolling(false);
    }, 1500);
  };

  // Keyboard navigation with improved controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      switch(e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          if (currentPage > 0) {
            const prevPage = currentPage - 1;
            if (canNavigateToPage(prevPage)) {
              goToPage(prevPage);
            }
          }
          break;
        case 'ArrowDown':
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          if (currentPage < pageStructure.totalPages - 1) {
            const nextPage = currentPage + 1;
            if (canNavigateToPage(nextPage)) {
              goToPage(nextPage);
            }
          }
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          e.preventDefault();
          const pageIndex = parseInt(e.key) - 1;
          if (canNavigateToPage(pageIndex)) {
            goToPage(pageIndex);
          }
          break;
        case 'Home':
          e.preventDefault();
          goToPage(0);
          break;
        case 'End':
          e.preventDefault();
          goToPage(pageStructure.totalPages - 1);
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          // Toggle help overlay
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isScrolling]);

  // Add scroll event listener with improved throttling
  useEffect(() => {
    const container = bookContainerRef.current;
    if (container) {
      let scrollTimeout: NodeJS.Timeout | null = null;
      
      const throttledScroll = () => {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 150); // Increased from 100 to 150ms
      };
      
      container.addEventListener('scroll', throttledScroll);
      return () => {
        container.removeEventListener('scroll', throttledScroll);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    }
  }, [currentPage, isScrolling]);

  // Group videos into pages of 4
  const groupVideosIntoPages = (videos: any[], videosPerPage: number = 4) => {
    const pages = [];
    for (let i = 0; i < videos.length; i += videosPerPage) {
      pages.push(videos.slice(i, i + videosPerPage));
    }
    return pages;
  };

  const videoPages = groupVideosIntoPages(char.videos, 4);

  // XIX საუკუნის ვიზუალური ეფექტები
  useEffect(() => {
    // სანთლის ციმციმის ეფექტი
    const candleEffect = () => {
      const bookElement = document.querySelector('.book');
      if (bookElement) {
        bookElement.classList.add('candlelight-mode');
      }
    };

    // ღამის რეჟიმის შემოწმება
    const checkNightMode = () => {
      const hour = new Date().getHours();
      if (hour > 20 || hour < 6) {
        candleEffect();
      }
    };

    checkNightMode();
    const interval = setInterval(checkNightMode, 60000); // ყოველ წუთს

    return () => clearInterval(interval);
  }, []);

  // ვერტიკალური გვერდებიანი განლაგება
  return (
    <div className="book-container">
      {/* Page Navigation */}
      <div className="page-navigation">
        <div className="page-indicators">
          {Array.from({ length: pageStructure.totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-indicator ${currentPage === index ? 'active' : ''} ${!canNavigateToPage(index) ? 'disabled' : ''}`}
              onClick={() => canNavigateToPage(index) && goToPage(index)}
              title={`გვერდი ${index + 1}${!canNavigateToPage(index) ? ' (არ არის ხელმისაწვდომი)' : ''}`}
              disabled={!canNavigateToPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="page-info">
          გვერდი {currentPage + 1} / {pageStructure.totalPages}
        </div>
      </div>

      {/* Book Content */}
      <div className="book-vertical-container" ref={bookContainerRef}>
        {/* გვერდი 1: ჩატი */}
        <div 
          className="book-page chat-page" 
          ref={(el) => pageRefs.current[0] = el}
        >
          <div className="page-header">
            <h2 className="page-title">საუბარი {char.name.ka}-თან</h2>
          </div>
          <div className="chat-section">
            <div className="messages-area">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
                  <p>{msg.text}</p>
                  <span className="time">{msg.time}</span>
                </div>
              ))}
            </div>
            <div className="input-area">
              <textarea
                className="message-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="დაწერეთ თქვენი შეტყობინება..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim()) {
                      setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user', time: new Date().toLocaleTimeString() }]);
                      setInput('');
                    }
                  }
                }}
              />
              <button
                className="send-btn"
                onClick={() => {
                  if (input.trim()) {
                    setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user', time: new Date().toLocaleTimeString() }]);
                    setInput('');
                  }
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>

        {/* გვერდი 2: ძირითადი ინფორმაცია */}
        <div 
          className="book-page info-page"
          ref={(el) => pageRefs.current[1] = el}
        >
          <div className="page-header">
            <h2 className="page-title">ძირითადი ინფორმაცია</h2>
          </div>
          <div className="info-section">
            <CharacterInfoPage character={char} />
          </div>
        </div>

        {/* გვერდი 3: ციტატები */}
        <div 
          className="book-page quotes-page"
          ref={(el) => pageRefs.current[2] = el}
        >
          <div className="page-header">
            <h2 className="page-title">ციტატები და იდეები</h2>
          </div>
          <div className="quotes-section">
            <div className="quotes-container">
              <div className="quote-card">
                <blockquote>
                  "ქართული ენა არის ჩვენი ეროვნული უნარის ძირითადი საფუძველი"
                </blockquote>
                <cite>- ილია ჭავჭავაძე</cite>
              </div>
              <div className="quote-card">
                <blockquote>
                  "განათლება არის თავისუფლების გზა"
                </blockquote>
                <cite>- ილია ჭავჭავაძე</cite>
              </div>
              <div className="quote-card">
                <blockquote>
                  "ერი, რომელიც არ იცის თავისი ისტორია, ვერ შეძლებს მომავლის აშენებას"
                </blockquote>
                <cite>- ილია ჭავჭავაძე</cite>
              </div>
            </div>
          </div>
        </div>

        {/* გვერდი 4: ვიდეოები - პირველი 4 */}
        {char.videos && char.videos.length > 0 && (
          <div 
            className="book-page videos-page"
            ref={(el) => pageRefs.current[3] = el}
          >
            <div className="page-header">
              <h2 className="page-title">დოკუმენტური ფილმები (1-4)</h2>
            </div>
            <div className="videos-section">
              <div className="videos-grid">
                {videoPages[0]?.map((video, index) => (
                  <div key={video.number} className="video-item">
                    <VideoPage 
                      videoNumber={video.number}
                      title={video.title}
                      description={video.description}
                      videoUrl={video.url}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* გვერდი 5: ვიდეოები - მეორე 4 */}
        {char.videos && char.videos.length > 4 && (
          <div 
            className="book-page videos-page"
            ref={(el) => pageRefs.current[4] = el}
          >
            <div className="page-header">
              <h2 className="page-title">დოკუმენტური ფილმები (5-8)</h2>
            </div>
            <div className="videos-section">
              <div className="videos-grid">
                {videoPages[1]?.map((video, index) => (
                  <div key={video.number} className="video-item">
                    <VideoPage 
                      videoNumber={video.number}
                      title={video.title}
                      description={video.description}
                      videoUrl={video.url}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book; 