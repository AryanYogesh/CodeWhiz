import './App.css';
import Navbar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
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
