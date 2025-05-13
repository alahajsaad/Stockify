import React, { useState, useRef, useEffect } from "react";
import { LucideIcon, ChevronDown } from "lucide-react";
import { SidebarItemData } from "./SideBarData";
import SidebarItem from "./SidebarItem";

interface SidebarParentItemProps {
  title: string;
  icon: LucideIcon;
  isExpanded: boolean;
  children: SidebarItemData[];
}

const SideBarParentItem: React.FC<SidebarParentItemProps> = ({
  title,
  icon: Icon,
  isExpanded,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [childrenHeight, setChildrenHeight] = useState<number>(0);
  const childrenRef = useRef<HTMLDivElement>(null);
  
  // Calculate children height on first render and when children change
  useEffect(() => {
    if (childrenRef.current) {
      setChildrenHeight(childrenRef.current.scrollHeight);
    }
  }, [children, isExpanded]);

  const toggleParentItem = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <div className="py-1 px-2">
      <div 
        onClick={toggleParentItem}
        className={`flex items-center justify-between py-3 px-4 rounded-lg text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${isOpen ? 'bg-gray-50' : ''}`}
      >
        <div className="flex items-center gap-2">
          <span className={`text-xl transition-transform duration-200 ${isOpen ? 'text-blue-600' : ''}`}>
            <Icon />
          </span>
          {isExpanded && (
            <span className={`ml-3 font-medium whitespace-nowrap overflow-hidden transition-all ${isOpen ? 'text-blue-600' : ''}`}>
              {title}
            </span>
          )}
          {!isExpanded && (
            <div className="absolute left-20 m-2 w-auto p-2 min-w-max rounded-md shadow-md text-blue-800 bg-white text-xs font-medium transition-all duration-100 scale-0 origin-left group-hover:scale-100 z-20">
              {title}
            </div>
          )}
        </div>
        {isExpanded && (
          <span className={`transition-transform duration-200 ${isOpen ? 'text-blue-600 rotate-180' : ''}`}>
            <ChevronDown size={16} />
          </span>
        )}
      </div>
      
      {isExpanded && (
        <div 
          className="overflow-hidden transition-all duration-300 ease-in-out pl-4"
          style={{ 
            maxHeight: isOpen ? `${childrenHeight}px` : '0px',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div ref={childrenRef}>
            {children.map((child, index) => (
              <SidebarItem
                key={index}
                openLink={child.openLink}
                addlink={child.addLink}
                title={child.title}
                icon={child.icon}
                isExpanded={isExpanded}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBarParentItem;