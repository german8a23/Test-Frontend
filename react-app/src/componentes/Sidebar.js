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



















// import { NavLink } from 'react-router-dom';
// import * as FaIcons from 'react-icons/fa6';
// // import '../styles/sidebar.scss';

// const Sidebar = () => {
//     return (

   
//         <div className="sidebar">


//             <ul>
//                 <li>
                    // <NavLink to="/home" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'activeClassName='active'><FaIcons.FaHouseChimney className='me-2'/>Home</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/categorias" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' activeClassName='active'><FaIcons.FaCartShopping className='me-2'/>Categorias</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/productos" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'activeClassName='active' ><FaIcons.FaCartArrowDown className='me-2'/>Productos</NavLink>
//                 </li>
//             </ul>
//         </div>
//     )
// }

// export default Sidebar;


















