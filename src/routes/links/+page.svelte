<script lang="ts">
    // Links data extracted from linktree page
    const links = [
        {
            title: "Unsere Website",
            description: "Besuche unsere Hauptwebsite",
            url: "http://evolvegrappling.de",
            icon: "🏠",
            target: "_blank"
        },
        {
            title: "Instagram",
            description: "@evolve_grappling",
            url: "https://www.instagram.com/evolve_grappling",
            icon: "📸",
            target: "_blank"
        },
        {
            title: "Open Mat WhatsApp Gruppe",
            description: "Tritt unserer WhatsApp Gruppe bei",
            url: "https://chat.whatsapp.com/BXPwrIXlA9v1KmlKH4qXKP",
            icon: "👥",
            target: "_blank"
        },
        {
            title: "Kontaktiere uns auf WhatsApp",
            description: "Direkter Kontakt über WhatsApp",
            url: "https://api.whatsapp.com/send?phone=4915735412788",
            icon: "💬",
            target: "_blank"
        },
        {
            title: "SmoothComp",
            description: "Unser Club auf SmoothComp",
            url: "https://smoothcomp.com/en/club/77897",
            icon: "🏆",
            target: "_blank"
        },
        {
            title: "E-Mail Kontakt",
            description: "info@evolvegrappling.de",
            url: "mailto:info@evolvegrappling.de",
            icon: "📧",
            target: "_self"
        }
    ];
</script>

<svelte:head>
    <title>Links - Evolve Grappling Solingen</title>
    <meta name="description" content="Alle wichtigen Links zu Evolve Grappling Solingen: Website, Instagram, WhatsApp und Kontakt" />
</svelte:head>

<div class="min-h-screen bg-gray-900 py-12 px-4">
    <div class="max-w-md mx-auto">
        <!-- Profile Header -->
        <div class="text-center mb-8">
            <div class="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <img 
                    src="/logo.svg" 
                    alt="Evolve Grappling Logo" 
                    class="w-full h-full object-contain filter drop-shadow-lg"
                />
            </div>
            <h1 class="text-2xl font-bold text-white mb-2">Evolve Grappling</h1>
            <p class="text-gray-300 text-sm px-4">
                Wir bei Evolve Grappling haben uns voll auf Brazilian Jiu-Jitsu (BJJ) im Gi und No-Gi sowie auf Ringen für Grappling spezialisiert.
            </p>
        </div>

        <!-- Links -->
        <div class="space-y-4">
            {#each links as link}
                <a 
                    href={link.url} 
                    target={link.target}
                    rel={link.target === '_blank' ? 'noopener noreferrer' : ''}
                    class="block w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 group"
                >
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                            <span class="text-2xl">{link.icon}</span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {link.title}
                            </div>
                            <div class="text-sm text-gray-500 truncate">
                                {link.description}
                            </div>
                        </div>
                        <div class="flex-shrink-0">
                            <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                        </div>
                    </div>
                </a>
            {/each}
        </div>

        <!-- Google Maps -->
        <div class="mt-12 mb-8">
            <h2 class="text-xl font-bold text-white mb-4 text-center">Standort</h2>
            <div class="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBHEIamPaljiaFeIRJX0TknCEi84x47yfc&amp;center=51.1859878%2C7.0281498&amp;zoom=16&amp;q=place_id%3AChIJnWhxP0rTuEcRHi7GpIdZkLI" 
                    allow="fullscreen" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade" 
                    style="border: 0px; width: 100%; height: 450px;"
                    title="Google Maps"
                ></iframe>
            </div>
            <!-- Get Directions Button -->
            <div class="mt-4 text-center">
                <a target="_blank" href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47b8d34a3f71689d:0xb2905987a4c62e1e?sa=X&amp;ved=1t:8290&amp;ictx=111" class="inline-block w-full p-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200">Get directions</a>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12 text-gray-400 text-sm">
            <p>© 2024 Evolve Grappling Solingen</p>
            <p class="mt-2">Brazilian Jiu-Jitsu • BJJ • Grappling</p>
        </div>
    </div>
</div>

<style>
    /* Custom hover effects */
    a:hover {
        transform: translateY(-1px);
        transition: transform 0.2s ease;
    }
</style>