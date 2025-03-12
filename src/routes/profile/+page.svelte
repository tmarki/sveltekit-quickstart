<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	import type { User } from './+page';

	export let data: {
		user: User | null;
	};

	let updating = false;
	let success = false;
	let error = '';
	let loading = false;

	$: ({ user } = data);

	const translations = {
		header: {
			about: 'About',
			contact: 'Contact'
		},
		footer: {
			privacy: 'Privacy Policy',
			terms: 'Terms of Service',
			copyright: '© 2024 Your Company. All rights reserved.'
		}
	};

	function handleSubmit() {
		updating = true;
		success = false;
		error = '';

		return async ({ result }: { result: { type: string; data?: { message: string } } }) => {
			updating = false;
			if (result.type === 'success') {
				success = true;
				await invalidateAll();
			} else if (result.type === 'failure' && result.data) {
				error = result.data.message;
			}
		};
	}

	async function createBillingPortalSession() {
		try {
			loading = true;
			const response = await fetch('/api/stripe/portal', {
				method: 'POST'
			});
			const data = await response.json();
			if (data.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.error('Error creating billing portal session:', error);
		} finally {
			loading = false;
		}
	}

	async function createCheckoutSession() {
		try {
			loading = true;
			const response = await fetch('/api/stripe/subscription', {
				method: 'POST'
			});
			const data = await response.json();
			if (data.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.error('Error creating checkout session:', error);
		} finally {
			loading = false;
		}
	}

	async function purchaseCredits() {
		try {
			loading = true;
			const response = await fetch('/api/stripe/credits', {
				method: 'POST'
			});
			const data = await response.json();
			if (data.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.error('Error creating credits checkout session:', error);
		} finally {
			loading = false;
		}
	}

	$: console.log(user);
</script>

<div class="min-h-screen flex flex-col">
	<div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h1
				class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
			>
				Profile
			</h1>
			<p
				class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
			>
				Manage your account settings and subscription
			</p>
		</div>

		<div class="max-w-2xl mx-auto">
			{#if success}
				<div class="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-8">
					<p class="text-green-700 dark:text-green-100">Profile updated successfully!</p>
				</div>
			{/if}

			{#if error}
				<div class="bg-red-100 dark:bg-red-900 p-4 rounded-lg mb-8">
					<p class="text-red-700 dark:text-red-100">
						{error}
					</p>
				</div>
			{/if}

			{#if !user}
				<div class="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mb-8">
					<p class="text-yellow-700 dark:text-yellow-100">Please log in to view your profile.</p>
					<a
						href="/auth/login"
						class="inline-block mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
					>
						Sign In
					</a>
				</div>
			{:else}
				<div class="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h2>

					<!-- User Info -->
					<div class="space-y-2">
						<p class="text-gray-700 dark:text-gray-300">Email: {user.email}</p>
						<p class="text-gray-700 dark:text-gray-300">Credits: {user.credits}</p>
						{#if user.subscriptionStatus}
							<p class="text-gray-700 dark:text-gray-300">
								Subscription Status:
								<span class="capitalize">
									{#if user.subscriptionStatus === 'canceling'}
										Active (Cancels at period end)
									{:else}
										{user.subscriptionStatus}
									{/if}
								</span>
							</p>
						{/if}
						{#if user.nextBillingDate}
							<p class="text-gray-700 dark:text-gray-300">
								{#if user.subscriptionStatus === 'canceling'}
									Access Until: {new Date(user.nextBillingDate).toLocaleDateString()}
								{:else}
									Next Billing Date: {new Date(user.nextBillingDate).toLocaleDateString()}
								{/if}
							</p>
						{/if}
					</div>

					<!-- Subscription Management -->
					<div class="space-y-4">
						{#if user.subscriptionStatus === 'active' || user.subscriptionStatus === 'canceling'}
							<button
								class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
								on:click={createBillingPortalSession}
								disabled={loading}
							>
								{loading ? 'Loading...' : 'Manage Subscription'}
							</button>
						{:else}
							<button
								class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
								on:click={createCheckoutSession}
								disabled={loading}
							>
								{loading ? 'Loading...' : 'Subscribe Now'}
							</button>
						{/if}

						<!-- Credit Purchase Button -->
						<button
							class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
							on:click={purchaseCredits}
							disabled={loading}
						>
							{loading ? 'Loading...' : 'Purchase Credits'}
						</button>
					</div>

					<!-- User Info Form -->
					<form method="POST" action="?/updateProfile" use:enhance={handleSubmit} class="space-y-4">
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Name</label
							>
							<input
								type="text"
								id="name"
								name="name"
								value={user.name || ''}
								class="px-4 py-2 mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary sm:text-sm text-center"
							/>
						</div>
						<button
							type="submit"
							disabled={updating}
							class="px-4 py-2 btn btn-primary w-full bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
						>
							{updating ? 'Updating...' : 'Update Profile'}
						</button>
					</form>
				</div>
			{/if}
		</div>
	</div>

	<Footer {translations} />
</div>
