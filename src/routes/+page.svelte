<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollAnimate } from '$lib/utils/scroll_animations';
	import Icon from '$lib/components/Icon.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import TeamSection from '$lib/components/TeamSection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import PriceSection from '$lib/components/PriceSection.svelte';
	import BurgerMenu from '$lib/components/BurgerMenu.svelte';
	import FloatingCTAButton from '$lib/components/FloatingCTAButton.svelte';
	import TrainingSchedule from '$lib/components/TrainingSchedule.svelte';

	let scrollY = $state(0);
	let innerHeight = $state(0);

	onMount(() => {
		const updateScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', updateScroll);
		updateScroll();

		const params = new URLSearchParams(window.location.search);
		const sectionId = params.get('g');
		if (sectionId) {
			requestAnimationFrame(() => {
				const element = document.getElementById(sectionId);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			});
		}

		return () => {
			window.removeEventListener('scroll', updateScroll);
		};
	});
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="relative overflow-x-hidden">
	<BurgerMenu />
	<FloatingCTAButton />

	<div id="hero">
		<HeroSection {scrollY} {innerHeight} />
	</div>

	<main id="main-content" class="relative z-20 min-h-dvh bg-brand-950">
		<div class="container mx-auto px-6 py-16">
			<article class="mx-auto max-w-5xl">
				<h1
					use:scrollAnimate
					class="scroll-animate fade-in-up mb-8 text-center text-4xl font-bold tracking-tight text-white md:text-5xl"
				>
					Evolve Grappling
				</h1>

				<div
					use:scrollAnimate
					class="scroll-animate fade-in-up mx-auto mb-14 max-w-2xl text-center text-lg leading-relaxed text-brand-100 delay-200"
				>
					Wir bei Evolve Grappling haben uns voll auf den Kampfsport Brazilian Jiu-Jitsu (BJJ) im Gi
					und No-Gi sowie auf Ringen fur Grappling spezialisiert. Wir arbeiten an den Zielen und am
					Potenzial jedes Einzelnen als starkes Team zusammen, ob Wettkampfer oder Hobbyist,
					Anfanger oder fortgeschrittener Grappler.
				</div>

				<h2
					use:scrollAnimate
					class="scroll-animate fade-in-up mb-10 text-center text-2xl font-bold tracking-tight text-white"
				>
					Warum Evolve Grappling in Solingen?
				</h2>

				<nav use:scrollAnimate class="scroll-animate fade-in-up mb-16 text-center delay-100">
					<div class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-brand-400">
						<a href="#trainingsplan" class="underline underline-offset-4 transition-colors hover:text-brand-300">Trainingsplan</a>
						<a href="#team" class="underline underline-offset-4 transition-colors hover:text-brand-300">Unser Team</a>
						<a href="#preise" class="underline underline-offset-4 transition-colors hover:text-brand-300">Preise</a>
						<a href="#kontakt" class="underline underline-offset-4 transition-colors hover:text-brand-300">Kontakt</a>
					</div>
				</nav>

				<div class="mb-16 grid gap-8 md:grid-cols-2">
					<div
						use:scrollAnimate
						class="scroll-animate slide-in-left rounded-2xl border border-white/5 bg-brand-900/70 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-brand-500/30"
					>
						<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
							<Icon name="shield" class="h-6 w-6" />
						</div>
						<h3 class="mb-3 text-2xl font-semibold text-white">Trainerteam</h3>
						<p class="leading-relaxed text-brand-100">
							Unsere Trainer verfugen uber langjahrige Erfahrung im BJJ, Grappling und Ringen. Sie
							blicken auf viele Jahre erfolgreicher Trainertatigkeit zuruck und bilden sich
							kontinuierlich fort, um ihr Wissen und ihre Methoden stets auf dem neuesten Stand zu
							halten.
						</p>
					</div>

					<div
						use:scrollAnimate
						class="scroll-animate slide-in-right rounded-2xl border border-white/5 bg-brand-900/70 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-brand-500/30"
					>
						<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
							<Icon name="users" class="h-6 w-6" />
						</div>
						<h3 class="mb-3 text-2xl font-semibold text-white">Team und Community</h3>
						<p class="leading-relaxed text-brand-100">
							Wir sind ein buntgemischtes Team aus verschiedenen Altersgruppen (ab 16 Jahren) und
							Kulturen. Bei uns ist jeder willkommen, um zusammen zu lernen und zu wachsen.
						</p>
					</div>

					<div
						use:scrollAnimate
						class="scroll-animate fade-in-up rounded-2xl border border-white/5 bg-brand-900/70 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-brand-500/30 md:col-span-2 md:mx-auto md:max-w-lg"
					>
						<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
							<Icon name="clock" class="h-6 w-6" />
						</div>
						<h3 class="mb-3 text-2xl font-semibold text-white">Trainingsaufbau</h3>
						<p class="leading-relaxed text-brand-100">
							Evolve Grappling bietet an sieben Tagen in der Woche die Moglichkeit zu trainieren.
							Neben unseren Gruppentrainingseinheiten konnen gemeinsam Instructionals studiert
							werden sowie freies Training und Open Mats stattfinden.
						</p>
					</div>
				</div>

				<div id="trainingsplan">
					<TrainingSchedule />
				</div>
				<div id="team">
					<TeamSection />
				</div>
				<div id="preise">
					<PriceSection />
				</div>
				<div id="kontakt">
					<ContactSection />
				</div>
			</article>
		</div>
	</main>

	<footer use:scrollAnimate class="scroll-animate fade-in-up bg-brand-950 py-12 text-white">
		<div class="container mx-auto px-6 text-center">
			<h3 class="mb-4 text-2xl font-bold">Evolve Grappling</h3>
			<div class="flex items-center justify-center space-x-6 text-brand-300">
				<div class="flex flex-col items-start space-x-6">
					<a href="/impressum" class="underline underline-offset-4 transition-colors hover:text-white">Impressum</a>
					<a href="/datenschutz" class="underline underline-offset-4 transition-colors hover:text-white">Datenschutz</a>
					<a href="/links" class="underline underline-offset-4 transition-colors hover:text-white">Links</a>
				</div>
				<div class="h-8 w-px bg-brand-800"></div>
				<div class="text-left">
					<p class="text-sm">
						Talblick 5a<br />
						42719 Solingen
					</p>
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(html),
	:global(body) {
		overflow-x: hidden;
		width: 100%;
	}
</style>
