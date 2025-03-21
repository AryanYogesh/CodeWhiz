import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ForgotPasswordModal from "./ForgotPasswordModal";

const SignInModal = ({ isOpen, onClose, switchToSignUp, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  if (!isOpen) return null;

  const handleForgotPassword = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleCloseForgotPassword = () => {
    setIsForgotPasswordOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Login failed");

      localStorage.setItem("user", JSON.stringify(data.user));
      onLoginSuccess(data.user);
      window.location.reload();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 transition-colors duration-300"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold dark:text-gray-200">Sign In</h2>
            <button onClick={onClose} className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full transition">
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white" />
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Forgot Password Link */}
          <p className="text-sm text-blue-500 dark:text-blue-400 hover:underline cursor-pointer mt-2" onClick={handleForgotPassword}>
            Forgot your password?
          </p>

          {/* Sign Up Link */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
            Don't have an account?{" "}
            <button onClick={switchToSignUp} className="text-blue-500 dark:text-blue-400 hover:underline transition">
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={handleCloseForgotPassword} />}
    </>
  );
};

export default SignInModal;
