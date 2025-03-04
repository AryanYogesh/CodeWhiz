import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CodeWhiz</h3>
          <p className="text-gray-400 text-sm">AI-powered coding prep platform.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore More</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/practice" className="hover:text-blue-400">Practice</Link></li>
            <li><Link to="/leaderboard" className="hover:text-blue-400">Leaderboard</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/faq" className="hover:text-blue-400">FAQ</Link></li>
            <li><Link to="/blog" className="hover:text-blue-400">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center space-x-2">
              <FontAwesomeIcon icon={faFacebook} /> <span>Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center space-x-2">
            <FontAwesomeIcon icon={faXTwitter} /> <span>X(Twitter)</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center space-x-2">
              <FontAwesomeIcon icon={faInstagram} /> <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} CodeWhiz. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;