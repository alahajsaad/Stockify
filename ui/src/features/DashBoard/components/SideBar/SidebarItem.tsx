// SidebarItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  path: string;
  title: string;
  icon: LucideIcon;
  isExpanded: boolean;
  toggleSideBar? : () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ path, title, icon: Icon, isExpanded , toggleSideBar}) => {
  return (
    <Link onClick={toggleSideBar} to={path} className="flex items-center py-3 px-4 my-1 mx-2 rounded-lg text-sm hover:bg-gray-100 focus:bg-blue-50 focus:text-blue-600 transition-all duration-200 group">
      <span className="text-xl">
        <Icon />
      </span>
      {isExpanded && (
        <span className="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all">
          {title}
        </span>
      )}
      {!isExpanded && (
        <div className="absolute left-20 m-2 w-auto p-2 min-w-max rounded-md shadow-md text-blue-800 bg-white text-xs font-medium transition-all duration-100 scale-0 origin-left group-hover:scale-100 z-20">
          {title}
        </div>
      )}
    </Link>
  );
};

export default SidebarItem;
