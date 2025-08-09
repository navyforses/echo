import React, { useEffect } from 'react';

interface VintageBookProps {
  author: {
    id: string;
    name: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    achievements: string[];
    quotes: string[];
    videos: string[];
  };
}

const VintageBook: React.FC<VintageBookProps> = ({ author }) => {
  useEffect(() => {
    // Add external scripts
    const addScript = (src: string) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    };

    // Add external stylesheets
    const addStylesheet = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };

    // Add required external resources
    addScript('https://cdn.tailwindcss.com');
    addScript('https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js');
    addStylesheet('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Noto+Serif+Georgian:wght@400;700&display=swap');

    // Add CSS for page flipping
    const style = document.createElement('style');
    style.textContent = `
      .flippable.flipped {
        transform: rotateY(-180deg) !important;
      }
      .flippable {
        transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
      }
    `;
    document.head.appendChild(style);

    // Add the main script after a delay to ensure Tone.js is loaded
    setTimeout(() => {
      const script = document.createElement('script');
      script.innerHTML = `
        document.addEventListener('DOMContentLoaded', () => {
            const pages = document.querySelectorAll('.flippable');
            const videos = document.querySelectorAll('.video-player');
            let maxZIndex = pages.length + 5;
            let audioStarted = false;

            // Initialize the paper sound effect
            const paperSound = new Tone.NoiseSynth({
                noise: { type: 'white' },
                envelope: { attack: 0.005, decay: 0.15, sustain: 0.01, release: 0.2 }
            }).toDestination();
            paperSound.volume.value = -18; // Adjust volume to be subtle

            pages.forEach((page, index) => {
                page.style.zIndex = pages.length - index + 4;

                page.addEventListener('click', function(e) {
                    // Prevent click if clicking on interactive elements
                    if (e.target.closest('button, input, a, video, .video-container, .chat-container, .chat-messages, .chat-input-area')) {
                        return;
                    }

                    // Start audio context on first user interaction
                    if (!audioStarted) {
                        Tone.start();
                        audioStarted = true;
                    }
                    
                    // Play sound effect
                    paperSound.triggerAttackRelease("8n");

                    // Pause all videos
                    videos.forEach(video => video.pause());
                    
                    // Toggle flipped class
                    this.classList.toggle('flipped');
                    
                    // Update z-index when flipped
                    if (this.classList.contains('flipped')) {
                        this.style.zIndex = maxZIndex++;
                    } else {
                        this.style.zIndex = pages.length - index + 4;
                    }
                });
            });

            // --- AI Chatbot Logic ---
            const chatInput = document.getElementById('chat-input');
            const sendBtn = document.getElementById('chat-send-btn');
            const messagesContainer = document.getElementById('chat-messages');

            const addMessage = (text, sender) => {
                const typingIndicator = messagesContainer.querySelector('.typing-indicator');
                if (typingIndicator) typingIndicator.remove();

                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', \`\${sender}-message\`);
                messageDiv.textContent = text;
                messagesContainer.appendChild(messageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            };

            const showTypingIndicator = () => {
                const typingIndicator = document.createElement('div');
                typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
                typingIndicator.textContent = '\${author.name} ბეჭდავს...';
                messagesContainer.appendChild(typingIndicator);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            const handleSendMessage = async () => {
                const userText = chatInput.value.trim();
                if (!userText) return;

                addMessage(userText, 'user');
                chatInput.value = '';
                showTypingIndicator();

                try {
                    const prompt = \`You are the digital spirit of \${author.name}, the great Georgian \${author.title}. Your personality is wise, patriotic, and deeply concerned with the fate of your homeland. You are a bit formal but very eloquent. Respond to the user's message in Georgian, maintaining this persona. Speak about literature, national identity, progress, and Georgia's future. User's message: "\${userText}"\`;
                    
                    const apiKey = ""; // Canvas will provide the key
                    const apiUrl = \`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=\${apiKey}\`;

                    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) throw new Error(\`API error: \${response.statusText}\`);

                    const result = await response.json();
                    
                    let botResponse = "ბოდიშს ვიხდი, ამჟამად ფიქრები გამიფანტა. სცადეთ მოგვიანებით.";
                    if (result.candidates && result.candidates[0]?.content?.parts[0]) {
                       botResponse = result.candidates[0].content.parts[0].text;
                    }
                    addMessage(botResponse, 'bot');

                } catch (error) {
                    console.error("Error fetching AI response:", error);
                    addMessage("უკაცრავად, ჩემს მექანიზმში მცირე ხარვეზია. გთხოვთ, ცოტა ხანში ისევ მესტუმრეთ.", 'bot');
                }
            };

            if (sendBtn) {
                sendBtn.addEventListener('click', handleSendMessage);
            }
            if (chatInput) {
                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') handleSendMessage();
                });
            }
        });
      `;
      document.body.appendChild(script);
    }, 1000);

    return () => {
      // Cleanup if needed
    };
  }, [author]);

  return (
    <div 
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Noto Serif Georgian, serif',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        position: 'relative'
      }}
    >
      <div 
        className="book-container" 
        id="book-container"
        style={{
          width: '85vw',
          height: '75vh',
          maxWidth: '1100px',
          maxHeight: '750px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          perspective: '3000px'
        }}
      >
        <div 
          className="book" 
          id="book"
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.3))'
          }}
        >
          {/* Static Left Page (Chat) */}
          <div 
            className="page left"
            style={{
              width: '50%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '2.5rem 3rem',
              boxSizing: 'border-box',
              overflow: 'hidden',
              backgroundColor: '#fdf5e6',
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.15)',
              border: '1px solid #d3c7b1',
              borderRight: 'none',
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
              // Burnt effect
              background: `
                radial-gradient(ellipse at top left, rgba(139,69,19,0.1) 0%, transparent 50%),
                radial-gradient(ellipse at bottom right, rgba(139,69,19,0.05) 0%, transparent 50%),
                url("https://www.transparenttextures.com/patterns/old-paper.png"),
                #fdf5e6
              `
            }}
          >
            {/* Ornamental corner decorations */}
            <div 
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                width: '40px',
                height: '40px',
                background: 'radial-gradient(circle, rgba(212,165,116,0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                border: '2px solid rgba(212,165,116,0.2)'
              }}
            ></div>
            <div 
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                width: '30px',
                height: '30px',
                background: 'radial-gradient(circle, rgba(212,165,116,0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                border: '1px solid rgba(212,165,116,0.15)'
              }}
            ></div>

            <div 
              className="page-content"
              style={{
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                paddingRight: '15px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#c5a47e transparent'
              }}
            >
              <h2 
                className="page-title text-3xl"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2d1b0e',
                  fontWeight: '900',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  fontSize: '2rem'
                }}
              >
                საუბარი {author.name}-თან
              </h2>
              <div 
                className="chat-container"
                style={{
                  border: '2px solid #c5a47e',
                  borderRadius: '12px',
                  width: '100%',
                  height: '85%', // Reduced from 100% to 85% (15% reduction)
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(253, 245, 230, 0.8)',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
                }}
              >
                <div 
                  className="chat-messages" 
                  id="chat-messages"
                  style={{ flexGrow: 1, padding: '1rem', overflowY: 'auto' }}
                >
                  <div 
                    className="message bot-message"
                    style={{
                      marginBottom: '0.8rem',
                      maxWidth: '85%',
                      padding: '0.7rem 1rem',
                      backgroundColor: '#e8d5b7',
                      borderRadius: '12px 12px 12px 0',
                      marginRight: 'auto',
                      color: '#2d1b0e',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  >
                    მოგესალმებით. რით შემიძლია გემსახუროთ ჩემი მამულისთვის?
                  </div>
                </div>
                <div 
                  className="chat-input-area"
                  style={{ display: 'flex', padding: '0.5rem', borderTop: '2px solid #c5a47e' }}
                >
                  <input 
                    type="text" 
                    id="chat-input" 
                    className="chat-input"
                    placeholder="დაწერეთ შეტყობინება..."
                    style={{
                      flexGrow: 1,
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.75rem',
                      background: '#f3eade',
                      fontFamily: 'Noto Serif Georgian, serif',
                      color: '#2d1b0e',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  />
                  <button 
                    id="chat-send-btn" 
                    className="chat-send-btn"
                    style={{
                      marginLeft: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: '#856a4d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      fontWeight: '600'
                    }}
                  >
                    გაგზავნა
                  </button>
                </div>
              </div>
            </div>
            <div 
              className="page-number left"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '25px',
                fontSize: '0.9rem',
                color: '#8b6f4c',
                fontFamily: 'Playfair Display, serif',
                fontWeight: '700'
              }}
            >
              1
            </div>
          </div>

          {/* Static Right Page (Bio) */}
          <div 
            className="page right"
            style={{
              width: '50%',
              height: '100%',
              position: 'absolute',
              top: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '2.5rem 3rem',
              boxSizing: 'border-box',
              overflow: 'hidden',
              backgroundColor: '#fdf5e6',
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.15)',
              border: '1px solid #d3c7b1',
              borderLeft: 'none',
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
              // Burnt effect
              background: `
                radial-gradient(ellipse at top right, rgba(139,69,19,0.1) 0%, transparent 50%),
                radial-gradient(ellipse at bottom left, rgba(139,69,19,0.05) 0%, transparent 50%),
                url("https://www.transparenttextures.com/patterns/old-paper.png"),
                #fdf5e6
              `
            }}
          >
            {/* Ornamental corner decorations */}
            <div 
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '40px',
                height: '40px',
                background: 'radial-gradient(circle, rgba(212,165,116,0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                border: '2px solid rgba(212,165,116,0.2)'
              }}
            ></div>
            <div 
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '30px',
                height: '30px',
                background: 'radial-gradient(circle, rgba(212,165,116,0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                border: '1px solid rgba(212,165,116,0.15)'
              }}
            ></div>

            <div 
              className="page-content"
              style={{
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                paddingRight: '15px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#c5a47e transparent'
              }}
            >
              <h2 
                className="page-title text-3xl"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2d1b0e',
                  fontWeight: '900',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  fontSize: '2rem'
                }}
              >
                {author.title}
              </h2>
              <img 
                src={author.image}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/200x250/8c6f4c/fdf5e6?text=${author.name.split(' ')[0]}`;
                }}
                alt={`${author.name}-ის ფოტო`}
                className="mx-auto rounded-md shadow-lg mb-6 border-4 border-amber-800/30" 
                style={{ 
                  filter: 'sepia(0.7)', 
                  maxWidth: '180px',
                  display: 'block',
                  margin: '0 auto 1.5rem auto',
                  borderRadius: '0.375rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: '4px solid rgba(146, 64, 14, 0.3)'
                }}
              />
              <p 
                className="calligraphy text-justify text-base"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#2d1b0e',
                  textAlign: 'justify',
                  fontWeight: '600'
                }}
              >
                {author.description}
              </p>
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI4MCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzVjNGIzYSIgc3Ryb2tlLW9wYWNpdHk9Ii43IiBzdHJva2Utd2lkdGg9IjEuNSI+PHBhdGggZD0iTTEwIDVoMjYwIj48L3BhdGg+PHBhdGggZD0iTTMwIDE1aDEwTTUwIDE1aDE4ME0yNDAgMTVoMTBNMjYwIDE1aDEwIj48L3BhdGg+PHBhdGggZD0iTTEwIDI1aDI2MCI+PC9wYXRoPjwvZz48ZyBmaWxsPSIjNWM0YjNhIiBmaWxsLW9wYWNpdHk9Ii43Ij48Y2lyY2xlIGN4PSI0NCIgY3k9IjE1IiByPSIyLjUiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjIzNiIgY3k9IjE1IiByPSIyLjUiPjwvY2lyY2xlPjwvZz48L3N2Zz4=" 
                className="ornament" 
                alt="Ornament"
                style={{
                  width: '60%',
                  margin: '1.5rem 0',
                  opacity: '0.6'
                }}
              />
            </div>
            <div 
              className="page-number right"
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '25px',
                fontSize: '0.9rem',
                color: '#8b6f4c',
                fontFamily: 'Playfair Display, serif',
                fontWeight: '700'
              }}
            >
              2
            </div>
          </div>

          {/* Flippable Pages */}
          {author.videos.map((video, index) => (
            <div 
              key={index}
              className="flippable" 
              id={`p${index + 1}`} 
              style={{
                cursor: 'pointer',
                position: 'absolute',
                width: '50%',
                height: '100%',
                top: 0,
                right: 0,
                transformOrigin: 'left center',
                transition: 'transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1)',
                transformStyle: 'preserve-3d',
                zIndex: 5 - index
              }}
            >
              <div 
                className="front"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  padding: '2.5rem 3rem',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: '#fdf5e6',
                  backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")',
                  border: '1px solid #d3c7b1',
                  boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1)',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                  // Burnt effect
                  background: `
                    radial-gradient(ellipse at top right, rgba(139,69,19,0.1) 0%, transparent 50%),
                    radial-gradient(ellipse at bottom left, rgba(139,69,19,0.05) 0%, transparent 50%),
                    url("https://www.transparenttextures.com/patterns/old-paper.png"),
                    #fdf5e6
                  `
                }}
              >
                {/* Ornamental corner decorations */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '35px',
                    height: '35px',
                    background: 'radial-gradient(circle, rgba(212,165,116,0.25) 0%, transparent 70%)',
                    borderRadius: '50%',
                    border: '1px solid rgba(212,165,116,0.15)'
                  }}
                ></div>

                <div 
                  className="page-content"
                  style={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',
                    paddingRight: '15px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#c5a47e transparent'
                  }}
                >
                  <h3 
                    className="page-title text-2xl"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      color: '#2d1b0e',
                      fontWeight: '900',
                      textAlign: 'center',
                      marginBottom: '1.5rem',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      fontSize: '1.5rem'
                    }}
                  >
                    {author.quotes[index] || 'ციტატა'}
                  </h3>
                  <div 
                    className="video-container"
                    style={{
                      width: '90%',
                      maxWidth: '480px',
                      padding: '10px',
                      background: '#d1c2a5',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2), inset 0 0 8px rgba(0,0,0,0.2)',
                      borderRadius: '8px',
                      marginTop: '1.5rem'
                    }}
                  >
                    <video 
                      className="video-player" 
                      controls 
                      preload="metadata"
                      style={{ width: '100%', display: 'block', border: '1px solid #504031', borderRadius: '4px' }}
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                  </div>
                  <p 
                    className="calligraphy text-center mt-6"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontStyle: 'italic',
                      fontSize: '1.1rem',
                      lineHeight: '1.7',
                      color: '#2d1b0e',
                      textAlign: 'center',
                      marginTop: '1.5rem',
                      fontWeight: '600'
                    }}
                  >
                    {author.quotes[index + 1] || 'ციტატა'}
                  </p>
                </div>
                <div 
                  className="page-number right"
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '25px',
                    fontSize: '0.9rem',
                    color: '#8b6f4c',
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: '700'
                  }}
                >
                  {index * 2 + 3}
                </div>
              </div>
              <div 
                className="back"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  padding: '2.5rem 3rem',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: '#fdf5e6',
                  backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")',
                  border: '1px solid #d3c7b1',
                  boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1)',
                  transform: 'rotateY(180deg)',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                  // Burnt effect
                  background: `
                    radial-gradient(ellipse at top left, rgba(139,69,19,0.1) 0%, transparent 50%),
                    radial-gradient(ellipse at bottom right, rgba(139,69,19,0.05) 0%, transparent 50%),
                    url("https://www.transparenttextures.com/patterns/old-paper.png"),
                    #fdf5e6
                  `
                }}
              >
                {/* Ornamental corner decorations */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    width: '35px',
                    height: '35px',
                    background: 'radial-gradient(circle, rgba(212,165,116,0.25) 0%, transparent 70%)',
                    borderRadius: '50%',
                    border: '1px solid rgba(212,165,116,0.15)'
                  }}
                ></div>

                <div 
                  className="page-content"
                  style={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',
                    paddingRight: '15px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#c5a47e transparent'
                  }}
                >
                  <h3 
                    className="page-title text-2xl"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      color: '#2d1b0e',
                      fontWeight: '900',
                      textAlign: 'center',
                      marginBottom: '1.5rem',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      fontSize: '1.5rem'
                    }}
                  >
                    {author.quotes[index + 2] || 'ციტატა'}
                  </h3>
                  <div 
                    className="video-container"
                    style={{
                      width: '90%',
                      maxWidth: '480px',
                      padding: '10px',
                      background: '#d1c2a5',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2), inset 0 0 8px rgba(0,0,0,0.2)',
                      borderRadius: '8px',
                      marginTop: '1.5rem'
                    }}
                  >
                    <video 
                      className="video-player" 
                      controls 
                      preload="metadata"
                      style={{ width: '100%', display: 'block', border: '1px solid #504031', borderRadius: '4px' }}
                    >
                      <source src={author.videos[index + 1] || video} type="video/mp4" />
                    </video>
                  </div>
                  <p 
                    className="calligraphy text-center mt-6"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontStyle: 'italic',
                      fontSize: '1.1rem',
                      lineHeight: '1.7',
                      color: '#2d1b0e',
                      textAlign: 'center',
                      marginTop: '1.5rem',
                      fontWeight: '600'
                    }}
                  >
                    {author.quotes[index + 3] || 'ციტატა'}
                  </p>
                </div>
                <div 
                  className="page-number left"
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '25px',
                    fontSize: '0.9rem',
                    color: '#8b6f4c',
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: '700'
                  }}
                >
                  {index * 2 + 4}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VintageBook; 