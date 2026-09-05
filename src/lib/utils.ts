import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases condicionales de Tailwind evitando colisiones de utilidades.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
