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
import { Paths } from "./lib/paths";
import ConsultProducts from "./features/product/pages/ConsultProducts";
import ProductDetails from "./features/product/pages/ProductDetails";
import ForgotPasswordForm from "./features/auth/forms/ForgotPasswordForm";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";

const DashboardLayout = lazy(() => import("./features/DashBoard/DashBoardLayout"));

const App = () => {
  const { isAuthenticated, isAuthLoading ,setIsAuthenticated} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!isAuthLoading) {
      if (isAuthenticated && (location.pathname === "/" || location.pathname === "/SignUp")) {
        navigate("/stockify/dashboard");
      }
    }
    if(isAuthenticated && location.pathname != "/" && location.pathname != "/SignUp"){
      navigate(location.pathname)
    }
  }, [isAuthenticated, isAuthLoading, location.pathname, navigate]);
  


  if (isAuthLoading) return <LoadingScreen />;

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path={Paths.landingPage} element={<LandingPage  setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path={Paths.signUp} element={<CreateCompanyPage />} />
        <Route path={Paths.forgotPassword} element={<ForgotPasswordPage />} />
        <Route path={Paths.resetPassword} element={<ResetPasswordPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={Paths.stockify} element={
            <Suspense fallback={<LoadingScreen />}>
              <DashboardLayout />
            </Suspense>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<div>Dashboard home</div>} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="products" element={<ConsultProducts />} />
            <Route path="products/:id" element={<ProductDetails />} />
            {/* Add more protected routes here */}
          </Route>
        </Route>

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }} // Très important pour apparaître devant les modals
      />
    </>
  );
};

export default App;
