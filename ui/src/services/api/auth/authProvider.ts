//authProvider.ts

import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { TokenPayload } from "src/types";
import { TokenService } from "./TokenService";
import { useLogout } from "./hooks";


type AuthContextType = {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user: TokenPayload | null;
  login: (token: string) => void;
  logout: () => void;
  setAuthLoading: (isAuthLoading: boolean) => void;
  setIsAuthenticated: (bool: boolean) => void;
  updateUser : (updatedUser: TokenPayload) => void ;
};

// Create the Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setAuthLoading] = useState(true); 
  const [user, setUser] = useState<TokenPayload | null>(null);
  const navigate = useNavigate();
  const {mutate : logOut } = useLogout()

  // Login function
  const login = (token: string) => {
    TokenService.setAccessToken(token);
    setIsAuthenticated(true);
    
    const decoded = jwtDecode<TokenPayload>(token);
    setUser(decoded);
    setAuthLoading(false);
    navigate('/dashboard');
  };

  const logout = () => {
    logOut()
    TokenService.removeAccessToken();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };



  const updateUser = (updatedUser: TokenPayload) => {
    setUser(updatedUser);
};

  // Provide auth context
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      setAuthLoading, 
      isAuthLoading, 
      setIsAuthenticated,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthProvider;