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
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";

import { AddCategoryPage, ConsultCategoriesPage } from "./features/category";
import { AddVatPage, ConsultVatsPage } from "./features/value_added_tax";

import ConsultClientsPage from "./features/client/pages/ConsultClientsPage";
import ConsultClientPage from "./features/client/pages/ConsultClientPage";
import AddSupplierOrderPage from "./features/supplier_order/pages/AddSupplierOrderPage";
import DashBoard from "./features/DashBoard/DashBoard";
import ProfilePage from "./features/auth/pages/ProfilePage";
import ConsultCompaniesPage from "./features/company/pages/ConsultCompaniesPage";
import ConsultSubscriptionsPage from "./features/subscription/ConsultSubscriptionsPage";
import ConsultCompanyPageSuperAdmin from "./features/company/pages/ConsultCompanyPageSuperAdmin";
import ConsultCompanyPage from "./features/company/pages/ConsultCompanyPage";
import AddClientPage from "./features/partner/pages/AddClientPage";
import CategoriesPage from "./features/category/pages/CategoriesPage";

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
            <Route path="dashboard" element={<DashBoard />} />
            <Route path={Paths.company} element={<ConsultCompanyPage />} />
            <Route path={Paths.profile} element={<ProfilePage />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="products" element={<ConsultProducts />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path={Paths.addVat} element={<AddVatPage />} />
            <Route path={Paths.vats} element={<ConsultVatsPage />} />
            <Route path={Paths.categories} element={<CategoriesPage />} />
            <Route path={Paths.addCategory} element={<AddCategoryPage />} />
           
            <Route path={Paths.subscriptions} element={<ConsultSubscriptionsPage />} />
            {/* <Route path={Paths.clients} element={<ConsultClientsPage />} />
            <Route path={Paths.client} element={<ConsultClientPage />} /> */}

            <Route path={Paths.clients}>
              <Route index element={<ConsultClientsPage />} />
              <Route path=":id" element={<ConsultClientPage />} />
            </Route>
            <Route path={Paths.addClient} element={<AddClientPage />} />

            <Route path={Paths.suppliers}>
              <Route index element={<ConsultClientsPage />} />
              <Route path=":id" element={<ConsultClientPage />} />
            </Route>
            <Route path={Paths.addSupplier} element={<AddClientPage />} />


            <Route path={Paths.clientOrders}>
              <Route index element={<ConsultClientsPage />} />
              <Route path=":id" element={<ConsultClientPage />} />
            </Route>
            <Route path={Paths.addClientOrder} element={<AddSupplierOrderPage />} />



            <Route path={Paths.supplierOrders}>
              <Route index element={<ConsultClientsPage />} />
              <Route path=":id" element={<ConsultClientPage />} />
            </Route>
            <Route path={Paths.addSupplierOrder} element={<AddSupplierOrderPage />} />

            <Route path={Paths.companies}>
              <Route index element={<ConsultCompaniesPage />} />
              <Route path=":id" element={<ConsultCompanyPageSuperAdmin />} />
            </Route>




           
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
