<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();

	let pageTitle = $derived(getPageTitle(page.route.id));
	let pageDescription = $derived(getPageDescription(page.route.id));
	let pageKeywords = $derived(getPageKeywords(page.route.id));

	function getPageTitle(routeId: string | null): string {
		switch (routeId) {
			case '/':
				return 'Evolve Grappling - BJJ / Kampfsport in Solingen';
			case '/impressum':
				return 'Impressum - Evolve Grappling Solingen';
			case '/datenschutz':
				return 'Datenschutz - Evolve Grappling Solingen';
			case '/links':
				return 'Links - Evolve Grappling Solingen';
			default:
				return 'Evolve Grappling Solingen - Brazilian Jiu-Jitsu & Grappling';
		}
	}

	function getPageDescription(routeId: string | null): string {
		switch (routeId) {
			case '/':
				return 'Evolve Grappling - BJJ / Kampfsport in Solingen Fur Anfanger und Fortgeschrittene, Wettkampfer und Hobbysportler. 7 Tage die Woche Training moglich.';
			case '/impressum':
				return 'Impressum und Kontaktdaten von Evolve Grappling Solingen. Maximilian Galle, Talblick 5a, 42719 Solingen.';
			case '/datenschutz':
				return 'Datenschutzerklarung von Evolve Grappling Solingen gemass DSGVO.';
			case '/links':
				return 'Alle wichtigen Links zu Evolve Grappling Solingen: Website, Instagram, WhatsApp Kontakt und E-Mail. Folge uns auf Social Media und tritt unserer Community bei.';
			default:
				return 'Evolve Grappling Solingen: Brazilian Jiu-Jitsu, BJJ und Grappling Training fur alle Levels.';
		}
	}

	function getPageKeywords(routeId: string | null): string {
		const baseKeywords = 'Brazilian Jiu-Jitsu, BJJ, Grappling, Ringen, Kampfsport, Solingen, Evolve Grappling, Gi, No-Gi, Training';
		switch (routeId) {
			case '/':
				return baseKeywords + ', Martial Arts, Wettkampf, Anfanger, Fortgeschrittene, Team, Community';
			case '/impressum':
				return baseKeywords + ', Impressum, Kontakt, Maximilian Galle';
			case '/datenschutz':
				return baseKeywords + ', Datenschutz, DSGVO, Privatsphare';
			case '/links':
				return baseKeywords + ', Social Media, Instagram, WhatsApp, Kontakt, Links, Community, Linktree';
			default:
				return baseKeywords;
		}
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="keywords" content={pageKeywords} />
	<meta name="author" content="Evolve Grappling Solingen" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://evolvegrappling.de{page.url.pathname}" />

	<link rel="icon" href={favicon} />

	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://evolvegrappling.de{page.url.pathname}" />
	<meta property="og:site_name" content="Evolve Grappling Solingen" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:image" content="https://evolvegrappling.de/og-image.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Evolve Grappling Solingen - Brazilian Jiu-Jitsu Training" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content="https://evolvegrappling.de/og-image.jpg" />
	<meta name="twitter:image:alt" content="Evolve Grappling Solingen - Brazilian Jiu-Jitsu Training" />

	{@html `
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "SportsClub",
		"name": "Evolve Grappling",
		"description": "Kampfsport, Brazilian Jiu-Jitsu und Grappling Training in Solingen",
		"url": "https://evolvegrappling.de",
		"logo": "https://evolvegrappling.de/logo.png",
		"image": "https://evolvegrappling.de/og-image.jpg",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "Talblick 5a",
			"addressLocality": "Solingen",
			"postalCode": "42719",
			"addressCountry": "DE"
		},
		"contactPoint": {
			"@type": "ContactPoint",
			"telephone": "+49-1573-5412788",
			"email": "info@evolvegrappling.de",
			"contactType": "customer service"
		},
		"geo": {
			"@type": "GeoCoordinates",
			"latitude": 51.185994,
			"longitude": 7.028167
		},
		"openingHoursSpecification": [
			{
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				"description": "7 Tage die Woche Training moglich"
			}
		],
		"sport": ["Kampfsport", "Brazilian Jiu-Jitsu", "Grappling", "Wrestling"],
		"areaServed": {
			"@type": "Place",
			"name": "Solingen, Deutschland"
		}
	}
	</script>
	`}
</svelte:head>

<a href="#main-content" class="skip-to-content">Zum Inhalt springen</a>

<div class="grain bg-brand-950">
	{@render children?.()}
</div>
