<script lang="ts">
  import { scrollAnimate } from '$lib/utils/scroll_animations';
</script>

<div use:scrollAnimate class="py-16 scroll-animate fade-in-up">
  <div class="text-center">
    <h2 class="text-4xl font-bold text-white mb-12">
      Preise
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div class="bg-gray-800 rounded-lg p-12">
        <div class="text-6xl font-bold text-white mb-6">
          79.90€
        </div>
        <p class="text-gray-300 text-lg">
          monatlich kündbar, keine Anmeldegebühr, keine versteckten Kosten
        </p>
      </div>

      <div class="bg-gray-800 rounded-lg p-12">
        <div class="text-6xl font-bold text-white mb-1">
          39.90€
        </div>
        <div class="italic text-white mb-4">(nur Ringen)</div>
        <p class="text-gray-300 text-lg">
          monatlich kündbar, keine Anmeldegebühr, keine versteckten Kosten<br>
        </p>
      </div>
    </div>
  </div>
</div>