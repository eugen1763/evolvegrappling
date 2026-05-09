<script lang="ts">
	import { scrollReveal } from '$lib/utils/scroll_animations';
</script>

<section class="px-6 py-24 md:px-12 lg:px-20 xl:px-28">
	<div use:scrollReveal class="reveal reveal-up grid gap-16 md:grid-cols-[1fr_1.5fr]">
		<!-- Left: section label -->
		<div>
			<div class="flex items-center gap-3 mb-4">
				<div class="h-px w-8 bg-brand-500"></div>
				<span class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">Mitgliedschaft</span>
			</div>
			<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
				Preis
			</h2>
		</div>

		<!-- Right: price block -->
		<div class="space-y-8">
			<div class="flex flex-col gap-4">
				<div class="flex items-baseline gap-1">
					<span class="text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">79,90</span>
					<span class="text-2xl font-light text-brand-400 md:text-3xl">&euro;</span>
				</div>
				<div class="h-px w-full bg-brand-800"></div>
				<div class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-brand-300">
					<span class="flex items-center gap-1.5">
						<span class="h-1 w-1 rounded-full bg-accent-500"></span>
						monatlich k&uuml;ndbar
					</span>
					<span class="flex items-center gap-1.5">
						<span class="h-1 w-1 rounded-full bg-accent-500"></span>
						keine Anmeldegeb&uuml;hr
					</span>
					<span class="flex items-center gap-1.5">
						<span class="h-1 w-1 rounded-full bg-accent-500"></span>
						keine versteckten Kosten
					</span>
				</div>
			</div>

			<a
				href="#kontakt"
				class="inline-flex items-center gap-2 rounded-sm bg-accent-500 px-6 py-3 text-sm font-semibold text-charcoal transition-all duration-300 hover:bg-accent-400 active:scale-[0.98]"
			>
				Jetzt Probetraining vereinbaren
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</div>
</section>
