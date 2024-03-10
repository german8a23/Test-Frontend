import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './detalle.scss';

const Detalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/productos/${id}`, {
        });
        setProducto(response.data);
      } catch (error) {
        console.error('Error al obtener el producto', error);
      }
    };

    fetchData();
  }, [id]);


  return (
    <div className='detalle-container'>
      {producto ? (
        <div className='ver-detalle'>
          <h2>Detalles del Producto</h2>
          <p>Nombre: {producto.nombre}</p>
          <p>Stock: {producto.stock}</p>
          <p>Precio: {producto.precio}</p>
          <p>Categoría: {producto.categoria}</p>
          {producto.foto && (
            <img src={producto.foto} alt={producto.foto} className="product-image" />
          )}
        </div>
      ) : (
        <p>No se pudo cargar la información del producto.</p>
      )}
    </div>
  );
};

export default Detalle;



















// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './detalle.scss';

// const Detalle = () => {
//   const { id, imageUrl } = useParams();
//   const [producto, setProducto] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/productos/${id}`);
//         setProducto(response.data);
//       } catch (error) {
//         console.error('Error al obtener el producto', error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
//     <div className='detalle-container'>
//       {producto ? (
//         <div className='ver-detalle'>
//           <h2>Detalles del Producto</h2>
//           <p>Nombre: {producto.nombre}</p>
//           <p>Stock: {producto.stock}</p>
//           <p>Precio: {producto.precio}</p>
//           <p>Categoría: {producto.categoria}</p>
//           <img src={producto.foto} alt={producto.nombre} />
//         </div>
//       ) : (
//         <p>No se pudo cargar la información del producto.</p>
//       )}
//     </div>
//   );
// };

// export default Detalle;








// import { NavLink } from 'react-router-dom';

// const verDetalle = () => {
//     return (
//         <div>
//             <ul>
//                 <li>
//                     <NavLink to="/detalle">Ver Detalle</NavLink>
//                 </li>
//             </ul>
//         </div>
//     )
// }

// export default verDetalle;
