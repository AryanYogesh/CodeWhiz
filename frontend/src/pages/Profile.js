import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setBookmarkedQuestions(parsedUser.bookmarkedQuestions || []);
    }
    setLoading(false);
  }, []);

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Please sign in</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Profile Info Section */}
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 mb-8">
        <img
          src={user.profilePicture || "/profile-pic.jpg"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-300"
        />
        <h2 className="text-2xl font-bold mt-4">{user.username}</h2>
        <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
      </div>

      {/* Coding Stats & Achievements */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 h-48 animate-fade-in-left">
          <h3 className="text-xl font-semibold mb-2">Coding Stats</h3>
          <p>Questions Solved: {user.stats?.questionsSolved || 0}</p>
          <p>Accuracy: {user.stats?.accuracy || "0%"}</p>
          <p>Streak: {user.stats?.streak || 0} days</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 h-48 animate-fade-in-right">
          <h3 className="text-xl font-semibold mb-2">Badges & Achievements</h3>
          {user.badges?.length > 0 ? (
            <ul className="list-disc pl-5">
              {user.badges.map((badge, index) => (
                <li key={index}>{badge}</li>
              ))}
            </ul>
          ) : (
            <p>No achievements yet.</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 h-48 mb-8 w-full">
        <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
        {user.recentActivity?.length > 0 ? (
          <ul className="list-disc pl-5">
            {user.recentActivity.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        ) : (
          <p>No recent activity.</p>
        )}
      </div>

      {/* Resume Upload & Bookmarked Questions */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 h-48 animate-fade-in-left">
          <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
          <input type="file" onChange={handleResumeUpload} className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" />
          {resume && <p className="mt-2 text-green-600 dark:text-green-400">{resume.name} uploaded successfully!</p>}
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 h-48 animate-fade-in-right">
          <h3 className="text-xl font-semibold mb-2">Bookmarked Questions</h3>
          {bookmarkedQuestions.length > 0 ? (
            <ul className="list-disc pl-5">
              {bookmarkedQuestions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          ) : (
            <p>No bookmarked questions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
