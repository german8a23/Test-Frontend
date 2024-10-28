import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/register.css';
import Swal from 'sweetalert2';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({name: '',email: '',password: '',confirmPassword: ''});
  const [errors, setErrors] = useState({name: '', email: '', password: '', confirmPassword: ''});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateName = (name) => {
    if (name.length < 3) {
      return '3 caracteres';
    }
    if (/\s/.test(name)) {
      return 'Sin espacios';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.com$/i.test(email)) {
      return 'Ingrese un email válido';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return '8 caracteres';
    }
    if (!/\d/.test(password)) {
      return 'al menos un número';
    }
    return '';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    let errorMessage = '';

    if (name === 'name') {
      errorMessage = validateName(value);
    } else if (name === 'email') {
      errorMessage = validateEmail(value);
    } else if (name === 'password') {
      errorMessage = validatePassword(value);
    } else if (name === 'confirmPassword') {
      errorMessage = validateConfirmPassword(formData.password, value);
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      const userData = response.data;

      localStorage.setItem('user', JSON.stringify(userData));

      Swal.fire({
        title: 'Usuario Autenticado',
        text: 'Bienvenido!',
        icon: 'success',
      });
      
      navigate('/home');
    } catch (error) {
      if (error.response) {
        setErrors({
          ...errors,
          email: error.response.data.message
        });
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
            {errors.name && <span className="error-message">{errors.name}</span>}
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
            {errors.email && <span className="error-message">{errors.email}</span>}
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
              {errors.password && <span className="error-message">{errors.password}</span>}
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
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
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