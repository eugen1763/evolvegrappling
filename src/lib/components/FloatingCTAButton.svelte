<script lang="ts">
	function scrollToKontakt() {
		const element = document.getElementById('kontakt');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<button
	class="fixed right-6 bottom-6 z-30 rounded-sm bg-accent-500 px-5 py-3 text-sm font-semibold text-charcoal shadow-lg shadow-charcoal/50 transition-all duration-300 hover:scale-105 hover:bg-accent-400 active:scale-[0.98] md:px-6 md:py-3.5 md:text-base"
	onclick={scrollToKontakt}
>
	Kostenloses Probetraining
</button>
