import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import ForbiddenPage from "@/pages/ForbiddenPage";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // Roles allowed to access the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({allowedRoles}) => {
  const { isAuthenticated , user } = useAuth();

  // If not authenticated, redirect to the landing page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user?.scope)) {
    return <ForbiddenPage />;
  }

  // If authenticated, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
