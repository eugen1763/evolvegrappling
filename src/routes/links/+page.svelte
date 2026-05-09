<script lang="ts">
    const links = [
        {
            title: "Unsere Website",
            description: "Besuche unsere Hauptwebsite",
            url: "http://evolvegrappling.de",
            target: "_blank",
            icon: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>`
        },
        {
            title: "Instagram",
            description: "@evolve_grappling",
            url: "https://www.instagram.com/evolve_grappling",
            target: "_blank",
            icon: `<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>`
        },
        {
            title: "Google Rezension",
            description: "Bewerte uns auf Google",
            url: "https://share.google/vsIXZwHLH8eOWWSxh",
            target: "_blank",
            icon: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`
        },
        {
            title: "Open Mat WhatsApp Gruppe",
            description: "Tritt unserer WhatsApp Gruppe bei",
            url: "https://chat.whatsapp.com/BXPwrIXlA9v1KmlKH4qXKP",
            target: "_blank",
            icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`
        },
        {
            title: "Kontaktiere uns auf WhatsApp",
            description: "Direkter Kontakt über WhatsApp",
            url: "https://api.whatsapp.com/send?phone=4915735412788",
            target: "_blank",
            icon: `<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>`
        },
        {
            title: "SmoothComp",
            description: "Unser Club auf SmoothComp",
            url: "https://smoothcomp.com/en/club/77897",
            target: "_blank",
            icon: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>`
        },
        {
            title: "E-Mail Kontakt",
            description: "info@evolvegrappling.de",
            url: "mailto:info@evolvegrappling.de",
            target: "_self",
            icon: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`
        }
    ];
</script>

<svelte:head>
    <title>Links - Evolve Grappling Solingen</title>
    <meta name="description" content="Alle wichtigen Links zu Evolve Grappling Solingen: Website, Instagram, WhatsApp und Kontakt" />
</svelte:head>

<div class="min-h-screen bg-surface-900 py-12 px-4" id="main-content">
    <div class="max-w-md mx-auto">
        <!-- Profile Header -->
        <div class="text-center mb-8">
            <div class="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <img 
                    src="/logo.svg" 
                    alt="Evolve Grappling Logo" 
                    class="w-full h-full object-contain"
                    style="filter: drop-shadow(0 4px 20px rgba(0,0,0,0.5));"
                />
            </div>
            <h1 class="text-2xl font-bold text-white mb-2 tracking-tight">Evolve Grappling</h1>
            <p class="text-gray-300 text-sm px-4 leading-relaxed">
                Wir bei Evolve Grappling haben uns voll auf Brazilian Jiu-Jitsu (BJJ) im Gi und No-Gi sowie auf Ringen für Grappling spezialisiert.
            </p>
        </div>

        <!-- Links -->
        <div class="space-y-3">
            {#each links as link}
                <a 
                    href={link.url} 
                    target={link.target}
                    rel={link.target === '_blank' ? 'noopener noreferrer' : ''}
                    class="flex items-center gap-4 w-full p-4 bg-surface-800 hover:bg-surface-700 active:scale-[0.98] text-white rounded-2xl transition-all duration-200 group"
                >
                    <div class="shrink-0 w-10 h-10 bg-accent-500/20 rounded-xl flex items-center justify-center group-hover:bg-accent-500/30 transition-colors duration-200">
                        <svg class="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            {@html link.icon}
                        </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="text-base font-semibold">
                            {link.title}
                        </div>
                        <div class="text-sm text-gray-400 truncate">
                            {link.description}
                        </div>
                    </div>
                    <div class="shrink-0">
                        <svg class="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                    </div>
                </a>
            {/each}
        </div>

        <!-- Google Maps -->
        <div class="mt-12 mb-8">
            <h2 class="text-xl font-bold text-white mb-4 text-center">Standort</h2>
            <div class="rounded-2xl overflow-hidden">
                <iframe 
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBHEIamPaljiaFeIRJX0TknCEi84x47yfc&amp;center=51.1859878%2C7.0281498&amp;zoom=16&amp;q=place_id%3AChIJnWhxP0rTuEcRHi7GpIdZkLI" 
                    allow="fullscreen" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade" 
                    style="border: 0px; width: 100%; height: 450px;"
                    title="Google Maps"
                ></iframe>
            </div>
            <div class="mt-4 text-center">
                <a target="_blank" href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47b8d34a3f71689d:0xb2905987a4c62e1e?sa=X&amp;ved=1t:8290&amp;ictx=111" class="inline-block w-full p-4 bg-accent-500 text-white rounded-2xl font-semibold hover:bg-accent-400 active:scale-[0.98] transition-all duration-200">Route berechnen</a>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12 text-gray-400 text-sm">
            <p>&copy; 2024 Evolve Grappling Solingen</p>
            <p class="mt-2">Brazilian Jiu-Jitsu &middot; BJJ &middot; Grappling</p>
        </div>
    </div>
</div>