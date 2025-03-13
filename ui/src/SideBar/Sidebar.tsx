// Sidebar.tsx
import React from "react";
import SidebarItem from "./SidebarItem";

import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { FaTools } from "react-icons/fa";
import { sidebarData } from "./SideBarData";

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isExpanded, 
  toggleSidebar, 
  className = "" 
}) => {
  return (
    <div 
      className={`${className} h-full transition-all duration-300 bg-gradient-to-b from-blue-700 to-blue-900 shadow-lg
                 ${isExpanded ? "w-64" : "w-20"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-600">
        {isExpanded ? (
          <div className="flex items-center text-white">
            <FaTools className="text-2xl" />
            <span className="ml-3 font-bold text-lg">RepairPro</span>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <FaTools className="text-2xl text-white" />
          </div>
        )}
        
        <button 
          onClick={toggleSidebar}
          className="text-blue-100 hover:text-white hover:bg-blue-600 p-2 rounded-full transition-colors"
        >
          {isExpanded ? (
            <LuPanelLeftClose className="text-xl" />
          ) : (
            <LuPanelLeftOpen className="text-xl" />
          )}
        </button>
      </div>

      {/* Navigation items */}
      <div className="py-4">
        {sidebarData.map((item, index) => (
          <SidebarItem
            key={index}
            path={item.path}
            title={item.title}
            icon={item.icon}
            isExpanded={isExpanded}
          />
        ))}
      </div>

      {/* Footer */}
      <div className={`absolute bottom-0 w-full p-4 text-blue-200 text-xs text-center 
                      ${isExpanded ? "block" : "hidden"}`}>
        <p>© 2025 RepairPro</p>
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Sidebar;