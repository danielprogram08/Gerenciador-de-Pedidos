import './login.css'
import SpinnerLoading from '../components/spinner-loading/spinner.jsx'
import img from '../../public/Neide.jpg'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setLoading(true);

    const login = user.inputLogin;
    const senha = user.inputSenha;

    if (!login || !senha) {
      alert('Preencha os campos de login e senha para acessar o sistema!');
      setLoading(false);
      return;
    }

    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: login,
        senha: senha
      })
    })
    .then(async response => {
      if (!response.ok) {
        const error = new Error(`Erro HTTP: ${response.status}`);
        error.status = response.status;
        throw error;
      }
      const data = await response.json();
      return data;
    })
    .then(data => {
      setLoading(false);
      reset();
      navigate('/home');
    })
    .catch(error => {
      if (error.status === 403) {
        alert("Login ou senha incorretos! Tente novamente.");
      } else {
        alert("Erro ao fazer login no sistema. Tente novamente mais tarde.");
        console.error(error);
      }
      setLoading(false);
      reset();
    });
  }

  return (
    <>
      <form className='Login-container' onSubmit={handleSubmit(handleLogin)}>
        <img id='logo-lgn' src={img} alt='Neide' />
        <div className='login'>
          <h1>Login</h1>
          <input className='inputLogin' type='text' placeholder='Login:' {...register('inputLogin')}/>
        </div>
        <div className='senha'>
          <h1>Senha</h1>
          <input className='inputSenha' type='password' placeholder='Senha:' {...register('inputSenha')}/>
        </div>
        <button type='submit'>
          {!loading && <span className='titulobtn'>Entrar</span>}
          {loading && <SpinnerLoading/>}
        </button>
      </form>
    </>
  )
}

export default Login