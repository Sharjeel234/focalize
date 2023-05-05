import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/home';
import Landscape from './Pages/Landscape/landscape';
import Login from './Pages/Login/login';
import Signup from './Pages/SignUp/signup';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/gallery' element={<Landscape />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;