import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomUsernameWithSuffix(name: string): string {
  const trimmedName = name.toLocaleLowerCase().trim().replace(/\s+/g, '_');
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `${trimmedName}_${randomNumber}`;
}

export function padTo2Digits(num: number): string {
  return String(num).padStart(2, '0');
}
