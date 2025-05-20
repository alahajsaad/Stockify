// File: src/helpers/tokenHelper.ts
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../types';

/**
 * Check if a JWT token is valid (not expired)
 */
export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

/**
 * Get remaining token time in seconds
 */
export const getTokenRemainingTime = (token: string): number => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const currentTime = Date.now() / 1000;
    
    // Return remaining time in seconds
    return Math.max(0, decoded.exp - currentTime);
  } catch {
    return 0;
  }
};