import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/practice", text: "Practice" },
    { to: "/leaderboard", text: "Leaderboard" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

        <div className="flex items-center space-x-2">
          <img src="/code_whiz_logo.jpg" alt="CodeWhiz Logo" className="h-10 w-10" />
          {/* <span className="text-xl font-bold text-gray-800">CW</span> */}
          <span className="text-lg font-semibold text-gray-500">CodeWhiz</span>
        </div>


        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map(({ to, text }) => (
            <Link
              key={to}
              to={to}
              className="text-gray-700 hover:text-blue-500 transition"
            >
              {text}
            </Link>
          ))}

          {/* Sign In & Sign Up Buttons */}
          <div className="space-x-4">
            <Link
              to="/signin"
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "h-auto opacity-100 p-4" : "h-0 opacity-0 p-0"
        }`}
      >
        {navLinks.map(({ to, text }) => (
          <Link
            key={to}
            to={to}
            className="block text-center py-2 text-gray-700 hover:text-blue-500 transition"
          >
            {text}
          </Link>
        ))}

        {/* Sign In & Sign Up Buttons (Mobile) */}
        <div className="flex flex-col items-center space-y-2 mt-4">
          <Link
            to="/signin"
            className="w-full text-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="w-full text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
