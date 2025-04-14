import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useAuth } from "./features/auth/components/AuthProvider";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import { LandingPage } from "./features/landing-page";
import CreateCompanyPage from "./features/auth/pages/CreateCompanyPage";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import LoadingScreen from "./features/DashBoard/components/LoadingScreen";

// Lazy load dashboard for performance optimization
const Dashboard = lazy(() => import("./features/DashBoard/DashBoard"));

const App = () => {
  const { isAuthenticated, user , isAuthLoading  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated && ["/", "/SignUp"].includes(location.pathname)) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user?.scope, location.pathname, isAuthLoading, navigate]);

  if (isAuthLoading) return <LoadingScreen />; // 👈 Show loading while checking auth

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignUp" element={<CreateCompanyPage />} />
        <Route
          element={<ProtectedRoute />}
        >
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Dashboard />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
