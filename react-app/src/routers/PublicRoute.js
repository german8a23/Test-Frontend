import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
  };
  
  const PublicRoute = ({ element }) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (isAuthenticated()) {
        navigate("/home", { replace: true });
      }
    }, [navigate]);
  
    return !isAuthenticated() ? element : null;
  };

export default PublicRoute;
  