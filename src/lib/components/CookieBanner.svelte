<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let visible = $state(false);
    let dismissed = $state(false);

    onMount(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            visible = true;
        }
    });

    function accept() {
        localStorage.setItem('cookie-consent', 'all');
        dismiss();
    }

    function essentialOnly() {
        localStorage.setItem('cookie-consent', 'essential');
        dismiss();
    }

    function dismiss() {
        visible = false;
        setTimeout(() => {
            dismissed = true;
        }, 300);
    }
</script>

{#if !dismissed}
    <div
        class="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 transition-all duration-500 ease-out"
        class:translate-y-full={!visible}
        class:opacity-0={!visible}
        class:translate-y-0={visible}
        class:opacity-100={visible}
    >
        <div class="mx-auto max-w-3xl">
            <div class="bg-surface-800/95 backdrop-blur-xl border border-surface-600/50 rounded-2xl p-5 md:p-6 shadow-[0_-8px_32px_rgba(0,0,0,0.3)]">
                <div class="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-300 leading-relaxed">
                            Diese Website verwendet Cookies und externe Dienste wie Google Maps, um die
                            Funktionalität zu gewährleisten und Ihr Nutzungserlebnis zu verbessern. Weitere
                            Informationen finden Sie in unserer
                            <a href="/datenschutz" class="text-accent-400 hover:text-accent-400/80 underline underline-offset-4 transition-colors duration-200">Datenschutzerklärung</a>.
                        </p>
                    </div>
                    <div class="flex items-center gap-3 shrink-0">
                        <button
                            onclick={essentialOnly}
                            class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-surface-600 hover:border-surface-500 rounded-xl transition-all duration-200 active:scale-95"
                        >
                            Nur notwendige
                        </button>
                        <button
                            onclick={accept}
                            class="px-5 py-2 text-sm font-medium text-white bg-accent-500 hover:bg-accent-400 rounded-xl transition-all duration-200 active:scale-95"
                        >
                            Alle akzeptieren
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
