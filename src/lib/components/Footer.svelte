<script lang="ts">
	import { scrollReveal } from '$lib/utils/scroll_animations';
	import Affiliation from '$lib/components/Affiliation.svelte';
	import { resolve } from '$app/paths';

	type FooterLink = { href: '/' | '/impressum' | '/datenschutz' | '/links'; label: string };

	let { links }: { links: FooterLink[] } = $props();
</script>

<footer use:scrollReveal class="reveal reveal-up border-t border-brand-900 bg-charcoal py-16">
	<div class="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
		<Affiliation />

		<div
			class="mt-12 grid gap-12 border-t border-brand-900 pt-10 md:grid-cols-[1fr_auto_auto_auto]"
		>
			<div>
				<h3 class="mb-2 text-xl font-bold tracking-tight text-white">Evolve Grappling</h3>
				<a
					href="https://www.google.com/maps/search/?api=1&query=Talblick+5a%2C+42719+Solingen"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-brand-400 underline-offset-4 hover:text-white hover:underline"
				>
					Talblick 5a &middot; 42719 Solingen
				</a>
			</div>
			<nav aria-label="Trainingsangebote" class="flex flex-col gap-2 text-sm">
				<a
					href={resolve('/#bjj-solingen')}
					class="text-brand-300 underline underline-offset-4 transition-colors hover:text-white"
				>
					BJJ in Solingen
				</a>
				<a
					href={resolve('/#grappling-solingen')}
					class="text-brand-300 underline underline-offset-4 transition-colors hover:text-white"
				>
					Grappling in Solingen
				</a>
				<a
					href={resolve('/#kampfsport-solingen')}
					class="text-brand-300 underline underline-offset-4 transition-colors hover:text-white"
				>
					Kampfsport in Solingen
				</a>
			</nav>
			<nav aria-label="Rechtliches" class="flex flex-col gap-2 text-sm">
				{#each links as link (link.href)}
					<a
						href={resolve(link.href)}
						class="text-brand-300 underline underline-offset-4 transition-colors hover:text-white"
					>
						{link.label}
					</a>
				{/each}
			</nav>
			<div class="text-sm text-brand-400">
				<a
					href="tel:+4915735412788"
					class="block tabular-nums underline-offset-4 hover:text-white hover:underline"
				>
					+49 1573 5412788
				</a>
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
