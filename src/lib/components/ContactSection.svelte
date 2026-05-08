<script>
	import { onMount } from "svelte";
	import { scrollAnimate } from '$lib/utils/scroll_animations';
	import Icon from '$lib/components/Icon.svelte';

	onMount(() => {
		const FRAME_ORIGIN = 'https://evolve-grappling.omoplata.de';
		const iframe = document.getElementById('omoplata-trial');

		function isFromOurIframe(event) {
			return event.source === iframe.contentWindow;
		}

		let rAF = null;
		function setIframeHeight(nextHeight) {
			if (rAF) cancelAnimationFrame(rAF);
			rAF = requestAnimationFrame(() => {
				iframe.style.height = Math.max(0, Number(nextHeight) || 0) + 'px';
			});
		}

		window.addEventListener('message', (event) => {
			if (event.origin !== FRAME_ORIGIN) return;
			if (!isFromOurIframe(event)) return;

			const data = event.data;
			if (Array.isArray(data) && data[0] === 'setHeight') {
				setIframeHeight(data[1]);
			}
		});

		function requestHeight() {
			iframe.contentWindow?.postMessage(['requestHeight'], FRAME_ORIGIN);
		}

		iframe.addEventListener('load', () => {
			requestHeight();
			setTimeout(requestHeight, 250);
			setTimeout(requestHeight, 1000);
		});

		window.addEventListener('resize', requestHeight);
	})
</script>

<div use:scrollAnimate class="mt-20 scroll-animate fade-in-up">
	<h3 class="mb-12 text-center text-3xl font-bold tracking-tight text-white">Kontakt und Probetraining</h3>
	<div class="mb-12 rounded-2xl border border-white/5 bg-brand-900/70 px-6 pb-6 pt-8 md:px-12 md:pb-8">
		<iframe
			id="omoplata-trial"
			loading="lazy"
			src="https://evolve-grappling.omoplata.de/widgets/trial"
			style="width:100%; border:0; display:block; height:0;"
			title="Omoplata"
		></iframe>
	</div>
	<div class="grid gap-8 md:grid-cols-3">
		<div use:scrollAnimate class="scroll-animate slide-in-left text-center delay-200">
			<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
				<Icon name="phone" class="h-7 w-7" />
			</div>
			<h4 class="mb-2 text-xl font-semibold text-white">WhatsApp</h4>
			<p class="text-brand-300 tabular-nums">+49 1573 5412788</p>
		</div>

		<div use:scrollAnimate class="scroll-animate fade-in-up text-center delay-400">
			<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
				<Icon name="mail" class="h-7 w-7" />
			</div>
			<h4 class="mb-2 text-xl font-semibold text-white">E-Mail</h4>
			<a href="mailto:info@evolvegrappling.de" class="text-brand-300 underline underline-offset-4 transition-colors hover:text-brand-400">
				info@evolvegrappling.de
			</a>
		</div>

		<div use:scrollAnimate class="scroll-animate slide-in-right text-center delay-600">
			<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
				<Icon name="camera" class="h-7 w-7" />
			</div>
			<h4 class="mb-2 text-xl font-semibold text-white">Instagram</h4>
			<a
				href="https://www.instagram.com/evolve_grappling/"
				class="text-brand-300 underline underline-offset-4 transition-colors hover:text-brand-400"
				target="_blank"
			>
				@evolve_grappling
			</a>
		</div>
	</div>
</div>
