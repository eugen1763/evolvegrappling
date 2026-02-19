<script lang="ts">
    import { scrollAnimate } from "$lib/utils/scroll_animations";
    // @ts-ignore
    import BurgerMenu from "$lib/components/BurgerMenu.svelte";
</script>

<div class="relative overflow-x-hidden">
  <!-- Burger Menu -->
  <BurgerMenu/>

  <!-- Main Content -->
  <section class="relative z-20 bg-gray-900 min-h-screen pt-20">
    <div class="container mx-auto px-6 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 use:scrollAnimate class="text-4xl font-bold text-white mb-8 text-center scroll-animate fade-in-up">
          Impressum
        </h1>
        
        <div use:scrollAnimate class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-200">
          <h2 class="text-2xl font-semibold text-white mb-6">Angaben gemäß § 5 TMG</h2>
          
          <div class="text-gray-300 space-y-4">
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">Evolve Grappling</h3>
              <p>
                Evolve Grappling Maximilian Galle und Marius Pichler GBR<br>
                Talblick 5a<br>
                42719 Solingen<br>
                Deutschland
              </p>
            </div>
            
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">Kontakt</h3>
              <p>
                Telefon: +49 (0) 1573 5412788<br>
                E-Mail: info@evolvegrappling.de
              </p>
            </div>
          </div>
        </div>

        <div use:scrollAnimate class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-600">
          <h2 class="text-2xl font-semibold text-white mb-6">Redaktionell verantwortlich</h2>
          <div class="text-gray-300">
            <p>
              Evolve Grappling Maximilian Galle und Marius Pichler GBR<br>
              Talblick 5a<br>
              42719 Solingen<br>
              Deutschland
            </p>
          </div>
        </div>

        <div use:scrollAnimate class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-800">
          <h2 class="text-2xl font-semibold text-white mb-6">EU-Streitschlichtung</h2>
          <div class="text-gray-300">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" class="text-blue-400 hover:text-blue-300 underline">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p class="mt-4">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </div>
        </div>

        <div use:scrollAnimate class="bg-gray-800 rounded-lg p-8 mb-8 scroll-animate fade-in-up delay-1000">
          <h2 class="text-2xl font-semibold text-white mb-6">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <div class="text-gray-300">
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherstreitschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>

        <div use:scrollAnimate class="bg-gray-800 rounded-lg p-8 scroll-animate fade-in-up delay-1200">
          <h2 class="text-2xl font-semibold text-white mb-6">Haftung für Inhalte</h2>
          <div class="text-gray-300 space-y-4">
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
              unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der 
              Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen 
              werden wir diese Inhalte umgehend entfernen.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer use:scrollAnimate class="bg-gray-950 text-white py-12 scroll-animate fade-in-up">
    <div class="container mx-auto px-6 text-center">
      <h3 class="text-2xl font-bold mb-4">Evolve Grappling</h3>
      <div class="flex justify-center items-center space-x-6 text-gray-400">
        <div class="flex flex-col items-start space-x-6">
          <a href="/" class="hover:text-white transition-colors underline">Startseite</a>
          <a href="/datenschutz" class="hover:text-white transition-colors underline">Datenschutz</a>
        </div>
        <div class="h-8 w-px bg-gray-600"></div>
        <div class="text-left">
          <p class="text-sm">
            Talblick 5a<br>
            42719 Solingen
          </p>
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