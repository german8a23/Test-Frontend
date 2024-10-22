import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/register.css';
import Swal from 'sweetalert2';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Suponiendo que el servidor devuelve los datos del usuario en la respuesta
      const userData = response.data;

      // Almacenar los datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      Swal.fire({
        title: 'Usuario Autenticado',
        text: 'Bienvenido!',
        icon: 'success',
      });
      
      // Redirigir al usuario a la página de inicio después de un registro exitoso
      navigate('/home');
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un estado fuera del rango de 2xx
        setError(error.response.data.message || 'Error en el registro. Por favor, intenta de nuevo.');
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        setError('No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.');
      } else {
        // Algo sucedió al configurar la solicitud que provocó un error
        setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className='body-registro-contenedor'>
    <div className="registro-contenedor">
      <form className="registro-formulario" onSubmit={handleSubmit}>
        <h2>Registrate</h2>
        {error && <div className="error-mensaje">{error}</div>}
        <div className="registro-formulario-grupo">
          <label htmlFor="name">
            <User size={18} />
            <span> Nombre</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="registro-formulario-grupo">
          <label htmlFor="email">
            <Mail size={18} />
            <span> Email</span>
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
        <div className="registro-formulario-grupo">

        <label htmlFor="password">
      <Lock size={18} className="icon-blue" />
      <span> Contraseña</span>
    </label>
    <div className="password-input">
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
        onClick={() => togglePasswordVisibility('password')}
        className="password-toggle"
      >
        {showPassword ? <EyeOff size={18} className="icon-blue" /> : <Eye size={18} className="icon-blue" />}
      </button>
    </div>
        </div>
        <div className="registro-formulario-grupo">
          <label htmlFor="confirmPassword">
            <Lock size={18} />
            <span> Confirmar Contraseña</span>
          </label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              className="password-toggle"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>
        <div className="formulario-footer">
          <Link to="/login" className="create-account">Ya tienes una cuenta? Iniciar Sesion</Link>
        </div>
      </form>
    </div>
    </div>
  );
}

export default RegisterScreen;










// import React, { useState } from 'react';
// import axios from 'axios';
// import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/register.css';
// import Swal from 'sweetalert2';

// const RegisterScreen = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError("Las contraseñas no coinciden");
//       return;
//     }
//     setError('');
//     setIsLoading(true);
//     try {
//       await axios.post('http://localhost:3000/auth/signup', {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password
//       });


//       Swal.fire({
//         title: 'Usuario Autenticado',
//         text: 'Bienvenido!',
//         icon: 'success',
//       });
      
//       // Redirigir al usuario a la página de inicio después de un registro exitoso
//       navigate('/home');
//     } catch (error) {
//       if (error.response) {
//         // El servidor respondió con un estado fuera del rango de 2xx
//         setError(error.response.data.message || 'Error en el registro. Por favor, intenta de nuevo.');
//       } else if (error.request) {
//         // La solicitud fue hecha pero no se recibió respuesta
//         setError('No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.');
//       } else {
//         // Algo sucedió al configurar la solicitud que provocó un error
//         setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = (field) => {
//     if (field === 'password') {
//       setShowPassword(!showPassword);
//     } else {
//       setShowConfirmPassword(!showConfirmPassword);
//     }
//   };

//   return (
//     <div className="registro-contenedor">
//       <form className="registro-formulario" onSubmit={handleSubmit}>
//         <h2>Registrate</h2>
//         {error && <div className="error-mensaje">{error}</div>}
//         <div className="registro-formulario-grupo">
//           <label htmlFor="name">
//             <User size={18} />
//             <span> Nombre</span>
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="registro-formulario-grupo">
//           <label htmlFor="email">
//             <Mail size={18} />
//             <span> Email</span>
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
//         <div className="registro-formulario-grupo">
//           <label htmlFor="password">
//             <Lock size={18} />
//             <span> Contraseña</span>
//           </label>
//           <div className="password-input">
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
//               onClick={() => togglePasswordVisibility('password')}
//               className="password-toggle"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>
//         <div className="registro-formulario-grupo">
//           <label htmlFor="confirmPassword">
//             <Lock size={18} />
//             <span> Confirmar Contraseña</span>
//           </label>
//           <div className="password-input">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => togglePasswordVisibility('confirmPassword')}
//               className="password-toggle"
//             >
//               {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>
//         <button type="submit" className="submit-btn" disabled={isLoading}>
//           {isLoading ? 'Registrando...' : 'Registrarse'}
//         </button>
//         <div className="formulario-footer">
//           <Link to="/login" className="create-account">Ya tienes una cuenta? Iniciar Sesion</Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default RegisterScreen;

















// import React, { useState } from 'react';
// import axios from 'axios';
// import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/register.css';

// const RegisterScreen = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError("Las contraseñas no coinciden");
//       return;
//     }
//     setError('');
//     setIsLoading(true);
//     try {
//       await axios.post('http://localhost:3000/auth/signup', {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password
//       });
      
//       // Redirigir al usuario a la página de inicio después de un registro exitoso
//       navigate('/home');
//     } catch (error) {
//       if (error.response) {
//         // El servidor respondió con un estado fuera del rango de 2xx
//         setError(error.response.data.message || 'Error en el registro. Por favor, intenta de nuevo.');
//       } else if (error.request) {
//         // La solicitud fue hecha pero no se recibió respuesta
//         setError('No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.');
//       } else {
//         // Algo sucedió al configurar la solicitud que provocó un error
//         setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = (field) => {
//     if (field === 'password') {
//       setShowPassword(!showPassword);
//     } else {
//       setShowConfirmPassword(!showConfirmPassword);
//     }
//   };

//   return (
//     <div className="registro-contenedor">
//       <form className="registro-formulario" onSubmit={handleSubmit}>
//         <h2>Registrate</h2>
//         {error && <div className="error-mensaje">{error}</div>}
//         <div className="registro-formulario-grupo">
//           <label htmlFor="name">
//             <User size={18} />
//             <span> Nombre</span>
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="registro-formulario-grupo">
//           <label htmlFor="email">
//             <Mail size={18} />
//             <span> Email</span>
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
//         <div className="registro-formulario-grupo">
//           <label htmlFor="password">
//             <Lock size={18} />
//             <span> Contraseña</span>
//           </label>
//           <div className="password-input">
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
//               onClick={() => togglePasswordVisibility('password')}
//               className="password-toggle"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>
//         <div className="registro-formulario-grupo">
//           <label htmlFor="confirmPassword">
//             <Lock size={18} />
//             <span> Confirmar Contraseña</span>
//           </label>
//           <div className="password-input">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => togglePasswordVisibility('confirmPassword')}
//               className="password-toggle"
//             >
//               {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>
//         <button type="submit" className="submit-btn" disabled={isLoading}>
//           {isLoading ? 'Registrando...' : 'Registrarse'}
//         </button>
//         <div className="formulario-footer">
//           <Link to="/login" className="create-account">Ya tienes una cuenta? Iniciar Sesion</Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default RegisterScreen;























// import React, { useState } from 'react';
// import axios from 'axios';
// import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/register.css';

// const RegisterScreen = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError("Las contraseñas no coinciden");
//       return;
//     }
//     setError('');
//     setIsLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/auth/signup', {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password
//       });
//       const { token } = response.data;
      
//       // Guardar el token en el almacenamiento local
//       localStorage.setItem('token', token);
      
//       // Configurar el token para futuras solicitudes
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       navigate('/home')
//     } catch (error) {
//       if (error.response) {
//         // El servidor respondió con un estado fuera del rango de 2xx
//         setError(error.response.data.message || 'Error en el registro. Por favor, intenta de nuevo.');
//       } else if (error.request) {
//         // La solicitud fue hecha pero no se recibió respuesta
//         setError('No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.');
//       } else {
//         // Algo sucedió al configurar la solicitud que provocó un error
//         setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = (field) => {
//     if (field === 'password') {
//       setShowPassword(!showPassword);
//     } else {
//       setShowConfirmPassword(!showConfirmPassword);
//     }
//   };

//   return (
//     <div className="registro-contenedor">
//       <form className="registro-formulario" onSubmit={handleSubmit}>
//         <h2>Registrate</h2>
//         {error && <div className="error-mensaje">{error}</div>}
//         <div className="registro-formulario-grupo">
//           <label htmlFor="name">
//             <User size={18} />
//             <span> Nombre</span>
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="registro-formulario-grupo">
//           <label htmlFor="email">
//             <Mail size={18} />
//             <span> Email</span>
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
//         <div className="registro-formulario-grupo">
//           <label htmlFor="password">
//             <Lock size={18} />
//             <span> Contraseña</span>
//           </label>
//           <div className="password-input">
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
//               onClick={() => togglePasswordVisibility('password')}
//               className="password-toggle"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>
//         <div className="registro-formulario-grupo">
//           <label htmlFor="confirmPassword">
//             <Lock size={18} />
//             <span> Confirmar Contraseña</span>
//           </label>
//           <div className="password-input">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => togglePasswordVisibility('confirmPassword')}
//               className="password-toggle"
//             >
//               {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>
//         <button type="submit" className="submit-btn" disabled={isLoading}>
//           {isLoading ? 'Registrando...' : 'Registrarse'}
//         </button>
//         <div className="formulario-footer">
//           <Link to="/login" className="create-account">Ya tienes una cuenta? Iniciar Sesion</Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default RegisterScreen;



















// import React, { useState } from 'react';
// import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import '../../styles/register.css';
// import { Link } from 'react-router-dom';

// const RegisterScreen = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Las contraseñas no coinciden");
//       return;
//     }
//     console.log('Formulario enviado:', formData);
//     // Aquí iría la lógica para enviar los datos al servidor
//   };

//   const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
//     if (field === 'password') {
//       setShowPassword(!showPassword);
//     } else {
//       setShowConfirmPassword(!showConfirmPassword);
//     }
//   };

//   return (
//     <div className="registro-contenedor">
//       <form className="registro-formulario" onSubmit={handleSubmit}>
//         <h2>Registrate</h2>
//         <div className="registro-formulario-grupo">
//           <label htmlFor="name">
//             <User size={18} />
//             <span> Nombre</span>
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="registro-formulario-grupo">
//           <label htmlFor="email">
//             <Mail size={18} />
//             <span> Email</span>
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
//         <div className="registro-formulario-grupo">
//           <label htmlFor="password">
//             <Lock size={18} />
//             <span> Contraseña</span>
//           </label>
//           <div className="password-input">
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
//               onClick={() => togglePasswordVisibility('password')}
//               className="password-toggle"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>
//         <div className="registro-formulario-grupo">
//           <label htmlFor="confirmPassword">
//             <Lock size={18} />
//             <span> Confirmar Contraseña</span>
//           </label>
//           <div className="password-input">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => togglePasswordVisibility('confirmPassword')}
//               className="password-toggle"
//             >
//               {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>
//         <button type="submit" className="submit-btn">Registrarse</button>

//         <div className="formulario-footer">

//           <Link to="/login" className="create-account">Ya tienes una cuenta? Iniciar Sesion</Link>
//         </div>


//       </form>
//     </div>
//   );
// }

// export default RegisterScreen;











// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../styles/login.scss';
// import fondoTablas from '../../images/fondoTablas.jpg';

// const RegisterScreen = () => {
//   const [username, setUsername] = useState('');
//   const [password1, setPassword1] = useState('');
//   const [password2, setPassword2] = useState('');
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');

//   const navigate = useNavigate();


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (username === 'admin' && email === 'alejo@gmail.com' && password1 === '123456' && password2 === '123456' ) {
//       localStorage.setItem('isLoggedIn', true);
//       navigate('/home');
//     } else {
//       setError('El usuario o la contraseña son incorrectos');
//     }
//   };

//   return (
// <div className='login-container'>
//   <h2 className='welcome-title'>¡Bienvenido, Administrador, Registrate!</h2>
//   <p className='description'>
//     Como administrador del mini mercado, tienes acceso a todas las funciones y configuraciones del sistema. Por favor, inicia sesión para comenzar a gestionar tu mercado.
//   </p>
//   <form className='form' onSubmit={handleSubmit}>
//     <label className='label'>
//       Usuario:
//       <input className='input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//     </label>
//     <label className='label'>
//       Email:
//       <input className='input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//     </label>
//     <label className='label'>
//       Contraseña:
//       <input className='input' type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
//     </label>
//     <label className='label'>
//       confirmar Contraseña:
//       <input className='input' type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
//     </label>
//     <button className='button' type="submit">Ingresar</button>
//     {error && <p>{error}</p>}
//   </form>

//   <div className='pictures-login-container'>
//     <img className='pictures-login' src={fondoTablas} alt='mainImage'></img>
//   </div>

// </div>
//   );
// };

// export default RegisterScreen;