<script lang="ts">
	import type { LayoutData } from './$types';
	import { loadTranslations } from '$lib/i18n/utils';
	import { browser } from '$app/environment';
	import { initializeTheme } from '$lib/stores/theme';
	import '../app.css';

	export let data: LayoutData;

	// Handle client-side locale changes
	$: if (browser && data.locale) {
		loadTranslations(data.locale);
	}

	// Initialize theme system
	$: if (browser) {
		initializeTheme();
	}
</script>

<div
	class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
>
	<slot />
</div>
