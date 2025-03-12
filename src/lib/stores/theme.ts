import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark' | 'system';

// Get initial theme from localStorage or default to 'system'
const getInitialTheme = (): Theme => {
	if (!browser) return 'system';
	return (localStorage.getItem('theme') as Theme) || 'system';
};

// Create the theme store
export const theme = writable<Theme>(getInitialTheme());

// Update theme class on document and save to localStorage
export function updateTheme(newTheme: Theme) {
	if (!browser) return;

	theme.set(newTheme);
	localStorage.setItem('theme', newTheme);

	// If theme is system, check system preferences
	if (newTheme === 'system') {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	} else {
		// Otherwise set theme directly
		if (newTheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
}

// Initialize theme system
export function initializeTheme() {
	if (!browser) return;

	// Subscribe to theme changes
	theme.subscribe((value) => {
		updateTheme(value);
	});

	// Listen for system theme changes
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		if (getInitialTheme() === 'system') {
			if (e.matches) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	});
}
