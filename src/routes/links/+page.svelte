<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	const links = [
		{
			title: "Unsere Website",
			description: "Besuche unsere Hauptwebsite",
			url: "http://evolvegrappling.de",
			icon: "home",
			target: "_blank"
		},
		{
			title: "Instagram",
			description: "@evolve_grappling",
			url: "https://www.instagram.com/evolve_grappling",
			icon: "camera",
			target: "_blank"
		},
		{
			title: "Google Bewertung",
			description: "Bewerte uns auf Google",
			url: "https://share.google/vsIXZwHLH8eOWWSxh",
			icon: "star",
			target: "_blank"
		},
		{
			title: "Open Mat WhatsApp Gruppe",
			description: "Tritt unserer WhatsApp Gruppe bei",
			url: "https://chat.whatsapp.com/BXPwrIXlA9v1KmlKH4qXKP",
			icon: "users",
			target: "_blank"
		},
		{
			title: "Kontaktiere uns auf WhatsApp",
			description: "Direkter Kontakt uber WhatsApp",
			url: "https://api.whatsapp.com/send?phone=4915735412788",
			icon: "message-circle",
			target: "_blank"
		},
		{
			title: "SmoothComp",
			description: "Unser Club auf SmoothComp",
			url: "https://smoothcomp.com/en/club/77897",
			icon: "trophy",
			target: "_blank"
		},
		{
			title: "E-Mail Kontakt",
			description: "info@evolvegrappling.de",
			url: "mailto:info@evolvegrappling.de",
			icon: "mail",
			target: "_self"
		}
	];
</script>

<svelte:head>
	<title>Links - Evolve Grappling Solingen</title>
	<meta name="description" content="Alle wichtigen Links zu Evolve Grappling Solingen: Website, Instagram, WhatsApp und Kontakt" />
</svelte:head>

<div class="min-h-dvh bg-charcoal px-4 py-12" id="main-content">
	<div class="mx-auto max-w-md">
		<div class="mb-10 text-center">
			<div class="mx-auto mb-4 flex h-32 w-32 items-center justify-center">
				<img
					src="/logo.svg"
					alt="Evolve Grappling Logo"
					class="h-full w-full object-contain"
				/>
			</div>
			<h1 class="mb-2 text-2xl font-bold tracking-tight text-white">Evolve Grappling</h1>
			<p class="px-4 text-sm leading-relaxed text-brand-200">
				Wir bei Evolve Grappling haben uns voll auf Brazilian Jiu-Jitsu (BJJ) im Gi und No-Gi sowie auf Ringen fur Grappling spezialisiert.
			</p>
		</div>

		<div class="space-y-2.5">
			{#each links as link}
				<a
					href={link.url}
					target={link.target}
					rel={link.target === '_blank' ? 'noopener noreferrer' : ''}
					class="group flex w-full items-center gap-4 border border-brand-800 bg-brand-950/50 px-4 py-3.5 text-white transition-all duration-200 hover:border-accent-500/50 hover:bg-brand-900/50 active:scale-[0.98]"
				>
					<div class="flex-shrink-0">
						<Icon name={link.icon} class="h-5 w-5 text-brand-400 group-hover:text-accent-500 transition-colors" />
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

		<div class="mb-8 mt-12">
			<h2 class="mb-4 text-xl font-bold tracking-tight text-white">Standort</h2>
			<div class="overflow-hidden border border-brand-800">
				<iframe
					src="https://www.google.com/maps/embed/v1/place?key=***&amp;center=51.1859878%2C7.0281498&amp;zoom=16&amp;q=place_id%3AChIJnWhxP0rTuEcRHi7GpIdZkLI"
					allow="fullscreen"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					style="border: 0px; width: 100%; height: 450px;"
					title="Google Maps"
				></iframe>
			</div>
			<div class="mt-3">
				<a
					target="_blank"
					href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47b8d34a3f71689d:0xb2905987a4c62e1e?sa=X&amp;ved=1t:8290&amp;ictx=111"
					class="inline-flex w-full items-center justify-center gap-2 bg-accent-500 px-4 py-3.5 font-semibold text-charcoal transition-all duration-200 hover:bg-accent-400 active:scale-[0.98]"
				>
					<Icon name="map-pin" class="h-5 w-5" />
					Route anzeigen
				</a>
			</div>
		</div>

		<div class="mt-12 text-center text-sm text-brand-400">
			<p>Evolve Grappling Solingen</p>
			<p class="mt-1">Brazilian Jiu-Jitsu &middot; BJJ &middot; Grappling</p>
		</div>
	</div>
</div>
