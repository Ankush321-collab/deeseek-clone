import React, { useState, useEffect } from 'react'
import Sidebar from './sidebar'
import Prompt from './Prompt'
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null);

  // On mount, load last active conversation from localStorage and conversations
  useEffect(() => {
    const lastId = localStorage.getItem('activeConversationId');
    if (lastId) setActiveConversationId(lastId);
    const userObj = JSON.parse(localStorage.getItem("user"));
    setUser(userObj);
    if (userObj) {
      const stored = localStorage.getItem(`conversations_${userObj._id}`);
      if (stored) setConversations(JSON.parse(stored));
    }
  }, []);

  // Whenever activeConversationId changes, save it
  useEffect(() => {
    if (activeConversationId) {
      localStorage.setItem('activeConversationId', activeConversationId);
    }
  }, [activeConversationId]);

  // Whenever conversations change, save to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`conversations_${user._id}`, JSON.stringify(conversations));
    }
  }, [conversations, user]);

  // Handler to create a new chat
  const handleNewChat = () => {
    if (!user) return;
    const newConv = {
      id: uuidv4(),
      createdAt: Date.now(),
      title: "New Chat",
      messages: [],
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
  };

  // Handler to select a conversation
  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
  };

  return (
    <div className='flex h-screen bg-[#1e1e1e] text-white'>
        {/* sidebar */}
        <div className='w-64 bg-[#232327]'>
          <Sidebar
            user={user}
            onNewChat={handleNewChat}
            onSelectConversation={handleSelectConversation}
            selectedConversationId={activeConversationId}
            conversations={conversations}
            setConversations={setConversations}
          />
        </div>
        {/* prompt */}
        <div className='flex-1 flex flex-col w-full'>
        <div className='flex-1 flex items-center justify-center px-6'>
          <Prompt
            activeConversationId={activeConversationId}
            setActiveConversationId={setActiveConversationId}
            conversations={conversations}
            setConversations={setConversations}
          />
          </div>
        </div>
    </div>
  )
}

export default Home