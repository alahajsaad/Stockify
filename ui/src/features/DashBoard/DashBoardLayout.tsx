import Sidebar from "./components/SideBar/Sidebar";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useIsMobile } from "src/hooks/useMobile";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/components/AuthProvider";

const DashboardLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(true);
  const { isAuthenticated } = useAuth();

  const toggleSidebar = () => setIsExpanded(prev => !prev);

  useEffect(() => {
    setIsExpanded(!isMobile);
  }, [isMobile]);

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex flex-row h-screen">
      <Sidebar toggleSidebar={toggleSidebar} isExpanded={isExpanded} />
      <div className="flex flex-col w-full h-screen">
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="bg-gray-100 p-4 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
