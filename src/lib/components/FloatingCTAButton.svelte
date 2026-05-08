<script lang="ts">
	function scrollToKontakt() {
		const element = document.getElementById('kontakt');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<button
	class="animate-cta-fly-in absolute top-4 left-4 z-30 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-950/50 transition-all duration-300 hover:scale-105 hover:bg-brand-400 active:scale-95 md:fixed md:top-auto md:right-6 md:bottom-6 md:left-auto md:px-6 md:py-3 md:text-base"
	onclick={scrollToKontakt}
>
	Kostenloses Probetraining
</button>

<style>
	@keyframes ctaFlyInLeft {
		from {
			opacity: 0;
			transform: translateX(-120px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes ctaFlyInRight {
		from {
			opacity: 0;
			transform: translateX(120px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.animate-cta-fly-in {
		animation: ctaFlyInLeft 0.6s ease-out forwards;
	}

	@media (min-width: 768px) {
		.animate-cta-fly-in {
			animation: ctaFlyInRight 0.6s ease-out forwards;
		}
	}
</style>
