import React, { useState } from 'react';
import './ChatPage.css';

const ChatPage = ({ character }) => {
  // Default character data if none provided
  const defaultCharacter = {
    name: "ილია ჭავჭავაძე",
    title: "საზოგადო მოღვაწე, მწერალი, პუბლიცისტი",
    greeting: "გამარჯობა! მე ვარ ილია ჭავჭავაძე. შეგიძლიათ მკითხოთ ჩემს ცხოვრებაზე, მუშაობაზე და იდეალებზე."
  };

  const char = character || defaultCharacter;

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: char.greeting,
      sender: 'ilia',
      time: '09:27 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        time: new Date().toLocaleTimeString('ka-GE', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      
      setMessages([...messages, newMessage]);
      setInput('');
      setIsLoading(true);
      
      // სიმულირებული AI პასუხი
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: `მადლობა კითხვისთვის. [აქ იქნება ${char.name}-ის რეალური პასუხი]`,
          sender: 'ilia',
          time: new Date().toLocaleTimeString('ka-GE', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-page-content">
      <div className="ornamental-border">
        <h2 className="chat-title">საუბარი {char.name}-თან</h2>
        
        <div className="chat-window">
          <div className="messages-area">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <p>{message.text}</p>
                <span className="timestamp">{message.time}</span>
              </div>
            ))}
            {isLoading && (
              <div className="message ilia">
                <p>წერისას...</p>
                <span className="timestamp">{new Date().toLocaleTimeString('ka-GE', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
            )}
          </div>
          
          <div className="input-area">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="დაწერეთ თქვენი შეკითხვა..."
              rows="3"
            />
            <button className="send-btn" onClick={handleSend}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 