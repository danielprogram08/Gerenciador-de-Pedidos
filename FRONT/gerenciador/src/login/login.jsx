import './login.css'
import img from '../../public/Neide.jpg'
import { useForm } from 'react-hook-form';

function Login() {

  const { register, handleSubmit } = useForm();

  const login = (user) => {
    const login = user.inputLogin;
    const senha = user.inputSenha;

    if (login == '' && senha == '' || login == '' || senha == '') {
      alert('Preencha os campos de login e senha para acessar o sistema!');
    }

  }

  return (
    <>
      <form className='Login-container' onSubmit={handleSubmit(login)}>
        <img src={img} alt='Neide' />
        <div className='login'>
          <h1>Login</h1>
          <input className='inputLogin' type='text' placeholder='Login:' {...register('inputLogin')}/>
        </div>
        <div className='senha'>
          <h1>Senha</h1>
          <input className='inputSenha' type='password' placeholder='Senha:' {...register('inputSenha')}/>
        </div>
        <button type='submit'>Entrar</button>
      </form>
    </>
  )
}

export default Login