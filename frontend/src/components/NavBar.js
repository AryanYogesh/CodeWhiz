import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/practice", text: "Practice" },
    { to: "/leaderboard", text: "Leaderboard" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/code_whiz_logo.jpg" alt="CodeWhiz Logo" className="h-10 w-10" />
          <span className="text-lg font-semibold text-gray-500">CodeWhiz</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map(({ to, text }) => (
            <Link key={to} to={to} className="text-gray-700 hover:text-blue-500 transition">
              {text}
            </Link>
          ))}

          {/* Sign In & Sign Up Buttons */}
          <div className="space-x-4">
            <button
              onClick={() => setIsSignInOpen(true)}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUpOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800">
          <Menu size={28} />
        </button>
      </div>

      {/* Modals */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        switchToSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
      />
      
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        switchToSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />

    </nav>
  );
};

export default Navbar;
