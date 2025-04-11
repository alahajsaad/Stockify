import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useAuth } from "./features/auth/components/AuthProvider";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import { LandingPage } from "./features/landing-page";
import CreateCompanyPage from "./features/auth/pages/CreateCompanyPage";
import "./App.css";
import { ToastContainer } from 'react-toastify';

// Lazy load dashboard for performance optimization
const Dashboard = lazy(() => import("./features/DashBoard/DashBoard"));

const App = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      console.log(user?.scope);
      navigate("/dashboard");
    }
  }, [isAuthenticated, user?.scope, location.pathname, navigate]);

  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignUp" element={<CreateCompanyPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
      
    </Suspense>
    <ToastContainer />
    </>
  );
};

export default App;
