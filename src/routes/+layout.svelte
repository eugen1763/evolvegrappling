<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import SiteBar from '$lib/components/SiteBar.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	// The start page is static/index.html. It has its own head, structured data and design.
	let { children } = $props();

	const siteUrl = 'https://evolvegrappling.de';
	const socialImage = `${siteUrl}/evolve-grappling-solingen.jpg`;

	const pages: Record<string, { title: string; description: string }> = {
		'/impressum': {
			title: 'Impressum - Evolve Grappling Solingen',
			description:
				'Impressum und Kontaktdaten von Evolve Grappling Solingen. Schorberger Str. 66, 42699 Solingen.'
		},
		'/datenschutz': {
			title: 'Datenschutz - Evolve Grappling Solingen',
			description: 'Datenschutzerklärung von Evolve Grappling Solingen gemäß DSGVO.'
		},
		'/links': {
			title: 'Links - Evolve Grappling Solingen',
			description:
				'Alle wichtigen Links zu Evolve Grappling Solingen: Website, Instagram, WhatsApp, Karte und E-Mail.'
		}
	};
	const fallback = {
		title: 'Evolve Grappling Solingen',
		description: 'BJJ, Grappling, Kickboxen und BJJ für Kinder in Solingen.'
	};

	let meta = $derived(pages[page.route.id ?? ''] ?? fallback);
	let canonicalUrl = $derived(`${siteUrl}${page.url.pathname}`);
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta name="robots" content="noindex, follow" />
	<meta name="theme-color" content="#0f1a1d" />
	<link rel="canonical" href={canonicalUrl} />
	<link rel="icon" href="/logo.svg" />
	<link
		rel="preload"
		href="/fonts/sofia-sans-extra-condensed-latin-900-normal.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>

	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="Evolve Grappling Solingen" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:image" content={socialImage} />
</svelte:head>

<a class="skip" href="#main-content">Zum Inhalt springen</a>
<SiteBar />
<main id="main-content">
	{@render children?.()}
</main>
<SiteFooter />
