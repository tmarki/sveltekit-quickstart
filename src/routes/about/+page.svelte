<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	export let data;
</script>

<div class="min-h-screen flex flex-col">
	<Header translations={data.translations} />

	<main class="flex-grow">
		<div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h1
					class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
				>
					{data.translations.about.title}
				</h1>
				<p
					class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
				>
					{data.translations.about.intro}
				</p>
			</div>

			<div class="prose dark:prose-invert max-w-none">
				<div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg p-8 mb-8">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						{data.translations.about.mission.title}
					</h2>
					<p class="text-gray-600 dark:text-gray-300">
						{data.translations.about.mission.description}
					</p>
				</div>

				<div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg p-8">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						{data.translations.about.values.title}
					</h2>
					<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<li class="text-gray-600 dark:text-gray-300">{data.translations.about.values.item1}</li>
						<li class="text-gray-600 dark:text-gray-300">{data.translations.about.values.item2}</li>
						<li class="text-gray-600 dark:text-gray-300">{data.translations.about.values.item3}</li>
						<li class="text-gray-600 dark:text-gray-300">{data.translations.about.values.item4}</li>
					</ul>
				</div>
			</div>
		</div>
	</main>

	<Footer translations={data.translations} />
</div>
