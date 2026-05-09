
<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    let isOpen = $state(false);

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function closeMenu() {
        isOpen = false;
    }

    function scrollToSection(sectionId: string) {
        const currentPath = window.location.pathname;
        
        if (currentPath === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            goto(`/#${sectionId}`);
        }
        closeMenu();
    }

    function handleClickOutside(event: MouseEvent) {
        const target = event.target as Element;
        const menu = document.querySelector('.burger-menu');
        const button = document.querySelector('.burger-button');
        
        if (menu && button && !menu.contains(target) && !button.contains(target)) {
            closeMenu();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    }

    const navItems = [
        { id: 'hero', label: 'Home', icon: 'home' },
        { id: 'trainingsplan', label: 'Trainingsplan', icon: 'calendar' },
        { id: 'team', label: 'Team', icon: 'users' },
        { id: 'preise', label: 'Preise', icon: 'euro' },
        { id: 'kontakt', label: 'Kontakt', icon: 'message' },
    ];
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<!-- Burger Menu Button -->
<button 
    class="burger-button fixed top-6 right-6 z-50 text-white p-3 rounded-xl bg-surface-800/80 backdrop-blur-sm hover:bg-surface-700/80 active:scale-95 transition-all duration-200"
    onclick={toggleMenu}
    aria-label="Toggle navigation menu"
>
    <div class="burger-icon w-6 h-6 flex flex-col justify-center items-center gap-1.5">
        <span class="block w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center {isOpen ? 'rotate-45 translate-y-2' : ''}"></span>
        <span class="block w-6 h-0.5 bg-white rounded-full transition-all duration-300 {isOpen ? 'opacity-0' : ''}"></span>
        <span class="block w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center {isOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
    </div>
</button>

<!-- Menu Overlay -->
{#if isOpen}
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"></div>
{/if}

<!-- Slide-out Menu -->
<nav class="burger-menu fixed top-0 right-0 h-full w-80 bg-surface-800 shadow-2xl transition-transform duration-300 ease-out z-40 {isOpen ? 'translate-x-0' : 'translate-x-full'}">
    <div class="pt-24 px-6">
        <ul class="space-y-2">
            {#each navItems as item}
                <li>
                    <button 
                        onclick={() => scrollToSection(item.id)}
                        class="flex items-center gap-3 w-full text-left text-gray-200 hover:text-white text-lg font-medium py-3 px-4 rounded-xl hover:bg-surface-700 active:scale-[0.98] transition-all duration-200"
                    >
                        <svg class="w-5 h-5 text-accent-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            {#if item.icon === 'home'}
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                            {:else if item.icon === 'calendar'}
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                            {:else if item.icon === 'users'}
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            {:else if item.icon === 'euro'}
                                <path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.35 7.35 0 0 1 0 12"/>
                            {:else if item.icon === 'message'}
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            {/if}
                        </svg>
                        {item.label}
                    </button>
                </li>
            {/each}
        </ul>
    </div>
</nav>

<style>
    .burger-icon span {
        transform-origin: center;
    }
</style>
