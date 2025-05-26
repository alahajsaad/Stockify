import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const isLocal = window.location.hostname === 'localhost';

export const BASE_URL = isLocal 
  ? `http://localhost:8088/api/v1` 
  : `http://${window.location.hostname}:8080/api/v1`;
