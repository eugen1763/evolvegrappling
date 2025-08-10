<script lang="ts">
    import {onMount} from 'svelte';

    let scrollY = $state(0);
    let innerHeight = $state(0);

    const trainingSchedule = {
        Monday: [
            {time: "6:00 AM", class: "Fundamentals"},
            {time: "12:00 PM", class: "Open Mat"},
            {time: "6:00 PM", class: "Advanced"},
            {time: "7:30 PM", class: "No-Gi"}
        ],
        Tuesday: [
            {time: "6:00 AM", class: "No-Gi"},
            {time: "12:00 PM", class: "Advanced"},
            {time: "6:00 PM", class: "Fundamentals"},
            {time: "7:30 PM", class: "Competition"}
        ],
        Wednesday: [
            {time: "6:00 AM", class: "Fundamentals"},
            {time: "12:00 PM", class: "Open Mat"},
            {time: "6:00 PM", class: "Advanced"},
            {time: "7:30 PM", class: "No-Gi"}
        ],
        Thursday: [
            {time: "6:00 AM", class: "No-Gi"},
            {time: "12:00 PM", class: "Advanced"},
            {time: "6:00 PM", class: "Fundamentals"},
            {time: "7:30 PM", class: "Competition"}
        ],
        Friday: [
            {time: "6:00 AM", class: "Fundamentals"},
            {time: "12:00 PM", class: "Open Mat"},
            {time: "6:00 PM", class: "Advanced"},
            {time: "7:30 PM", class: "No-Gi"}
        ],
        Saturday: [
            {time: "9:00 AM", class: "All Levels"},
            {time: "10:30 AM", class: "Open Mat"}
        ],
        Sunday: [
            {time: "10:00 AM", class: "Open Mat"}
        ]
    };

    onMount(() => {
        const updateScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener('scroll', updateScroll);
        updateScroll();

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        // Observe all elements with the scroll-animate class
        const animateElements = document.querySelectorAll('.scroll-animate');
        animateElements.forEach(el => observer.observe(el));

        return () => {
            window.removeEventListener('scroll', updateScroll);
            observer.disconnect();
        };
    });

    // Calculate opacity for the overlay based on scroll position
    let overlayOpacity = $derived(Math.min(scrollY / (innerHeight * 0.5), 0.8));

    // Calculate scale for the title based on scroll position
    let titleScale = $derived(Math.max(1 - scrollY / (innerHeight * 2), 0.6));

    // Calculate title position offset
    let titleOffset = $derived(scrollY * 0.3);
</script>

<svelte:window bind:scrollY bind:innerHeight/>

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
                    class="transition-all duration-300 ease-out max-w-xs md:max-w-md lg:max-w-lg animate-hero-logo"
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

                <div class="mt-20 mb-20 scroll-animate fade-in-up">
                    <h3 class="text-3xl font-bold text-white mb-12 text-center">Weekly Training Schedule</h3>
                    <!-- Mobile View -->
                    <div class="grid grid-cols-1 gap-4 md:hidden">
                        {#each Object.entries(trainingSchedule) as [day, schedule], i}
                            <div class="bg-gray-800 p-4 rounded-lg scroll-animate slide-in-left delay-{i * 100}">
                                <h4 class="text-xl font-semibold text-white mb-4">{day}</h4>
                                <div class="space-y-2 text-gray-300">
                                    {#each schedule as day}
                                        <p>{day.time} - {day.class}</p>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </div>
                    <!-- Desktop View -->
                    <div class="hidden md:block overflow-x-auto scroll-animate slide-in-up">
                        <table class="w-full text-gray-300">
                            <thead class="bg-gray-800">
                            <tr>
                                {#each Object.keys(trainingSchedule) as day}
                                    <th class="px-4 py-3 text-left">{day}</th>
                                {/each}
                            </tr>
                            </thead>
                            <tbody>
                            {#each Array(Math.max(...Object.values(trainingSchedule).map(s => s.length))) as _, i}
                                <tr class="border-b border-gray-700">
                                    {#each Object.values(trainingSchedule) as schedule}
                                        <td class="px-4 py-3">
                                            {#if schedule[i]}
                                                <div>{schedule[i].time}</div>
                                                <div class="text-gray-400">{schedule[i].class}</div>
                                            {/if}
                                        </td>
                                    {/each}
                                </tr>
                            {/each}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="mt-20 scroll-animate fade-in-up">
                    <h3 class="text-3xl font-bold text-white mb-12 text-center">Meet Our Team</h3>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="text-center scroll-animate scale-in delay-200">
                            <img src="https://placehold.co/200x200" alt="John Doe"
                                 class="rounded-full mx-auto mb-4 w-48 h-48 object-cover"/>
                            <h4 class="text-xl font-semibold text-white mb-2">John Doe</h4>
                            <p class="text-gray-400">Head Coach and Brazilian Jiu-Jitsu Black Belt with over 15 years of
                                experience in competition and teaching.</p>
                        </div>

                        <div class="text-center scroll-animate scale-in delay-400">
                            <img src="https://placehold.co/200x200" alt="Jane Smith"
                                 class="rounded-full mx-auto mb-4 w-48 h-48 object-cover"/>
                            <h4 class="text-xl font-semibold text-white mb-2">Jane Smith</h4>
                            <p class="text-gray-400">Competition Team Coach and Brown Belt specializing in modern
                                competition techniques and strategy.</p>
                        </div>

                        <div class="text-center scroll-animate scale-in delay-600">
                            <img src="https://placehold.co/200x200" alt="Mike Johnson"
                                 class="rounded-full mx-auto mb-4 w-48 h-48 object-cover"/>
                            <h4 class="text-xl font-semibold text-white mb-2">Mike Johnson</h4>
                            <p class="text-gray-400">Fundamentals Instructor and Purple Belt focused on helping
                                beginners build a strong technical foundation.</p>
                        </div>
                    </div>
                </div>

                <div class="mt-20 scroll-animate fade-in-up">
                    <h3 class="text-3xl font-bold text-white mb-12 text-center">Get in Touch</h3>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="text-center scroll-animate slide-in-left delay-200">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">📞</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Phone</h4>
                            <p class="text-gray-400">Call us at: (555) 123-4567</p>
                        </div>

                        <div class="text-center scroll-animate fade-in-up delay-400">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">✉️</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Email</h4>
                            <p class="text-gray-400">info@evolvegrappling.com</p>
                        </div>

                        <div class="text-center scroll-animate slide-in-right delay-600">
                            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl">📱</span>
                            </div>
                            <h4 class="text-xl font-semibold text-white mb-2">Instagram</h4>
                            <p class="text-gray-400">@evolvegrappling</p>
                        </div>
                    </div>
                </div>

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

    /* Hero logo animation */
    .animate-hero-logo {
        animation: heroFadeIn 1.2s ease-out forwards;
    }

    @keyframes heroFadeIn {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    /* Animation keyframes */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    /* Initial state for scroll animations */
    .scroll-animate {
        opacity: 0;
    }

    /* Animation classes that get triggered */
    .scroll-animate.animate-in.fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    .scroll-animate.animate-in.slide-in-left {
        animation: slideInLeft 0.8s ease-out forwards;
    }

    .scroll-animate.animate-in.slide-in-right {
        animation: slideInRight 0.8s ease-out forwards;
    }

    .scroll-animate.animate-in.slide-in-up {
        animation: slideInUp 0.8s ease-out forwards;
    }

    .scroll-animate.animate-in.scale-in {
        animation: scaleIn 0.8s ease-out forwards;
    }

    /* Delay classes */
    .delay-100.animate-in { animation-delay: 0.1s; }
    .delay-200.animate-in { animation-delay: 0.2s; }
    .delay-300.animate-in { animation-delay: 0.3s; }
    .delay-400.animate-in { animation-delay: 0.4s; }
    .delay-500.animate-in { animation-delay: 0.5s; }
    .delay-600.animate-in { animation-delay: 0.6s; }
    .delay-700.animate-in { animation-delay: 0.7s; }

    /* Media query to reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        .scroll-animate,
        .animate-hero-logo {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    }
</style>