<script lang="ts">
	import type { LayoutData } from './$types';
	import { loadTranslations } from '$lib/i18n/utils';
	import { browser } from '$app/environment';
	import '../app.css';

	export let data: LayoutData;

	// Handle client-side locale changes
	$: if (browser && data.locale) {
		loadTranslations(data.locale);
	}
</script>

<div class="min-h-screen flex flex-col bg-gray-50">
	<slot />
</div>
