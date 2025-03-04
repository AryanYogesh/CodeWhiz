import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import codingAnimation from "../assets/heroAnimation.json";
import "./HeroSection.css";

const HeroSection = () => {
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    const userStatus = localStorage.getItem("returningUser");
    if (userStatus) setIsReturningUser(false);
  }, []);

  return (
    <div className="hero-container">

      <div className="hero-animation">
        <Lottie animationData={codingAnimation} loop autoPlay />
      </div>


      <div className="hero-content">
        <h1 className="hero-title">Master Coding with CodeWhiz</h1>
        <p className="hero-text">AI-powered platform to ace coding interviews!</p>

        {/* CTA Button */}
        <Link
          to="/practice"
          className="hero-button"
          onClick={() => localStorage.setItem("returningUser", "true")}
        >
          {isReturningUser ? "Continue" : "Get Started"}
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
