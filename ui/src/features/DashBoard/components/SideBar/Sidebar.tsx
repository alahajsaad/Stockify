import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sidebarData } from "./SideBarData";
import { useIsMobile } from "src/hooks/useMobile";

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
  const isMobile = useIsMobile();
  const [isRendered, setIsRendered] = useState(false);

  // Handle render/unrender for animation
  useEffect(() => {
    if (isMobile) {
      if (isExpanded) {
        setIsRendered(true);
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
        const timeout = setTimeout(() => {
          setIsRendered(false);
        }, 300); // match duration of transition
        return () => clearTimeout(timeout);
      }
    }
  }, [isExpanded, isMobile]);

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className={`h-full transition-all duration-300 border-r border-gray-200 bg-white ${
            isExpanded ? "w-64" : "w-20"
          }`}
        >
          <div className="flex items-center h-16 justify-between p-4 border-b border-gray-200">
            {isExpanded ? (
              <div className="flex items-center">
                <span className="ml-3 font-bold text-lg">RepairPro</span>
              </div>
            ) : (
              <div className="w-full flex justify-center"></div>
            )}
            <button
              onClick={toggleSidebar}
              className="hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
            >
              {isExpanded ? (
                <ChevronLeft className="text-xl" />
              ) : (
                <ChevronRight className="text-xl" />
              )}
            </button>
          </div>

          <div className="py-4">
            {sidebarData.map((item, index) => (
              <SidebarItem
                key={index}
                path={item.path}
                title={item.title}
                icon={item.icon}
                addButtonPath={item.addButtonPath}
                isExpanded={isExpanded}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sidebar + Backdrop (always rendered for animation) */}
      {isMobile && isRendered && (
        <>
          {/* Backdrop */}
          <div
            onClick={toggleSidebar}
            className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 ease-in-out ${
              isExpanded ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center h-16 justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <span className="ml-3 font-bold text-lg">RepairPro</span>
              </div>
              <button
                onClick={toggleSidebar}
                className="hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
              >
                <ChevronLeft className="text-xl" />
              </button>
            </div>

            <div className="py-4">
              {sidebarData.map((item, index) => (
                <SidebarItem
                  key={index}
                  path={item.path}
                  title={item.title}
                  icon={item.icon}
                  isExpanded={true}
                  toggleSideBar={toggleSidebar}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
