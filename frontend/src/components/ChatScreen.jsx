import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Copy, CheckCircle, Clock } from 'lucide-react';
import io from 'socket.io-client';

export default function ChatScreen() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        return parsed.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
          copied: false
        }));
      } catch (error) {
        console.error('Error parsing chat history:', error);
      }
    }
    return [
      { 
        id: 1, 
        text: '👋 Hey! How can I help you today?', 
        sender: 'bot', 
        timestamp: new Date(),
        copied: false 
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const messageIdRef = useRef(messages.length > 0 ? Math.max(...messages.map(m => m.id)) : 0);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(
      messages.map(({ copied, ...msg }) => msg)
    ));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Initialize Socket.io connection
    const socket = io('http://localhost:3000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    socket.on('connect', () => {
      console.log('Connected to backend server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from backend server');
    });

    socket.on('ai-response', (response) => {
      setIsLoading(false);
      const botMessage = {
        id: ++messageIdRef.current,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        copied: false
      };
      setMessages(prev => [...prev, botMessage]);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessageText = input;
    const newId = ++messageIdRef.current;

    const userMessage = {
      id: newId,
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
      copied: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Emit message to backend via Socket.io
    if (socketRef.current) {
      socketRef.current.emit('ai-message', userMessageText);
    } else {
      setIsLoading(false);
      console.error('Socket.io connection not established');
    }
  };

  const handleCopyMessage = (messageId, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear the conversation history? This action cannot be undone.')) {
      const initialMessage = {
        id: 1,
        text: '👋 Hey! How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
        copied: false
      };
      setMessages([initialMessage]);
      localStorage.removeItem('chatHistory');
    }
  };

  const messageCount = messages.length - 1;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-5 shadow-2xl border-b border-indigo-500 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-300 to-indigo-400 flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold">💬</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ram Assistant</h1>
            <div className="flex items-center gap-1.5 text-indigo-100 text-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Online • {messageCount} {messageCount === 1 ? 'message' : 'messages'}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleClearHistory}
          className="bg-red-500/80 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          title="Clear chat history"
        >
          <Trash2 size={18} />
          <span className="text-sm hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            style={{
              animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s backwards`
            }}
          >
            <div className="flex items-end gap-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                  🤖
                </div>
              )}
              
              <div
                className={`group relative px-4 py-3 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-none'
                    : 'bg-slate-700 text-slate-50 rounded-bl-none border border-slate-600'
                }`}
              >
                <p className="text-sm sm:text-base leading-relaxed break-words">{message.text}</p>
                
                <div className={`flex items-center gap-2 mt-1.5 text-xs ${
                  message.sender === 'user' ? 'text-indigo-100' : 'text-slate-400'
                }`}>
                  <Clock size={12} />
                  {formatTime(message.timestamp)}
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopyMessage(message.id, message.text)}
                  className={`absolute -top-2 -right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-90 group-hover:scale-100 shadow-lg ${
                    copiedId === message.id
                      ? 'bg-emerald-500 text-white'
                      : message.sender === 'user'
                      ? 'bg-indigo-700 text-indigo-100 hover:bg-indigo-600'
                      : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                  }`}
                  title="Copy message"
                >
                  {copiedId === message.id ? (
                    <CheckCircle size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                  👤
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                🤖
              </div>
              <div className="bg-slate-700 text-slate-50 rounded-2xl rounded-bl-none px-4 py-3 shadow-md border border-slate-600">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700 p-4 sm:p-5 shadow-2xl">
        <div className="flex gap-3 items-end max-w-6xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Shift+Enter for new line)"
              className="w-full resize-none border border-slate-600 rounded-xl px-4 py-3 bg-slate-700 text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 text-sm sm:text-base"
              rows="1"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            {input.length > 0 && (
              <span className="absolute bottom-3 right-4 text-xs text-slate-400 pointer-events-none">
                {input.length} {input.length === 1 ? 'char' : 'chars'}
              </span>
            )}
          </div>

          <button
            onClick={handleSendMessage}
            disabled={input.trim() === '' || isLoading}
            className={`flex-shrink-0 px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
              input.trim() === '' || isLoading
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
            title="Send message (Enter)"
          >
            <Send size={20} />
            <span className="text-sm hidden sm:inline">Send</span>
          </button>
        </div>
        
        <p className="text-xs text-slate-400 mt-2 text-center">
          Press <span className="bg-slate-700 px-2 py-1 rounded text-slate-300 font-mono">Enter</span> to send • <span className="bg-slate-700 px-2 py-1 rounded text-slate-300 font-mono">Shift + Enter</span> for new line
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
