import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Paperclip, ArrowUp, Globe, Bot } from "lucide-react";
import logo from "../../public/logo.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { v4 as uuidv4 } from 'uuid';

function Prompt({ activeConversationId, setActiveConversationId, conversations, setConversations }) {
  const [inputValue, setInputValue] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const promtEndRef = useRef();

  // Find the active conversation
  const activeIdx = conversations.findIndex(c => c.id === activeConversationId);
  const activeConversation = activeIdx !== -1 ? conversations[activeIdx] : null;
  const visiblePromt = activeConversation ? activeConversation.messages : [];

  useEffect(() => {
    promtEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, activeConversationId, loading]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setInputValue("");
    setTypeMessage(trimmed);
    setLoading(true);

    // If no active conversation, create one
    let convId = activeConversationId;
    let newConversations = [...conversations];
    let convIdx = activeIdx;
    if (!activeConversation) {
      convId = uuidv4();
      const newConv = {
        id: convId,
        createdAt: Date.now(),
        title: trimmed,
        messages: [],
      };
      newConversations = [newConv, ...conversations];
      convIdx = 0;
      setActiveConversationId(convId);
    }

    // Add user message
    const userMsg = {
      id: uuidv4(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };
    newConversations[convIdx].messages = [...newConversations[convIdx].messages, userMsg];
    // Set title if not set
    if (!newConversations[convIdx].title) {
      newConversations[convIdx].title = trimmed;
    }
    setConversations(newConversations);

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:5000/api/prompt",
        { content: trimmed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const assistantMsg = {
        id: uuidv4(),
        role: "assistant",
        content: data.reply || "❌ No reply from server.",
        timestamp: Date.now(),
      };
      newConversations[convIdx].messages = [
        ...newConversations[convIdx].messages,
        assistantMsg,
      ];
      setConversations(newConversations);
    } catch (error) {
      const assistantMsg = {
        id: uuidv4(),
        role: "assistant",
        content: "❌ Something went wrong with the AI response.",
        timestamp: Date.now(),
      };
      newConversations[convIdx].messages = [
        ...newConversations[convIdx].messages,
        assistantMsg,
      ];
      setConversations(newConversations);
    } finally {
      setLoading(false);
      setTypeMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between flex-1 w-full px-4 pb-4 md:pb-8">
      {/* ➤ Greeting Section */}
      <div className="mt-8 md:mt-16 text-center">
        <div className="flex items-center justify-center gap-2">
          <img src={logo} alt="DeepSeek Logo" className="h-6 md:h-8" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Hi, I'm DeepSeek.
          </h1>
        </div>
        <p className="text-gray-400 text-base md:text-sm mt-2">
          💬 How can I help you today?
        </p>
      </div>

      {/* ➤ Scrollable Chat Box */}
      <div className="w-full max-w-4xl flex-1 overflow-y-auto mt-6 mb-4 space-y-4 max-h-[60vh] px-1">
        {visiblePromt.map((msg, index) => (
          <div
            key={index}
            className={`w-full flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" ? (
              // 🧠 Full-width assistant response
              <div className="w-full bg-[#232323] text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={codeTheme}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg mt-2"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-800 px-1 py-0.5 rounded"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            ) : (
              // 👤 User message - 30% width at top-right
              <div className="w-[30%] bg-blue-600 text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap self-start">
                {msg.content}
              </div>
            )}
          </div>
        ))}
        {loading && typeMessage && (
          <div
            className="whitespace-pre-wrap px-4 py-3 rounded-2xl text-sm break-words
           bg-blue-600 text-white self-end ml-auto max-w-[40%]"
          >
            {typeMessage}
          </div>
        )}
        {loading && (
          <div className="flex justify-start w-full">
            <div className="bg-[#2f2f2f] text-white px-4 py-3 rounded-xl text-sm animate-pulse">
              🤖Loading...
            </div>
          </div>
        )}
        <div ref={promtEndRef} />
      </div>
      {/* ➤ Input Box */}
      <div className="w-full max-w-4xl relative mt-auto">
        <div className="bg-[#2f2f2f] rounded-[2rem] px-4 md:px-6 py-6 md:py-8 shadow-md">
          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="💬 Message DeepSeek"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-transparent w-full text-white placeholder-gray-400 text-base md:text-lg outline-none"
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* 🛠️ Functional Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button type="button" className="flex items-center gap-2 border border-gray-500 text-white text-sm md:text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                  <Bot className="w-4 h-4" />
                  DeepThink (R1)
                </button>
                <button type="button" className="flex items-center gap-2 border border-gray-500 text-white text-sm md:text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                  <Globe className="w-4 h-4" />
                  Search
                </button>
              </div>
              {/* ➤ Send Button */}
              <div className="flex items-center gap-2 ml-auto">
                <button type="button" className="text-gray-400 hover:text-white transition">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  className="bg-gray-500 hover:bg-blue-600 p-2 rounded-full text-white transition"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Prompt;