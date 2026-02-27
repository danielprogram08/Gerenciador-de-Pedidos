import './login.css'
import img from '../../public/Neide.jpg'

function Login() {

  return (
    <>
      <div className='Login-container'>
        <img src={img} alt='Neide' />
        <div className='login'>
          <h1>Login</h1>
          <input type='text' placeholder='Login:' />
        </div>
        <div className='senha'>
          <h1>Senha</h1>
          <input type='password' placeholder='Senha:' />
        </div>
        <button>Entrar</button>
      </div>
    </>
  )
}

export default Login