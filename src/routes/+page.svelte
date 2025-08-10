<script lang="ts">
    import { onMount } from 'svelte';
    import {initScrollAnimations} from "$lib/utils/scroll_animations";
    // @ts-ignore
    import HeroSection from "$lib/components/HeroSection.svelte";
    // @ts-ignore
    import TrainingSchedule from "$lib/components/TrainingSchedule.svelte";
    // @ts-ignore
    import TeamSection from "$lib/components/TeamSection.svelte";
    // @ts-ignore
    import ContactSection from "$lib/components/ContactSection.svelte";

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
    <HeroSection {scrollY} {innerHeight} />

    <!-- Content Section -->
    <section class="relative z-20 bg-gray-900 min-h-screen">
        <div class="container mx-auto px-6 py-16">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-4xl font-bold text-white mb-8 text-center scroll-animate fade-in-up">
                    Master the Art of Brazilian Jiu-Jitsu
                </h2>

                <div class="grid md:grid-cols-2 gap-12 mb-16">
                    <div class="bg-gray-800 rounded-lg p-8 scroll-animate slide-in-left">
                        <h3 class="text-2xl font-semibold text-white mb-4">For Beginners</h3>
                        <p class="text-gray-300 mb-6">
                            Start your journey with our fundamentals program. Learn the basics of Brazilian Jiu-Jitsu
                            in a safe, supportive environment designed for complete beginners.
                        </p>
                        <ul class="text-gray-400 space-y-2">
                            <li>• Basic positions and movements</li>
                            <li>• Self-defense techniques</li>
                            <li>• BJJ philosophy and etiquette</li>
                            <li>• Gradual skill progression</li>
                        </ul>
                    </div>

                    <div class="bg-gray-800 rounded-lg p-8 scroll-animate slide-in-right">
                        <h3 class="text-2xl font-semibold text-white mb-4">Advanced Training</h3>
                        <p class="text-gray-300 mb-6">
                            Take your skills to the next level with advanced techniques, competition preparation,
                            and specialized training programs for experienced practitioners.
                        </p>
                        <ul class="text-gray-400 space-y-2">
                            <li>• Competition preparation</li>
                            <li>• Advanced guard systems</li>
                            <li>• Submission chains</li>
                            <li>• Wrestling integration</li>
                        </ul>
                    </div>
                </div>

                <div class="text-center scroll-animate fade-in-up">
                    <h3 class="text-3xl font-bold text-white mb-6">Why Choose Evolve Grappling?</h3>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="text-center scroll-animate fade-in-up delay-200">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">🥋</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Expert Instruction</h4>
                            <p class="text-gray-400">Learn from certified black belt instructors with years of
                                competition experience.</p>
                        </div>

                        <div class="text-center scroll-animate fade-in-up delay-400">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">👥</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Supportive Community</h4>
                            <p class="text-gray-400">Join a welcoming community of practitioners who support each
                                other's growth.</p>
                        </div>

                        <div class="text-center scroll-animate fade-in-up delay-600">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">🏆</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Proven Results</h4>
                            <p class="text-gray-400">Our students regularly compete and succeed at local and
                                international levels.</p>
                        </div>
                    </div>
                </div>

                <TrainingSchedule />
                <TeamSection />
                <ContactSection />

                <div class="mt-20 scroll-animate scale-in">
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
            <p class="text-gray-400 mb-6">Transform your body, mind, and spirit through the art of Brazilian
                Jiu-Jitsu.</p>
            <div class="flex justify-center space-x-6 text-gray-400">
                <a href="#" class="hover:text-white transition-colors">About</a>
                <a href="#" class="hover:text-white transition-colors">Classes</a>
                <a href="#" class="hover:text-white transition-colors">Schedule</a>
                <a href="#" class="hover:text-white transition-colors">Contact</a>
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