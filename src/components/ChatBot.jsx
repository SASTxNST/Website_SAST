import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useMessages } from "../context/MessagesContext";
import { MessageCircle, Send, Trash2, X, Loader2 } from "lucide-react";
import showon from "../data/botConfig";

const ChatBot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { messages, sendMessage, resetHistory } = useMessages();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  if (!showon.includes(location.pathname)) {
    return null;
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const messageText = inputText.trim();
    setInputText("");
    setIsLoading(true);

    try {
      await sendMessage(messageText);
    } catch (error) {
      console.error("Failed to send message:", error);
      window.showToast?.("Failed to send message", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = async () => {
    try {
      await resetHistory();
      window.showToast?.("Chat history cleared", "success");
    } catch (error) {
      console.error("Failed to reset chat:", error);
      window.showToast?.("Failed to clear chat history", "error");
    }
  };

  const formatMessage = (message) => {
    if (!message.parts || !Array.isArray(message.parts)) return "";
    return message.parts.map((part) => part.text || "").join("");
  };

  return (
    <div className="fixed bottom-30 right-8 z-50">
      {/* Chat Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full
          bg-black hover:bg-[#111111]
          border border-[#C4C4C4]
          flex items-center justify-center
          shadow-xl hover:shadow-2xl
          transition-all duration-300 ease-out
          
        `}
        aria-label="Chat with SAST Bot"
      >
        {isOpen ? (
          <X className="text-white" />
        ) : (
          <MessageCircle className="text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={menuRef}
          className="
            absolute bottom-20 right-20
            w-96 h-[500px] max-w-[calc(100vw-4rem)]
            bg-black border border-[#C4C4C4]
            rounded-2xl shadow-2xl
            overflow-hidden
            animate-in slide-in-from-bottom-4 fade-in duration-300
            flex flex-col
          "
        >
          {/* Header Section */}
          <div className="p-6 pb-4 border-b-2 bg-black border-slate-500 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">SAST Bot</h2>
                <p className="text-slate-400 text-sm">
                  Your astronomy & space guide
                </p>
              </div>
              <button
                onClick={handleResetChat}
                className="
                  p-2 rounded-lg
                  text-slate-400 hover:text-white
                  hover:bg-slate-700
                  transition-all duration-200
                "
                aria-label="Clear chat history"
                title="Clear chat history"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-slate-400 py-8">
                <p className="text-sm">
                  Welcome! Ask me anything about astronomy, space technology, or
                  SAST.
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={message.id || index}
                  className={`
                    flex
                    ${message.role === "user" ? "justify-end" : "justify-start"}
                  `}
                >
                  <div
                    className={`
                      max-w-[80%] px-4 py-3 rounded-2xl text-sm
                      ${
                        message.role === "user"
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-slate-700 text-slate-100 rounded-bl-md"
                      }
                    `}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {formatMessage(message)}
                    </div>
                    {message.createdAt && (
                      <div
                        className={`
                        text-xs mt-2 opacity-70
                        ${
                          message.role === "user"
                            ? "text-blue-100"
                            : "text-slate-400"
                        }
                      `}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">SAST Bot is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-600 flex-shrink-0">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about astronomy, space, or SAST..."
                disabled={isLoading}
                className="
                  flex-1 px-4 py-3 rounded-xl
                  bg-slate-800 border border-slate-600
                  text-white placeholder-slate-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                  text-sm
                "
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="
                  px-4 py-3 rounded-xl
                  bg-black hover:bg-gray-400
                  disabled:bg-slate-600 disabled:cursor-not-allowed
                  enabled:border border-gray-400
                  text-white
                  transition-colors duration-200
                  flex items-center justify-center
                  min-w-[48px]
                "
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
