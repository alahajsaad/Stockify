import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {  SidebarItemData, SidebarParentItemData, useSidebarData } from "./SideBarData";
import { useIsMobile } from "src/hooks/useMobile";
import SideBarParentItem from "./SideBarParentItem";

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
  const isMobile = useIsMobile();
  const [isRendered, setIsRendered] = useState(false);
  const sidebarData = useSidebarData();
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

  const renderSidebarItem = (item: SidebarItemData | SidebarParentItemData, index: number) => {
    if (item.type === "Parent") {
      return (
        <SideBarParentItem
          key={index}
          title={item.title}
          icon={item.icon}
          isExpanded={isExpanded}
          children={item.children}
        />
      );
    } else {
      return (
        <SidebarItem
          key={index}
          openLink={item.openLink}
          title={item.title}
          icon={item.icon}
          addlink={item.addLink}
          isExpanded={isExpanded}
          toggleSideBar={isMobile ? toggleSidebar : undefined}
        />
      );
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className={`h-full transition-all duration-300 border-r border-gray-200 bg-white ${
            isExpanded ? "min-w-70" : "w-20"
          }`}
        >
          <div className="flex items-center h-16 justify-between p-4 border-b border-gray-200">
            {isExpanded ? (
              <div className="flex items-center">
                <span className="ml-3 font-bold text-lg">Stockify</span>
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
            {sidebarData.map((item, index) => renderSidebarItem(item, index))}
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
                <span className="ml-3 font-bold text-lg">Stockify</span>
              </div>
              <button
                onClick={toggleSidebar}
                className="hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
              >
                <ChevronLeft className="text-xl" />
              </button>
            </div>

            <div className="py-4">
              {sidebarData.map((item, index) => renderSidebarItem(item, index))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;