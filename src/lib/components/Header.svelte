<script lang="ts">
	import ThemeSelector from './ThemeSelector.svelte';
	import { onMount } from 'svelte';

	export let translations: any;
	export let user: { email: string } | null = null;
	let isMenuOpen = false;
	let headerId = Math.random().toString(36).substring(7);

	onMount(() => {
		console.log(`Header ${headerId} mounted with user:`, user);
		// Check for other headers
		const headers = document.querySelectorAll('.app-header');
		if (headers.length > 1) {
			console.warn('Multiple headers detected:', headers.length);
		}
	});

	$: console.log('Header user changed:', user);
</script>

<header
	class="app-header bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50"
	data-header-id={headerId}
>
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-3">
					<span class="text-2xl font-bold text-primary-600 dark:text-primary-400">Logo</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				<a
					href="/"
					class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
					>{translations.header.home}</a
				>
				{#if user}
					<form action="/auth/logout" method="POST" class="flex items-center">
						<span class="text-sm text-gray-600 dark:text-gray-400 mr-4">{user.email}</span>
						<button
							type="submit"
							class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
						>
							{translations.header.signOut}
						</button>
					</form>
				{:else}
					<a
						href="/auth/login"
						class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
					>
						{translations.header.signIn}
					</a>
				{/if}
				<ThemeSelector {translations} />
			</div>

			<!-- Mobile menu button -->
			<div class="flex items-center space-x-4 md:hidden">
				<ThemeSelector {translations} />
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
					on:click={() => (isMenuOpen = !isMenuOpen)}
				>
					<span class="sr-only">Open main menu</span>
					{#if isMenuOpen}
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					{:else}
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile menu -->
		{#if isMenuOpen}
			<div class="md:hidden">
				<div class="pt-2 pb-3 space-y-1">
					<a
						href="/"
						class="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
						>{translations.header.home}</a
					>
					{#if user}
						<form action="/auth/logout" method="POST" class="block">
							<span class="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-400"
								>{user.email}</span
							>
							<button
								type="submit"
								class="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
							>
								{translations.header.signOut}
							</button>
						</form>
					{:else}
						<a
							href="/auth/login"
							class="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
						>
							{translations.header.signIn}
						</a>
					{/if}
				</div>
			</div>
		{/if}
	</nav>
</header>
