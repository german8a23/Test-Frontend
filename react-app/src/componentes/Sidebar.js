import { NavLink } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa6';
import './sidebar.scss';

const Sidebar = () => {
    return (
        <div className="sidebar bg-light">
            <ul>
                <li>
                    <NavLink to="/home" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'activeClassName='active'><FaIcons.FaHouseChimney className='me-2'/>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/categorias" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' activeClassName='active'><FaIcons.FaCartShopping className='me-2'/>Categorias</NavLink>
                </li>
                <li>
                    <NavLink to="/productos" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'activeClassName='active' ><FaIcons.FaCartArrowDown className='me-2'/>Productos</NavLink>
                </li>
                <li>
                    <NavLink to="/" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'activeClassName='active' ><FaIcons.FaRightFromBracket className='me-2'/>Log out</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;


















// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './sidebar.css';
// import Categorias from './Categorias';
// import Productos from './Productos';

// function Sidebar() {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div>
//       <div className='sidebar'>
//         <div className='pictures-container-sidebar'>
//           <img
//             className='pictures-main-sidebar'
//             src={marketPicasso}
//             height={250}
//             width={250}
//             style={{ borderRadius: '10px' }}
//             alt='menu'
//           />
//         </div>
// <ul>
//   <li>
//     <Link to="/welcome" onClick={() => handleOptionClick('welcome')}>
//       welcome
//     </Link>
//   </li>
//   <li>
//     <Link to="/categorias" onClick={() => handleOptionClick('categorias')}>
//       Categorías
//     </Link>
//   </li>
//   <li>
//     <Link to="/productos" onClick={() => handleOptionClick('productos')}>
//       Productos
//     </Link>
//   </li>
//   <li>
//     <Link to="/" onClick={() => handleOptionClick('')}>
//       Log out
//     </Link>
//   </li>
// </ul>
//       </div>
//       {selectedOption === 'categorias' && <Categorias />}
//       {selectedOption === 'productos' && <Productos />}
//     </div>
//   );
// }

// export default Sidebar;












// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './sidebar.css';
// import Categorias from './Categorias';
// import Productos from './Productos';

// function Sidebar() {
//   const [showCategorias, setShowCategorias] = useState(false);
//   const [showProductos, setShowProductos] = useState(false);

//   const handleCategoriasClick = () => {
//     setShowCategorias(true);
//     setShowProductos(false);
//   };

//   const handleProductosClick = () => {
//     setShowCategorias(false);
//     setShowProductos(true);
//   };

//   return (
//     <div>
//       <div className='sidebar'>
//         <div className='pictures-container-sidebar'>
//           <img
//             className='pictures-main-sidebar'
//             src={marketPicasso}
//             height={250}
//             width={250}
//             style={{ borderRadius: '10px' }}
//             alt='menu'
//           />
//         </div>
//         <ul>
//           <li>
//             <Link to="/categorias" onClick={handleCategoriasClick}>
//               Categorías
//             </Link>
//           </li>
//           <li>
//             <Link to="/productos" onClick={handleProductosClick}>
//               Productos
//             </Link>
//           </li>
//         </ul>
//       </div>
//       {showCategorias && <Categorias />}
//       {showProductos && <Productos />}
//     </div>
//   );
// }

// export default Sidebar;
















// import React, { useState } from 'react';
// import Categorias from './Categorias';
// import Productos from './Productos';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './sidebar.css';

// function Sidebar() {
//   const [activeComponent, setActiveComponent] = useState('');

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'categorias':
//         return <Categorias />;
//       case 'productos':
//         return <Productos />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <div className='sidebar'>
//         <div class='pictures-container-main'>
//           <img class='pictures-main' src={marketPicasso} height={250} width={250} style={{ 'borderRadius': '10px' }} alt='menu' />
//         </div>
//         <ul>
//           <li>
//             <a onClick={() => setActiveComponent('categorias')}>Categorías</a>
//           </li>
//           <li>
//             <a onClick={() => setActiveComponent('productos')}>Productos</a>
//           </li>
//         </ul>
//         {renderComponent()}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
















// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './sidebar.css';
// import Categorias from './Categorias';
// import Productos from './Productos';

// function Sidebar() {
//   const [showCategorias, setShowCategorias] = useState(false);
//   const [showProductos, setShowProductos] = useState(false);

//   const handleCategoriasClick = () => {
//     setShowCategorias(true);
//     setShowProductos(false);
//   };

//   const handleProductosClick = () => {
//     setShowCategorias(false);
//     setShowProductos(true);
//   };

//   return (
//     <div>
//       <div className='sidebar'>
//         <div className='pictures-container-main'>
//           <img
//             className='pictures-main'
//             src={marketPicasso}
//             height={250}
//             width={250}
//             style={{ borderRadius: '10px' }}
//             alt='menu'
//           />
//         </div>
//         <ul>
//           <li>
//             <Link to="/categorias" onClick={handleCategoriasClick}>
//               Categorías
//             </Link>
//           </li>
//           <li>
//             <Link to="/productos" onClick={handleProductosClick}>
//               Productos
//             </Link>
//           </li>
//         </ul>
//       </div>
//       {showCategorias && <Categorias />}
//       {showProductos && <Productos />}
//     </div>
//   );
// }

// export default Sidebar;













// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import marketPicasso from '../images/marketPicasso.jpg';
// import Categorias from './Categorias';
// import Productos from './Productos';
// import './sidebar.css';

// function Sidebar() {
//   const [showCategorias, setShowCategorias] = useState(false);
//   const [showProductos, setShowProductos] = useState(false);

//   const handleCategoriasClick = () => {
//     setShowCategorias(true);
//     setShowProductos(false);
//   };

//   const handleProductosClick = () => {
//     setShowCategorias(false);
//     setShowProductos(true);
//   };

//   return (
//     <div>
//       <div className='sidebar'>
//         <div className='pictures-container-main'>
//           <img
//             className='pictures-main'
//             src={marketPicasso}
//             height={250}
//             width={250}
//             style={{ borderRadius: '10px' }}
//             alt='menu'
//           />
//         </div>
//         <ul>
//           <li>
//             <Link to="/categorias" onClick={handleCategoriasClick}>
//               Categorías
//             </Link>
//           </li>
//           <li>
//             <Link to="/productos" onClick={handleProductosClick}>
//               Productos
//             </Link>
//           </li>
//         </ul>
//       </div>
//       {showCategorias && <Categorias />}
//       {showProductos && <Productos />}
//     </div>
//   );
// }

// export default Sidebar;






















// import React from 'react';
// import { Link } from 'react-router-dom';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './sidebar.css';

// function Sidebar() {
//     return (
//         <div>
//             <div className='sidebar'>
//                 <div class='pictures-container-main'>
//                     <img class='pictures-main' src={marketPicasso} height={250} width={250} style={{ 'borderRadius': '10px' }} alt='menu' />
//                 </div>
//                 <ul>
//                     <li>
//                         <Link to="/categorias">Categorías</Link>
//                     </li>
//                     <li>
//                         <Link to="/productos">Productos</Link>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Sidebar;



