import './App.css';
import Navbar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path="/profile" element={<Profile />} />
        {/* <Route path='/practice' element={<Practice/>}/>  */}
      </Routes>
      <Footer/>
    </div>
  );
}


export default App;
