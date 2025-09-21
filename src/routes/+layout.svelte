<script lang="ts">
    import '../app.css';
    import favicon from '$lib/assets/favicon.svg';
    import { page } from '$app/state';

    let {children} = $props();
    
    // SEO data based on current page
    let pageTitle = $derived(getPageTitle(page.route.id));
    let pageDescription = $derived(getPageDescription(page.route.id));
    let pageKeywords = $derived(getPageKeywords(page.route.id));
    
    function getPageTitle(routeId: string | null): string {
        switch (routeId) {
            case '/':
                return 'Evolve Grappling Solingen - Brazilian Jiu-Jitsu, BJJ & Grappling Training';
            case '/impressum':
                return 'Impressum - Evolve Grappling Solingen';
            case '/datenschutz':
                return 'Datenschutz - Evolve Grappling Solingen';
            default:
                return 'Evolve Grappling Solingen - Brazilian Jiu-Jitsu & Grappling';
        }
    }
    
    function getPageDescription(routeId: string | null): string {
        switch (routeId) {
            case '/':
                return 'Evolve Grappling in Solingen: Professionelles Brazilian Jiu-Jitsu (BJJ) Training im Gi und No-Gi sowie Ringen für Grappling. Für Anfänger und Fortgeschrittene, Wettkämpfer und Hobbysportler. 7 Tage die Woche Training möglich.';
            case '/impressum':
                return 'Impressum und Kontaktdaten von Evolve Grappling Solingen. Maximilian Galle, Talblick 5a, 42719 Solingen.';
            case '/datenschutz':
                return 'Datenschutzerklärung von Evolve Grappling Solingen gemäß DSGVO.';
            default:
                return 'Evolve Grappling Solingen: Brazilian Jiu-Jitsu, BJJ und Grappling Training für alle Levels.';
        }
    }
    
    function getPageKeywords(routeId: string | null): string {
        const baseKeywords = 'Brazilian Jiu-Jitsu, BJJ, Grappling, Ringen, Kampfsport, Solingen, Evolve Grappling, Gi, No-Gi, Training';
        switch (routeId) {
            case '/':
                return baseKeywords + ', Martial Arts, Wettkampf, Anfänger, Fortgeschrittene, Team, Community';
            case '/impressum':
                return baseKeywords + ', Impressum, Kontakt, Maximilian Galle';
            case '/datenschutz':
                return baseKeywords + ', Datenschutz, DSGVO, Privatsphäre';
            default:
                return baseKeywords;
        }
    }
</script>

<svelte:head>
    <!-- Basic Meta Tags -->
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta name="keywords" content={pageKeywords} />
    <meta name="author" content="Evolve Grappling Solingen" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://evolve-grappling.de{page.url.pathname}" />
    
    <!-- Favicon -->
    <link rel="icon" href={favicon}/>
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://evolve-grappling.de{page.url.pathname}" />
    <meta property="og:site_name" content="Evolve Grappling Solingen" />
    <meta property="og:locale" content="de_DE" />
    <meta property="og:image" content="https://evolve-grappling.de/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Evolve Grappling Solingen - Brazilian Jiu-Jitsu Training" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
    <meta name="twitter:image" content="https://evolve-grappling.de/og-image.jpg" />
    <meta name="twitter:image:alt" content="Evolve Grappling Solingen - Brazilian Jiu-Jitsu Training" />
    
    <!-- Local Business Structured Data -->
    {@html `
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SportsClub",
        "name": "Evolve Grappling",
        "description": "Brazilian Jiu-Jitsu und Grappling Training in Solingen",
        "url": "https://evolve-grappling.de",
        "logo": "https://evolve-grappling.de/logo.png",
        "image": "https://evolve-grappling.de/og-image.jpg",
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
            "email": "info@evolve-grappling.de",
            "contactType": "customer service"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 51.1657,
            "longitude": 7.0888
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "description": "7 Tage die Woche Training möglich"
            }
        ],
        "sport": ["Brazilian Jiu-Jitsu", "Grappling", "Wrestling"],
        "areaServed": {
            "@type": "Place",
            "name": "Solingen, Deutschland"
        }
    }
    </script>
    `}
</svelte:head>

<div class="bg-gray-900">
    {@render children?.()}
</div>
