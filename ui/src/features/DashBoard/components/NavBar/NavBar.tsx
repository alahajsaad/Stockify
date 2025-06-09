import { AlignJustify, UserRound } from "lucide-react";
import { useIsMobile } from "src/hooks/useMobile";
import UserMenu from "./UserMenu";
import useToggle from "src/hooks/useToggle";
import AvatarGenerator from "src/components/AvatarGenerator";
import { useAuth } from "src/features/auth/components/AuthProvider";

interface NavBarProps {
  toggleSidebar?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  const isMobile = useIsMobile();
  const { isOpen, toggle, ref, parentRef} = useToggle()
  const {user} = useAuth()
  

  return (
    <div className="flex items-center justify-between p-4 w-full h-16 border-b bg-white border-gray-200">
      <div className="flex items-center gap-5">
        {isMobile && (
          <AlignJustify
            onClick={toggleSidebar}
            className="cursor-pointer h-10 w-10 p-2 rounded-full hover:bg-gray-200"
          />
        )}
        {/* <p>navBar</p> */}
      </div>

      <div className="flex items-center lg:mr-20 relative">
          <div
            ref={parentRef}
            onClick={toggle}
            className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer"
          >
            {user &&  <AvatarGenerator name={user?.fullName} size={"small"}/>}
           
            
          </div>

          {isOpen && <UserMenu ref={ref} />}
        </div>
    </div>
  );
};

export default NavBar;
