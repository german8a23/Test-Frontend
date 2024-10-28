import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/detalle.scss';

const VerDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {

        const response = await axios.get(`http://localhost:3000/productos/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error('Error al obtener el producto', error);
      }
    };
    fetchProducto();
  }, [id]);

  
    if (!producto) {
    return (
      <div className='contenedor-id-error'>
        <div className='error-id-design'>
        <p className='presentacion-id-error'>El id no existe......</p>
        </div>
      </div>
    )
  }



  return (
    <div className='detalle-container'>
      <div className='ver-detalle'>
        <p>Nombre: {producto.nombre} </p>
        <p>Stock: {producto.stock}</p>
        <p>Precio: {producto.precio}</p>
        <p>Categoría: {producto.categoria}</p>

        {producto.foto && (
          <img src={`data:image/jpg;base64,${producto.foto}`} alt="producto" className="product-images" />
        )}
      </div>
    </div>
  );
};

export default VerDetalle;










