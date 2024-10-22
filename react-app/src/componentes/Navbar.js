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









// import '../styles/navbar.css';

// const NavBar = () => {
//   return (
//     <nav>
//         <>
//           <nav className="navbar">
//             <span className="user-name">Dashboard</span>
//             <button className="logout-btn">Cerrar sesión</button>
//           </nav>
//         </>
//     </nav>
//   );
// };

// export default NavBar;









// import React from 'react';
// import '../styles/navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <span className="user-name">Dashboard</span>
//       <button className="logout-btn">Cerrar sesión</button>
//     </nav>
//   );
// };

// export default Navbar;





