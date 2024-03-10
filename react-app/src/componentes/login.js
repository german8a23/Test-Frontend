import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import fondoTablas from '../images/fondoTablas.jpg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', true);
      navigate('/welcome');
    } else {
      setError('El usuario o la contraseña son incorrectos');
    }
  };

  return (
    <div className='login-container'>
      <h2 className='welcome-title'>¡Bienvenido, Administrador!</h2>
      <p className='description'>
        Como administrador del mini mercado, tienes acceso a todas las funciones y configuraciones del sistema. Por favor, inicia sesión para comenzar a gestionar tu mercado.
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <label className='label'>
          Usuario:
          <input className='input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className='label'>
          Contraseña:
          <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className='button' type="submit">Ingresar</button>
        {error && <p>{error}</p>}
      </form>

      <div className='pictures-login-container'>
        <img className='pictures-login' src={fondoTablas} alt='mainImage'></img>
      </div>

    </div>
  );
};

export default LoginPage;




















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './login.scss';
// import marketMain from '../images/marketMain.jpg';


// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (username === 'admin' && password === 'password') {
//       localStorage.setItem('isLoggedIn', true);
//       navigate('/welcome');
//     } else {
//       setError('El usuario o la contraseña son incorrectos');
//     }
//   };


//   return (
//     <div className='login-container'>
//       <h2 className='welcome-title'>¡Bienvenido, Administrador!</h2>
//       <p className='description'>
//         Como administrador del mini mercado, tienes acceso a todas las funciones y configuraciones del sistema. Por favor, inicia sesión para comenzar a gestionar tu mercado.
//       </p>
//       <form className='form' onSubmit={handleSubmit}>
//         <label className='label'>
//           Usuario:
//           <input className='input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <label className='label'>
//           Contraseña:
//           <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <button className='button' type="submit">Ingresar</button>
//         {error && <p>{error}</p>}
//       </form>

//       <div className='pictures-login-container'>
//         <img className='pictures-login' src={marketMain} alt='mainImage'></img>
//       </div>

//     </div>

//   );
// };


// export default LoginPage;













// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './login.scss';
// import marketMain from '../images/marketMain.jpg';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (username === 'admin' && password === 'password') {
//       localStorage.setItem('isLoggedIn', true);
//       navigate('/welcome');
//     } else {
//       setError('El usuario o la contraseña son incorrectos');
//     }
//   };

//   return (
//     <div className='login-container'>
//       <h2>Iniciar Sesión</h2>
//       <form className='form' onSubmit={handleSubmit}>
//         <label className='label'>
//           Usuario:
//           <input className='input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <label className='label'>
//           Contraseña:
//           <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <button className='button' type="submit">Ingresar</button>
//         {error && <p>{error}</p>}
//       </form>

//       <div class='pictures-login-container'>
//         <img class='pictures-login' src={marketMain} alt='mainImage'></img>
//       </div>

//     </div>
//   );

// };

// export default LoginPage;
