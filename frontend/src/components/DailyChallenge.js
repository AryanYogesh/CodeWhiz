import React from "react";
import Lottie from "lottie-react";
import challengeAnimation from "../assets/DailyChallenge.json";
import { Link } from "react-router-dom";

const DailyChallenges = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      {/* Animation */}
      <div className="w-64 h-64">
        <Lottie animationData={challengeAnimation} loop={true} />
      </div>

      {/* Text */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6">
        Sharpen Your Skills with Daily Challenges! 🚀
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg">
        Solve a new challenge every day and improve your coding skills one step at a time.
      </p>

      {/* Button */}
      <Link to="/challenges">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default DailyChallenges;
