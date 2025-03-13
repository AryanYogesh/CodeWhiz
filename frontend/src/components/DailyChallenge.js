import React from "react";
import Lottie from "lottie-react";
import challengeAnimation from "../assets/DailyChallenge.json";
import { Link } from "react-router-dom";

const DailyChallenges = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full">
      {/* Animation on the Left */}
      <div className="w-64 h-64 flex justify-center md:justify-start">
        <Lottie animationData={challengeAnimation} loop={true} />
      </div>

      {/* Text & Button on the Right */}
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sharpen Your Skills with Daily Challenges! 🚀
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Solve a new challenge every day and improve your coding skills one step at a time.
        </p>

        {/* Button */}
        <Link to="/challenges">
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DailyChallenges;
