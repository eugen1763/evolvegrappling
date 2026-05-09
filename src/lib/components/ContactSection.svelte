<script>
  import {onMount} from "svelte";
  import { scrollAnimate } from '$lib/utils/scroll_animations';

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

<div use:scrollAnimate class="mt-20 scroll-animate fade-in-up">
  <h3 class="text-3xl font-bold text-white mb-12 text-center text-wrap-balance">Kontakt und Probetraining</h3>
  <div class="bg-surface-800 rounded-2xl px-12 pb-8 mb-12">
    <iframe id="omoplata-trial"
            loading="lazy"
            src="https://evolve-grappling.omoplata.de/widgets/trial"
            style="width:100%; border:0; display:block; height:0;"
            title="Omoplata"
    ></iframe>
  </div>
  <div class="grid md:grid-cols-3 gap-8">
    <div use:scrollAnimate class="text-center scroll-animate slide-in-left delay-200 group">
      <div class="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-400 transition-colors duration-300">
        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </div>
      <h4 class="text-xl font-semibold text-white mb-2">WhatsApp</h4>
      <p class="text-gray-400">+49 1573 5412788</p>
    </div>

    <div use:scrollAnimate class="text-center scroll-animate fade-in-up delay-400 group">
      <div class="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-400 transition-colors duration-300">
        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <h4 class="text-xl font-semibold text-white mb-2">E-Mail</h4>
      <a href="mailto:info@evolvegrappling.de"
         class="text-gray-400 underline underline-offset-4 hover:text-white transition-colors duration-200"
      >info@evolvegrappling.de</a>
    </div>

    <div use:scrollAnimate class="text-center scroll-animate slide-in-right delay-600 group">
      <div class="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-400 transition-colors duration-300">
        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </div>
      <h4 class="text-xl font-semibold text-white mb-2">Instagram</h4>
      <a href="https://www.instagram.com/evolve_grappling/"
         class="text-gray-400 underline underline-offset-4 hover:text-white transition-colors duration-200"
         target="_blank"
      >@evolve_grappling</a>
    </div>
  </div>
</div>
