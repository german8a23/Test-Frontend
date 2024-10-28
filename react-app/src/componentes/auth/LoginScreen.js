import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import Swal from 'sweetalert2';

const LoginScreen = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.com$/i.test(email)) {
      return 'Ingrese un email válido';
    }
    return '';
  };


  const validatePassword = (password) => {
    if (password.includes(' ')) {
      return 'sin espacios...';
    }
    return '';
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));

    let errorMessage = '';

    if (name === 'email') {
      errorMessage = validateEmail(value);
    } else if (name === 'password') {
      errorMessage = validatePassword(value)
    }

    setError(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));

  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setError({
        email: emailError,
        password: passwordError,
      });
      return;
    }


    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const userData = response.data;

      localStorage.setItem('user', JSON.stringify(userData));

      Swal.fire({
        title: 'Usuario Autenticado',
        text: 'Bienvenido',
        icon: 'success',
      });


      navigate('/home');
    } catch (error) {
      if (error.response) {
        setError({
          ...error,
          password: error.response.data.message
        });
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
            {error.email && <span className="error-message">{error.email}</span>}

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

              {error.password && <span className="error-message">{error.password}</span>}

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












