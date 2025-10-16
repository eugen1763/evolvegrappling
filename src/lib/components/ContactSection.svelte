<script>
  import {onMount} from "svelte";

  onMount(() => {
      const FRAME_ORIGIN = 'https://evolve-grappling.omoplata.de';
      const iframe = document.getElementById('omoplata-trial');

      function isFromOurIframe(event) {
          return event.source === iframe.contentWindow;
      }

      let rAF = null;
      function setIframeHeight(nextHeight) {
          if (rAF) cancelAnimationFrame(rAF);
          rAF = requestAnimationFrame(() => {
              iframe.style.height = Math.max(0, Number(nextHeight) || 0) + 'px';
          });
      }

      window.addEventListener('message', (event) => {
          if (event.origin !== FRAME_ORIGIN) return;
          if (!isFromOurIframe(event)) return;

          const data = event.data;
          if (Array.isArray(data) && data[0] === 'setHeight') {
              setIframeHeight(data[1]);
          }
      });

      function requestHeight() {
          iframe.contentWindow?.postMessage(['requestHeight'], FRAME_ORIGIN);
      }

      iframe.addEventListener('load', () => {
          requestHeight();
          setTimeout(requestHeight, 250);
          setTimeout(requestHeight, 1000);
      });

      window.addEventListener('resize', requestHeight);
  })
</script>

<div class="mt-20 scroll-animate fade-in-up">
  <h3 class="text-3xl font-bold text-white mb-12 text-center">Kontakt und Probetraining</h3>
  <div class="bg-gray-800 rounded-lg px-12 pb-8 mb-12">
    <iframe id="omoplata-trial"
            loading="lazy"
            src="https://evolve-grappling.omoplata.de/widgets/trial"
            style="width:100%; border:0; display:block; height:0;"
            title="Omoplata"
    ></iframe>
  </div>
  <div class="grid md:grid-cols-3 gap-8">
    <div class="text-center scroll-animate slide-in-left delay-200">
      <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-2xl">📞</span>
      </div>
      <h4 class="text-xl font-semibold text-white mb-2">Whatsapp</h4>
      <p class="text-gray-400">+49 1573 5412788</p>
    </div>

    <div class="text-center scroll-animate fade-in-up delay-400">
      <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-2xl">✉️</span>
      </div>
      <h4 class="text-xl font-semibold text-white mb-2">Email</h4>
      <a href="mailto:info@evolvegrappling.de"
         class="text-gray-400 underline"
      >info@evolvegrappling.de</a>
    </div>

    <div class="text-center scroll-animate slide-in-right delay-600">
      <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-2xl">📱</span>
      </div>
      <h4 class="text-xl font-semibold text-white mb-2">Instagram</h4>
      <a href="https://www.instagram.com/evolve_grappling/"
         class="text-gray-400 underline"
         target="_blank"
      >@evolve_grappling</a>
    </div>
  </div>
</div>
