<script>
  import { page } from '$app/stores';
  import BurgerMenu from '$lib/components/BurgerMenu.svelte';
</script>

<svelte:head>
  <title>Seite nicht gefunden — Evolve Grappling</title>
</svelte:head>

<div class="relative">
  <BurgerMenu/>

  <main id="main-content" class="relative z-20 bg-surface-900 min-h-dvh flex items-center">
    <div class="container mx-auto px-6 py-24 text-center">
      <div class="max-w-lg mx-auto">
        <p class="text-accent-400 text-sm font-medium tracking-wider uppercase mb-4">Fehler {$page.status}</p>
        <h1 class="text-5xl font-bold text-white mb-4 tracking-tight">
          {#if $page.status === 404}
            Seite nicht gefunden
          {:else}
            Ein Fehler ist aufgetreten
          {/if}
        </h1>
        <p class="text-gray-400 mb-10 leading-relaxed">
          {#if $page.status === 404}
            Die angeforderte Seite existiert nicht. Sie wurde möglicherweise verschoben oder gelöscht.
          {:else}
            Entschuldigung, etwas ist schiefgelaufen. Bitte versuche es später erneut.
          {/if}
        </p>
        <a href="/"
           class="inline-flex items-center gap-2 px-8 py-3 bg-accent-500 hover:bg-accent-400 active:scale-95 text-white font-medium rounded-xl transition-all duration-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Zurück zur Startseite
        </a>
      </div>
    </div>
  </main>

  <footer class="bg-surface-950 text-white pt-16 pb-20">
    <div class="container mx-auto px-6 text-center">
      <h3 class="text-2xl font-bold mb-4 tracking-tight">Evolve Grappling</h3>
      <div class="flex justify-center items-center gap-6 text-gray-400">
        <div class="flex flex-col items-start gap-1">
          <a href="/impressum" class="hover:text-white transition-colors duration-200 underline underline-offset-4">Impressum</a>
          <a href="/datenschutz" class="hover:text-white transition-colors duration-200 underline underline-offset-4">Datenschutz</a>
        </div>
        <div class="h-8 w-px bg-surface-600"></div>
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
