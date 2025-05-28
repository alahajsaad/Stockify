import { useAuth } from "src/features/auth/components/AuthProvider";
import { forwardRef } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Paths } from "src/lib/paths";

// UserMenu Component
const UserMenu = forwardRef<HTMLDivElement>((props, ref) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
 
  return (
    <div
      ref={ref}
      className="absolute top-16 right-4 w-48 rounded-lg shadow-xl bg-white p-3 z-50 transition-all duration-300"
    >
      <div className="flex flex-col gap-2">

        <button onClick={() => navigate(Paths.profile)} className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 w-full text-left">
          <User size={16} />
          <span>Profile</span>
        </button>

        <button onClick={() => navigate(Paths.company)} className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 w-full text-left">
          <Settings size={16} />
          <span>Entreprise</span>
        </button>

        <div className="border-t my-1"></div>
        <button
          onClick={logout}
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 w-full text-left text-red-600"
        >
          <LogOut size={16} />
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  );
});

UserMenu.displayName = "UserMenu"; // Add displayName for better debugging
export default UserMenu;