(() => {
	'use strict';

	const STORE_KEY = 'evolve-fragebogen-v1';
	const $ = (sel, ctx = document) => ctx.querySelector(sel);
	const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

	const VARIANTS = [
		{ n: 1, name: 'Plakat', desc: 'Helles Kampfplakat mit 3D-Ebenen' },
		{ n: 2, name: 'Halle bei Nacht', desc: 'Dunkle Halle mit 3D-Matte' },
		{ n: 3, name: 'Gürtelweg', desc: 'Ein Gürtel führt von Weiß bis Schwarz' },
		{ n: 4, name: 'Magazin', desc: 'Große Fotos wie in einer Zeitschrift' },
		{ n: 5, name: 'Raster', desc: 'Buntes Raster mit drehbarem Würfel' },
		{ n: 6, name: 'Plakat mit Live-Plan', desc: 'Variante 1 mit Plan und Preisen aus Variante 2' }
	];

	const swatches = (colors) =>
		`<span class="swatches">${colors.map((c) => `<i style="background:${c}"></i>`).join('')}</span>`;
	const sample = (family, extra = '') =>
		`<span class="sample" style="font-family:${family};${extra}">Komm auf die Matte</span>`;

	const SECTIONS = [
		{
			id: 'person',
			title: 'Über dich',
			questions: [{ id: 'name', type: 'text', label: 'Wer füllt den Fragebogen aus?', placeholder: 'Name' }]
		},
		{
			id: 'eindruck',
			title: 'Erster Eindruck',
			intro: 'Schau dir alle sechs Entwürfe an. Tipp auf „Live ansehen“, um den Entwurf zu öffnen.',
			questions: [
				{
					id: 'bewertung',
					type: 'rating',
					label: 'Wie gefällt dir jeder Entwurf?',
					help: '1 Punkt: gar nicht. 5 Punkte: sehr gut. Ein kurzer Kommentar hilft mir sehr.',
					items: VARIANTS.map((v) => ({
						value: `v${v.n}`,
						label: `${v.n} · ${v.name}`,
						desc: v.desc,
						img: `img/hero-${v.n}.webp`,
						link: `../${v.n}/`
					}))
				},
				{
					id: 'basis',
					type: 'choice',
					label: 'Welcher Entwurf soll die Grundlage der neuen Website sein?',
					help: 'Einzelne Teile aus anderen Entwürfen kannst du in den nächsten Fragen auswählen.',
					wide: true,
					options: VARIANTS.map((v) => ({
						value: `v${v.n}`,
						label: `${v.n} · ${v.name}`,
						img: `img/desk-${v.n}.webp`,
						link: `../${v.n}/`
					}))
				}
			]
		},
		{
			id: 'look',
			title: 'Farben, Schrift, Bewegung',
			questions: [
				{
					id: 'stimmung',
					type: 'choice',
					label: 'Welche Grundstimmung passt zu Evolve?',
					options: [
						{
							value: 'hell-plakativ',
							label: 'Hell und plakativ',
							desc: 'Wie Entwurf 1 und 6',
							visual: swatches(['#e9ece7', '#0f1a1d', '#3f7b8a', '#d8dcc3', '#ff4127', '#f5c53d'])
						},
						{
							value: 'dunkel',
							label: 'Dunkel wie die Halle bei Nacht',
							desc: 'Wie Entwurf 2',
							visual: swatches(['#04161a', '#0b282e', '#6fe0e6', '#d8dcc3', '#ff7d4d', '#f4c64f'])
						},
						{
							value: 'hell-ruhig',
							label: 'Hell und ruhig',
							desc: 'Wie Entwurf 3 und 4',
							visual: swatches(['#f8f7f2', '#14202b', '#1f4e9c', '#5b2e8c', '#c5222c', '#f0b429'])
						},
						{
							value: 'bunt',
							label: 'Bunt und verspielt',
							desc: 'Wie Entwurf 5',
							visual: swatches(['#f3f5f2', '#000000', '#3f7b8a', '#ff4421', '#ffd500', '#bda8ff'])
						}
					]
				},
				{
					id: 'schrift',
					type: 'choice',
					label: 'Welche Schrift soll für die Überschriften stehen?',
					options: [
						{
							value: 'sofia',
							label: 'Schmal und laut',
							desc: 'Entwurf 1 und 6',
							visual: sample("'Sofia Sans Extra Condensed'", 'text-transform:uppercase;font-weight:900')
						},
						{ value: 'tektur', label: 'Technisch, eckig', desc: 'Entwurf 2', visual: sample("'Tektur'", 'font-weight:800') },
						{ value: 'bricolage', label: 'Modern, kräftig', desc: 'Entwurf 3', visual: sample("'Bricolage Grotesque'", 'font-weight:800') },
						{ value: 'bodoni', label: 'Elegant wie ein Magazin', desc: 'Entwurf 4', visual: sample("'Bodoni Moda'", 'font-weight:700') },
						{ value: 'anybody', label: 'Breit und verspielt', desc: 'Entwurf 5', visual: sample("'Anybody'", 'font-weight:800;font-stretch:130%') }
					]
				},
				{
					id: 'bewegung',
					type: 'scale',
					label: 'Wie viel Bewegung und 3D-Effekte soll die Seite haben?',
					help: 'Schieb den Regler. Das Plakat zeigt dir ungefähr, wie stark sich Dinge bewegen.',
					min: 1,
					max: 5,
					steps: ['Fast keine', 'Dezent', 'Mittel', 'Viel', 'Volle Show'],
					demo: 'motion'
				}
			]
		},
		{
			id: 'start',
			title: 'Startbereich',
			intro: 'Der Startbereich ist das Erste, was Besucher sehen.',
			questions: [
				{
					id: 'hero-animation',
					type: 'choice',
					label: 'Beim Scrollen kippt das Plakat nach hinten. Wie lange soll das dauern?',
					help: 'So sieht die Animation in Entwurf 6 aus:',
					film: ['img/film-0.webp', 'img/film-1.webp', 'img/film-2.webp', 'img/film-3.webp'],
					options: [
						{ value: 'keine', label: 'Keine Animation', desc: 'Das Plakat steht still.' },
						{ value: 'kurz', label: 'Kurz', desc: 'Wie Entwurf 6: etwa ein Drittel Bildschirm scrollen.' },
						{ value: 'lang', label: 'Lang', desc: 'Wie Entwurf 1: etwa doppelt so lange.' }
					]
				},
				{
					id: 'headline',
					type: 'choice',
					label: 'Welche Überschrift soll ganz oben stehen?',
					other: 'Eigener Vorschlag',
					options: [
						{ value: 'sachlich', label: '„BJJ, Kickboxen & Kinder-BJJ in Solingen“', desc: 'Sachlich, gut für Google' },
						{ value: 'matte', label: '„Komm auf die Matte.“', desc: 'Einladend' },
						{ value: 'schwarzgurt', label: '„Jeder Schwarzgurt hat weiß angefangen.“', desc: 'Nimmt Anfängern die Angst' }
					]
				}
			]
		},
		{
			id: 'plan',
			title: 'Trainingsplan',
			questions: [
				{
					id: 'live-tafel',
					type: 'choice',
					label: 'Soll eine Live-Tafel zeigen, welcher Kurs als Nächstes beginnt?',
					help: 'Die Tafel zählt die Zeit bis zum nächsten Kurs herunter. Während eines Kurses zeigt sie „Läuft gerade“.',
					options: [
						{ value: 'ja', label: 'Ja, mit Countdown', img: 'img/board-m.webp' },
						{ value: 'nein', label: 'Nein, nur der Wochenplan' }
					]
				},
				{
					id: 'plan-handy',
					type: 'choice',
					label: 'Wie soll der Plan auf dem Handy aussehen?',
					options: [
						{
							value: 'karussell',
							label: 'Ein Tag pro Karte',
							desc: 'Wischen oder Tag antippen. Startet beim heutigen Tag.',
							img: 'img/carousel-m.webp'
						},
						{ value: 'liste', label: 'Alle Tage untereinander', desc: 'Die ganze Woche auf einen Blick, aber lang.', img: 'img/list-m.webp' }
					]
				},
				{
					id: 'plan-desktop',
					type: 'choice',
					label: 'Gefällt dir der Plan am Computer als Zeitraster?',
					wide: true,
					options: [
						{ value: 'ja', label: 'Ja, so lassen', img: 'img/grid-d.webp' },
						{ value: 'nein', label: 'Nein, lieber eine einfache Liste' }
					]
				},
				{
					id: 'plan-position',
					type: 'choice',
					label: 'Wo soll der Trainingsplan stehen?',
					options: [
						{ value: 'oben', label: 'Direkt nach dem Startbereich', desc: 'Für alle, die schon wissen, was sie wollen.' },
						{ value: 'mitte', label: 'Nach den Kursen', desc: 'Erst erklären, dann die Zeiten. So ist es jetzt.' }
					]
				}
			]
		},
		{
			id: 'kurse',
			title: 'Kurse',
			questions: [
				{
					id: 'kurs-karten',
					type: 'choice',
					label: 'Wie sollen die Kurse vorgestellt werden?',
					options: [
						{
							value: 'plakat',
							label: 'Plakate zum Umdrehen',
							desc: 'Entwurf 1 und 6. Auf der Rückseite stehen die Details.',
							img: 'img/cards-1-m.webp'
						},
						{
							value: 'karte',
							label: 'Karten zum Aufklappen',
							desc: 'Entwurf 2. „Mehr über BJJ“ klappt den Text auf.',
							img: 'img/cards-2-m.webp'
						}
					]
				}
			]
		},
		{
			id: 'preise',
			title: 'Preise',
			questions: [
				{
					id: 'preis-stil',
					type: 'choice',
					label: 'Welche Darstellung der Preise gefällt dir?',
					wide: true,
					options: [
						{ value: 'tickets', label: 'Eintrittskarten', desc: 'Entwurf 1 und 6', img: 'img/tickets-d.webp' },
						{ value: 'karten', label: 'Schlichte Karten', desc: 'Entwurf 2', img: 'img/pricecards-d.webp' }
					]
				},
				{
					id: 'hochzaehlen',
					type: 'choice',
					label: 'Sollen die Preise beim Erscheinen von 0 hochzählen?',
					demo: 'count',
					options: [
						{ value: 'ja', label: 'Ja' },
						{ value: 'nein', label: 'Nein, Preis sofort zeigen' }
					]
				}
			]
		},
		{
			id: 'team',
			title: 'Team',
			questions: [
				{
					id: 'team-stil',
					type: 'choice',
					label: 'Welche Teamfotos gefallen dir besser?',
					wide: true,
					options: [
						{ value: 'rahmen', label: 'Mit Rahmen und Gürtelband', desc: 'Entwurf 1 und 6', img: 'img/team-1.webp' },
						{ value: 'randlos', label: 'Randlos', desc: 'Entwurf 2', img: 'img/team-2.webp' }
					]
				},
				{
					id: 'neue-trainer',
					type: 'textarea',
					label: 'Wer trainiert Kickboxen und Kinder-BJJ?',
					help: 'Name, Gürtel oder Erfahrung, Rolle. Fotos bitte separat schicken.',
					placeholder: 'z. B. Anna Beispiel, Kickboxen, 10 Jahre Erfahrung, Trainerin Kickboxen'
				}
			]
		},
		{
			id: 'aufbau',
			title: 'Aufbau der Seite',
			questions: [
				{
					id: 'reihenfolge',
					type: 'order',
					label: 'In welcher Reihenfolge sollen die Abschnitte kommen?',
					help: 'Schieb die Abschnitte mit den Pfeilen nach oben oder unten. Der Startbereich bleibt immer oben.',
					items: ['Kurse', 'Warum Evolve', 'Trainingsplan', 'Team', 'Preise', 'Häufige Fragen', 'Kontakt und Probetraining']
				},
				{
					id: 'sticky',
					type: 'choice',
					label: 'Soll auf dem Handy unten immer ein Button „Kostenloses Probetraining“ stehen?',
					options: [
						{ value: 'ja', label: 'Ja', desc: 'Besucher können jederzeit ein Probetraining buchen.' },
						{ value: 'nein', label: 'Nein', desc: 'Der Button verdeckt sonst Inhalt.' }
					]
				}
			]
		},
		{
			id: 'inhalte',
			title: 'Inhalte',
			questions: [
				{
					id: 'extras',
					type: 'multi',
					label: 'Was soll zusätzlich auf die Seite?',
					help: 'Mehrere Antworten möglich.',
					other: 'Etwas anderes',
					options: [
						{ value: 'instagram', label: 'Neueste Instagram-Beiträge' },
						{ value: 'stimmen', label: 'Stimmen von Mitgliedern' },
						{ value: 'erfolge', label: 'Wettkampferfolge' },
						{ value: 'galerie', label: 'Fotogalerie' },
						{ value: 'video', label: 'Video aus dem Training' },
						{ value: 'events', label: 'Seminare und Events' },
						{ value: 'karte', label: 'Anfahrt mit Karte' },
						{ value: 'mitglied', label: 'Mitgliedschaft online abschließen' }
					]
				},
				{
					id: 'fotos',
					type: 'choice',
					label: 'Gibt es neue Fotos oder Videos?',
					options: [
						{ value: 'liefern', label: 'Ja, wir schicken neue Fotos' },
						{ value: 'vorhanden', label: 'Nein, die jetzigen Fotos reichen' },
						{ value: 'shooting', label: 'Wir wollen ein Fotoshooting planen' }
					]
				},
				{
					id: 'korrekturen',
					type: 'textarea',
					label: 'Ist in den Entwürfen etwas falsch oder veraltet?',
					help: 'Zeiten, Preise, Texte, Namen, Adresse, alles.',
					placeholder: 'z. B. Freitag geht das Training bis 20:00'
				},
				{
					id: 'faq',
					type: 'textarea',
					label: 'Welche Fragen stellen Interessenten euch oft?',
					help: 'Diese Fragen kommen in den Bereich „Häufige Fragen“.',
					placeholder: 'z. B. Kann ich nur am Wochenende trainieren?'
				}
			]
		},
		{
			id: 'ende',
			title: 'Zum Schluss',
			questions: [
				{ id: 'termin', type: 'date', label: 'Wann soll die neue Website online gehen?' },
				{ id: 'sonstiges', type: 'textarea', label: 'Möchtest du noch etwas sagen?', placeholder: 'Wünsche, Ideen, Bedenken' }
			]
		}
	];

	const QUESTIONS = SECTIONS.flatMap((s) => s.questions.map((q) => ({ ...q, section: s })));

	/* ----- state ----- */

	let answers = {};
	try {
		answers = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
	} catch {
		answers = {};
	}
	let saveTimer = 0;
	function save() {
		clearTimeout(saveTimer);
		saveTimer = setTimeout(() => {
			try {
				localStorage.setItem(STORE_KEY, JSON.stringify(answers));
			} catch {
				/* Private windows can block storage. The download still works. */
			}
		}, 200);
		updateProgress();
	}

	function isAnswered(q) {
		const v = answers[q.id];
		if (answers[`${q.id}_anmerkung`]?.trim()) return true;
		if (q.type === 'rating') return !!v && Object.values(v).some((r) => r && r.stars);
		if (q.type === 'order') return Array.isArray(v);
		if (q.type === 'multi') return Array.isArray(v) && v.length > 0;
		return v != null && String(v).trim() !== '';
	}

	function updateProgress() {
		const done = QUESTIONS.filter(isAnswered).length;
		const total = QUESTIONS.length;
		$('#progress-text').textContent = `${done} von ${total} beantwortet`;
		$('#progress-fill').style.transform = `scaleX(${total ? done / total : 0})`;
		$('#finish-summary').textContent =
			done === total
				? 'Du hast alle Fragen beantwortet. Danke!'
				: `Du hast ${done} von ${total} Fragen beantwortet. Offene Fragen entscheide ich nach bestem Wissen.`;
		QUESTIONS.forEach((q) => {
			const el = document.getElementById(`q-${q.id}`);
			if (el) el.classList.toggle('is-done', isAnswered(q));
		});
	}

	/* ----- render ----- */

	const esc = (s) =>
		String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

	function mediaTools(opt) {
		const tools = [];
		if (opt.img) {
			tools.push(
				`<button type="button" class="tool" data-zoom="${esc(opt.img)}" data-caption="${esc(opt.label)}">Groß ansehen</button>`
			);
		}
		if (opt.link) tools.push(`<a class="tool" href="${esc(opt.link)}" target="_blank" rel="noopener">Live ansehen ↗</a>`);
		return tools.length ? `<div class="tools">${tools.join('')}</div>` : '';
	}

	function optionCard(q, opt, inputType) {
		const name = `${q.id}`;
		const media = opt.img
			? `<span class="opt-media"><img src="${esc(opt.img)}" alt="" loading="lazy" /></span>`
			: opt.visual
				? `<span class="opt-visual">${opt.visual}</span>`
				: '';
		return `<div class="opt-wrap${opt.img || opt.visual ? ' has-media' : ''}">
			<label class="opt">
				<input type="${inputType}" name="${name}" value="${esc(opt.value)}" />
				${media}
				<span class="opt-text">
					<span class="opt-label">${esc(opt.label)}</span>
					${opt.desc ? `<span class="opt-desc">${esc(opt.desc)}</span>` : ''}
				</span>
				<span class="opt-check" aria-hidden="true"></span>
			</label>
			${mediaTools(opt)}
		</div>`;
	}

	function renderQuestion(q, index) {
		let body = '';
		const hasMedia = (q.options || []).some((o) => o.img || o.visual);
		switch (q.type) {
			case 'text':
				body = `<input class="field" type="text" id="f-${q.id}" placeholder="${esc(q.placeholder || '')}" autocomplete="name" />`;
				break;
			case 'textarea':
				body = `<textarea class="field" id="f-${q.id}" rows="4" placeholder="${esc(q.placeholder || '')}"></textarea>`;
				break;
			case 'date':
				body = `<input class="field field-date" type="date" id="f-${q.id}" />`;
				break;
			case 'choice':
			case 'multi': {
				const type = q.type === 'choice' ? 'radio' : 'checkbox';
				const cls = ['opts', hasMedia ? 'opts-media' : 'opts-plain', q.wide ? 'opts-wide' : ''].join(' ');
				const film = q.film
					? `<div class="film">${q.film
							.map((src, i) => `<figure><img src="${src}" alt="" loading="lazy" /><figcaption>${i === 0 ? 'Start' : i === q.film.length - 1 ? 'Ende' : '…'}</figcaption></figure>`)
							.join('<span class="film-arrow" aria-hidden="true">→</span>')}</div>`
					: '';
				const demo = q.demo === 'count' ? countDemo() : '';
				const other = q.other
					? `<label class="other"><span>${esc(q.other)}:</span><input class="field" type="text" id="f-${q.id}-other" /></label>`
					: '';
				const note = `<label class="note"><span>Anmerkung (optional)</span><textarea class="field" rows="2" id="f-${q.id}-note" placeholder="Was dir dazu noch einfällt"></textarea></label>`;
				const clear =
					type === 'radio' ? `<button type="button" class="clear" data-clear="${q.id}">Auswahl zurücksetzen</button>` : '';
				body = `${film}${demo}<div class="${cls}" role="${type === 'radio' ? 'radiogroup' : 'group'}" aria-labelledby="t-${q.id}">${q.options
					.map((o) => optionCard(q, o, type))
					.join('')}</div>${clear}${other}${note}`;
				break;
			}
			case 'rating':
				body = `<div class="ratings">${q.items
					.map(
						(it) => `<div class="rate" data-item="${it.value}">
						<button type="button" class="rate-media" data-zoom="${esc(it.img)}" data-caption="${esc(it.label)}" aria-label="${esc(it.label)} groß ansehen">
							<img src="${esc(it.img)}" alt="" loading="lazy" />
						</button>
						<div class="rate-body">
							<h4>${esc(it.label)}</h4>
							<p class="opt-desc">${esc(it.desc)}</p>
							<a class="tool" href="${esc(it.link)}" target="_blank" rel="noopener">Live ansehen ↗</a>
							<div class="hexes" role="radiogroup" aria-label="Punkte für ${esc(it.label)}">
								${[1, 2, 3, 4, 5]
									.map(
										(n) => `<label class="hex"><input type="radio" name="${q.id}-${it.value}" value="${n}" /><span>${n}</span></label>`
									)
									.join('')}
							</div>
							<input class="field field-small" type="text" data-comment="${it.value}" placeholder="Kommentar (optional)" />
						</div>
					</div>`
					)
					.join('')}</div>`;
				break;
			case 'scale':
				body = `<div class="scale">
					${q.demo === 'motion' ? motionDemo() : ''}
					<div class="scale-control">
						<input type="range" id="f-${q.id}" min="${q.min}" max="${q.max}" step="1" value="3" aria-valuetext="${esc(q.steps[2])}" />
						<div class="scale-steps" aria-hidden="true">${q.steps.map((s) => `<span>${esc(s)}</span>`).join('')}</div>
						<p class="scale-value" id="v-${q.id}">Noch nicht gewählt. Schieb den Regler.</p>
					</div>
				</div>`;
				break;
			case 'order':
				body = `<ol class="order" id="f-${q.id}"></ol>`;
				break;
		}
		return `<article class="q" id="q-${q.id}">
			<header class="q-head">
				<span class="q-num">${String(index).padStart(2, '0')}</span>
				<h3 id="t-${q.id}">${esc(q.label)}</h3>
			</header>
			${q.help ? `<p class="q-help">${esc(q.help)}</p>` : ''}
			<div class="q-body">${body}</div>
		</article>`;
	}

	function motionDemo() {
		return `<div class="motion-demo" id="motion-demo" style="--amp: 0.5" aria-hidden="true">
			<div class="md-card">
				<span class="md-row md-row-1">EVOLVE</span>
				<span class="md-row md-row-2">EVOLVE</span>
				<span class="md-tag">Probetraining</span>
			</div>
		</div>`;
	}

	function countDemo() {
		return `<div class="count-demo">
			<span class="cd-num" id="count-num">79,90</span><span class="cd-cur">€</span>
			<button type="button" class="tool" id="count-replay">Nochmal abspielen</button>
		</div>`;
	}

	let qIndex = 0;
	$('#sections').innerHTML = SECTIONS.map(
		(s, i) => `<section class="sec" id="s-${s.id}" aria-labelledby="h-${s.id}">
			<header class="sec-head">
				<span class="sec-num" aria-hidden="true">${i + 1}</span>
				<h2 class="display" id="h-${s.id}">${esc(s.title)}</h2>
				${s.intro ? `<p class="sec-intro">${esc(s.intro)}</p>` : ''}
			</header>
			${s.questions.map((q) => renderQuestion(q, ++qIndex)).join('')}
		</section>`
	).join('');

	/* ----- bind inputs to answers ----- */

	QUESTIONS.forEach((q) => {
		const root = document.getElementById(`q-${q.id}`);
		const bindText = (el, key) => {
			if (!el) return;
			el.value = answers[key] ?? '';
			el.addEventListener('input', () => {
				answers[key] = el.value;
				save();
			});
		};

		switch (q.type) {
			case 'text':
			case 'textarea':
			case 'date':
				bindText($(`#f-${q.id}`), q.id);
				break;
			case 'choice':
				$$(`input[name="${q.id}"]`, root).forEach((input) => {
					input.checked = answers[q.id] === input.value;
					input.addEventListener('change', () => {
						answers[q.id] = input.value;
						save();
					});
				});
				bindText($(`#f-${q.id}-other`), `${q.id}_eigene`);
				bindText($(`#f-${q.id}-note`), `${q.id}_anmerkung`);
				// Typing an own proposal deselects the fixed options, so the answer stays unambiguous.
				$(`#f-${q.id}-other`)?.addEventListener('input', (e) => {
					if (!e.target.value.trim()) return;
					$$(`input[name="${q.id}"]`, root).forEach((i) => (i.checked = false));
					answers[q.id] = 'eigene';
					save();
				});
				break;
			case 'multi': {
				const picked = new Set(answers[q.id] || []);
				$$(`input[name="${q.id}"]`, root).forEach((input) => {
					input.checked = picked.has(input.value);
					input.addEventListener('change', () => {
						answers[q.id] = $$(`input[name="${q.id}"]:checked`, root).map((i) => i.value);
						save();
					});
				});
				bindText($(`#f-${q.id}-other`), `${q.id}_eigene`);
				bindText($(`#f-${q.id}-note`), `${q.id}_anmerkung`);
				break;
			}
			case 'rating': {
				answers[q.id] = answers[q.id] || {};
				q.items.forEach((it) => {
					const rec = (answers[q.id][it.value] = answers[q.id][it.value] || {});
					$$(`input[name="${q.id}-${it.value}"]`, root).forEach((input) => {
						input.checked = String(rec.stars) === input.value;
						input.addEventListener('change', () => {
							rec.stars = Number(input.value);
							save();
						});
					});
					const comment = $(`[data-comment="${it.value}"]`, root);
					comment.value = rec.kommentar || '';
					comment.addEventListener('input', () => {
						rec.kommentar = comment.value;
						save();
					});
				});
				break;
			}
			case 'scale': {
				const range = $(`#f-${q.id}`);
				const label = $(`#v-${q.id}`);
				const demo = $('#motion-demo');
				const show = (v, chosen) => {
					range.setAttribute('aria-valuetext', q.steps[v - q.min]);
					if (chosen) label.textContent = `Deine Wahl: ${q.steps[v - q.min]}`;
					if (demo) demo.style.setProperty('--amp', ((v - 1) / 4).toFixed(2));
				};
				if (answers[q.id]) {
					range.value = answers[q.id];
					show(Number(answers[q.id]), true);
				} else show(3, false);
				range.addEventListener('input', () => {
					answers[q.id] = Number(range.value);
					show(Number(range.value), true);
					save();
				});
				break;
			}
			case 'order': {
				const list = $(`#f-${q.id}`);
				const valid = Array.isArray(answers[q.id]) && answers[q.id].length === q.items.length;
				const items = valid ? [...answers[q.id]] : [...q.items];
				const draw = (focusIndex, dir) => {
					list.innerHTML = items
						.map(
							(name, i) => `<li>
							<span class="order-pos">${i + 1}</span>
							<span class="order-name">${esc(name)}</span>
							<button type="button" class="order-btn" data-move="-1" data-i="${i}" ${i === 0 ? 'disabled' : ''} aria-label="${esc(name)} nach oben">↑</button>
							<button type="button" class="order-btn" data-move="1" data-i="${i}" ${i === items.length - 1 ? 'disabled' : ''} aria-label="${esc(name)} nach unten">↓</button>
						</li>`
						)
						.join('');
					if (focusIndex != null) {
						const btn = $(`[data-i="${focusIndex}"][data-move="${dir}"]`, list) || $(`[data-i="${focusIndex}"]:not([disabled])`, list);
						btn?.focus();
						list.children[focusIndex]?.classList.add('is-moved');
					}
				};
				list.addEventListener('click', (e) => {
					const btn = e.target.closest('[data-move]');
					if (!btn) return;
					const i = Number(btn.dataset.i);
					const j = i + Number(btn.dataset.move);
					if (j < 0 || j >= items.length) return;
					[items[i], items[j]] = [items[j], items[i]];
					answers[q.id] = [...items];
					draw(j, btn.dataset.move);
					save();
				});
				draw();
				break;
			}
		}
	});

	document.addEventListener('click', (e) => {
		const clear = e.target.closest('[data-clear]');
		if (!clear) return;
		const id = clear.dataset.clear;
		$$(`input[name="${id}"]`).forEach((i) => (i.checked = false));
		delete answers[id];
		save();
	});

	/* ----- zoom ----- */

	const zoom = $('#zoom');
	document.addEventListener('click', (e) => {
		const btn = e.target.closest('[data-zoom]');
		if (!btn) return;
		$('#zoom-img').src = btn.dataset.zoom;
		$('#zoom-img').alt = btn.dataset.caption;
		$('#zoom-caption').textContent = btn.dataset.caption;
		if (zoom.showModal) zoom.showModal();
		else window.open(btn.dataset.zoom, '_blank');
	});
	zoom.addEventListener('click', (e) => {
		if (e.target === zoom) zoom.close();
	});

	/* ----- price count demo ----- */

	const countNum = $('#count-num');
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
	function runCount() {
		if (reduced) return;
		const start = performance.now();
		const step = (t) => {
			const k = Math.min(1, (t - start) / 1400);
			countNum.textContent = (79.9 * (1 - Math.pow(1 - k, 3))).toFixed(2).replace('.', ',');
			if (k < 1) requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	}
	if (countNum) {
		$('#count-replay').addEventListener('click', runCount);
		new IntersectionObserver(
			(entries, obs) => {
				if (!entries[0].isIntersecting) return;
				obs.disconnect();
				runCount();
			},
			{ threshold: 0.8 }
		).observe(countNum);
	}

	/* ----- export and import ----- */

	function readable(q) {
		const v = answers[q.id];
		const labelOf = (val) => q.options?.find((o) => o.value === val)?.label ?? val;
		switch (q.type) {
			case 'choice': {
				const parts = [];
				if (v === 'eigene') parts.push(`Eigener Vorschlag: ${answers[`${q.id}_eigene`] || ''}`);
				else if (v) parts.push(labelOf(v));
				if (answers[`${q.id}_anmerkung`]) parts.push(`Anmerkung: ${answers[`${q.id}_anmerkung`]}`);
				return parts.join(' | ') || null;
			}
			case 'multi': {
				const parts = (v || []).map(labelOf);
				if (answers[`${q.id}_eigene`]) parts.push(`Anderes: ${answers[`${q.id}_eigene`]}`);
				if (answers[`${q.id}_anmerkung`]) parts.push(`Anmerkung: ${answers[`${q.id}_anmerkung`]}`);
				return parts.length ? parts : null;
			}
			case 'rating':
				return q.items.map((it) => ({
					entwurf: it.label,
					punkte: v?.[it.value]?.stars ?? null,
					kommentar: v?.[it.value]?.kommentar || ''
				}));
			case 'scale':
				return v ? `${v} von ${q.max}: ${q.steps[v - q.min]}` : null;
			case 'order':
				return Array.isArray(v) ? v.map((name, i) => `${i + 1}. ${name}`) : null;
			default:
				return v?.trim?.() ? v : null;
		}
	}

	$('#download').addEventListener('click', () => {
		const now = new Date();
		const data = {
			fragebogen: 'Evolve Grappling – Redesign',
			version: 1,
			erstellt: now.toISOString(),
			ausgefuellt_von: answers.name || '',
			beantwortet: `${QUESTIONS.filter(isAnswered).length} von ${QUESTIONS.length}`,
			antworten: QUESTIONS.map((q) => ({
				id: q.id,
				abschnitt: q.section.title,
				frage: q.label,
				antwort: readable(q)
			})),
			rohdaten: answers
		};
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const a = document.createElement('a');
		const who = (answers.name || '').trim().toLowerCase().replace(/[^a-z0-9äöüß]+/g, '-').replace(/^-|-$/g, '');
		a.href = URL.createObjectURL(blob);
		a.download = `evolve-fragebogen-${who ? `${who}-` : ''}${now.toISOString().slice(0, 10)}.json`;
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(a.href), 1000);
	});

	$('#import-btn').addEventListener('click', () => $('#import').click());
	$('#import').addEventListener('change', async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		try {
			const data = JSON.parse(await file.text());
			if (!data || typeof data.rohdaten !== 'object') throw new Error('format');
			localStorage.setItem(STORE_KEY, JSON.stringify(data.rohdaten));
			location.reload();
		} catch {
			alert('Diese Datei kann ich nicht lesen. Bitte wähle eine Datei, die dieser Fragebogen heruntergeladen hat.');
		}
	});

	$('#reset').addEventListener('click', () => {
		if (!confirm('Wirklich alle Antworten löschen? Das kann man nicht rückgängig machen.')) return;
		try {
			localStorage.removeItem(STORE_KEY);
		} catch {
			/* nothing stored */
		}
		location.reload();
	});

	updateProgress();
})();
