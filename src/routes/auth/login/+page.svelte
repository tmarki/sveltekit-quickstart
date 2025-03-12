<script lang="ts">
	import { enhance } from '$app/forms';
	import Footer from '$lib/components/Footer.svelte';

	export let data;
	let email = '';
	let message = '';
	let error = '';
	let loading = false;
</script>

<div class="min-h-screen flex flex-col">
	<div
		class="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
	>
		<div class="max-w-md w-full space-y-8">
			<div>
				<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
					{data.translations.auth.signIn.title}
				</h2>
				<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
					{data.translations.auth.signIn.subtitle}
				</p>
			</div>

			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					error = '';
					message = '';

					return async ({ result }) => {
						loading = false;
						if (result.type === 'success') {
							message = data.translations.auth.signIn.success;
							email = '';
						} else if (result.type === 'error') {
							error = data.translations.auth.signIn.error;
						}
					};
				}}
				class="mt-8 space-y-6"
			>
				<div class="rounded-md shadow-sm -space-y-px">
					<div>
						<label for="email" class="sr-only"
							>{data.translations.auth.signIn.emailPlaceholder}</label
						>
						<input
							bind:value={email}
							id="email"
							name="email"
							type="email"
							required
							class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
							placeholder={data.translations.auth.signIn.emailPlaceholder}
						/>
					</div>
				</div>

				{#if message}
					<div class="rounded-md bg-green-50 dark:bg-green-900 p-4">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<div class="ml-3">
								<p class="text-sm font-medium text-green-800 dark:text-green-200">{message}</p>
							</div>
						</div>
					</div>
				{/if}

				{#if error}
					<div class="rounded-md bg-red-50 dark:bg-red-900 p-4">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<div class="ml-3">
								<p class="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
							</div>
						</div>
					</div>
				{/if}

				<div>
					<button
						type="submit"
						disabled={loading}
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
					>
						{#if loading}
							<svg
								class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							{data.translations.auth.signIn.sending}
						{:else}
							{data.translations.auth.signIn.sendLink}
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>

	<Footer translations={data.translations} />
</div>
