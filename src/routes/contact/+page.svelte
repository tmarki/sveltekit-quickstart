<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { enhance } from '$app/forms';
	import { PUBLIC_FORMSPARK_FORM_ID } from '$env/static/public';

	export let data;

	let sending = false;
	let success = false;
	let error = false;

	const formsparkUrl = `https://submit-form.com/${PUBLIC_FORMSPARK_FORM_ID}`;
</script>

<div class="min-h-screen flex flex-col">
	<Header translations={data.translations} />

	<main class="flex-grow">
		<div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h1
					class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
				>
					{data.translations.contact.title}
				</h1>
				<p
					class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
				>
					{data.translations.contact.intro}
				</p>
			</div>

			<div class="max-w-2xl mx-auto">
				{#if success}
					<div class="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-8">
						<p class="text-green-700 dark:text-green-100">
							{data.translations.contact.success}
						</p>
					</div>
				{/if}

				{#if error}
					<div class="bg-red-100 dark:bg-red-900 p-4 rounded-lg mb-8">
						<p class="text-red-700 dark:text-red-100">
							{data.translations.contact.error}
						</p>
					</div>
				{/if}

				<form
					action={formsparkUrl}
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							sending = true;
							try {
								if (result.type === 'success') {
									success = true;
									error = false;
									// Reset form
									const form = document.querySelector('form');
									if (form) form.reset();
								} else {
									error = true;
									success = false;
								}
							} catch (e) {
								error = true;
								success = false;
							} finally {
								sending = false;
							}
						};
					}}
					class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg p-8 space-y-6"
				>
					<div>
						<label
							for="name"
							class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
						>
							{data.translations.contact.form.name}
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
						/>
					</div>

					<div>
						<label
							for="email"
							class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
						>
							{data.translations.contact.form.email}
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
						/>
					</div>

					<div>
						<label
							for="message"
							class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
						>
							{data.translations.contact.form.message}
						</label>
						<textarea
							id="message"
							name="message"
							required
							rows="5"
							class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
						></textarea>
					</div>

					<button
						type="submit"
						disabled={sending}
						class="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg
							disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{#if sending}
							{data.translations.contact.form.sending}
						{:else}
							{data.translations.contact.form.submit}
						{/if}
					</button>
				</form>
			</div>
		</div>
	</main>

	<Footer translations={data.translations} />
</div>
