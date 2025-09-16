<script lang="ts">
    import {onMount} from 'svelte';
    import {initScrollAnimations} from "$lib/utils/scroll_animations";
    // @ts-ignore
    import HeroSection from "$lib/components/HeroSection.svelte";
    // @ts-ignore
    import TrainingSchedule from "$lib/components/TrainingSchedule.svelte";
    // @ts-ignore
    import TeamSection from "$lib/components/TeamSection.svelte";
    // @ts-ignore
    import ContactSection from "$lib/components/ContactSection.svelte";
    // @ts-ignore
    import BurgerMenu from "$lib/components/BurgerMenu.svelte";

    let scrollY = $state(0);
    let innerHeight = $state(0);

    onMount(() => {
        const updateScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener('scroll', updateScroll);
        updateScroll();

        const cleanupAnimations = initScrollAnimations();

        return () => {
            window.removeEventListener('scroll', updateScroll);
            cleanupAnimations();
        };
    });
</script>

<svelte:window bind:scrollY bind:innerHeight/>

<div class="relative overflow-x-hidden">
    <!-- Burger Menu -->
    <BurgerMenu />
    
    <div id="hero">
        <HeroSection {scrollY} {innerHeight}/>
    </div>

    <!-- Content Section -->
    <section class="relative z-20 bg-gray-900 min-h-screen">
        <div class="container mx-auto px-6 py-16">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-4xl font-bold text-white mb-8 text-center scroll-animate fade-in-up">
                    Meistern Sie die Kunst des Brazilian Jiu-Jitsu
                </h2>

                <div class="grid md:grid-cols-2 gap-12 mb-16">
                    <div class="bg-gray-800 rounded-lg p-8 scroll-animate slide-in-left">
                        <h3 class="text-2xl font-semibold text-white mb-4">Für Anfänger</h3>
                        <p class="text-gray-300 mb-6">
                            Beginnen Sie Ihre Reise mit unserem Grundlagenprogramm. Lernen Sie die Grundlagen des
                            Brazilian Jiu-Jitsu
                            in einer sicheren, unterstützenden Umgebung, die speziell für komplette Anfänger entwickelt
                            wurde.
                        </p>
                        <ul class="text-gray-400 space-y-2">
                            <li>• Grundlegende Positionen und Bewegungen</li>
                            <li>• Selbstverteidigungstechniken</li>
                            <li>• BJJ-Philosophie und Etikette</li>
                            <li>• Schrittweiser Fertigkeitsaufbau</li>
                        </ul>
                    </div>

                    <div class="bg-gray-800 rounded-lg p-8 scroll-animate slide-in-right">
                        <h3 class="text-2xl font-semibold text-white mb-4">Fortgeschrittenes Training</h3>
                        <p class="text-gray-300 mb-6">
                            Bringen Sie Ihre Fähigkeiten auf die nächste Stufe mit fortgeschrittenen Techniken,
                            Wettkampfvorbereitung
                            und spezialisierten Trainingsprogrammen für erfahrene Praktizierende.
                        </p>
                        <ul class="text-gray-400 space-y-2">
                            <li>• Wettkampfvorbereitung</li>
                            <li>• Fortgeschrittene Guard-Systeme</li>
                            <li>• Submission-Ketten</li>
                            <li>• Wrestling-Integration</li>
                        </ul>
                    </div>
                </div>

                <div class="text-center scroll-animate fade-in-up">
                    <h3 class="text-3xl font-bold text-white mb-6">Warum Evolve Grappling wählen?</h3>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="text-center scroll-animate fade-in-up delay-200">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">🥋</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Expertenlehre</h4>
                            <p class="text-gray-400">Lernen Sie von zertifizierten Schwarzgurt-Lehrern mit jahrelanger
                                Wettkampferfahrung.</p>
                        </div>

                        <div class="text-center scroll-animate fade-in-up delay-400">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">👥</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Unterstützende Gemeinschaft</h4>
                            <p class="text-gray-400">Schließen Sie sich einer einladenden Gemeinschaft von
                                Praktizierenden an, die sich
                                gegenseitig beim Wachstum unterstützen.</p>
                        </div>

                        <div class="text-center scroll-animate fade-in-up delay-600">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">🏆</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Bewährte Ergebnisse</h4>
                            <p class="text-gray-400">Unsere Schüler nehmen regelmäßig an Wettkämpfen teil und sind
                                erfolgreich auf lokaler und
                                internationaler Ebene.</p>
                        </div>
                    </div>
                </div>

                <div id="trainingsplan">
                    <TrainingSchedule/>
                </div>
                <div id="team">
                    <TeamSection/>
                </div>
                <div id="kontakt">
                    <ContactSection/>
                </div>

                <div class="mt-20 scroll-animate scale-in hidden">
                    <div class="flex justify-center">
                        <iframe width="560" height="315"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=nqUoKY12orvuIuaI"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-950 text-white py-12 scroll-animate fade-in-up">
        <div class="container mx-auto px-6 text-center">
            <h3 class="text-2xl font-bold mb-4">Evolve Grappling</h3>
            <div class="flex justify-center space-x-6 text-gray-400">
                <a href="#" class="hover:text-white transition-colors">Impressum</a>
                <a href="#" class="hover:text-white transition-colors">Datenschutz</a>
            </div>
        </div>
    </footer>
</div>

<style>
    /* Prevent any horizontal scroll caused by transforms, scrollbars, or blur effects */
    :global(html), :global(body) {
        overflow-x: hidden;
        width: 100%;
    }
</style>