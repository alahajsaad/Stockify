import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";


const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to the landing page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
    
  }

  // If authenticated, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
