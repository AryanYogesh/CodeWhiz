import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import chatbotAvatar from "../assets/chatbotAvatar.json";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExpand, faCompress, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AiChatWindow = ({ username, isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([]);
  const [fitToScreen, setFitToScreen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 250 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const chatRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const initialGreeting = username
      ? `Hey ${username}, what do you want to learn today?`
      : "Hey there! Let's personalize your learning experience. What topics interest you?";

    setMessages([{ text: initialGreeting, sender: "ai" }]);

    if (fitToScreen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when minimized
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isOpen, username, fitToScreen]);

  const handleUserResponse = (userMessage) => {
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: `Great! I'll guide you through ${userMessage}.`, sender: "ai" },
      ]);
    }, 1000);
  };

  // Handle Drag Start
  const handleMouseDown = (e) => {
    if (fitToScreen) return; // Disable dragging in full screen mode
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle Drag Move
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  // Handle Drag End
  const handleMouseUp = () => {
    setDragging(false);
  };

  return isOpen ? (
    <motion.div
      ref={chatRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed bg-white dark:bg-gray-800 shadow-lg flex flex-col transition-all ${
        fitToScreen
          ? "w-full h-full top-0 left-0 z-50"
          : "w-[400px] h-[500px] rounded-lg"
      }`}
      style={!fitToScreen ? { left: position.x, top: position.y, position: "absolute" } : {}}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Chat Header */}
      <div
        className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Chat</h3>
        <div className="flex gap-3">
          {fitToScreen && (
            <button
              className="text-gray-900 dark:text-white"
              onClick={() => setFitToScreen(false)}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>
          )}
          <button
            className="text-blue-500 dark:text-blue-400"
            onClick={() => setFitToScreen(!fitToScreen)}
          >
            <FontAwesomeIcon icon={fitToScreen ? faCompress : faExpand} size="lg" />
          </button>
          <button
            className="text-red-500"
            onClick={() => {
              setIsOpen(false);
              setFitToScreen(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg max-w-[80%] ${
              msg.sender === "ai"
                ? "bg-blue-200 text-gray-900 self-start"
                : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-600">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              handleUserResponse(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
    </motion.div>
  ) : null;
};

export default AiChatWindow;
