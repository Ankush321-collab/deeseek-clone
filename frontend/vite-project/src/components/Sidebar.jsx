import React from "react";
import { X, Plus } from "lucide-react";
import profile from "../../public/user.png";
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

function Sidebar({ user, onSelectConversation, selectedConversationId, onNewChat, conversations, setConversations }) {
  const[,setAuthUser]=useAuth();
  const navigate=useNavigate();

  // Delete a conversation
  const handleDelete = (id) => {
    const updated = conversations.filter((c) => c.id !== id);
    setConversations(updated);
    // Optionally, select another conversation if the current one is deleted
    if (selectedConversationId === id && updated.length > 0) {
      onSelectConversation(updated[0].id);
    }
  };

  // Handle selecting a conversation
  const handleSelect = (id) => {
    if (onSelectConversation) onSelectConversation(id);
  };

  // Handle new chat
  const handleNewChat = () => {
    if (onNewChat) onNewChat();
  };

  // Helper to format timestamp
  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
  };

  return (
    <div className="p-4 h-full flex flex-col bg-[#232327]">
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='text-2xl'>deepseek</div>
        <button className='p-1.5 rounded-md hover:bg-gray-700'>
          <X className='w-5 h-5' />
        </button>
      </div>

      {/* New Chat Button */}
      <button
        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl mb-4"
        onClick={handleNewChat}
      >
        <Plus size={20} />
        <span>New chat</span>
      </button>

      {/* Conversation History Section */}
      <div className='flex-1 overflow-y-auto'>
        <h3 className="text-lg font-bold mb-2">History</h3>
        {conversations.length === 0 && (
          <div className="text-gray-400 text-sm">No chat history</div>
        )}
        {conversations.map((conv) => {
          const lastMsg = conv.messages && conv.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null;
          return (
            <div
              key={conv.id}
              className={`flex flex-col bg-gray-800 rounded px-2 py-1 mb-1 cursor-pointer ${
                selectedConversationId === conv.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleSelect(conv.id)}
            >
              <div className="flex items-center justify-between">
                <span className="truncate max-w-[140px] font-semibold">
                  {conv.title || (conv.messages[0]?.content ?? "New Chat")}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(conv.id);
                  }}
                >
                  <X className="w-4 h-4 text-red-400 hover:text-red-600" />
                </button>
              </div>
              {lastMsg && (
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span className="truncate max-w-[110px]">{lastMsg.content}</span>
                  <span className="ml-2">{formatTime(lastMsg.timestamp)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className='border-t border-gray-700 mt-4 pt-4'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2 cursor-pointer'>
            <img  className='rounded-full w-8 h-8'src={profile} alt="" />
            <span className='text-gray-300'>{user?.firstName}</span>
          </div>
          <button className='flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 duration-300 transition'
            onClick={async()=>{
              try{
                await axios.post("http://localhost:5000/api/logout",
                  null,
                  {
                    withCredentials:true
                  }
                );
                localStorage.removeItem("user")
                localStorage.removeItem("token");
                setAuthUser(null);
                navigate('/login');
              } catch(error) {
                alert(error?.response?.data?.errors || "Logout failed. Please try again.")
              }
            }}>
            <X className=''/>LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
