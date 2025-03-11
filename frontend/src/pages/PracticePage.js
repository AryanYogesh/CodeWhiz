import { useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import CyberSecurityAnim from '../assets/CyberSecurityAnim.json';
import webProgrammingAnimation from "../assets/webProgramming.json"; 
import DSAAnimation from "../assets/DSAanimation.json";
import sqlAnimation from '../assets/SQLAnimation.json';
import dataAnal from '../assets/DataAnalysisAnimation.json';
import machineAnimation from '../assets/MachineLearningAnim.json';

const technologies = [
  { name: "SQL", icon: <Lottie animationData={sqlAnimation} loop className="w-22 h-22" />, bgColor: "bg-purple-500" },
  { name: "Data Structures & Algorithms", icon: <Lottie animationData={DSAAnimation} loop className="w-22 h-22" />, bgColor: "bg-red-500" },
  { name: "Data Analytics", icon: <Lottie animationData={dataAnal} loop className="w-22 h-22" />, bgColor: "bg-green-500" },
  { name: "Web Programming", icon: <Lottie animationData={webProgrammingAnimation} loop className="w-22 h-22" />,
  bgColor: "bg-blue-500" },
  { name: "Machine Learning", icon: <Lottie animationData={machineAnimation} loop className="w-22 h-22" />, bgColor: "bg-yellow-500" },
  { name: "Cybersecurity", icon: <Lottie animationData={CyberSecurityAnim} loop className="w-22 h-22" />, bgColor: "bg-gray-700" },
];

const PracticePage = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      
      {/* AI Chatbot Section (Fixed at the Top) */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-3xl font-bold animate-fade-in">AI Practice Assistant</h1>
        <p className="mt-2 text-lg">Start a conversation with AI to guide your learning!</p>
        <button
          className="mt-4 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
          onClick={() => setChatOpen(!chatOpen)}
        >
          {chatOpen ? "Close Chat" : "Open AI Chat"}
        </button>
      </div>

      {/* AI Chatbox (Only visible when opened) */}
      {chatOpen && (
        <div className="p-6 bg-gray-200 dark:bg-gray-800 text-center">
          <p className="text-lg font-semibold">🚀 AI Chatbot Coming Soon!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Training in progress...</p>
        </div>
      )}

      {/* Technology Selection Section */}
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold">Choose a topic to practice:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {technologies.map((tech, index) => (
            <button
              key={index}
              className={`p-6 rounded-xl shadow-lg text-white text-lg font-medium transform transition hover:scale-105 ${tech.bgColor}`}
            >
              <span className="text-4xl">{tech.icon}</span>
              <p className="mt-2">{tech.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Interview Preparation Section */}
      <div className="p-8 text-center">
        <Link to="/interview-prep">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 rounded-xl shadow-lg text-lg font-semibold hover:scale-95 transform transition">
            🎯 Prepare for Interviews with AI
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PracticePage;
