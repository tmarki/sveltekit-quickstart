<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data;
</script>

<div class="min-h-screen flex flex-col">
	<Header translations={data.translations} />

	<main class="flex-grow">
		<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
			<h1 class="text-4xl font-bold text-center mb-6">
				{data.translations.home.welcome}
			</h1>
			<p class="text-xl text-center text-gray-600">
				{data.translations.home.description}
			</p>
		</div>
	</main>

	<Footer translations={data.translations} />
</div>
