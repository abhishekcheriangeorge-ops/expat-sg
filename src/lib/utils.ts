import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sgd(n: number, digits = 0) {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(n);
}

export function compactSgd(n: number) {
  if (n >= 1000) {
    const k = n / 1000;
    return `S$${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
  }
  return sgd(n);
}
