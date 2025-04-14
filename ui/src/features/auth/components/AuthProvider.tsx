import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "src/helpers/tokenHelper";
import { TokenPayload } from "src/types";

type AuthContextType = {
  isAuthenticated: boolean;
  isAuthLoading: boolean
  user: TokenPayload | null;
  login: (user: string) => void;
  logout: () => void;
  setAuthLoading :(isAuthLoading : boolean) => void ;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState<TokenPayload | null>(null);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && isTokenValid(token)) {
      const payload = jwtDecode<TokenPayload>(token);
      setIsAuthenticated(true);
      setUser(payload);
    }
  }, []);

  const login = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('access_token',token)
    
    const decoded = jwtDecode<TokenPayload>(token);
    setUser(decoded);
    setAuthLoading(false)
    // Redirect based on role
    switch (decoded.scope) {
      case 'ROLE_ADMIN':
        navigate('/dashboard');
        break;
      case 'ROLE_TECHNICIAN':
        navigate('/technician');
        break;
      case 'ROLE_SECRETARY':
        navigate('/secretary');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    navigate('/');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout ,setAuthLoading ,isAuthLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
