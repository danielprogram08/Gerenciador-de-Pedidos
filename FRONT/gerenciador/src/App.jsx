import './App.css'
import { Routes, Route } from 'react-router-dom'; 
import Login from './login/login.jsx';
import Home from './home/home.jsx';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  )
}

export default App