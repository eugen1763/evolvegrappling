<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const heroImages = [
		'/optimized/0E8A4818.webp',
		'/optimized/0E8A6454.webp',
		'/optimized/0E8A6503.webp',
		'/optimized/0E8A7278.webp'
	];

	interface Props {
		scrollY: number;
		innerHeight: number;
	}

	let { scrollY, innerHeight }: Props = $props();

	let imageOffset = $derived(scrollY * 0.15);
	let textOffset = $derived(scrollY * 0.25);
	let opacity = $derived(innerHeight > 0 ? Math.max(1 - scrollY / (innerHeight * 0.7), 0) : 1);

	let currentIndex = $state(0);
	let heroImage = $derived(heroImages[currentIndex]);
	let active = $state(true);

	onMount(() => {
		let nextImage: HTMLImageElement | null = null;
		let cancelled = false;

		function prepareNextImage() {
			const nextIndex = (currentIndex + 1) % heroImages.length;
			const img = new Image();
			img.src = heroImages[nextIndex];
			nextImage = img;
		}

		prepareNextImage();

		const interval = setInterval(async () => {
			if (!active) return;

			await nextImage?.decode().catch(() => undefined);
			if (cancelled || !active) return;

			currentIndex = (currentIndex + 1) % heroImages.length;
			prepareNextImage();
		}, 8000);

		function onVisibility() {
			active = !document.hidden;
		}
		document.addEventListener('visibilitychange', onVisibility);

		return () => {
			cancelled = true;
			clearInterval(interval);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	});
</script>

<section
	class="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal md:min-h-[100dvh]"
>
	<!-- Asymmetric layout: text left, image right -->
	<div
		class="hero-content relative z-10 w-full px-6 pt-12 md:px-12 md:py-24 lg:px-20 xl:px-28"
		style="opacity: {opacity}; transform: translateY({-textOffset}px);"
	>
		<div class="grid items-center gap-4 md:grid-cols-[1.2fr_1fr] md:gap-8 lg:grid-cols-[1.3fr_1fr]">
			<!-- Left: Typography block -->
			<div class="space-y-4 md:space-y-10">
				<div class="space-y-3 md:space-y-4">
					<h1
						class="font-display text-5xl leading-[0.9] font-bold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
					>
						BJJ &amp;<br />GRAPPLING
						<span
							class="mt-3 block text-base font-semibold tracking-[0.22em] text-accent-500 sm:text-lg md:text-xl"
						>
							IN SOLINGEN
						</span>
					</h1>
					<p class="text-lg font-light tracking-wide text-brand-300 sm:text-xl md:text-2xl">
						Brazilian Jiu-Jitsu &middot; No-Gi &middot; Ringen
					</p>
				</div>

				<p class="max-w-[45ch] text-base leading-relaxed text-brand-200 md:text-lg">
					Dein Kampfsport in Solingen: BJJ im Gi und No-Gi sowie Ringen f&uuml;r Grappling. Wir
					arbeiten als starkes Team an den Zielen jedes Einzelnen &mdash; ob Wettk&auml;mpfer oder
					Hobbyist, Anf&auml;nger oder Fortgeschrittener.
				</p>

				<div class="flex flex-wrap items-center gap-4 pt-2">
					<a
						href="#kontakt"
						class="inline-flex items-center gap-2 rounded-sm bg-accent-500 px-6 py-3 text-sm font-semibold text-charcoal transition-all duration-300 hover:bg-accent-400 active:scale-[0.98] md:px-8 md:py-3.5 md:text-base"
					>
						Kostenloses Probetraining
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
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
				<div class="relative max-h-[75dvh] min-h-70 overflow-hidden rounded-sm">
					<!-- Invisible spacer preserves natural aspect ratio -->
					<img
						src={heroImages[0]}
						alt=""
						width="1920"
						height="1280"
						fetchpriority="high"
						decoding="async"
						class="invisible max-h-[75dvh] min-h-70 w-full object-cover"
					/>
					<div class="absolute inset-0">
						{#key heroImage}
							<img
								src={heroImage}
								alt="Brazilian Jiu-Jitsu und Grappling Training bei Evolve Grappling in Solingen"
								width="1920"
								height="1280"
								fetchpriority={currentIndex === 0 ? 'high' : 'auto'}
								decoding="async"
								class="absolute inset-0 h-full w-full object-cover"
								style="transform: translateY({imageOffset}px);"
								transition:fade={{ duration: 800 }}
							/>
						{/key}
					</div>
				</div>
				<!-- Decorative element -->
				<div
					class="absolute -bottom-4 -left-4 hidden h-16 w-16 border-t border-l border-accent-500/40 md:block"
				></div>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
		style="opacity: {opacity};"
	>
		<div class="flex flex-col items-center gap-2 text-brand-500">
			<span class="text-[10px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
			<div class="h-8 w-px bg-brand-600"></div>
		</div>
	</div>
</section>

<style>
	@media (max-width: 47.999rem) {
		.hero-content {
			padding-bottom: max(2rem, calc(1rem + env(safe-area-inset-bottom)));
		}
	}
</style>
