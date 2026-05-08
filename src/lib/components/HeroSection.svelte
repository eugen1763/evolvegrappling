<script lang="ts">
	import { onMount } from 'svelte';

	const desktopModules = import.meta.glob('../assets/title_backgrounds/*.{jpg,jpeg,png,webp}', {
		eager: true,
		query: '?url',
		import: 'default'
	});
	const desktopImages: string[] = Object.values(desktopModules) as string[];

	const mobileModules = import.meta.glob(
		'../assets/title_backgrounds_mobile/*.{jpg,jpeg,png,webp}',
		{ eager: true, query: '?url', import: 'default' }
	);
	const mobileImages: string[] = Object.values(mobileModules) as string[];

	function randomImage(list: string[]) {
		return list[Math.floor(Math.random() * list.length)];
	}

	interface Props {
		scrollY: number;
		innerHeight: number;
	}

	let { scrollY, innerHeight }: Props = $props();

	let overlayOpacity = $derived(Math.min(scrollY / (innerHeight * 0.5), 0.85));
	let titleScale = $derived(Math.max(1 - scrollY / (innerHeight * 2), 0.6));
	let titleOffset = $derived(scrollY * 0.3);

	let isMobile = $state(false);
	let currentImage = $state(desktopImages.length > 0 ? randomImage(desktopImages) : 'main_bg.jpg');
	let nextImage = $state('');
	let nextVisible = $state(false);
	let fadeTimer: ReturnType<typeof setTimeout> | null = null;
	let cycleInterval: ReturnType<typeof setInterval> | null = null;

	function cycleImage() {
		const list = isMobile ? mobileImages : desktopImages;
		if (list.length <= 1) return;
		let next: string;
		do {
			next = randomImage(list);
		} while (next === currentImage);
		nextImage = next;
		nextVisible = true;
		if (fadeTimer) clearTimeout(fadeTimer);
		fadeTimer = setTimeout(() => {
			currentImage = next;
			nextVisible = false;
			fadeTimer = null;
		}, 1000);
	}

	function stopRotation() {
		if (cycleInterval) {
			clearInterval(cycleInterval);
			cycleInterval = null;
		}
		if (fadeTimer) {
			clearTimeout(fadeTimer);
			fadeTimer = null;
		}
		nextVisible = false;
	}

	function startRotation(list: string[]) {
		stopRotation();
		currentImage = list.length > 0 ? randomImage(list) : 'main_bg.jpg';
		if (list.length > 1) {
			cycleInterval = setInterval(cycleImage, 8000);
		}
	}

	function switchImageSet() {
		const list = isMobile ? mobileImages : desktopImages;
		startRotation(list);
	}

	onMount(() => {
		const mq = window.matchMedia('(max-width: 767px)');
		isMobile = mq.matches;
		const list = isMobile ? mobileImages : desktopImages;
		startRotation(list);

		const handler = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
			switchImageSet();
		};
		mq.addEventListener('change', handler);
		return () => {
			mq.removeEventListener('change', handler);
			stopRotation();
		};
	});
</script>

<section class="relative min-h-dvh overflow-hidden">
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat"
		style="background-image: url('{currentImage}'); transform: translateY({scrollY * 0.5}px);"
	></div>

	{#if nextVisible}
		<div
			class="animate-fade-in-next absolute inset-0 bg-cover bg-center bg-no-repeat"
			style="background-image: url('{nextImage}'); transform: translateY({scrollY * 0.5}px);"
		></div>
	{/if}

	<div
		class="absolute inset-0 bg-brand-950 backdrop-blur-sm transition-opacity duration-300"
		style="opacity: {overlayOpacity};"
	></div>

	<div class="relative z-10 flex h-full items-center justify-center">
		<img
			src="logo.svg"
			alt="Evolve Grappling Logo"
			class="animate-hero-logo max-w-xs transition-all duration-300 ease-out md:max-w-md lg:max-w-lg"
			style="
				transform: translateY({-titleOffset}px) scale({titleScale});
				filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));
			"
		/>
	</div>

	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
		<div class="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/60 pt-1">
			<div class="h-2.5 w-1 rounded-full bg-white/80"></div>
		</div>
	</div>
</section>

<style>
	.animate-hero-logo {
		animation: heroFadeIn 1.2s ease-out forwards;
	}

	@keyframes heroFadeIn {
		from {
			opacity: 0;
			transform: translateY(50px) scale(0.9);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.animate-fade-in-next {
		animation: nextFadeIn 1s ease-out forwards;
	}

	@keyframes nextFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
