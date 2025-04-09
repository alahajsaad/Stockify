import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { isTokenValid } from "src/helpers/tokenHelper";
import { TokenPayload } from "src/types";

type AuthContextType = {
  isAuthenticated: boolean;
  user: TokenPayload | null;
  login: (user: TokenPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<TokenPayload | null>(null);
  console.log("isAuth :" + isAuthenticated)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      const payload = jwtDecode<TokenPayload>(token);
      setIsAuthenticated(true);
      setUser(payload);
    }
  }, []);

  const login = (user: TokenPayload) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
