<script lang="ts">
    interface Props {
        scrollY: number;
        innerHeight: number;
    }

    let { scrollY, innerHeight }: Props = $props();

    // Calculate opacity for the overlay based on scroll position
    let overlayOpacity = $derived(Math.min(scrollY / (innerHeight * 0.5), 0.8));

    // Calculate scale for the title based on scroll position
    let titleScale = $derived(Math.max(1 - scrollY / (innerHeight * 2), 0.6));

    // Calculate title position offset
    let titleOffset = $derived(scrollY * 0.3);
</script>

<!-- Hero Section with Background Image -->
<section class="relative min-h-dvh overflow-hidden">
    <!-- Background Image with Parallax Effect -->
    <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style="background-image: url('main_bg.jpg'); transform: translateY({scrollY * 0.5}px);"
    ></div>

    <!-- Overlay that appears on scroll -->
    <div
        class="absolute inset-0 backdrop-blur-sm transition-opacity duration-300"
        style="background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(10,10,15,0.2), rgba(10,10,15,0.85)); opacity: {overlayOpacity};"
    ></div>

    <!-- Hero Content -->
    <div class="relative z-10 flex items-center justify-center h-full min-h-dvh">
        <img
            src="logo.svg"
            alt="Evolve Grappling Logo"
            class="transition-all duration-300 ease-out max-w-xs md:max-w-md lg:max-w-lg animate-hero-logo will-change-transform"
            style="
                transform: translateY({-titleOffset}px) scale({titleScale});
                filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5));
            "
        />
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
            <div class="w-1.5 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
        </div>
    </div>
</section>

<style>
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
</style>
