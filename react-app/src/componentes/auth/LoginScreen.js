import React, { useState } from 'react'; 
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import Swal from 'sweetalert2';

const LoginScreen = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: formData.email,
        password: formData.password
      });

            // Suponiendo que el servidor devuelve los datos del usuario en la respuesta
            const userData = response.data;

            // Almacenar los datos del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(userData));

      Swal.fire({
        title: 'Usuario Autenticado',
        text: 'Bienvenido',
        icon: 'success',
      });
      
      // Redirigir al usuario a la página de inicio después de un inicio de sesión exitoso
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Email o contraseña inválidos');
      } else if (error.response) {
        setError('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      } else if (error.request) {
        setError('No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.');
      } else {
        setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className='body-login-contenedor'>
    <div className="login-contenedor">
      <form className="login-formulario" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-mensaje">{error}</div>}
        <div className="form-grupo">
          <label htmlFor="email">
            <Mail size={18} />
            <span>Email</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-grupo">
          <label htmlFor="password">
            <Lock size={18} />
            <span>Contraseña</span>
          </label>
          <div className="password-contenedor">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility}
              className="password-oculto"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button type="submit" className="submit-login" disabled={isLoading}>
          {isLoading ? 'Cargando...' : (
            <>
              <LogIn size={18} />
              <span>Iniciar Sesión</span>
            </>
          )}
        </button>
        <div className="footer-form">
          <Link to="/register" className="create-account">No tienes cuenta? Registrate</Link>
        </div>
      </form>
    </div>
    </div>
  );
}

export default LoginScreen;










// import React, { useState } from 'react';
// import axios from 'axios';
// import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/login.css';
// import Swal from 'sweetalert2';

// const LoginScreen = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
//     try {
//       await axios.post('http://localhost:3000/auth/login', {
//         email: formData.email,
//         password: formData.password
//       });

//       const userData = response.data;

//       // Almacenar los datos del usuario en localStorage
//       localStorage.setItem('user', JSON.stringify(userData));

//       Swal.fire({
//         title: 'Usuario Autenticado',
//         text: 'Bienvenido!',
//         icon: 'success',
//       });
      
//       // Redirigir al usuario a la página de inicio después de un inicio de sesión exitoso
//       navigate('/home');
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setError('Email o contraseña inválidos');
//       } else if (error.response) {
//         setError('Error en el inicio de sesión. Por favor, intenta de nuevo.');
//       } else if (error.request) {
//         setError('No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.');
//       } else {
//         setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   return (
//     <div className="login-contenedor">
//       <form className="login-formulario" onSubmit={handleSubmit}>
//         <h2>Iniciar Sesión</h2>
//         {error && <div className="error-mensaje">{error}</div>}
//         <div className="form-grupo">
//           <label htmlFor="email">
//             <Mail size={18} />
//             <span>Email</span>
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-grupo">
//           <label htmlFor="password">
//             <Lock size={18} />
//             <span>Contraseña</span>
//           </label>
//           <div className="password-contenedor">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <button 
//               type="button" 
//               onClick={togglePasswordVisibility}
//               className="password-oculto"
//               aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>
//         <button type="submit" className="submit-login" disabled={isLoading}>
//           {isLoading ? 'Cargando...' : (
//             <>
//               <LogIn size={18} />
//               <span>Iniciar Sesión</span>
//             </>
//           )}
//         </button>
//         <div className="footer-form">
//           <Link to="/register" className="create-account">No tienes cuenta? Registrate</Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default LoginScreen;

















// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/login.css';
// import { AuthContext } from '../AuthContext';

// const LoginScreen = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const {login} = useContext(AuthContext);

//   const handleLogin = (user) => {
//     login(user);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     handleLogin()
//     setError('');
//     setIsLoading(true);
//     try {
//       await axios.post('http://localhost:3000/auth/login', {
//         email: formData.email,
//         password: formData.password
//       });
      
//       // Redirigir al usuario a la página de inicio después de un inicio de sesión exitoso
//       navigate('/home');
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setError('Email o contraseña inválidos');
//       } else if (error.response) {
//         setError('Error en el inicio de sesión. Por favor, intenta de nuevo.');
//       } else if (error.request) {
//         setError('No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.');
//       } else {
//         setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   return (
//     <div className="login-contenedor">
//       <form className="login-formulario" onSubmit={handleSubmit}>
//         <h2>Iniciar Sesión</h2>
//         {error && <div className="error-mensaje">{error}</div>}
//         <div className="form-grupo">
//           <label htmlFor="email">
//             <Mail size={18} />
//             <span>Email</span>
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-grupo">
//           <label htmlFor="password">
//             <Lock size={18} />
//             <span>Contraseña</span>
//           </label>
//           <div className="password-contenedor">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <button 
//               type="button" 
//               onClick={togglePasswordVisibility}
//               className="password-oculto"
//               aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>
//         <button type="submit" className="submit-login" disabled={isLoading}>
//           {isLoading ? 'Cargando...' : (
//             <>
//               <LogIn size={18} />
//               <span>Iniciar Sesión</span>
//             </>
//           )}
//         </button>
//         <div className="footer-form">
//           <Link to="/register" className="create-account">No tienes cuenta? Registrate</Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default LoginScreen;













