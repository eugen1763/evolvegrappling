<script lang="ts">
  import {onDestroy, onMount} from 'svelte';
  import {initScrollAnimations} from "$lib/utils/scroll_animations";
  import HeroSection from "$lib/components/HeroSection.svelte";
  import TeamSection from "$lib/components/TeamSection.svelte";
  import ContactSection from "$lib/components/ContactSection.svelte";
  import PriceSection from "$lib/components/PriceSection.svelte";
  import BurgerMenu from "$lib/components/BurgerMenu.svelte";
  import TrainingSchedule from "$lib/components/TrainingSchedule.svelte";

  let scrollY = $state(0);
  let innerHeight = $state(0);
  let cleanup: () => void;

  onMount(() => {
    const updateScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', updateScroll);
    updateScroll();

    cleanup = initScrollAnimations();

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  });

  onDestroy(() => {
    if (cleanup) {
      cleanup();
    }
  })
</script>

<svelte:window bind:scrollY
               bind:innerHeight
/>

<div class="relative overflow-x-hidden">
  <!-- Burger Menu -->
  <BurgerMenu/>

  <div id="hero">
    <HeroSection {scrollY}
                 {innerHeight}
    />
  </div>

  <!-- Main Content -->
  <main class="relative z-20 bg-gray-900 min-h-screen">
    <div class="container mx-auto px-6 py-16">
      <article class="max-w-5xl mx-auto">
        <h1 class="text-4xl font-bold text-white mb-8 text-center scroll-animate fade-in-up">
          Evolve Grappling </h1>

        <div class="text-gray-300 text-center mb-12 scroll-animate fade-in-up delay-200">
          Wir bei Evolve Grappling haben uns voll auf den Kampfsport Brazilian Jiu-Jitsu (BJJ) im Gi und No-Gi sowie auf
          Ringen für Grappling spezialisiert. Wir arbeiten an den Zielen und am Potenzial jedes Einzelnen als starkes
          Team zusammen, ob Wettkämpfer oder Hobbyist, Anfänger oder fortgeschrittener Grappler.
        </div>

        <h2 class="text-2xl font-bold text-white mb-8 text-center scroll-animate fade-in-up">
          Warum solltest du Evolve Grappling in Solingen wählen? </h2>

        <!-- Navigation to sections -->
        <nav class="hidden text-center mb-12 scroll-animate fade-in-up delay-100">
          <div class="flex flex-wrap justify-center gap-4 text-blue-400">
            <a href="#trainingsplan"
               class="hover:text-blue-300 underline"
            >Trainingsplan</a>
            <span class="text-gray-500">•</span>
            <a href="#team"
               class="hover:text-blue-300 underline"
            >Unser Team</a>
            <span class="text-gray-500">•</span>
            <a href="#preise"
               class="hover:text-blue-300 underline"
            >Preise</a>
            <span class="text-gray-500">•</span>
            <a href="#kontakt"
               class="hover:text-blue-300 underline"
            >Kontakt</a>
          </div>
        </nav>

        <div class="grid md:grid-cols-3 gap-12 mb-16">
          <div class="bg-gray-800 rounded-lg p-8 scroll-animate slide-in-left">
            <h3 class="text-2xl font-semibold text-white mb-4">Trainerteam</h3>
            <p class="text-gray-300">
              Unsere Trainer verfügen über langjährige Erfahrung im BJJ, Grappling und Ringen.
              Sie blicken auf viele Jahre erfolgreicher Trainertätigkeit zurück und bilden
              sich kontinuierlich fort, um ihr Wissen und ihre Methoden stets auf dem neuesten Stand zu halten. </p>
          </div>

          <div class="bg-gray-800 rounded-lg p-8 scroll-animate slide-in-right">
            <h3 class="text-2xl font-semibold text-white mb-4">Team / Community</h3>
            <p class="text-gray-300">
              Wir sind ein buntgemischtes Team
              aus verschiedenen Altersgruppen
              (ab 16 Jahren) und Kulturen. Bei
              uns ist jeder willkommen, um
              zusammen zu lernen und zu
              wachsen. </p>
          </div>

          <div class="bg-gray-800 rounded-lg p-8 scroll-animate slide-in-right">
            <h3 class="text-2xl font-semibold text-white mb-4">Trainingsaufbau</h3>
            <p class="text-gray-300">
              Evolve Grappling bietet an sieben Tagen in der Woche die Möglichkeit zu trainieren.
              Neben unseren Gruppentrainingseinheiten können gemeinsam Instructionals
              studiert werden sowie freies Training und Open Mats stattfinden. </p>
          </div>
        </div>

        <div id="trainingsplan">
          <TrainingSchedule/>
        </div>
        <div id="team">
          <TeamSection/>
        </div>
        <div id="preise">
          <PriceSection/>
        </div>
        <div id="kontakt">
          <ContactSection/>
        </div>

        <div class="mt-20 scroll-animate scale-in hidden">
          <div class="flex justify-center">
            <iframe width="560"
                    height="315"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=nqUoKY12orvuIuaI"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
            ></iframe>
          </div>
        </div>
      </article>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-gray-950 text-white py-12 scroll-animate fade-in-up">
    <div class="container mx-auto px-6 text-center">
      <h3 class="text-2xl font-bold mb-4">Evolve Grappling</h3>
      <div class="flex justify-center items-center space-x-6 text-gray-400">
        <div class="flex flex-col items-start space-x-6">
          <a href="/impressum"
             class="hover:text-white transition-colors underline"
          >Impressum</a>
          <a href="/datenschutz"
             class="hover:text-white transition-colors underline"
          >Datenschutz</a>
          <a href="/links"
             class="hover:text-white transition-colors underline"
          >Links</a>
        </div>
        <div class="h-8 w-px bg-gray-600"></div>
        <div class="text-left">
          <p class="text-sm">
            Talblick 5a<br>
            42719 Solingen </p>
        </div>
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