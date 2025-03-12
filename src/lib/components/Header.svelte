<script lang="ts">
	export let translations: any;
</script>

<header class="bg-white shadow-sm">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<div class="flex space-x-8">
				<a href="/" class="flex items-center">{translations.header.home}</a>
				<a href="/about" class="flex items-center">{translations.header.about}</a>
				<a href="/contact" class="flex items-center">{translations.header.contact}</a>
			</div>
		</div>
	</nav>
</header>
