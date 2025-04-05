import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth/components/AuthProvider";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import { LandingPage } from "./features/landing-page";
import Dashboard from "./features/DashBoard/DashBoard";
import "./App.css"

const App = () => {
  return (
    <AuthProvider>
     
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
     
    </AuthProvider>
  );
};

export default App;
