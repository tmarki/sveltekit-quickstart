<script lang="ts">
	import type { LayoutData } from './$types';
	import { loadTranslations } from '$lib/i18n/utils';
	import { browser } from '$app/environment';

	export let data: LayoutData;

	// Handle client-side locale changes
	$: if (browser && data.locale) {
		loadTranslations(data.locale);
	}
</script>

<slot />
