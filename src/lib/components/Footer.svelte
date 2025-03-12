<script lang="ts">
	export let translations: any;
</script>

<footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
	<div class="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center">
			<div class="flex flex-wrap justify-center space-x-6 md:space-x-8 mb-2">
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
				<p class="text-sm text-gray-400 dark:text-gray-500">{translations.footer.copyright}</p>
			</div>
		</div>
	</div>
</footer>
