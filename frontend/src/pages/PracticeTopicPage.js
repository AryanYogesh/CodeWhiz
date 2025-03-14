import { useParams, useLocation } from "react-router-dom";
import Lottie from "lottie-react";

const PracticeTopicPage = () => {
  const { topicName } = useParams(); // Get topic from URL
  const location = useLocation();  // Get state passed from Link
  const animation = location.state?.animation ? JSON.parse(location.state.animation) : null;


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 w-full">
      <h1 className="text-3xl font-bold">{topicName.replace(/-/g, " ")}</h1>

      {/* Show animation if available */}
      {animation && <Lottie animationData={animation} loop className="w-48 h-48 mt-4" />}

      <p className="mt-4 text-lg">Practice questions for {topicName.replace(/-/g, " ")} will be shown here.</p>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Start Solving
      </button>
    </div>
  );
};

export default PracticeTopicPage;
