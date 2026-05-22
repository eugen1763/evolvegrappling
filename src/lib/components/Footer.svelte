<script lang="ts">
	import { scrollReveal } from '$lib/utils/scroll_animations';
	import Affiliation from '$lib/components/Affiliation.svelte';

	type FooterLink = { href: string; label: string };

	let { links }: { links: FooterLink[] } = $props();
</script>

<footer use:scrollReveal class="reveal reveal-up bg-charcoal border-t border-brand-900 py-16">
	<div class="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
		<Affiliation />

		<div class="mt-12 grid gap-12 border-t border-brand-900 pt-10 md:grid-cols-[1fr_auto_auto]">
			<div>
				<h3 class="mb-2 text-xl font-bold tracking-tight text-white">Evolve Grappling</h3>
				<p class="text-sm text-brand-400">Talblick 5a &middot; 42719 Solingen</p>
			</div>
			<nav class="flex flex-col gap-2 text-sm">
				{#each links as link}
					<a
						href={link.href}
						class="text-brand-300 underline underline-offset-4 transition-colors hover:text-white"
					>
						{link.label}
					</a>
				{/each}
			</nav>
			<div class="text-sm text-brand-400">
				<p class="tabular-nums">+49 1573 5412788</p>
				<a
					href="mailto:info@evolvegrappling.de"
					class="underline underline-offset-4 transition-colors hover:text-white"
				>
					info@evolvegrappling.de
				</a>
			</div>
		</div>
	</div>
</footer>
