<script lang="ts">
  import {onMount} from 'svelte';
  import {scrollAnimate} from "$lib/utils/scroll_animations";
  import HeroSection from "$lib/components/HeroSection.svelte";
  import TeamSection from "$lib/components/TeamSection.svelte";
  import ContactSection from "$lib/components/ContactSection.svelte";
  import PriceSection from "$lib/components/PriceSection.svelte";
  import BurgerMenu from "$lib/components/BurgerMenu.svelte";
  import TrainingSchedule from "$lib/components/TrainingSchedule.svelte";

  let scrollY = $state(0);
  let innerHeight = $state(0);

  onMount(() => {
    const updateScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  });
</script>

<svelte:window bind:scrollY
               bind:innerHeight
/>

<div class="relative">
  <!-- Burger Menu -->
  <BurgerMenu/>

  <div id="hero">
    <HeroSection {scrollY}
                 {innerHeight}
    />
  </div>

  <!-- Main Content -->
  <main id="main-content" class="relative z-20 bg-surface-900">
    <div class="container mx-auto px-6 py-24">
      <article class="max-w-5xl mx-auto">
        <h1 use:scrollAnimate class="text-4xl font-bold text-white mb-8 text-center scroll-animate fade-in-up tracking-tight text-wrap-balance">
          Evolve Grappling </h1>

        <div use:scrollAnimate class="text-gray-300 text-center mb-10 max-w-2xl mx-auto scroll-animate fade-in-up delay-200 leading-relaxed text-wrap-balance">
          Wir bei Evolve Grappling haben uns voll auf den Kampfsport Brazilian Jiu-Jitsu (BJJ) im Gi und No-Gi sowie auf
          Ringen für Grappling spezialisiert. Wir arbeiten an den Zielen und am Potenzial jedes Einzelnen als starkes
          Team zusammen, ob Wettkämpfer oder Hobbyist, Anfänger oder fortgeschrittener Grappler.
        </div>

        <div use:scrollAnimate class="text-center mb-16 scroll-animate fade-in-up delay-300">
          <a href="#kontakt" class="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-500 hover:bg-accent-400 active:scale-95 text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(85,112,240,0.25)]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
            Kostenloses Probetraining vereinbaren
          </a>
        </div>

        <h2 use:scrollAnimate class="text-2xl font-semibold text-white mb-10 text-center scroll-animate fade-in-up text-wrap-balance">
          Warum solltest du Evolve Grappling in Solingen wählen? </h2>

        <!-- Navigation to sections -->
        <nav use:scrollAnimate class="text-center mb-16 scroll-animate fade-in-up delay-100">
          <div class="flex flex-wrap justify-center gap-4 text-accent-400">
            <a href="#trainingsplan"
               class="hover:text-accent-400/80 underline underline-offset-4 transition-colors duration-200"
            >Trainingsplan</a>
            <span class="text-surface-600">•</span>
            <a href="#team"
               class="hover:text-accent-400/80 underline underline-offset-4 transition-colors duration-200"
            >Unser Team</a>
            <span class="text-surface-600">•</span>
            <a href="#preise"
               class="hover:text-accent-400/80 underline underline-offset-4 transition-colors duration-200"
            >Preise</a>
            <span class="text-surface-600">•</span>
            <a href="#kontakt"
               class="hover:text-accent-400/80 underline underline-offset-4 transition-colors duration-200"
            >Kontakt</a>
          </div>
        </nav>

        <div class="mb-24">
          <div use:scrollAnimate class="bg-surface-800 rounded-2xl p-8 md:p-12 scroll-animate slide-in-left">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-accent-500/20 rounded-xl flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-white">Trainerteam</h3>
            </div>
            <p class="text-gray-300 max-w-3xl">
              Unsere Trainer verfügen über langjährige Erfahrung im BJJ, Grappling und Ringen.
              Sie blicken auf viele Jahre erfolgreicher Trainertätigkeit zurück und bilden
              sich kontinuierlich fort, um ihr Wissen und ihre Methoden stets auf dem neuesten Stand zu halten. </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mt-6">
            <div use:scrollAnimate class="bg-surface-800 rounded-2xl p-8 scroll-animate slide-in-left delay-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-9 h-9 bg-accent-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg class="w-4.5 h-4.5 text-accent-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white">Team / Community</h3>
              </div>
              <p class="text-gray-300">
                Wir sind ein buntgemischtes Team
                aus verschiedenen Altersgruppen
                (ab 16 Jahren) und Kulturen. Bei
                uns ist jeder willkommen, um
                zusammen zu lernen und zu
                wachsen. </p>
            </div>

            <div use:scrollAnimate class="bg-surface-800 rounded-2xl p-8 scroll-animate slide-in-right delay-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-9 h-9 bg-accent-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg class="w-4.5 h-4.5 text-accent-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white">Trainingsaufbau</h3>
              </div>
              <p class="text-gray-300">
                Evolve Grappling bietet an sieben Tagen in der Woche die Möglichkeit zu trainieren.
                Neben unseren Gruppentrainingseinheiten können gemeinsam Instructionals
                studiert werden sowie freies Training und Open Mats stattfinden. </p>
            </div>
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
      </article>
    </div>
  </main>

  <!-- Footer -->
  <footer use:scrollAnimate class="bg-surface-950 text-white pt-16 pb-20 scroll-animate fade-in-up">
    <div class="container mx-auto px-6 text-center">
      <h3 class="text-2xl font-bold mb-4 tracking-tight">Evolve Grappling</h3>
      <div class="flex justify-center items-center gap-6 text-gray-400">
        <div class="flex flex-col items-start gap-1">
          <a href="/impressum"
             class="hover:text-white transition-colors duration-200 underline underline-offset-4"
          >Impressum</a>
          <a href="/datenschutz"
             class="hover:text-white transition-colors duration-200 underline underline-offset-4"
          >Datenschutz</a>
          <a href="/links"
             class="hover:text-white transition-colors duration-200 underline underline-offset-4"
          >Links</a>
        </div>
        <div class="h-8 w-px bg-surface-600"></div>
        <div class="text-left">
          <p class="text-sm">
            Talblick 5a<br>
            42719 Solingen </p>
        </div>
      </div>
    </div>
  </footer>
</div>