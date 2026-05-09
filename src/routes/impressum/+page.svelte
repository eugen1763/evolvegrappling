<script lang="ts">
	import { scrollReveal } from "$lib/utils/scroll_animations";
	import BurgerMenu from "$lib/components/BurgerMenu.svelte";
</script>

<div class="relative overflow-x-hidden">
	<BurgerMenu />

	<main id="main-content" class="relative z-20 min-h-dvh bg-charcoal pt-20">
		<div class="px-6 py-16 md:px-12 lg:px-20 xl:px-28">
			<div class="mx-auto max-w-4xl">
				<div class="flex items-center gap-3 mb-8">
					<div class="h-px w-8 bg-brand-500"></div>
					<span class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">Rechtliches</span>
				</div>
				<h1 use:scrollReveal class="reveal reveal-up mb-12 text-4xl font-bold tracking-tight text-white md:text-5xl">
					Impressum
				</h1>

				<div use:scrollReveal class="reveal reveal-up delay-1 mb-8 border border-brand-800 bg-brand-950/50 p-8">
					<h2 class="mb-6 text-2xl font-semibold text-white">Angaben gem&auml;&szlig; &sect; 5 TMG</h2>

					<div class="space-y-4 text-brand-200">
						<div>
							<h3 class="mb-2 text-xl font-semibold text-white">Evolve Grappling</h3>
							<p>
								Evolve Grappling Maximilian Galle und Marius Pichler GbR<br>
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

				<div use:scrollReveal class="reveal reveal-up delay-2 mb-8 border border-brand-800 bg-brand-950/50 p-8">
					<h2 class="mb-6 text-2xl font-semibold text-white">Redaktionell verantwortlich</h2>
					<div class="text-brand-200">
						<p>
							Evolve Grappling Maximilian Galle und Marius Pichler GbR<br>
							Talblick 5a<br>
							42719 Solingen<br>
							Deutschland
						</p>
					</div>
				</div>

				<div use:scrollReveal class="reveal reveal-up delay-3 mb-8 border border-brand-800 bg-brand-950/50 p-8">
					<h2 class="mb-6 text-2xl font-semibold text-white">EU-Streitschlichtung</h2>
					<div class="text-brand-200">
						<p>
							Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
							<a href="https://ec.europa.eu/consumers/odr/" target="_blank" class="text-accent-500 underline underline-offset-4 transition-colors hover:text-accent-400">
								https://ec.europa.eu/consumers/odr/
							</a>
						</p>
						<p class="mt-4">
							Unsere E-Mail-Adresse finden Sie oben im Impressum.
						</p>
					</div>
				</div>

				<div use:scrollReveal class="reveal reveal-up delay-4 mb-8 border border-brand-800 bg-brand-950/50 p-8">
					<h2 class="mb-6 text-2xl font-semibold text-white">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
					<div class="text-brand-200">
						<p>
							Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
							Verbraucherstreitschlichtungsstelle teilzunehmen.
						</p>
					</div>
				</div>

				<div use:scrollReveal class="reveal reveal-up delay-5 mb-8 border border-brand-800 bg-brand-950/50 p-8">
					<h2 class="mb-6 text-2xl font-semibold text-white">Haftung f&uuml;r Inhalte</h2>
					<div class="space-y-4 text-brand-200">
						<p>
							Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den
							allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
							unter der Verpflichtung, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach
							Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.
						</p>
						<p>
							Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
							Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der
							Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
							werden wir diese Inhalte umgehend entfernen.
						</p>
					</div>
				</div>
			</div>
		</div>
	</main>

	<footer use:scrollReveal class="reveal reveal-up bg-charcoal border-t border-brand-900 py-12">
		<div class="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
			<div class="grid gap-8 md:grid-cols-[1fr_auto_auto]">
				<div>
					<h3 class="mb-2 text-xl font-bold tracking-tight text-white">Evolve Grappling</h3>
					<p class="text-sm text-brand-400">Talblick 5a &middot; 42719 Solingen</p>
				</div>
				<nav class="flex flex-col gap-2 text-sm">
					<a href="/" class="text-brand-300 underline underline-offset-4 transition-colors hover:text-white">Startseite</a>
					<a href="/datenschutz" class="text-brand-300 underline underline-offset-4 transition-colors hover:text-white">Datenschutz</a>
				</nav>
				<div class="text-sm text-brand-400">
					<p class="tabular-nums">+49 1573 5412788</p>
					<a href="mailto:info@evolvegrappling.de" class="underline underline-offset-4 transition-colors hover:text-white">info@evolvegrappling.de</a>
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
