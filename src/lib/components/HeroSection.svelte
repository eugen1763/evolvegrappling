<script lang="ts">
	import { onMount } from 'svelte';

	// Optimized hero images from static/optimized/
	const heroImages = [
		'/optimized/0E8A4818.webp',
		'/optimized/0E8A6454.webp',
		'/optimized/0E8A6503.webp',
		'/optimized/0E8A7278.webp',
	];

	interface Props {
		scrollY: number;
		innerHeight: number;
	}

	let { scrollY, innerHeight }: Props = $props();

	let imageOffset = $derived(scrollY * 0.15);
	let textOffset = $derived(scrollY * 0.25);
	let opacity = $derived(Math.max(1 - scrollY / (innerHeight * 0.7), 0));

	let heroImage = $state(heroImages[Math.floor(Math.random() * heroImages.length)]);
</script>

<section class="relative min-h-[100dvh] flex items-center overflow-hidden bg-charcoal">
	<!-- Asymmetric layout: text left, image right -->
	<div class="relative z-10 w-full px-6 py-24 md:px-12 lg:px-20 xl:px-28" style="opacity: {opacity}; transform: translateY({-textOffset}px);">
		<div class="grid items-center gap-8 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.3fr_1fr]">
			<!-- Left: Typography block -->
			<div class="space-y-8 md:space-y-10">
				<!-- Small brand mark above the headline -->
				<div class="flex items-center gap-3">
					<div class="h-px w-8 bg-accent-500"></div>
					<span class="text-xs font-semibold uppercase tracking-[0.25em] text-accent-500">Solingen</span>
				</div>

				<div class="space-y-3 md:space-y-4">
					<h1 class="font-display text-5xl font-bold leading-[0.9] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
						EVOLVE<br />GRAPPLING
					</h1>
					<p class="text-lg font-light tracking-wide text-brand-300 sm:text-xl md:text-2xl">
						Brazilian Jiu-Jitsu &amp; Grappling
					</p>
				</div>

				<p class="max-w-[45ch] text-base leading-relaxed text-brand-200 md:text-lg">
					Spezialisiert auf BJJ im Gi und No-Gi sowie Ringen f&uuml;r Grappling.
					Wir arbeiten als starkes Team an den Zielen jedes Einzelnen &mdash;
					ob Wettk&auml;mpfer oder Hobbyist, Anf&auml;nger oder Fortgeschrittener.
				</p>

				<div class="flex flex-wrap items-center gap-4 pt-2">
					<a
						href="#kontakt"
						class="inline-flex items-center gap-2 rounded-sm bg-accent-500 px-6 py-3 text-sm font-semibold text-charcoal transition-all duration-300 hover:bg-accent-400 active:scale-[0.98] md:px-8 md:py-3.5 md:text-base"
					>
						Kostenloses Probetraining
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</a>
					<a
						href="#trainingsplan"
						class="text-sm font-medium text-brand-300 underline underline-offset-4 transition-colors hover:text-white md:text-base"
					>
						Trainingsplan
					</a>
				</div>
			</div>

			<!-- Right: Duotone image (hidden on mobile, first on mobile via order) -->
			<div class="relative order-first md:order-none">
				{#if heroImage}
					<div class="duotone overflow-hidden rounded-sm">
						<img
							src={heroImage}
							alt="Evolve Grappling Training"
							class="w-full object-cover"
							style="transform: translateY({imageOffset}px); min-height: 280px; max-height: 75dvh;"
						/>
					</div>
				{/if}
				<!-- Decorative element -->
				<div class="absolute -bottom-4 -left-4 h-16 w-16 border-l border-t border-accent-500/40 hidden md:block"></div>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" style="opacity: {opacity};">
		<div class="flex flex-col items-center gap-2 text-brand-500">
			<span class="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
			<div class="h-8 w-px bg-brand-600"></div>
		</div>
	</div>
</section>
