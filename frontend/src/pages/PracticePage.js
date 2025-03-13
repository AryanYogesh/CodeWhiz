import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import CyberSecurityAnim from "../assets/CyberSecurityAnim.json";
import webProgrammingAnimation from "../assets/webProgramming.json";
import DSAAnimation from "../assets/DSAAnimation.json";
import sqlAnimation from "../assets/SQLAnimation.json";
import dataAnal from "../assets/DataAnalysisAnimation.json";
import machineAnimation from "../assets/MachineLearningAnim.json";
import chatbotAvatar from "../assets/chatbotAvatar.json";
import { motion } from "framer-motion";

const technologies = [
  { name: "SQL", icon: sqlAnimation },
  { name: "Data Structures & Algorithms", icon: DSAAnimation },
  { name: "Data Analytics", icon: dataAnal },
  { name: "Web Programming", icon: webProgrammingAnimation },
  { name: "Machine Learning", icon: machineAnimation },
  { name: "Cybersecurity", icon: CyberSecurityAnim },
];

const PracticePage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.username || "User");
    }
  }, []);

  useEffect(() => {
    if (!username) return;
    const hours = new Date().getHours();
    let timeGreeting = "Good Evening";
    if (hours < 12) timeGreeting = "Good Morning";
    else if (hours >= 12 && hours < 18) timeGreeting = "Good Afternoon";

    setGreeting(`Hi ${username}, ${timeGreeting}!`);
  });

  useEffect(() => {
    if (!greeting) return;

    let index = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      if (index < greeting.length) {
        setDisplayText((prev) => prev + greeting[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    setTimeout(() => setShowText(true), 1000);
    return () => clearInterval(interval);
  }, [greeting]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 w-full">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center"
      >
        <Lottie animationData={chatbotAvatar} loop className="w-32 h-32" />
        {showText && (
          <div className="ml-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-lg shadow-lg text-lg font-semibold w-80">
            {displayText}
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition w-full"
              onClick={() => setChatOpen(!chatOpen)}
            >
              Open Chat
            </button>
          </div>
        )}
      </motion.div>

      {chatOpen && (
        <div className="p-5 bg-gray-200 dark:bg-gray-800 text-center rounded-lg shadow-lg mt-4 w-full max-w-md">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">🚀 AI Chatbot Coming Soon!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Training in progress...</p>
        </div>
      )}

      <div className="text-center w-full mt-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300">Choose a topic to practice:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {technologies.map((tech, index) => (
            <button
              key={index}
              className="p-5 rounded-2xl shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white flex flex-col items-center"
            >
              <Lottie animationData={tech.icon} loop className="w-24 h-24" />
              <p className="mt-3 font-medium text-lg text-center">{tech.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 text-center w-full">
        <Link to="/interview-prep">
          <div className="bg-indigo-600 text-white px-6 py-4 rounded-xl shadow-lg text-lg font-semibold transition hover:bg-indigo-700 hover:scale-105">
            Prepare for Interviews with AI
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PracticePage;
