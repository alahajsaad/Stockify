// tokenService.ts
export const TokenService = {
  getAccessToken: () => localStorage.getItem('access_token'),
  setAccessToken: (token: string) => localStorage.setItem('access_token', token),
  removeAccessToken: () => localStorage.removeItem('access_token'),
  clearAccessToken: () => localStorage.removeItem('access_token'),
  
  // Check if token exists and is not expired
  isTokenValid: () => {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    
    try {
      // Decode JWT to check expiration (without verification)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }
};