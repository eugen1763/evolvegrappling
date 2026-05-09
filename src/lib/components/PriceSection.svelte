<script lang="ts">
	import { scrollAnimate } from '$lib/utils/scroll_animations';
</script>

<div use:scrollAnimate class="scroll-animate fade-in-up py-16">
	<div class="text-center">
		<h2 class="mb-12 text-4xl font-bold tracking-tight text-white">Preis</h2>

		<div class="mx-auto max-w-md">
			<div class="group rounded-2xl border border-white/5 bg-brand-900/70 p-12 backdrop-blur-sm transition-colors duration-300 hover:border-brand-500/30">
				<div class="mb-4 text-6xl font-bold tracking-tight text-white tabular-nums">79,90 €</div>
				<p class="text-lg leading-relaxed text-brand-100">
					monatlich kundbar, keine Anmeldegebuhr, keine versteckten Kosten
				</p>
			</div>
		</div>
	</div>
</div>
