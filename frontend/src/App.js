import './App.css';
import Navbar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        {/* <Route path='/practice' element={<Practice/>}/>  */}
      </Routes>
    </div>
  );
}


export default App;
