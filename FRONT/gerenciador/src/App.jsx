import './App.css'
import { Routes, Route } from 'react-router-dom'; 
import Login from './login/login.jsx';
import Home from './home/home.jsx';
import InfoPedido from './informations/infoPedido.jsx';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/infoPedido' element={<InfoPedido />}/>
    </Routes>
  )
}

export default App