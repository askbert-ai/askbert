import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const isImage = (url: string) => {
	const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
	return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
};