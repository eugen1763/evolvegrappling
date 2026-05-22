<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollReveal } from '$lib/utils/scroll_animations';
	import Icon from '$lib/components/Icon.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import TeamSection from '$lib/components/TeamSection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import PriceSection from '$lib/components/PriceSection.svelte';
	import BurgerMenu from '$lib/components/BurgerMenu.svelte';
	import TrainingSchedule from '$lib/components/TrainingSchedule.svelte';
	import Footer from '$lib/components/Footer.svelte';

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

	<div id="hero">
		<HeroSection {scrollY} {innerHeight} />
	</div>

	<main id="main-content" class="relative z-20 bg-charcoal">

		<!-- Why Evolve — asymmetric editorial layout -->
		<section class="px-6 py-24 md:px-12 lg:px-20 xl:px-28">
			<div class="grid gap-16 md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_2fr]">
				<!-- Left: sticky label -->
				<div use:scrollReveal class="reveal reveal-left md:sticky md:top-24 md:self-start">
					<div class="flex items-center gap-3 mb-4">
						<div class="h-px w-8 bg-brand-500"></div>
						<span class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">Warum wir</span>
					</div>
					<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
						Warum Evolve<br />Grappling in<br />Solingen?
					</h2>
				</div>

				<!-- Right: content blocks -->
				<div class="space-y-8">
					<div use:scrollReveal class="reveal reveal-right delay-1 space-y-8">
						<p class="max-w-[60ch] text-lg leading-relaxed text-brand-200 md:text-xl">
							Wir bei Evolve Grappling haben uns voll auf den Kampfsport Brazilian Jiu-Jitsu (BJJ) im Gi
							und No-Gi sowie auf Ringen f&uuml;r Grappling spezialisiert. Wir arbeiten an den Zielen und am
							Potenzial jedes Einzelnen als starkes Team zusammen, ob Wettk&auml;mpfer oder Hobbyist,
							Anf&auml;nger oder fortgeschrittener Grappler.
						</p>

						<!-- Quick nav -->
						<nav class="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-brand-400">
							<a href="#trainingsplan" class="underline underline-offset-4 transition-colors hover:text-accent-500">Trainingsplan</a>
							<a href="#team" class="underline underline-offset-4 transition-colors hover:text-accent-500">Unser Team</a>
							<a href="#preise" class="underline underline-offset-4 transition-colors hover:text-accent-500">Preise</a>
							<a href="#kontakt" class="underline underline-offset-4 transition-colors hover:text-accent-500">Kontakt</a>
						</nav>
					</div>

					<!-- Three feature blocks in asymmetric grid -->
					<div class="grid gap-6 pt-8 md:grid-cols-3">
						<div use:scrollReveal class="reveal reveal-up delay-1 group border-l-2 border-brand-700 pl-6 transition-colors duration-300 hover:border-accent-500">
							<div class="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-brand-800 text-brand-400 group-hover:text-accent-500 transition-colors">
								<Icon name="shield" class="h-5 w-5" />
							</div>
							<h3 class="mb-3 text-lg font-semibold text-white">Trainerteam</h3>
							<p class="text-sm leading-relaxed text-brand-200">
								Unsere Trainer verf&uuml;gen &uuml;ber langj&auml;hrige Erfahrung im BJJ, Grappling und Ringen. Sie
								blicken auf viele Jahre erfolgreicher Trainert&auml;tigkeit zur&uuml;ck und bilden sich
								kontinuierlich fort.
							</p>
						</div>

						<div use:scrollReveal class="reveal reveal-up delay-2 group border-l-2 border-brand-700 pl-6 transition-colors duration-300 hover:border-accent-500">
							<div class="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-brand-800 text-brand-400 group-hover:text-accent-500 transition-colors">
								<Icon name="users" class="h-5 w-5" />
							</div>
							<h3 class="mb-3 text-lg font-semibold text-white">Community</h3>
							<p class="text-sm leading-relaxed text-brand-200">
								Wir sind ein buntgemischtes Team aus verschiedenen Altersgruppen (ab 16 Jahren) und
								Kulturen. Bei uns ist jeder willkommen, um zusammen zu lernen und zu wachsen.
							</p>
						</div>

						<div use:scrollReveal class="reveal reveal-up delay-3 group border-l-2 border-brand-700 pl-6 transition-colors duration-300 hover:border-accent-500">
							<div class="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-brand-800 text-brand-400 group-hover:text-accent-500 transition-colors">
								<Icon name="clock" class="h-5 w-5" />
							</div>
							<h3 class="mb-3 text-lg font-semibold text-white">Training</h3>
							<p class="text-sm leading-relaxed text-brand-200">
								An sieben Tagen in der Woche trainieren. Neben Gruppentraining k&ouml;nnen gemeinsam
								Instructionals studiert werden sowie freies Training und Open Mats stattfinden.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Score-line divider -->
		<div class="score-line mx-6 md:mx-12 lg:mx-20 xl:mx-28"></div>

		<!-- Training Schedule -->
		<div id="trainingsplan">
			<TrainingSchedule />
		</div>

		<div class="score-line mx-6 md:mx-12 lg:mx-20 xl:mx-28"></div>

		<!-- Team -->
		<div id="team">
			<TeamSection />
		</div>

		<div class="score-line mx-6 md:mx-12 lg:mx-20 xl:mx-28"></div>

		<!-- Price -->
		<div id="preise">
			<PriceSection />
		</div>

		<div class="score-line mx-6 md:mx-12 lg:mx-20 xl:mx-28"></div>

		<!-- Contact -->
		<div id="kontakt">
			<ContactSection />
		</div>
	</main>

	<Footer
		links={[
			{ href: '/impressum', label: 'Impressum' },
			{ href: '/datenschutz', label: 'Datenschutz' },
			{ href: '/links', label: 'Links' }
		]}
	/>
</div>

<style>
	:global(html),
	:global(body) {
		overflow-x: hidden;
		width: 100%;
	}
</style>
