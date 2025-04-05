import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
 // Import the useAuth hook

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
