import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const isLocal = window.location.hostname === 'localhost';

export const BASE_URL = isLocal 
  ? `http://localhost:8088/api/v1` 
  : `http://${window.location.hostname}:8080/api/v1`;



export function generateUniqueId(randomLength = 8) {
    const timestamp = Date.now(); // Base temporelle
    const randomMultiplier = Math.pow(10, randomLength);
    const randomPart = Math.floor(Math.random() * randomMultiplier); // Partie aléatoire de N chiffres

    // Combine les deux parties en un seul nombre
    const uniqueId = parseInt(`${timestamp}${randomPart}`);

    return uniqueId;
}