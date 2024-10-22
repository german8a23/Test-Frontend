import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  let isLogged = localStorage.getItem('user')

  if (!isLogged) {
    return <Navigate to="/"/>
  }
  return <Outlet />;
};

export default PrivateRoute;

