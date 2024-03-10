// index.js
import ReactDOM from 'react-dom';
import React from 'react';
import RouterConfig from './router/rutas';
import 'bootstrap/scss/bootstrap.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);












// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// // import App from './App';
// import { router } from './router/rutas';
// import { RouterProvider } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <RouterProvider router={router} />
//   </React.StrictMode>
// );
