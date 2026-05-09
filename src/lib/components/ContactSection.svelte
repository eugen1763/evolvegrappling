<script>
	import { onMount } from "svelte";
	import { scrollReveal } from '$lib/utils/scroll_animations';
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

<section class="px-6 py-24 md:px-12 lg:px-20 xl:px-28">
	<div class="grid gap-16 md:grid-cols-[1fr_2fr]">
		<!-- Left: section label -->
		<div use:scrollReveal class="reveal reveal-left md:sticky md:top-24 md:self-start">
			<div class="flex items-center gap-3 mb-4">
				<div class="h-px w-8 bg-brand-500"></div>
				<span class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">Los geht's</span>
			</div>
			<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
				Kontakt &amp;<br />Probetraining
			</h2>
		</div>

		<!-- Right: content -->
		<div class="space-y-12">
			<!-- Trial form iframe -->
			<div use:scrollReveal class="reveal reveal-up border border-brand-800 rounded-sm bg-brand-950/50">
				<iframe
					id="omoplata-trial"
					loading="lazy"
					src="https://evolve-grappling.omoplata.de/widgets/trial"
					style="width:100%; border:0; display:block; height:0;"
					title="Omoplata"
				></iframe>
			</div>

			<!-- Contact methods -->
			<div use:scrollReveal class="reveal reveal-up delay-1 grid gap-8 sm:grid-cols-3">
				<div class="group space-y-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-800 text-brand-400 group-hover:text-accent-500 transition-colors">
						<Icon name="phone" class="h-5 w-5" />
					</div>
					<div>
						<h4 class="text-sm font-semibold uppercase tracking-wider text-brand-400">WhatsApp</h4>
						<p class="mt-1 text-brand-200 tabular-nums">+49 1573 5412788</p>
					</div>
				</div>

				<div class="group space-y-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-800 text-brand-400 group-hover:text-accent-500 transition-colors">
						<Icon name="mail" class="h-5 w-5" />
					</div>
					<div>
						<h4 class="text-sm font-semibold uppercase tracking-wider text-brand-400">E-Mail</h4>
						<a href="mailto:info@evolvegrappling.de" class="mt-1 inline-block text-brand-200 underline underline-offset-4 transition-colors hover:text-accent-500">
							info@evolvegrappling.de
						</a>
					</div>
				</div>

				<div class="group space-y-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-800 text-brand-400 group-hover:text-accent-500 transition-colors">
						<Icon name="camera" class="h-5 w-5" />
					</div>
					<div>
						<h4 class="text-sm font-semibold uppercase tracking-wider text-brand-400">Instagram</h4>
						<a
							href="https://www.instagram.com/evolve_grappling/"
							class="mt-1 inline-block text-brand-200 underline underline-offset-4 transition-colors hover:text-accent-500"
							target="_blank"
						>
							@evolve_grappling
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
