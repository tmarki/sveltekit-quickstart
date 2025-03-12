<script lang="ts">
	import { loadTranslations } from '$lib/i18n/utils';
	import { browser } from '$app/environment';
	import { initializeTheme } from '$lib/stores/theme';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';

	export let data: {
		translations: any;
		user: { email: string } | null;
		locale: string;
		seo: any;
	};

	onMount(() => {
		console.log('Layout data:', data);
		console.log('User data:', data.user);
	});

	// Handle client-side locale changes
	$: if (browser && data.locale) {
		loadTranslations(data.locale);
		document.documentElement.lang = data.locale;
	}

	// Initialize theme system
	$: if (browser) {
		initializeTheme();
	}
</script>

<svelte:head>
	<title>{data.seo.title}</title>
	<meta name="description" content={data.seo.description} />
	<meta name="title" content={data.seo.title} />

	{#if data.seo.canonical}
		<link rel="canonical" href={data.seo.canonical} />
	{/if}

	{#if data.seo.og}
		<meta property="og:type" content={data.seo.og.type} />
		<meta property="og:url" content={data.seo.og.url} />
		<meta property="og:title" content={data.seo.og.title} />
		<meta property="og:description" content={data.seo.og.description} />
		{#if data.seo.og.image}
			<meta property="og:image" content={data.seo.og.image} />
		{/if}
	{/if}

	{#if data.seo.twitter}
		<meta name="twitter:card" content={data.seo.twitter.card} />
		<meta name="twitter:site" content={data.seo.twitter.site} />
		<meta name="twitter:title" content={data.seo.twitter.title} />
		<meta name="twitter:description" content={data.seo.twitter.description} />
		{#if data.seo.twitter.image}
			<meta name="twitter:image" content={data.seo.twitter.image} />
		{/if}
	{/if}
</svelte:head>

<div
	class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
>
	<Header translations={data.translations} user={data.user} />
	<main class="flex-1">
		<slot />
	</main>
</div>
