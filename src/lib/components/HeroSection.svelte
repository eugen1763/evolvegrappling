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
<section class="relative h-screen overflow-hidden">
    <!-- Background Image with Parallax Effect -->
    <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style="background-image: url('IMG_1268.JPEG'); transform: translateY({scrollY * 0.5}px);"
    ></div>

    <!-- Overlay that appears on scroll -->
    <div
        class="absolute inset-0 bg-gray-900 backdrop-blur-sm transition-opacity duration-300"
        style="opacity: {overlayOpacity};"
    ></div>

    <!-- Hero Content -->
    <div class="relative z-10 flex items-center justify-center h-full">
        <img
            src="logo.png"
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
