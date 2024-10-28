import React from 'react';
import * as FaIcons from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
       
        <li><FaIcons.FaHouseChimney className='me-2'/>
        <Link to='/home'>Home</Link>
        {/* <a href="/home">Home</a> */}
        </li>

        <li><FaIcons.FaCartShopping className='me-2'/>
        <Link to='/categorias'>Categorias</Link>
        {/* <a href="/categorias">Categorías</a> */}
        </li>

        <li><FaIcons.FaCartArrowDown className='me-2'/>
        <Link to='/Productos'>Productos</Link>
        {/* <a href="/productos">Productos</a> */}
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;

















