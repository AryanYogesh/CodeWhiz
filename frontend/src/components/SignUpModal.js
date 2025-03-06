import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const SignUpModal = ({ isOpen, onClose, switchToSignIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8) {
      setPasswordStrength("Too Short ❌ (Min. 8 chars)");
    } else if ((hasLetters && !hasNumbers) || (hasNumbers && !hasLetters)) {
      setPasswordStrength("Weak ❌");
    } else if (hasLetters && hasNumbers && !hasSpecialChar) {
      setPasswordStrength("Medium ⚠️");
    } else {
      setPasswordStrength("Strong ✅");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordStrength.includes("❌")) {
      alert("Password must be at least 8 characters and contain letters and numbers. For strong security, add a special character.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
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
        className="bg-white p-6 rounded-lg shadow-lg w-96 dark:bg-gray-900"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Sign Up</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
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
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
              placeholder="Create a password"
              required
            />
            {/* Password Strength Indicator */}
            <p
              className={`text-sm mt-1 font-medium ${
                passwordStrength.includes("Too Short") || passwordStrength.includes("Weak")
                  ? "text-red-500"
                  : passwordStrength.includes("Medium")
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {passwordStrength}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center dark:text-gray-400">
          Already have an account?{" "}
          <button onClick={switchToSignIn} className="text-blue-500 hover:underline">
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpModal;
