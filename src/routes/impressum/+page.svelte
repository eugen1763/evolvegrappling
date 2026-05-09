<script lang="ts">
	import { scrollAnimate } from "$lib/utils/scroll_animations";
	import BurgerMenu from "$lib/components/BurgerMenu.svelte";
</script>

<div class="relative overflow-x-hidden">
	<BurgerMenu />

	<main id="main-content" class="relative z-20 min-h-dvh bg-brand-950 pt-20">
		<div class="container mx-auto px-6 py-16">
			<div class="mx-auto max-w-4xl">
				<h1 use:scrollAnimate class="scroll-animate fade-in-up mb-8 text-center text-4xl font-bold tracking-tight text-white">
					Impressum
				</h1>

				<div use:scrollAnimate class="scroll-animate fade-in-up mb-8 rounded-2xl border border-white/5 bg-brand-900/70 p-8 delay-200">
					<h2 class="mb-6 text-2xl font-semibold text-white">Angaben gemass 5 TMG</h2>

					<div class="space-y-4 text-brand-100">
						<div>
							<h3 class="mb-2 text-xl font-semibold text-white">Evolve Grappling</h3>
							<p>
								Evolve Grappling Maximilian Galle und Marius Pichler GBR<br>
								Talblick 5a<br>
								42719 Solingen<br>
								Deutschland
							</p>
						</div>

						<div>
							<h3 class="mb-2 text-xl font-semibold text-white">Kontakt</h3>
							<p>
								Telefon: +49 (0) 1573 5412788<br>
								E-Mail: info@evolvegrappling.de
							</p>
						</div>
					</div>
				</div>

				<div use:scrollAnimate class="scroll-animate fade-in-up mb-8 rounded-2xl border border-white/5 bg-brand-900/70 p-8 delay-400">
					<h2 class="mb-6 text-2xl font-semibold text-white">Redaktionell verantwortlich</h2>
					<div class="text-brand-100">
						<p>
							Evolve Grappling Maximilian Galle und Marius Pichler GBR<br>
							Talblick 5a<br>
							42719 Solingen<br>
							Deutschland
						</p>
					</div>
				</div>

				<div use:scrollAnimate class="scroll-animate fade-in-up mb-8 rounded-2xl border border-white/5 bg-brand-900/70 p-8 delay-600">
					<h2 class="mb-6 text-2xl font-semibold text-white">EU-Streitschlichtung</h2>
					<div class="text-brand-100">
						<p>
							Die Europaische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
							<a href="https://ec.europa.eu/consumers/odr/" target="_blank" class="text-brand-400 underline underline-offset-4 transition-colors hover:text-brand-300">
								https://ec.europa.eu/consumers/odr/
							</a>
						</p>
						<p class="mt-4">
							Unsere E-Mail-Adresse finden Sie oben im Impressum.
						</p>
					</div>
				</div>

				<div use:scrollAnimate class="scroll-animate fade-in-up mb-8 rounded-2xl border border-white/5 bg-brand-900/70 p-8 delay-800">
					<h2 class="mb-6 text-2xl font-semibold text-white">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
					<div class="text-brand-100">
						<p>
							Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
							Verbraucherstreitschlichtungsstelle teilzunehmen.
						</p>
					</div>
				</div>

				<div use:scrollAnimate class="scroll-animate fade-in-up mb-8 rounded-2xl border border-white/5 bg-brand-900/70 p-8 delay-1000">
					<h2 class="mb-6 text-2xl font-semibold text-white">Haftung fur Inhalte</h2>
					<div class="space-y-4 text-brand-100">
						<p>
							Als Diensteanbieter sind wir gemass 7 Abs.1 TMG fur eigene Inhalte auf diesen Seiten nach den
							allgemeinen Gesetzen verantwortlich. Nach 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
							unter der Verpflichtung, ubermittelte oder gespeicherte fremde Informationen zu uberwachen oder nach
							Umstanden zu forschen, die auf eine rechtswidrige Tatigkeit hinweisen.
						</p>
						<p>
							Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
							Gesetzen bleiben hiervon unberuhrt. Eine diesbezugliche Haftung ist jedoch erst ab dem Zeitpunkt der
							Kenntnis einer konkreten Rechtsverletzung moglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
							werden wir diese Inhalte umgehend entfernen.
						</p>
					</div>
				</div>
			</div>
		</div>
	</main>

	<footer use:scrollAnimate class="scroll-animate fade-in-up bg-brand-950 py-12 text-white">
		<div class="container mx-auto px-6 text-center">
			<h3 class="mb-4 text-2xl font-bold">Evolve Grappling</h3>
			<div class="flex items-center justify-center space-x-6 text-brand-300">
				<div class="flex flex-col items-start space-x-6">
					<a href="/" class="underline underline-offset-4 transition-colors hover:text-white">Startseite</a>
					<a href="/datenschutz" class="underline underline-offset-4 transition-colors hover:text-white">Datenschutz</a>
				</div>
				<div class="h-8 w-px bg-brand-800"></div>
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

<style>
	:global(html), :global(body) {
		overflow-x: hidden;
		width: 100%;
	}
</style>
