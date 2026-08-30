<script lang="ts">
	import { trialFaq } from '$lib/data/seo';
	import { scrollReveal } from '$lib/utils/scroll_animations';
</script>

<section id="kampfsport-solingen" class="px-6 py-24 md:px-12 lg:px-20 xl:px-28">
	<div class="grid gap-16 md:grid-cols-[1fr_2fr]">
		<div use:scrollReveal class="reveal reveal-left md:sticky md:top-24 md:self-start">
			<div class="mb-4 flex items-center gap-3">
				<div class="h-px w-8 bg-brand-500"></div>
				<span class="text-xs font-semibold tracking-[0.25em] text-brand-400 uppercase"
					>Unser Sport</span
				>
			</div>
			<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
				BJJ &amp; Grappling:<br />Kampfsport in<br />Solingen
			</h2>
		</div>

		<div class="space-y-14">
			<div
				use:scrollReveal
				class="reveal reveal-up space-y-5 text-base leading-relaxed text-brand-200 md:text-lg"
			>
				<p>
					Evolve Grappling ist deine Adresse für Brazilian Jiu-Jitsu, No-Gi Grappling und
					grapplingspezifisches Ringen in Solingen. Bei uns lernst du kontrollierten Bodenkampf,
					Positionsarbeit und Aufgabegriffe in einem respektvollen Team. Das Training eignet sich
					für Anfänger ebenso wie für erfahrene Grappler und Wettkämpfer.
				</p>
				<p>
					Unser reguläres Angebot richtet sich aktuell an alle ab 16 Jahren. Du trainierst unter
					Anleitung eines erfahrenen Trainerteams mit Black-Belt-Kompetenz und kannst sowohl im Gi
					als auch ohne Gi an Technik, Ausdauer und taktischem Verständnis arbeiten.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<article
					id="bjj-solingen"
					use:scrollReveal
					class="reveal reveal-left border-l-2 border-accent-500 pl-6"
				>
					<h3 class="mb-3 text-2xl font-bold text-white">Brazilian Jiu-Jitsu in Solingen</h3>
					<p class="leading-relaxed text-brand-200">
						Im BJJ stehen technische Kontrolle, Positionswechsel, Hebel und Würgegriffe im
						Mittelpunkt. Wir bieten Einheiten im Gi und No-Gi. In den Basic-Kursen lernst du die
						Grundlagen Schritt für Schritt; die All-Levels-Kurse verbinden Techniktraining mit
						situativen Übungen und Sparring.
					</p>
				</article>

				<article
					id="grappling-solingen"
					use:scrollReveal
					class="reveal reveal-right border-l-2 border-brand-700 pl-6"
				>
					<h3 class="mb-3 text-2xl font-bold text-white">Grappling und Ringen in Solingen</h3>
					<p class="leading-relaxed text-brand-200">
						Beim No-Gi Grappling trainierst du ohne klassischen BJJ-Anzug. Ringerische Elemente
						helfen dir, den Kampf im Stand zu kontrollieren, Takedowns vorzubereiten und starke
						Positionen am Boden zu erreichen. Der Fokus bleibt auf sauberer Technik und sicherem
						Training.
					</p>
				</article>
			</div>

			<div
				use:scrollReveal
				class="reveal reveal-up border border-brand-800 bg-brand-950/50 p-6 md:p-8"
			>
				<h3 class="mb-4 text-2xl font-bold text-white">Kostenloses Probetraining</h3>
				<p class="mb-6 leading-relaxed text-brand-200">
					Dein erstes Training ist immer kostenlos. Kontaktiere uns vorher über das Formular,
					WhatsApp oder Instagram. Bequeme Sportkleidung genügt; trainiert wird barfuß.
					Umkleideräume und Duschen sind vorhanden.
				</p>
				<div class="flex flex-wrap gap-4">
					<a
						href="#kontakt"
						class="rounded-sm bg-accent-500 px-5 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-accent-400"
					>
						Probetraining vereinbaren
					</a>
					<a
						href="#trainingsplan"
						class="px-2 py-3 text-sm font-medium text-brand-300 underline underline-offset-4 hover:text-white"
					>
						Trainingsplan ansehen
					</a>
				</div>
			</div>

			<div id="haeufige-fragen" use:scrollReveal class="reveal reveal-up">
				<h3 class="mb-6 text-2xl font-bold text-white">Häufige Fragen</h3>
				<div class="divide-y divide-brand-800 border-y border-brand-800">
					{#each trialFaq as item (item.question)}
						<details class="group py-5">
							<summary
								class="cursor-pointer list-none pr-8 font-semibold text-white marker:content-none"
							>
								{item.question}
							</summary>
							<p class="mt-3 max-w-[70ch] leading-relaxed text-brand-300">{item.answer}</p>
						</details>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
