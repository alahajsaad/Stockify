import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { ApiResponse, LoginResponse, TokenPayload } from "src/types";

const API_BASE_URL = 'http://localhost:8088/api/v1';

// Create a token service to manage token operations
export const TokenService = {
  getAccessToken: () => localStorage.getItem('access_token'),
  setAccessToken: (token: string) => localStorage.setItem('access_token', token),
  removeAccessToken: () => localStorage.removeItem('access_token'),
  clearAccessToken: () => localStorage.removeItem('access_token'),

  
  // Method to refresh token that can be called from anywhere
  refreshToken: async (): Promise<string | null> => {
    try {
      const { data }: AxiosResponse<ApiResponse<LoginResponse>> = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        {}, // Empty body
        { 
          withCredentials: true // Important to include cookies
        }
      );
      
      if (data.status === 'error' || !data.data?.access_token) {
        throw new Error(data.message || 'Failed to refresh token');
      }
      
      const newToken = data.data.access_token;
      TokenService.setAccessToken(newToken);
      return newToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      TokenService.removeAccessToken();
      return null;
    }
  }
};

// Define Auth Context Type
type AuthContextType = {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user: TokenPayload | null;
  login: (token: string) => void;
  logout: () => void;
  setAuthLoading: (isAuthLoading: boolean) => void;
  setIsAuthenticated: (bool: boolean) => void;
  refreshToken: () => Promise<boolean>;
};

// Create the Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setAuthLoading] = useState(true); // Start as loading
  const [user, setUser] = useState<TokenPayload | null>(null);
  const navigate = useNavigate();
  
  // Check for existing token on mount and validate it
  useEffect(() => {
    const checkAuth = async () => {
      const token = TokenService.getAccessToken();
      
      if (token) {
        try {
          // Check if token is valid
          const decoded = jwtDecode<TokenPayload>(token);
          const currentTime = Date.now() / 1000;
          
          // If token is expired or about to expire (within 30 seconds), refresh it
          if (!decoded.exp || decoded.exp < currentTime + 30) {
            const success = await refreshToken();
            if (!success) {
              // If refresh failed, clear auth state
              setIsAuthenticated(false);
              setUser(null);
            }
          } else {
            // Valid token, set auth state
            setUser(decoded);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          // Invalid token format, try to refresh
          const success = await refreshToken();
          if (!success) {
            // If refresh failed, clear auth state
            setIsAuthenticated(false);
            setUser(null);
          }
        }
      } else {
        // No token found
        setIsAuthenticated(false);
        setUser(null);
      }
      
      setAuthLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = (token: string) => {
    TokenService.setAccessToken(token);
    setIsAuthenticated(true);
    
    const decoded = jwtDecode<TokenPayload>(token);
    setUser(decoded);
    setAuthLoading(false);
    
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

  // Logout function
  const logout = () => {
    // Optional: Call logout endpoint to invalidate refresh token
    axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true })
      .catch(error => console.error("Error during logout:", error));
      
    TokenService.removeAccessToken();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  // Refresh token function that updates auth state
  const refreshToken = async (): Promise<boolean> => {
    const newToken = await TokenService.refreshToken();
    
    if (newToken) {
      const payload = jwtDecode<TokenPayload>(newToken);
      setUser(payload);
      setIsAuthenticated(true);
      return true;
    } else {
      // Don't automatically logout here, let the calling code decide
      return false;
    }
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
      refreshToken 
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