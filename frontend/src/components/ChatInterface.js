 import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, RefreshCw, Settings } from 'lucide-react';
 
 const ChatInterface = () => {
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState('');
   const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
 
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

   const handleSubmit = async (e) => {
     e.preventDefault();
     if (!input.trim()) return;
 
    const userMessage = { role: 'user', content: input };
    const userMessage = { role: 'user', content: input, timestamp: new Date() };
     setMessages(prev => [...prev, userMessage]);
     setInput('');
     setIsLoading(true);
 
    // Simulate API call
     setTimeout(() => {
      const assistantMessage = { role: 'assistant', content: 'This is a simulated response. In a real implementation, this would connect to the DeepSeek API.' };
      const assistantMessage = { 
        role: 'assistant', 
        content: 'This is a modernized response. The interface now features glassmorphism effects, smooth animations, and a dark theme that\'s easy on the eyes.',
        timestamp: new Date()
      };
       setMessages(prev => [...prev, assistantMessage]);
       setIsLoading(false);
     }, 1000);
   };
 
   return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="message assistant">Thinking...</div>}
    <div className="App">
      <header className="app-header">
        <h1><Sparkles size={24} /> DeepSeek Clone</h1>
        <div className="header-actions">
          <button className="btn-icon" title="New Chat"><RefreshCw size={20} /></button>
          <button className="btn-icon" title="Settings"><Settings size={20} /></button>
        </div>
      </header>
      
      <div className="main-content">
        {messages.length === 0 ? (
          <div className="welcome-section">
            <h2>Welcome to DeepSeek</h2>
            <p>Experience the next generation of AI conversation with a modern, intuitive interface.</p>
            <div className="feature-cards">
              <div className="feature-card">
                <h3>💬 Natural Conversations</h3>
                <p>Engage in fluid, context-aware discussions with advanced AI.</p>
              </div>
              <div className="feature-card">
                <h3>⚡ Fast Responses</h3>
                <p>Get quick, accurate answers powered by modern language models.</p>
              </div>
              <div className="feature-card">
                <h3>🔒 Privacy First</h3>
                <p>Your conversations are secure and private by design.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-container">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-avatar">
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-avatar"><Bot size={20} /></div>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        <form className="input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            <Send size={20} />
          </button>
        </form>
       </div>
      <form className="input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
     </div>
   );
 };
 
 export default ChatInterface;
