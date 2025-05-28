import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LucideIcon, Plus } from "lucide-react";

interface SidebarItemProps {
  openLink: string;
  addlink?: string;
  title: string;
  icon: LucideIcon;
  isExpanded: boolean;
  toggleSideBar?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  openLink,
  addlink,
  title,
  icon: Icon,
  isExpanded,
  toggleSideBar,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract path after /stockify for comparison
   const currentPath = location.pathname.replace(/^\/stockify\//, '') || '';

  const targetPath = openLink.replace(/^\/stockify/, '') || '/';

  const isActive = currentPath === targetPath || 
    (targetPath !== "/" && currentPath.startsWith(targetPath + "/"));

  const [isHovered, setIsHovered] = useState(false);
  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addlink) {
      navigate(addlink);
    }
  };


  const handleMainClick = () => {
    if (toggleSideBar) {
      toggleSideBar();
    }
  };

  return (
    <div className="relative">
      <Link
        onClick={handleMainClick}
        to={openLink}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center py-3 px-4 my-1 mx-2 rounded-lg text-sm transition-all duration-200 group
          ${isActive
            ? "bg-blue-50 text-blue-600 shadow-sm"
            : "hover:bg-gray-50 hover:text-gray-900"
          }`}
      >
        <span className={`flex-shrink-0 transition-all duration-200 ${isActive ? "text-blue-500" : ""}`}>
          <Icon size={isActive ? 20 : 18} strokeWidth={isActive ? 2 : 1.5} />
        </span>
        
        {isExpanded && (
          <div className="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all flex items-center justify-between w-full">
            <span className="transition-all duration-200">{title}</span>
            
            {addlink && (
              <div className="ml-2 flex items-center">
                <button
                  onClick={handleAddClick}
                  className={`flex items-center justify-center rounded-full p-1.5 transition-all duration-200
                    ${isHovered || isActive
                      ? "opacity-100 bg-blue-100 hover:bg-blue-200 text-blue-700"
                      : "opacity-0 hover:bg-blue-100"
                    }`}
                  aria-label={`Add new ${title}`}
                  title={`Add new ${title}`}
                >
                  <Plus size={14} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        )}
        
        {!isExpanded && (
          <div className="absolute left-16 px-3 py-2 min-w-max rounded-md shadow-md text-gray-700 bg-white text-xs font-medium transition-all duration-150 scale-0 origin-left group-hover:scale-100 z-20 border border-gray-100">
            <div className="flex items-center justify-between gap-2">
              <span>{title}</span>
              {addlink && (
                <button
                  onClick={handleAddClick}
                  className="rounded-full p-1 hover:bg-blue-100 transition-colors duration-150"
                  aria-label={`Add new ${title}`}
                  title={`Add new ${title}`}
                >
                  <Plus size={12} />
                </button>
              )}
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default SidebarItem;