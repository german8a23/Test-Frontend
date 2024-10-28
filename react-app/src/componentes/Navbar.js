import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <span className="user-name">{username ? `Bienvenido, ${username}` : 'Dashboard'}</span>
      <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
    </nav>
  );
};

export default Navbar;







