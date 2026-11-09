<!-- eslint-disable svelte/no-navigation-without-resolve -- This page renders only absolute external URLs, mailto links and static paths. -->
<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	const MAP_SRC =
		'https://www.openstreetmap.org/export/embed.html?bbox=7.0225%2C51.1568%2C7.0355%2C51.1618&layer=mapnik&marker=51.15927%2C7.02896';

	const links = [
		{
			title: 'Unsere Website',
			description: 'Kurse, Trainingsplan und Preise',
			url: '/',
			icon: 'home',
			external: false
		},
		{
			title: 'Kostenloses Probetraining',
			description: 'Termin direkt online buchen',
			url: '/#kontakt',
			icon: 'calendar',
			external: false
		},
		{
			title: 'Instagram',
			description: '@evolve_grappling',
			url: 'https://www.instagram.com/evolve_grappling',
			icon: 'camera',
			external: true
		},
		{
			title: 'Google Bewertung',
			description: 'Bewerte uns auf Google',
			url: 'https://share.google/vsIXZwHLH8eOWWSxh',
			icon: 'star',
			external: true
		},
		{
			title: 'Open Mat WhatsApp Gruppe',
			description: 'Tritt unserer WhatsApp Gruppe bei',
			url: 'https://chat.whatsapp.com/BXPwrIXlA9v1KmlKH4qXKP',
			icon: 'users',
			external: true
		},
		{
			title: 'Kontakt über WhatsApp',
			description: 'Schreib uns direkt',
			url: 'https://api.whatsapp.com/send?phone=4915735412788',
			icon: 'message-circle',
			external: true
		},
		{
			title: 'SmoothComp',
			description: 'Unser Club auf SmoothComp',
			url: 'https://smoothcomp.com/en/club/77897',
			icon: 'trophy',
			external: true
		},
		{
			title: 'E-Mail',
			description: 'info@evolvegrappling.de',
			url: 'mailto:info@evolvegrappling.de',
			icon: 'mail',
			external: false
		}
	];

	let mapLoaded = $state(false);
</script>

<div class="page links">
	<p class="page-kicker">Evolve Grappling Solingen</p>
	<h1 class="page-title">Links</h1>
	<p class="intro">BJJ, Grappling, Kickboxen und BJJ für Kinder in Solingen.</p>

	<ul class="link-list">
		{#each links as link (link.title)}
			<li>
				<a
					class="link"
					href={link.url}
					target={link.external ? '_blank' : undefined}
					rel={link.external ? 'noopener noreferrer' : undefined}
				>
					<Icon name={link.icon} class="link-icon" />
					<span class="link-text">
						<b>{link.title}</b>
						<span>{link.description}</span>
					</span>
					<Icon name={link.external ? 'external-link' : 'chevron-right'} class="link-arrow" />
				</a>
			</li>
		{/each}
	</ul>

	<section class="where" aria-labelledby="where-title">
		<h2 id="where-title">Anfahrt</h2>
		<p class="address">Schorberger Str. 66, 42699 Solingen</p>
		<div class="map" class:is-loaded={mapLoaded}>
			{#if mapLoaded}
				<iframe src={MAP_SRC} title="Karte: Evolve Grappling, Schorberger Str. 66, Solingen"
				></iframe>
			{:else}
				<p>
					Die Karte kommt von OpenStreetMap. Erst mit dem Klick lädt dein Browser Daten von dort.
					Mehr dazu in der <a href="/datenschutz/">Datenschutzerklärung</a>.
				</p>
				<button type="button" class="btn btn-ghost" onclick={() => (mapLoaded = true)}>
					Karte laden
				</button>
			{/if}
		</div>
		<a
			class="btn route"
			href="https://www.google.com/maps/dir/?api=1&destination=Schorberger+Str.+66%2C+42699+Solingen"
			target="_blank"
			rel="noopener noreferrer"
		>
			Route in Google Maps öffnen
		</a>
	</section>
</div>

<style>
	.links {
		max-width: 560px;
	}
	.intro {
		margin: -12px 0 24px;
		font-weight: 600;
	}
	.link-list {
		display: grid;
		gap: 12px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.link {
		display: flex;
		align-items: center;
		gap: 14px;
		min-height: 64px;
		padding: 10px 14px;
		background: var(--paper);
		border: 3px solid var(--ink);
		box-shadow: 5px 5px 0 var(--ink);
		text-decoration: none;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease,
			background-color 0.15s ease;
	}
	.link:hover {
		background: var(--sand);
		transform: translate(2px, 2px);
		box-shadow: 3px 3px 0 var(--ink);
	}
	.link:active {
		transform: translate(5px, 5px);
		box-shadow: 0 0 0 var(--ink);
	}
	.link-list li:nth-child(2) .link {
		background: var(--signal);
	}
	.link :global(.link-icon) {
		flex: none;
		width: 24px;
		height: 24px;
	}
	.link :global(.link-arrow) {
		flex: none;
		width: 18px;
		height: 18px;
		margin-left: auto;
	}
	.link-text {
		display: grid;
		min-width: 0;
	}
	.link-text b {
		font: 800 1.45rem/1 var(--display);
		text-transform: uppercase;
		letter-spacing: 0.01em;
	}
	.link-text span {
		overflow: hidden;
		font-size: 0.9375rem;
		color: var(--mute);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.where {
		margin-top: 48px;
	}
	.where h2 {
		font: 900 clamp(2.6rem, 12vw, 3.6rem) / 0.9 var(--display);
		text-transform: uppercase;
	}
	.address {
		margin: 6px 0 16px;
		font-weight: 600;
	}
	.map {
		display: grid;
		place-content: center;
		justify-items: start;
		gap: 16px;
		min-height: 300px;
		padding: 20px;
		background:
			repeating-linear-gradient(135deg, transparent 0 9px, rgba(216, 220, 195, 0.08) 9px 11px),
			var(--ink-2);
		color: #c3cbc8;
		border: 3px solid var(--ink);
		box-shadow: 6px 6px 0 var(--teal);
	}
	.map p {
		max-width: 30em;
		font-size: 0.9375rem;
	}
	.map a {
		color: var(--sand);
	}
	.map.is-loaded {
		display: block;
		padding: 0;
	}
	.map iframe {
		display: block;
		width: 100%;
		height: 360px;
		border: 0;
	}
	.route {
		width: 100%;
		margin-top: 22px;
	}
</style>
