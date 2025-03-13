// Layout.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { FaUser, FaBell, FaSearch } from 'react-icons/fa';
import Sidebar from './SideBar/Sidebar';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Tableau de bord' }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Détection de la taille de l'écran pour le responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarExpanded(false);
      }
    };
    
    handleResize(); // Initialiser l'état au chargement
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Overlay for mobile when sidebar is expanded */}
        {isMobile && sidebarExpanded && (
          <div 
            className="fixed inset-0 z-20 bg-black bg-opacity-50" 
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Sidebar */}
        <div className={`
          ${isMobile ? 'fixed z-30 h-full' : 'relative'} 
          ${isMobile && !sidebarExpanded ? '-translate-x-full' : 'translate-x-0'}
          transition-transform duration-300 ease-in-out
        `}>
          <Sidebar 
            isExpanded={sidebarExpanded} 
            toggleSidebar={toggleSidebar} 
          />
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          {/* Navbar */}
          <header className="bg-white shadow z-10">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center">
                {isMobile && (
                  <button 
                    onClick={toggleSidebar}
                    className="mr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
                <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Barre de recherche */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <FaSearch className="text-gray-500 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="bg-transparent border-none focus:outline-none text-sm"
                  />
                </div>
                
                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full">
                  <FaBell className="text-xl" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                {/* Profil */}
                <div className="relative">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <FaUser />
                    </div>
                    <span className="hidden md:block font-medium">Admin</span>
                  </button>
                </div>
              </div>
            </div>
          </header>
          
          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </Router>
  );
};

export default Layout;