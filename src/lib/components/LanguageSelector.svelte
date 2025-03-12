<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { language, type SupportedLanguage } from '$lib/i18n/utils';

	let isOpen = false;

	const languages = [
		{ value: 'en' as SupportedLanguage, label: 'English', icon: '🇬🇧' },
		{ value: 'es' as SupportedLanguage, label: 'Español', icon: '🇪🇸' }
	];

	function handleSelect(value: SupportedLanguage) {
		const url = new URL($page.url);
		url.searchParams.set('lang', value);
		language.set(value);
		goto(url.toString());
		isOpen = false;
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.language-selector')) {
			isOpen = false;
		}
	}

	$: currentLanguage = languages.find((l) => l.value === $page.data.locale) ?? languages[0];
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative language-selector">
	<button
		type="button"
		class="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
		on:click={() => (isOpen = !isOpen)}
	>
		<span>{currentLanguage.icon}</span>
		<span class="hidden sm:inline">{currentLanguage.label}</span>
		<svg
			class="w-4 h-4 transition-transform duration-200"
			class:rotate-180={isOpen}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isOpen}
		<div
			class="absolute bottom-full mb-2 right-0 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
		>
			<div class="py-1" role="menu">
				{#each languages as { value, label, icon }}
					<button
						class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
						class:text-primary-600={value === $page.data.locale}
						on:click={() => handleSelect(value)}
					>
						<span>{icon}</span>
						<span>{label}</span>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
