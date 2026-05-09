<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';

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
			goto(`/?g=${sectionId}`);
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
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<button
	class="burger-button fixed top-6 right-6 z-50 rounded-sm p-2.5 text-white transition-all duration-300 hover:bg-brand-800 active:scale-95"
	onclick={toggleMenu}
	aria-label="Toggle navigation menu"
>
	<div class="flex h-6 w-6 flex-col items-center justify-center gap-1.5">
		<span class="block h-px w-6 bg-white transition-all duration-300 {isOpen ? 'rotate-45 translate-y-1' : ''}"></span>
		<span class="block h-px w-6 bg-white transition-all duration-300 {isOpen ? 'opacity-0' : ''}"></span>
		<span class="block h-px w-6 bg-white transition-all duration-300 {isOpen ? '-rotate-45 -translate-y-1' : ''}"></span>
	</div>
</button>

{#if isOpen}
	<div class="fixed inset-0 z-40 bg-charcoal/80 backdrop-blur-sm transition-opacity duration-300"></div>
{/if}

<nav class="burger-menu fixed top-0 right-0 z-40 h-full w-72 border-l border-brand-800 bg-brand-950 shadow-2xl transition-transform duration-300 {isOpen ? 'translate-x-0' : 'translate-x-full'}">
	<div class="px-8 pt-24">
		<ul class="space-y-1">
			<li>
				<button
					onclick={() => scrollToSection('hero')}
					class="flex w-full items-center gap-3 rounded-sm px-3 py-3 text-left text-base font-medium text-white transition-colors duration-200 hover:bg-brand-900 active:scale-[0.98]"
				>
					<Icon name="home" class="h-4 w-4 text-brand-400" />
					Home
				</button>
			</li>
			<li>
				<button
					onclick={() => scrollToSection('trainingsplan')}
					class="flex w-full items-center gap-3 rounded-sm px-3 py-3 text-left text-base font-medium text-white transition-colors duration-200 hover:bg-brand-900 active:scale-[0.98]"
				>
					<Icon name="calendar" class="h-4 w-4 text-brand-400" />
					Trainingsplan
				</button>
			</li>
			<li>
				<button
					onclick={() => scrollToSection('team')}
					class="flex w-full items-center gap-3 rounded-sm px-3 py-3 text-left text-base font-medium text-white transition-colors duration-200 hover:bg-brand-900 active:scale-[0.98]"
				>
					<Icon name="users" class="h-4 w-4 text-brand-400" />
					Team
				</button>
			</li>
			<li>
				<button
					onclick={() => scrollToSection('preise')}
					class="flex w-full items-center gap-3 rounded-sm px-3 py-3 text-left text-base font-medium text-white transition-colors duration-200 hover:bg-brand-900 active:scale-[0.98]"
				>
					<Icon name="euro" class="h-4 w-4 text-brand-400" />
					Preise
				</button>
			</li>
			<li>
				<button
					onclick={() => scrollToSection('kontakt')}
					class="flex w-full items-center gap-3 rounded-sm px-3 py-3 text-left text-base font-medium text-white transition-colors duration-200 hover:bg-brand-900 active:scale-[0.98]"
				>
					<Icon name="phone" class="h-4 w-4 text-brand-400" />
					Kontakt
				</button>
			</li>
		</ul>

		<div class="mt-12 border-t border-brand-800 pt-6">
			<a
				href="https://www.instagram.com/evolve_grappling/"
				target="_blank"
				class="text-sm text-brand-400 underline underline-offset-4 transition-colors hover:text-accent-500"
			>
				Instagram
			</a>
		</div>
	</div>
</nav>
