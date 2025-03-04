import { motion } from "framer-motion";
import { X } from "lucide-react";

const SignInModal = ({ isOpen, onClose, switchToSignUp }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Sign In</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <button onClick={switchToSignUp} className="text-blue-500 hover:underline">
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default SignInModal;
