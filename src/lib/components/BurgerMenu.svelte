
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
        // Check if we're on the homepage
        const currentPath = window.location.pathname;
        
        if (currentPath === '/') {
            // We're on homepage, scroll directly to section
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            // We're on another page, navigate to homepage with anchor
            goto(`/#${sectionId}`);
        }
        closeMenu();
    }

    // Close menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as Element;
        const menu = document.querySelector('.burger-menu');
        const button = document.querySelector('.burger-button');
        
        if (menu && button && !menu.contains(target) && !button.contains(target)) {
            closeMenu();
        }
    }

    // Close menu on escape key
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    }
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<!-- Burger Menu Button -->
<button 
    class="burger-button fixed top-6 right-6 z-50 text-white p-3 rounded-lg transition-all duration-300"
    onclick={toggleMenu}
    aria-label="Toggle navigation menu"
>
    <div class="burger-icon w-6 h-6 flex flex-col justify-center items-center space-y-1">
        <span class="block w-6 h-0.5 bg-white transition-all duration-300 {isOpen ? 'rotate-45 translate-y-2' : ''}"></span>
        <span class="block w-6 h-0.5 bg-white transition-all duration-300 {isOpen ? 'opacity-0' : ''}"></span>
        <span class="block w-6 h-0.5 bg-white transition-all duration-300 {isOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
    </div>
</button>

<!-- Menu Overlay -->
{#if isOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"></div>
{/if}

<!-- Slide-out Menu -->
<nav class="burger-menu fixed top-0 right-0 h-full w-80 bg-gray-800 shadow-2xl transform transition-transform duration-300 z-40 {isOpen ? 'translate-x-0' : 'translate-x-full'}">
    <div class="pt-20 px-6">
        <ul class="space-y-6">
            <li>
                <button 
                    onclick={() => scrollToSection('hero')}
                    class="block w-full text-left text-white hover:text-blue-400 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                    🏠 Home
                </button>
            </li>
            <li>
                <button 
                    onclick={() => scrollToSection('trainingsplan')}
                    class="block w-full text-left text-white hover:text-blue-400 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                    📅 Trainingsplan
                </button>
            </li>
            <li>
                <button 
                    onclick={() => scrollToSection('team')}
                    class="block w-full text-left text-white hover:text-blue-400 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                    👥 Team
                </button>
            </li>
            <li>
                <button 
                    onclick={() => scrollToSection('preise')}
                    class="block w-full text-left text-white hover:text-blue-400 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                    💰 Preise
                </button>
            </li>
            <li>
                <button 
                    onclick={() => scrollToSection('kontakt')}
                    class="block w-full text-left text-white hover:text-blue-400 text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                    📞 Kontakt
                </button>
            </li>
        </ul>
    </div>
</nav>

<style>
    .burger-icon span {
        transform-origin: center;
    }
</style>
