import { collection } from '@/config/site';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string) {
  if (!address) return '';
  const prefix = address.substring(0, 6); // Take first 6 characters
  const suffix = address.substring(address.length - 4); // Take last 4 characters
  return `${prefix}...${suffix}`; // Combine with ellipsis in the middle
}

export function formatNumber(number: number | string, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('en-US', {
    style: options.style ?? 'decimal',
    notation: options.notation ?? 'standard',
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
    ...options
  }).format(Number(number));
}

export const getRandomCollection = () => {
  const keys = Object.keys(collection) as Array<keyof typeof collection>; // Cast keys to the correct type
  const randomKey = keys[Math.floor(Math.random() * keys.length)]; // Select a random key
  return collection[randomKey]; // Return the corresponding collection
};
