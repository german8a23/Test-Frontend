// src/componentes/NotFound.js
import React from 'react';
import '../styles/notfound.css';

const PageNotFound = () => {
  return (
    <div className="not-found-contenedor">
      <div className='error-page'>
        <h1 className='presentacion-titulo-notfound'>404 - Página No Encontrada</h1>
        <p className='presentacion-subtitulo-notfound'>Lo sentimos, la página que buscas no existe.</p>
      </div>
    </div>
  );
};

export default PageNotFound;
