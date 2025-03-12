<script lang="ts">
	export let translations: any;
</script>

<footer class="bg-gray-50 mt-auto">
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center">
			<p class="text-gray-500">{translations.footer.copyright}</p>
			<div class="mt-4 space-x-4">
				<a href="/privacy" class="text-gray-400 hover:text-gray-500">
					{translations.footer.privacy}
				</a>
				<a href="/terms" class="text-gray-400 hover:text-500">
					{translations.footer.terms}
				</a>
			</div>
		</div>
	</div>
</footer>
