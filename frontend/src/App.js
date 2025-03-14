import './App.css';
import { useState } from "react";
import Navbar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import PracticePage from "./pages/PracticePage";
import ResetPassword from './components/ResetPassword';
import PracticeTopicPage from './pages/PracticeTopicPage';

function App() {

  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsSignInOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition">
      <Navbar Navbar onSignInOpen={() => setIsSignInOpen(true)}/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/practice/:topicName" element={<PracticeTopicPage />} />
      </Routes>
      <Footer/>
    </div>
  );
}


export default App;
