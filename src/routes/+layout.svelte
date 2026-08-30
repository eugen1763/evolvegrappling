<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { trialFaq } from '$lib/data/seo';

	let { children } = $props();

	const siteUrl = 'https://evolvegrappling.de';
	const socialImage = `${siteUrl}/evolve-grappling-solingen.jpg`;

	let pageTitle = $derived(getPageTitle(page.route.id));
	let pageDescription = $derived(getPageDescription(page.route.id));
	let canonicalUrl = $derived(`${siteUrl}${page.url.pathname}`);
	let isHomePage = $derived(page.route.id === '/');
	let robotsContent = $derived(
		isHomePage ? 'index, follow, max-image-preview:large' : 'noindex, follow'
	);

	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'SportsActivityLocation',
				'@id': `${siteUrl}/#sports-club`,
				name: 'Evolve Grappling',
				alternateName: 'Evolve Grappling Solingen',
				description:
					'Kampfsport in Solingen mit Brazilian Jiu-Jitsu, BJJ im Gi und No-Gi, Grappling und Ringen.',
				url: `${siteUrl}/`,
				logo: {
					'@type': 'ImageObject',
					url: `${siteUrl}/evolve-grappling-logo.png`,
					width: 512,
					height: 512
				},
				image: {
					'@type': 'ImageObject',
					url: socialImage,
					width: 1200,
					height: 630
				},
				telephone: '+49 1573 5412788',
				email: 'info@evolvegrappling.de',
				priceRange: '€€',
				address: {
					'@type': 'PostalAddress',
					streetAddress: 'Talblick 5a',
					addressLocality: 'Solingen',
					postalCode: '42719',
					addressCountry: 'DE'
				},
				geo: {
					'@type': 'GeoCoordinates',
					latitude: 51.185994,
					longitude: 7.028167
				},
				hasMap: 'https://www.google.com/maps/search/?api=1&query=Talblick+5a%2C+42719+Solingen',
				sameAs: [
					'https://www.instagram.com/evolve_grappling/',
					'https://smoothcomp.com/en/club/77897'
				],
				sport: ['Brazilian Jiu-Jitsu', 'BJJ', 'Grappling', 'Ringen'],
				areaServed: {
					'@type': 'City',
					name: 'Solingen'
				},
				audience: {
					'@type': 'PeopleAudience',
					requiredMinAge: 16
				},
				amenityFeature: [
					{
						'@type': 'LocationFeatureSpecification',
						name: 'Umkleideräume',
						value: true
					},
					{
						'@type': 'LocationFeatureSpecification',
						name: 'Duschen',
						value: true
					}
				],
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Kampfsporttraining in Solingen',
					itemListElement: [
						{ '@type': 'Offer', name: 'BJJ Gi Training' },
						{ '@type': 'Offer', name: 'BJJ No-Gi und Grappling Training' },
						{ '@type': 'Offer', name: 'Ringen für Grappling' },
						{ '@type': 'Offer', name: 'Kostenloses Probetraining', price: 0, priceCurrency: 'EUR' }
					]
				}
			},
			{
				'@type': 'FAQPage',
				'@id': `${siteUrl}/#haeufige-fragen`,
				mainEntity: trialFaq.map((item) => ({
					'@type': 'Question',
					name: item.question,
					acceptedAnswer: {
						'@type': 'Answer',
						text: item.answer
					}
				}))
			}
		]
	};

	function getPageTitle(routeId: string | null): string {
		switch (routeId) {
			case '/':
				return 'BJJ, Grappling & Kampfsport in Solingen | Evolve';
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
				return 'BJJ, No-Gi Grappling und Ringen in Solingen – für Anfänger und Fortgeschrittene ab 16 Jahren. Jetzt kostenloses Probetraining vereinbaren.';
			case '/impressum':
				return 'Impressum und Kontaktdaten von Evolve Grappling Solingen. Maximilian Galle, Talblick 5a, 42719 Solingen.';
			case '/datenschutz':
				return 'Datenschutzerklärung von Evolve Grappling Solingen gemäß DSGVO.';
			case '/links':
				return 'Alle wichtigen Links zu Evolve Grappling Solingen: Website, Instagram, WhatsApp, Google Maps und E-Mail.';
			default:
				return 'Evolve Grappling Solingen: Brazilian Jiu-Jitsu, BJJ und Grappling für Anfänger und Fortgeschrittene.';
		}
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="author" content="Evolve Grappling Solingen" />
	<meta name="robots" content={robotsContent} />
	<link rel="canonical" href={canonicalUrl} />
	<link rel="alternate" hreflang="de-DE" href={canonicalUrl} />
	<link rel="alternate" hreflang="x-default" href={canonicalUrl} />

	<link rel="icon" href={favicon} />

	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="Evolve Grappling Solingen" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:image" content={socialImage} />
	<meta property="og:image:secure_url" content={socialImage} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta
		property="og:image:alt"
		content="Evolve Grappling Solingen - Brazilian Jiu-Jitsu Training"
	/>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={socialImage} />
	<meta
		name="twitter:image:alt"
		content="Evolve Grappling Solingen - Brazilian Jiu-Jitsu Training"
	/>

	{#if isHomePage}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD is serialized from static, trusted data. -->
		{@html '<script type="application/ld+json">' +
			JSON.stringify(structuredData) +
			'</' +
			'script>'}
	{/if}
</svelte:head>

<a href="#main-content" class="skip-to-content">Zum Inhalt springen</a>

<!-- Fixed brand mark — top left -->
<a
	href={resolve('/')}
	class="fixed top-6 left-6 z-50 flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80"
	aria-label="Evolve Grappling Home"
>
	<img src="/logo.svg" alt="" class="h-8 w-auto md:h-10" />
	<span class="hidden text-sm font-bold tracking-tight text-white sm:inline">EVOLVE</span>
</a>

<div class="grain bg-charcoal">
	{@render children?.()}
</div>
