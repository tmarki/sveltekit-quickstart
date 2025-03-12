<script lang="ts">
	export let translations: any;
	let isMenuOpen = false;
</script>

<header class="bg-white shadow-sm sticky top-0 z-50">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-3">
					<span class="text-2xl font-bold text-primary-600">Logo</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				<a
					href="/"
					class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
					>{translations.header.home}</a
				>
				<a
					href="/about"
					class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
					>{translations.header.about}</a
				>
				<a
					href="/contact"
					class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
					>{translations.header.contact}</a
				>
			</div>

			<!-- Mobile menu button -->
			<div class="flex items-center md:hidden">
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
						class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
						>{translations.header.home}</a
					>
					<a
						href="/about"
						class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
						>{translations.header.about}</a
					>
					<a
						href="/contact"
						class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
						>{translations.header.contact}</a
					>
				</div>
			</div>
		{/if}
	</nav>
</header>
