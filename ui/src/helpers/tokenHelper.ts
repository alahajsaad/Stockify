import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "src/types";

/**
 * Checks if a JWT token is valid based on expiration.
 * @param token - JWT token string
 * @returns true if valid, false otherwise
 */
export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const nowInSeconds = Date.now() / 1000; // convert to seconds
    return decoded.exp > nowInSeconds;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};
