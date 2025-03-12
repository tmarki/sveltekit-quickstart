<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	export let data;
</script>

<div class="min-h-screen flex flex-col">
	<main class="flex-grow">
		<div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
			<div class="text-center">
				<h1
					class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
				>
					<span class="block">{data.translations.home.welcome}</span>
					<span class="block text-primary-600 dark:text-primary-400 mt-3">Powered by SvelteKit</span
					>
				</h1>
				<p
					class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
				>
					{data.translations.home.description}
				</p>
				<div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
					<div class="rounded-md shadow">
						<a
							href="/about"
							class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 md:py-4 md:text-lg md:px-10 transition-colors"
						>
							Get Started
						</a>
					</div>
					<div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
						<a
							href="/contact"
							class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-colors"
						>
							Contact Us
						</a>
					</div>
				</div>
			</div>
		</div>
	</main>

	<Footer translations={data.translations} />
</div>
