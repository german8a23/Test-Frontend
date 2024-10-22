import React from 'react'; 
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Categorias from './pages/Categorias';
import Productos from './pages/Productos';
import VerDetalle from './componentes/VerDetalle';
import LoginScreen from './componentes/auth/LoginScreen';
import RegisterScreen from './componentes/auth/RegisterScreen';
import PrivateRoute from './routers/PrivateRoute';
import Dashboard from './pages/Dashboard';
import PublicRoute from './routers/PublicRoute';
// import PageNotFound from './componentes/PageNotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute element={<LoginScreen />} />} />
        <Route index path="/login" element={<PublicRoute element={<LoginScreen />} />} />
        <Route path="/register" element={<PublicRoute element={<RegisterScreen />} />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="/home" element={<Home />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/detalle/:id" element={<VerDetalle />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;