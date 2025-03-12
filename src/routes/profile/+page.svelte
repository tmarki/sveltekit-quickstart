<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	export let data;

	let updating = false;
	let success = false;
	let error = '';
</script>

<div class="min-h-screen flex flex-col">
	<div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h1
				class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
			>
				{data.translations.profile.title}
			</h1>
			<p
				class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
			>
				{data.translations.profile.intro}
			</p>
		</div>

		<div class="max-w-2xl mx-auto">
			{#if success}
				<div class="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-8">
					<p class="text-green-700 dark:text-green-100">
						{data.translations.profile.updateSuccess}
					</p>
				</div>
			{/if}

			{#if error}
				<div class="bg-red-100 dark:bg-red-900 p-4 rounded-lg mb-8">
					<p class="text-red-700 dark:text-red-100">
						{error}
					</p>
				</div>
			{/if}

			{#if !data.user}
				<div class="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mb-8">
					<p class="text-yellow-700 dark:text-yellow-100">
						{data.translations.profile.notLoggedIn}
					</p>
					<a
						href="/auth/login"
						class="inline-block mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
					>
						{data.translations.auth.signIn.title}
					</a>
				</div>
			{:else}
				<div class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
					<div class="px-4 py-5 sm:px-6">
						<h2 class="text-lg font-medium text-gray-900 dark:text-white">
							{data.translations.profile.personalInfo}
						</h2>
						<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
							{data.translations.profile.personalInfoDesc}
						</p>
					</div>

					<form
						method="POST"
						action="?/updateProfile"
						use:enhance={() => {
							updating = true;
							success = false;
							error = '';

							return async ({ result }) => {
								updating = false;
								if (result.type === 'success') {
									success = true;
									await invalidateAll();
								} else if (result.type === 'error') {
									error = result.error;
								}
							};
						}}
						class="border-t border-gray-200 dark:border-gray-700"
					>
						<div class="px-4 py-5 space-y-6 sm:p-6">
							<div>
								<label
									for="email"
									class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									{data.translations.profile.email}
								</label>
								<div class="mt-1">
									<input
										type="email"
										name="email"
										id="email"
										value={data.user.email}
										disabled
										class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700"
									/>
								</div>
								<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
									{data.translations.profile.emailNote}
								</p>
							</div>

							<div>
								<label
									for="name"
									class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									{data.translations.profile.name}
								</label>
								<div class="mt-1">
									<input
										type="text"
										name="name"
										id="name"
										value={data.user.name || ''}
										class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-primary-400 dark:hover:border-primary-500"
									/>
								</div>
							</div>
						</div>

						<div class="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-right sm:px-6">
							<button
								type="submit"
								disabled={updating}
								class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
							>
								{#if updating}
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
										/>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									{data.translations.profile.updating}
								{:else}
									{data.translations.profile.update}
								{/if}
							</button>
						</div>
					</form>
				</div>

				<div class="mt-8 bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
					<div class="px-4 py-5 sm:px-6">
						<h2 class="text-lg font-medium text-gray-900 dark:text-white">
							{data.translations.profile.subscription}
						</h2>
						<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
							{data.translations.profile.subscriptionDesc}
						</p>
					</div>
					<div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<div>
									<h3 class="text-lg font-medium text-gray-900 dark:text-white">
										{data.translations.profile.currentPlan}
									</h3>
									<p class="text-sm text-gray-500 dark:text-gray-400">Free Plan</p>
								</div>
								<button
									type="button"
									class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								>
									{data.translations.profile.upgradePlan}
								</button>
							</div>
							<div>
								<h4 class="text-sm font-medium text-gray-900 dark:text-white">
									{data.translations.profile.features}
								</h4>
								<ul class="mt-2 text-sm text-gray-500 dark:text-gray-400 space-y-2">
									<li>• {data.translations.profile.featureBasic}</li>
									<li>• {data.translations.profile.featureStorage}</li>
									<li>• {data.translations.profile.featureSupport}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<Footer translations={data.translations} />
</div>
