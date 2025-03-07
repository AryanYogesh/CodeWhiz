import { useRef } from "react";
import { motion } from "framer-motion";
import { FaBrain, FaCode, FaRobot, FaChartLine, FaUserCheck, FaTrophy, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const features = [
  { icon: <FaBrain className="text-blue-500 text-5xl" />, title: "AI-Powered Questions", desc: "Get AI-generated coding questions tailored to your skill level." },
  { icon: <FaCode className="text-green-500 text-5xl" />, title: "Live Code Execution", desc: "Write and run code instantly in the browser." },
  { icon: <FaRobot className="text-purple-500 text-5xl" />, title: "AI Interview Bot", desc: "Practice interviews with an AI-powered interviewer." },
  { icon: <FaChartLine className="text-yellow-500 text-5xl" />, title: "Progress Tracking", desc: "Monitor your growth with real-time analytics." },
  { icon: <FaUserCheck className="text-red-500 text-5xl" />, title: "Personalized Recommendations", desc: "AI suggests topics based on your strengths & weaknesses." },
  { icon: <FaTrophy className="text-indigo-500 text-5xl" />, title: "Leaderboard & Challenges", desc: "Compete with others & rank on the leaderboard!" },
];

const FeaturesSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 w-full relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          Why Choose CodeWhiz?
        </h2>

        {/* Scrollable Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-3 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={() => scroll("left")}
          >
            <FaChevronLeft className="text-gray-600 dark:text-gray-300 text-2xl" />
          </button>

          {/* Features List */}
          <motion.div 
            ref={scrollRef} 
            className="flex space-x-6 overflow-x-auto scrollbar-hide px-10 py-4 no-scrollbar"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 min-w-[250px] md:min-w-[300px] rounded-xl shadow-lg dark:shadow-gray-700 p-6 flex flex-col items-center text-center hover:shadow-2xl dark:hover:shadow-gray-600 transition"
                whileHover={{ scale: 0.9 }}
              >
                {feature.icon}
                <h3 className="text-lg font-semibold mt-4 text-gray-800 dark:text-gray-200">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Arrow */}
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-3 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={() => scroll("right")}
          >
            <FaChevronRight className="text-gray-600 dark:text-gray-300 text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;