import React from 'react';
import Navbar from '../componentes/Navbar';
import Sidebar from '../componentes/Sidebar';
import '../styles/navbar.css';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

  return (

    <div className='app'>
      <Navbar />
      <div className='content'>
        <Sidebar />
      </div>
      <Outlet />
    </div>

  );
};

export default Dashboard;







