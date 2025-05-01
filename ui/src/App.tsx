import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useAuth } from "./features/auth/components/AuthProvider";
import { LandingPage } from "./features/landing-page";
import CreateCompanyPage from "./features/auth/pages/CreateCompanyPage";
import LoadingScreen from "./features/DashBoard/components/LoadingScreen";
import ProductForm from "./features/product/forms/productForm";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "./App.css";

const DashboardLayout = lazy(() => import("./features/DashBoard/DashBoardLayout"));

const App = () => {
  const { isAuthenticated, isAuthLoading ,setIsAuthenticated} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading) {
      if (isAuthenticated && (location.pathname === "/stokify" || location.pathname === "/SignUp")) {
        navigate("/dashboard");
      }
    }
    if(isAuthenticated && location.pathname != "/stokify" && location.pathname != "/SignUp"){
      navigate(location.pathname)
    }
  }, [isAuthenticated, isAuthLoading, location.pathname, navigate]);
  


  if (isAuthLoading) return <LoadingScreen />;

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/stokify" element={<LandingPage  setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/SignUp" element={<CreateCompanyPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardLayout />
            </Suspense>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<div>Dashboard home</div>} />
            <Route path="products" element={<ProductForm />} />
            {/* Add more protected routes here */}
          </Route>
        </Route>

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
