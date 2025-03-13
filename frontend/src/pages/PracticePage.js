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
import "react-calendar-heatmap/dist/styles.css";
import Heatmap from "../components/HeatMap";
import DailyChallenges from "../components/DailyChallenge";


const technologies = [
  { name: "SQL", icon: sqlAnimation, progress: 0, badge: null },
  { name: "Data Structures & Algorithms", icon: DSAAnimation, progress: 0, badge: null },
  { name: "Data Analytics", icon: dataAnal, progress: 0, badge: null },
  { name: "Web Programming", icon: webProgrammingAnimation, progress: 0, badge: null },
  { name: "Machine Learning", icon: machineAnimation, progress: 0, badge: null },
  { name: "Cybersecurity", icon: CyberSecurityAnim, progress: 0, badge: null },
];

const getBadge = (progress) => {
  if (progress >= 100) return "🏆 Master";
  if (progress >= 75) return "💎 Advanced";
  if (progress >= 50) return "🔥 Intermediate";
  if (progress >= 25) return "🌱 Beginner";
  return null;
};

const loadProgress = () => {
  const storedProgress = JSON.parse(localStorage.getItem("progress"));
  return storedProgress || technologies.map((tech) => ({ ...tech, progress: 0, badge: null }));
};

const saveProgress = (updatedProgress) => {
  localStorage.setItem("progress", JSON.stringify(updatedProgress));
};

const PracticePage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [username, setUsername] = useState("");
  const [userProgress, setUserProgress] = useState(loadProgress());

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.username || "User");
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!username) return;
    const hours = new Date().getHours();
    let timeGreeting = "Good Evening";
    if (hours < 12) timeGreeting = "Good Morning";
    else if (hours >= 12 && hours < 18) timeGreeting = "Good Afternoon";

    const fullGreeting = `Hey ${username}, ${timeGreeting}!`.trim();
    setGreeting(fullGreeting);
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
      {/* Show Avatar and Message when NOT logged in */}
      {!username ? (
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative flex flex-col items-center w-full max-w-lg text-center"
        >
          <Lottie animationData={chatbotAvatar} loop className="w-40 h-40" />
          <p className="mt-4 text-lg font-semibold bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-lg shadow-lg">
            Please Sign In to Access Practice Features
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative flex items-center w-full max-w-lg"
          >
            <Lottie animationData={chatbotAvatar} loop className="w-40 h-40" />
            {showText && (
              <div className="ml-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg text-xl font-semibold w-full">
                {displayText}
                <button
                  className="mt-3 px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition w-full text-lg"
                  onClick={() => setChatOpen(!chatOpen)}
                >
                  Open Chat
                </button>
              </div>
            )}
          </motion.div>

          {chatOpen && (
            <div className="p-6 bg-gray-200 dark:bg-gray-800 text-center rounded-lg shadow-lg mt-6 w-full max-w-md">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">🚀 AI Chatbot Coming Soon!</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Training in progress...</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full mt-10">
            <DailyChallenges />
            <Heatmap />
          </div>

          {/* Topics Section */}
          <div className="text-center w-full mt-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300">Choose a topic to practice:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {userProgress.map((tech, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl shadow-lg transition transform hover:scale-105 bg-white dark:bg-gray-700 text-gray-900 dark:text-white flex flex-col items-center w-full"
                >
                  <Lottie animationData={tech.icon} loop className="w-24 h-24" />
                  <p className="mt-3 font-medium text-lg text-center">{tech.name}</p>

                  {/* Progress Bar */}
                  <div className="w-full mt-3">
                    <div className="relative w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${tech.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Progress: {tech.progress}% {tech.badge && `(${tech.badge})`}
                    </p>
                  </div>

                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    {tech.progress > 0 ? "Continue" : "Get Started"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>

  );
};

export default PracticePage;
