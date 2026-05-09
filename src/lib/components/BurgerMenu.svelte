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
	class="burger-button fixed top-6 right-6 z-50 rounded-xl p-3 text-white transition-all duration-300 hover:bg-white/10 active:scale-95"
	onclick={toggleMenu}
	aria-label="Toggle navigation menu"
>
	<div class="burger-icon flex h-6 w-6 flex-col items-center justify-center space-y-1">
		<span class="block h-0.5 w-6 bg-white transition-all duration-300 {isOpen ? 'rotate-45 translate-y-2' : ''}"></span>
		<span class="block h-0.5 w-6 bg-white transition-all duration-300 {isOpen ? 'opacity-0' : ''}"></span>
		<span class="block h-0.5 w-6 bg-white transition-all duration-300 {isOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
	</div>
</button>

{#if isOpen}
	<div class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"></div>
{/if}

<nav class="burger-menu fixed top-0 right-0 z-40 h-full w-80 bg-brand-900 shadow-2xl transition-transform duration-300 {isOpen ? 'translate-x-0' : 'translate-x-full'}">
	<div class="px-6 pt-20">
		<ul class="space-y-2">
			<li>
				<button
					onclick={() => scrollToSection('hero')}
					class="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-lg font-medium text-white transition-colors duration-200 hover:bg-brand-800 active:scale-[0.98]"
				>
					<Icon name="home" class="h-5 w-5 text-brand-400" />
					Home
				</button>
			</li>
			<li>
				<button
					onclick={() => scrollToSection('trainingsplan')}
					class="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-lg font-medium text-white transition-colors duration-200 hover:bg-brand-800 active:scale-[0.98]"
				>
					<Icon name="calendar" class="h-5 w-5 text-brand-400" />
					Trainingsplan
				</button>
			</li>
			<li>
				<button
					onclick={() => scrollToSection('team')}
					class="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-lg font-medium text-white transition-colors duration-200 hover:bg-brand-800 active:scale-[0.98]"
				>
					<Icon name="users" class="h-5 w-5 text-brand-400" />
					Team
				</button>
			</li>
			<li>
				<button
					onclick={() => scrollToSection('preise')}
					class="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-lg font-medium text-white transition-colors duration-200 hover:bg-brand-800 active:scale-[0.98]"
				>
					<Icon name="euro" class="h-5 w-5 text-brand-400" />
					Preise
				</button>
			</li>
			<li>
				<button
					onclick={() => scrollToSection('kontakt')}
					class="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-lg font-medium text-white transition-colors duration-200 hover:bg-brand-800 active:scale-[0.98]"
				>
					<Icon name="phone" class="h-5 w-5 text-brand-400" />
					Kontakt
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
