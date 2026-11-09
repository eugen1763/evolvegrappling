<!-- eslint-disable svelte/no-navigation-without-resolve -- This page renders only absolute external URLs and mailto links. -->
<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Affiliation from '$lib/components/Affiliation.svelte';

	const MAP_SRC =
		'https://www.openstreetmap.org/export/embed.html?bbox=7.0225%2C51.1568%2C7.0355%2C51.1618&layer=mapnik&marker=51.15927%2C7.02896';

	let mapLoaded = $state(false);

	const links = [
		{
			title: 'Unsere Website',
			description: 'Besuche unsere Hauptwebsite',
			url: 'https://evolvegrappling.de/',
			icon: 'home',
			target: '_blank'
		},
		{
			title: 'Instagram',
			description: '@evolve_grappling',
			url: 'https://www.instagram.com/evolve_grappling',
			icon: 'camera',
			target: '_blank'
		},
		{
			title: 'Google Bewertung',
			description: 'Bewerte uns auf Google',
			url: 'https://share.google/vsIXZwHLH8eOWWSxh',
			icon: 'star',
			target: '_blank'
		},
		{
			title: 'Open Mat WhatsApp Gruppe',
			description: 'Tritt unserer WhatsApp Gruppe bei',
			url: 'https://chat.whatsapp.com/BXPwrIXlA9v1KmlKH4qXKP',
			icon: 'users',
			target: '_blank'
		},
		{
			title: 'Kontaktiere uns auf WhatsApp',
			description: 'Direkter Kontakt über WhatsApp',
			url: 'https://api.whatsapp.com/send?phone=4915735412788',
			icon: 'message-circle',
			target: '_blank'
		},
		{
			title: 'SmoothComp',
			description: 'Unser Club auf SmoothComp',
			url: 'https://smoothcomp.com/en/club/77897',
			icon: 'trophy',
			target: '_blank'
		},
		{
			title: 'E-Mail Kontakt',
			description: 'info@evolvegrappling.de',
			url: 'mailto:info@evolvegrappling.de',
			icon: 'mail',
			target: '_self'
		}
	];
</script>

<div class="min-h-dvh bg-charcoal px-4 py-12" id="main-content">
	<div class="mx-auto max-w-md">
		<div class="mb-10 text-center">
			<div class="mx-auto mb-4 flex h-32 w-32 items-center justify-center">
				<img src="/logo.svg" alt="Evolve Grappling Logo" class="h-full w-full object-contain" />
			</div>
			<h1 class="mb-2 text-2xl font-bold tracking-tight text-white">Evolve Grappling</h1>
			<p class="px-4 text-sm leading-relaxed text-brand-200">
				Wir bei Evolve Grappling haben uns voll auf Brazilian Jiu-Jitsu (BJJ) im Gi und No-Gi sowie
				auf Ringen für Grappling spezialisiert.
			</p>
		</div>

		<div class="space-y-2.5">
			{#each links as link (link.title)}
				<a
					href={link.url}
					target={link.target}
					rel={link.target === '_blank' ? 'noopener noreferrer' : ''}
					class="group flex w-full items-center gap-4 border border-brand-800 bg-brand-950/50 px-4 py-3.5 text-white transition-all duration-200 hover:border-accent-500/50 hover:bg-brand-900/50 active:scale-[0.98]"
				>
					<div class="flex-shrink-0">
						<Icon
							name={link.icon}
							class="h-5 w-5 text-brand-400 transition-colors group-hover:text-accent-500"
						/>
					</div>
					<div class="min-w-0 flex-1 text-left">
						<div class="font-semibold">{link.title}</div>
						<div class="truncate text-sm text-brand-400">{link.description}</div>
					</div>
					<div class="flex-shrink-0 text-brand-600 transition-colors group-hover:text-accent-500">
						<Icon name="external-link" class="h-4 w-4" />
					</div>
				</a>
			{/each}
		</div>

		<div class="mt-12 mb-8">
			<h2 class="mb-4 text-xl font-bold tracking-tight text-white">Standort</h2>
			<p class="mb-4 text-sm text-brand-200">Schorberger Str. 66, 42699 Solingen</p>
			<div class="overflow-hidden border border-brand-800">
				{#if mapLoaded}
					<iframe
						src={MAP_SRC}
						loading="lazy"
						style="border: 0; width: 100%; height: 450px;"
						title="Karte: Evolve Grappling, Schorberger Str. 66, Solingen"
					></iframe>
				{:else}
					<div class="flex h-[450px] flex-col items-start justify-center gap-4 bg-brand-950/50 p-6">
						<p class="text-sm text-brand-200">
							Die Karte kommt von OpenStreetMap. Erst mit dem Klick lädt dein Browser Daten von
							dort. Mehr dazu in der <a
								href="/datenschutz"
								class="text-accent-500 underline underline-offset-4 hover:text-accent-400"
								>Datenschutzerklärung</a
							>.
						</p>
						<button
							type="button"
							onclick={() => (mapLoaded = true)}
							class="border border-accent-500 px-4 py-2.5 font-semibold text-accent-500 transition-colors hover:bg-accent-500 hover:text-charcoal"
						>
							Karte laden
						</button>
					</div>
				{/if}
			</div>
			<div class="mt-3">
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.google.com/maps/dir/?api=1&amp;destination=Schorberger+Str.+66%2C+42699+Solingen"
					class="inline-flex w-full items-center justify-center gap-2 bg-accent-500 px-4 py-3.5 font-semibold text-charcoal transition-all duration-200 hover:bg-accent-400 active:scale-[0.98]"
				>
					<Icon name="map-pin" class="h-5 w-5" />
					Route anzeigen
				</a>
			</div>
		</div>

		<Affiliation centered />

		<div class="mt-10 text-center text-sm text-brand-400">
			<p>Evolve Grappling Solingen</p>
			<p class="mt-1">Brazilian Jiu-Jitsu &middot; BJJ &middot; Grappling</p>
		</div>
	</div>
</div>
