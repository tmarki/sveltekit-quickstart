<script lang="ts">
	import LanguageSelector from './LanguageSelector.svelte';
	export let translations: any;
</script>

<footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
	<div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center space-y-4">
			<!-- Navigation Links -->
			<div class="flex flex-wrap justify-center items-center gap-6 md:gap-8">
				<a
					href="/about"
					class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
					>{translations.header.about}</a
				>
				<a
					href="/contact"
					class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
					>{translations.header.contact}</a
				>
				<a
					href="/privacy"
					class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
					>{translations.footer.privacy}</a
				>
				<a
					href="/terms"
					class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
					>{translations.footer.terms}</a
				>
			</div>

			<!-- Copyright and Language Selector -->
			<div
				class="flex flex-wrap justify-center items-center gap-6 md:gap-8 pt-2 border-t border-gray-200 dark:border-gray-800 w-full"
			>
				<p class="text-sm text-gray-400 dark:text-gray-500">{translations.footer.copyright}</p>
				<div>
					<LanguageSelector />
				</div>
			</div>
		</div>
	</div>
</footer>
