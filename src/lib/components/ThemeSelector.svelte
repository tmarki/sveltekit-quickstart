<script lang="ts">
	import { theme, updateTheme } from '$lib/stores/theme';

	let isOpen = false;

	const themes = [
		{ value: 'light', label: 'Light', icon: '☀️' },
		{ value: 'dark', label: 'Dark', icon: '🌙' },
		{ value: 'system', label: 'System', icon: '💻' }
	];

	function handleSelect(value: 'light' | 'dark' | 'system') {
		updateTheme(value);
		isOpen = false;
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.theme-selector')) {
			isOpen = false;
		}
	}

	$: currentTheme = themes.find((t) => t.value === $theme);
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative theme-selector">
	<button
		type="button"
		class="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
		on:click={() => (isOpen = !isOpen)}
	>
		<span>{currentTheme?.icon}</span>
		<span class="hidden sm:inline">{currentTheme?.label}</span>
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
			class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
		>
			<div class="py-1" role="menu">
				{#each themes as { value, label, icon }}
					<button
						class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
						class:text-primary-600={value === $theme}
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
