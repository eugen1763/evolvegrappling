<script lang="ts">
	import { onMount } from 'svelte';
	import { centerHighlight } from '$lib/utils/center_highlight';
	import { scrollReveal } from '$lib/utils/scroll_animations';
	import Icon from '$lib/components/Icon.svelte';

	onMount(() => {
		const FRAME_ORIGIN = 'https://evolve-grappling.omoplata.de';
		const iframeElement = document.getElementById('omoplata-trial');
		if (!(iframeElement instanceof HTMLIFrameElement)) return;
		const iframe: HTMLIFrameElement = iframeElement;

		function isFromOurIframe(event: MessageEvent) {
			return event.source === iframe.contentWindow;
		}

		let rAF: number | null = null;
		function setIframeHeight(nextHeight: unknown) {
			if (rAF) cancelAnimationFrame(rAF);
			rAF = requestAnimationFrame(() => {
				iframe.style.height = Math.max(0, Number(nextHeight) || 0) + 'px';
			});
		}

		function onMessage(event: MessageEvent) {
			if (event.origin !== FRAME_ORIGIN) return;
			if (!isFromOurIframe(event)) return;

			const data = event.data;
			if (Array.isArray(data) && data[0] === 'setHeight') {
				setIframeHeight(data[1]);
			}
		}

		function requestHeight() {
			iframe.contentWindow?.postMessage(['requestHeight'], FRAME_ORIGIN);
		}

		function onLoad() {
			requestHeight();
			timeouts.push(window.setTimeout(requestHeight, 250));
			timeouts.push(window.setTimeout(requestHeight, 1000));
		}

		const timeouts: number[] = [];
		window.addEventListener('message', onMessage);
		window.addEventListener('resize', requestHeight);
		iframe.addEventListener('load', onLoad);

		return () => {
			window.removeEventListener('message', onMessage);
			window.removeEventListener('resize', requestHeight);
			iframe.removeEventListener('load', onLoad);
			timeouts.forEach((timeout) => window.clearTimeout(timeout));
			if (rAF) cancelAnimationFrame(rAF);
		};
	});
</script>

<section class="px-6 py-24 md:px-12 lg:px-20 xl:px-28">
	<div class="grid gap-16 md:grid-cols-[1fr_2fr]">
		<!-- Left: section label -->
		<div use:scrollReveal class="reveal reveal-left md:sticky md:top-24 md:self-start">
			<div class="mb-4 flex items-center gap-3">
				<div class="h-px w-8 bg-brand-500"></div>
				<span class="text-xs font-semibold tracking-[0.25em] text-brand-400 uppercase"
					>Los geht's</span
				>
			</div>
			<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
				Kontakt &amp;<br />Probetraining
			</h2>
		</div>

		<!-- Right: content -->
		<div class="space-y-12">
			<!-- Trial form iframe -->
			<div
				use:scrollReveal
				class="reveal reveal-up border border-brand-800 bg-brand-950/50 p-4 md:p-6"
			>
				<iframe
					id="omoplata-trial"
					loading="lazy"
					src="https://evolve-grappling.omoplata.de/widgets/trial"
					style="width:100%; border:0; display:block; height:0;"
					title="Omoplata"
				></iframe>
			</div>

			<!-- Contact methods -->
			<div
				use:centerHighlight
				use:scrollReveal
				class="reveal reveal-up grid gap-8 delay-1 sm:grid-cols-3"
			>
				<div
					data-center-highlight-item
					class="center-highlight-item group space-y-3 border-l-2 border-brand-800 pl-4 sm:border-l-0 sm:pl-0"
				>
					<div
						class="center-highlight-icon flex h-10 w-10 items-center justify-center rounded-sm bg-brand-800 text-brand-400 md:group-hover:text-accent-500"
					>
						<Icon name="phone" class="h-5 w-5" />
					</div>
					<div>
						<h3
							class="center-highlight-accent text-sm font-semibold tracking-wider text-brand-400 uppercase"
						>
							WhatsApp
						</h3>
						<a
							href="https://wa.me/4915735412788"
							target="_blank"
							rel="noopener noreferrer"
							class="mt-1 inline-block text-brand-200 tabular-nums underline underline-offset-4 transition-colors md:hover:text-accent-500"
						>
							+49 1573 5412788
						</a>
					</div>
				</div>

				<div
					data-center-highlight-item
					class="center-highlight-item group space-y-3 border-l-2 border-brand-800 pl-4 sm:border-l-0 sm:pl-0"
				>
					<div
						class="center-highlight-icon flex h-10 w-10 items-center justify-center rounded-sm bg-brand-800 text-brand-400 md:group-hover:text-accent-500"
					>
						<Icon name="mail" class="h-5 w-5" />
					</div>
					<div>
						<h3
							class="center-highlight-accent text-sm font-semibold tracking-wider text-brand-400 uppercase"
						>
							E-Mail
						</h3>
						<a
							href="mailto:info@evolvegrappling.de"
							class="mt-1 inline-block text-brand-200 underline underline-offset-4 transition-colors md:hover:text-accent-500"
						>
							info@evolvegrappling.de
						</a>
					</div>
				</div>

				<div
					data-center-highlight-item
					class="center-highlight-item group space-y-3 border-l-2 border-brand-800 pl-4 sm:border-l-0 sm:pl-0"
				>
					<div
						class="center-highlight-icon flex h-10 w-10 items-center justify-center rounded-sm bg-brand-800 text-brand-400 md:group-hover:text-accent-500"
					>
						<Icon name="camera" class="h-5 w-5" />
					</div>
					<div>
						<h3
							class="center-highlight-accent text-sm font-semibold tracking-wider text-brand-400 uppercase"
						>
							Instagram
						</h3>
						<a
							href="https://www.instagram.com/evolve_grappling/"
							class="mt-1 inline-block text-brand-200 underline underline-offset-4 transition-colors md:hover:text-accent-500"
							target="_blank"
							rel="noopener noreferrer"
						>
							@evolve_grappling
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
