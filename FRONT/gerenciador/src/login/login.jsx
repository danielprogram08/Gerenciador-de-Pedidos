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

    /*fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: login,
        senha: senha
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Login bem-sucedido!');
        // Redirecionar para a página principal ou dashboard
      } else {
        alert('Login ou senha incorretos. Tente novamente.');
      }
    })
    .catch(error => {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
    });*/
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