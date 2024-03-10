// rutas.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "../componentes/login";
import Sidebar from "../componentes/Sidebar";
import Home from "../pages/Home";
import Categorias from "../pages/Categorias";
import Productos from "../pages/Productos";
import VerDetalle from '../componentes/VerDetalle';


const RouterConfig = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/*" element={<SidebarRoutes />} />
    </Routes>
  </Router>
);


// Ruta para las páginas que requieren Sidebar
const SidebarRoutes = () => (
  <>
    <div className="flex">
      <Sidebar />
      <div>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/categorias' element={<Categorias />} />
          <Route path='/productos' element={<Productos />} />
        </Routes>
      </div>
      <div>
        <Routes>
          <Route path='/detalle/:id' element={<VerDetalle />}></Route>
        </Routes>
      </div>
    </div>
  </>
);


export default RouterConfig;








// // rutas.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginPage from "../componentes/login";
// import Sidebar from "../componentes/Sidebar";
// import Home from "../pages/Home";
// import Categorias from "../pages/Categorias";
// import Productos from "../pages/Productos";

// const RouterConfig = () => (
//   <Router>
//     <Routes>
//       <Route path="/loginpage" element={<LoginPage />} />
//     </Routes>
//     <div className="flex">
//       <Sidebar />
//       <div className="content">
//         <Routes>
//           <Route path='/home' element={<Home />} />
//           <Route path='/categorias' element={<Categorias />} />
//           <Route path='/productos' element={<Productos />} />
//         </Routes>
//       </div>
//     </div>
//   </Router>
// );

// export default RouterConfig;





// import { Route, Routes, createBrowserRouter } from "react-router-dom";
// import LoginPage from "../componentes/login";
// import Navbar from "../componentes/Navbar";
// import Sidebar from "../componentes/Sidebar";
// import Home from "../pages/Home";
// import Categorias from "../pages/Categorias";
// import Productos from "../pages/Productos";

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <LoginPage />
//     },
//     {
//         path: "/welcome",
//         element: (
//             <>
/* <router>
    <Navbar />
    <div className="flex">
        <Sidebar />
        <div className="content">
            <Routes>
                <Route exact={true} path='/home' Component={Home} />
                <Route exact={true} path='/categorias' Component={Categorias} />
                <Route exact={true} path='/productos' Component={Productos} />
            </Routes>
        </div>
    </div>
</router> */
//             </>
//         )
//     },

// {
//     path: "/home",
//     element: (
//         <>
//             <Home/>
//         </>
//     )
// },
// {
//     path: "/categorias",
//     element: (
//         <>
//             <Categorias />
//         </>
//     )
// },
// {
//     path: "/productos",
//     element: (
//         <>
//             <Productos />
//         </>
//     )
// },

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <LoginPage/>
//     },
//     {
//         path: "/welcome",
//         element: (
//             <>
//                 <Categorias/>
//                 <Productos/>
//                 <ImageUploader/>
//             </>
//         )
//     },
// ]);