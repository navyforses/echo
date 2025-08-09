import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
  isLoading?: boolean;
  placeholder?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onSendMessage,
  messages,
  isLoading = false,
  placeholder
}) => {
  const { t, i18n } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(i18n.language === 'ka' ? 'ka-GE' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-cream-50 to-cream-100 rounded-lg shadow-lg">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-bordeaux-600 text-cream-100 rounded-br-none'
                    : 'bg-gold-100 rounded-bl-none border border-gold-200 chat-message'
                }`}
              >
                <p 
                  className={`text-sm ${i18n.language === 'ka' ? 'font-georgian' : 'font-body'} ${
                    message.sender === 'user' ? 'chat-message-user' : 'chat-message-text'
                  }`}
                >
                  {message.text}
                </p>
                <p 
                  className={`text-xs mt-1 opacity-70 ${
                    message.sender === 'user' ? 'chat-message-user' : 'chat-message-text'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gold-100 rounded-lg rounded-bl-none border border-gold-200 px-4 py-2 chat-message">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-bordeaux-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-bordeaux-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-bordeaux-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gold-200 bg-cream-50 rounded-b-lg">
        <div className="flex space-x-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || (i18n.language === 'ka' ? 'დაწერეთ თქვენი შეკითხვა...' : 'Type your question...')}
            className={`flex-1 resize-none border border-gold-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent chat-input-enhanced ${
              i18n.language === 'ka' ? 'font-georgian' : 'font-body'
            }`}
            rows={1}
            disabled={isLoading}
            style={{ 
              minHeight: '44px', 
              maxHeight: '120px'
            }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-bordeaux-600 hover:bg-bordeaux-700 disabled:bg-bordeaux-400 text-cream-100 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center min-w-[44px]"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-cream-100 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface; 