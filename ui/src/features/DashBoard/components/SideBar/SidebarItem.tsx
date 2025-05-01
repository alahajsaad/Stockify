import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, Plus } from 'lucide-react';
import { SidebarItemData } from './SideBarData';

interface SidebarItemProps {
  path: string;
  title: string;
  icon: LucideIcon;
  isExpanded: boolean;
  toggleSideBar?: () => void;
  addButtonPath?: string;
  childrenItems?: SidebarItemData[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  path,
  title,
  icon: Icon,
  isExpanded,
  toggleSideBar,
  addButtonPath,
  childrenItems,
}) => {
 
  return (
    <div className="relative">
      <Link
        onClick={toggleSideBar}
        to={path}
        className="flex items-center py-3 px-4 my-1 mx-2 rounded-lg text-sm hover:bg-gray-100 focus:bg-blue-50 focus:text-blue-600 transition-all duration-200 group"
      >
        <span className="text-xl">
          <Icon />
        </span>

        {isExpanded && (
          <span className="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all flex items-center justify-between w-full">
            {title}
            {addButtonPath && (
              <Link
                to={addButtonPath}
                onClick={(e) => e.stopPropagation()}
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md p-1 hover:bg-blue-100"
              >
                <Plus size={16} />
              </Link>
            )}
          </span>
        )}

        {!isExpanded && (
          <div className="absolute left-20 m-2 w-auto p-2 min-w-max rounded-md shadow-md text-blue-800 bg-white text-xs font-medium transition-all duration-100 scale-0 origin-left group-hover:scale-100 z-20">
            {title}
          </div>
        )}
      </Link>

      
    </div>
  );
};

export default SidebarItem;
