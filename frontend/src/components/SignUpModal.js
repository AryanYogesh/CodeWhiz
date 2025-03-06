import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const SignUpModal = ({ isOpen, onClose, switchToSignIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to register");
      }

      alert("Registration successful! You can now log in.");
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-gray-200">Sign Up</h2>
          <button onClick={onClose} className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full transition">
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 
                         dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 
                         dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 
                         dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 transition"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 
                       dark:bg-blue-600 dark:hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Sign-In Link */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <button onClick={switchToSignIn} className="text-blue-500 dark:text-blue-400 hover:underline transition">
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpModal;
