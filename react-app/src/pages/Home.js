import React from 'react';
import '../styles/home.css'; 



const Home = () => {
  return (
    <div className="home-container">
      <div className="presentation-content">
        <h1 className="presentation-title">Bienvenido a la Página del Market</h1>
        <p className="presentation-subtitle">
          inventario with freedom.
        </p>
        <button className="cta-button" onClick={() => alert('¡Thansk!')}>
          i need a click
        </button>
      </div>
    </div>
  );
}

export default Home;