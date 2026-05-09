<script lang="ts">
  import { scrollAnimate } from '$lib/utils/scroll_animations';
</script>

<div use:scrollAnimate class="py-16 scroll-animate fade-in-up">
  <div class="text-center">
    <h2 class="text-4xl font-bold text-white mb-12 tracking-tight text-wrap-balance">
      Preise
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div class="bg-surface-800 rounded-2xl p-10 md:p-12 hover:ring-2 hover:ring-accent-500/30 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300">
        <div class="text-6xl font-bold text-white mb-6 tracking-tight tabular-nums">
          79,90 €
        </div>
        <p class="text-gray-300 text-lg leading-relaxed">
          monatlich kündbar, keine Anmeldegebühr, keine versteckten Kosten
        </p>
      </div>

      <div class="bg-surface-800 rounded-2xl p-10 md:p-12 hover:ring-2 hover:ring-accent-500/30 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300">
        <div class="text-5xl font-bold text-white mb-1 tracking-tight tabular-nums">
          39,90 €
        </div>
        <div class="italic text-gray-400 mb-4">nur Ringen</div>
        <p class="text-gray-300 text-lg leading-relaxed">
          monatlich kündbar, keine Anmeldegebühr, keine versteckten Kosten
        </p>
      </div>
    </div>
  </div>
</div>