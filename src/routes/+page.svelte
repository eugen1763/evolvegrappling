<script lang="ts">
    import { onMount } from 'svelte';

    let scrollY = $state(0);
    let innerHeight = $state(0);
    let mounted = $state(false);

    onMount(() => {
        mounted = true;

        const updateScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener('scroll', updateScroll);
        updateScroll();

        return () => {
            window.removeEventListener('scroll', updateScroll);
        };
    });

    // Calculate opacity for the overlay based on scroll position
    let overlayOpacity = $derived(Math.min(scrollY / (innerHeight * 0.5), 0.8));

    // Calculate scale for the title based on scroll position
    let titleScale = $derived(Math.max(1 - scrollY / (innerHeight * 2), 0.6));

    // Calculate title position offset
    let titleOffset = $derived(scrollY * 0.3);
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="relative overflow-x-hidden">
    <!-- Hero Section with Background Image -->
    <section class="relative h-screen overflow-hidden">
        <!-- Background Image with Parallax Effect -->
        <div
                class="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style="background-image: url('wp1955341.jpg'); transform: translateY({scrollY * 0.5}px);"
        ></div>

        <!-- Overlay that appears on scroll -->
        <div
                class="absolute inset-0 bg-gray-900 backdrop-blur-sm transition-opacity duration-300"
                style="opacity: {overlayOpacity};"
        ></div>

        <!-- Hero Content -->
        <div class="relative z-10 flex items-center justify-center h-full">
            <img
                    src="logo_bad.jpg"
                    alt="Evolve Grappling Logo"
                    class="transition-all duration-300 ease-out max-w-xs md:max-w-md lg:max-w-lg"
                    style="
                    transform: translateY({-titleOffset}px) scale({titleScale});
                    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));
                "
            />
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div class="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
        </div>
    </section>

    <!-- Content Section -->
    <section class="relative z-20 bg-gray-900 min-h-screen">
        <div class="container mx-auto px-6 py-16">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-4xl font-bold text-white mb-8 text-center">
                    Master the Art of Brazilian Jiu-Jitsu
                </h2>

                <div class="grid md:grid-cols-2 gap-12 mb-16">
                    <div class="bg-gray-800 rounded-lg p-8">
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

                    <div class="bg-gray-800 rounded-lg p-8">
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

                <div class="text-center">
                    <h3 class="text-3xl font-bold text-white mb-6">Why Choose Evolve Grappling?</h3>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">🥋</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Expert Instruction</h4>
                            <p class="text-gray-400">Learn from certified black belt instructors with years of competition experience.</p>
                        </div>

                        <div class="text-center">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">👥</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Supportive Community</h4>
                            <p class="text-gray-400">Join a welcoming community of practitioners who support each other's growth.</p>
                        </div>

                        <div class="text-center">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">🏆</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Proven Results</h4>
                            <p class="text-gray-400">Our students regularly compete and succeed at local and international levels.</p>
                        </div>
                    </div>
                </div>

                <div class="mt-16 text-center">
                    <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300">
                        Start Your Journey Today
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-950 text-white py-12">
        <div class="container mx-auto px-6 text-center">
            <h3 class="text-2xl font-bold mb-4">Evolve Grappling</h3>
            <p class="text-gray-400 mb-6">Transform your body, mind, and spirit through the art of Brazilian Jiu-Jitsu.</p>
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