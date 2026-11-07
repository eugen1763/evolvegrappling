(() => {
	'use strict';

	const root = document.documentElement;
	const motion = root.classList.contains('motion');
	const $ = (sel, ctx = document) => ctx.querySelector(sel);
	const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
	const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
	const smooth = (t) => t * t * (3 - 2 * t);

	const heroWrap = $('.hero-wrap');
	const cards = $$('.card');

	/* ----- plan: live board, day tabs and filter ----- */

	const DAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
	const DAY_SECONDS = 86400;

	const days = $$('.day').map((el, index) => ({
		el,
		index,
		name: el.dataset.day,
		sessions: $$('.session', el).map((sessionEl) => {
			const note = $('.s-note', sessionEl)?.textContent.trim();
			const name = $('.s-name', sessionEl).textContent.trim();
			return {
				el: sessionEl,
				day: index,
				start: Number(sessionEl.dataset.start),
				end: Number(sessionEl.dataset.end),
				cat: sessionEl.dataset.cat,
				title: name,
				name: note ? `${name} (${note})` : name,
				time: $('.s-time', sessionEl).textContent.trim()
			};
		})
	}));
	const sessions = days.flatMap((day) => day.sessions);

	const berlinFormat = new Intl.DateTimeFormat('de-DE', {
		timeZone: 'Europe/Berlin',
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hourCycle: 'h23'
	});

	function berlinNow() {
		const parts = Object.fromEntries(berlinFormat.formatToParts(new Date()).map((p) => [p.type, p.value]));
		return {
			day: DAYS.indexOf(parts.weekday),
			seconds: Number(parts.hour) * 3600 + Number(parts.minute) * 60 + Number(parts.second),
			label: `${parts.weekday}, ${parts.day}. ${parts.month}`
		};
	}

	function secondsUntil(session, now) {
		const dayGap = (session.day - now.day + 7) % 7;
		const diff = dayGap * DAY_SECONDS + session.start * 60 - now.seconds;
		return diff > 0 ? diff : diff + 7 * DAY_SECONDS;
	}

	const board = {
		frame: $('#board'),
		date: $('#board-date'),
		state: $('#board-state'),
		name: $('#board-class'),
		when: $('#board-when'),
		clock: $('#board-clock'),
		clockLabel: $('#clock-label'),
		digits: $('#clock-digits'),
		clockText: $('#clock-text'),
		progress: $('#board-progress'),
		list: $('#board-list')
	};
	const nowLine = document.createElement('div');
	nowLine.className = 'now-line';
	nowLine.hidden = true;
	nowLine.setAttribute('aria-hidden', 'true');
	$('.week-wrap').append(nowLine);

	const digits = [];
	for (const unit of ['Std.', 'Min.', 'Sek.']) {
		const group = document.createElement('span');
		group.className = 'clock-group';
		for (let i = 0; i < 2; i++) {
			const digit = document.createElement('span');
			digit.className = 'digit';
			digit.innerHTML = '<span class="digit-face">0</span>';
			digit.dataset.value = '0';
			group.append(digit);
			digits.push(digit);
		}
		const label = document.createElement('small');
		label.textContent = unit;
		group.append(label);
		board.digits.append(group);
	}

	function setDigit(digit, value) {
		if (digit.dataset.value === value) return;
		digit.dataset.value = value;
		const old = digit.lastElementChild;
		if (!motion || document.hidden) {
			old.textContent = value;
			return;
		}
		$$('.is-out', digit).forEach((face) => face.remove());
		const next = document.createElement('span');
		next.className = 'digit-face is-in';
		next.textContent = value;
		old.classList.remove('is-in');
		old.classList.add('is-out');
		old.addEventListener('animationend', () => old.remove(), { once: true });
		digit.append(next);
	}

	function setClock(totalSeconds) {
		const h = Math.min(99, Math.floor(totalSeconds / 3600));
		const m = Math.floor((totalSeconds % 3600) / 60);
		const s = totalSeconds % 60;
		const text = [h, m, s].map((n) => String(n).padStart(2, '0')).join('');
		digits.forEach((digit, i) => setDigit(digit, text[i]));
		const spoken = h > 0 ? `${h} Std. ${m} Min.` : `${m} Min.`;
		if (board.clockText.textContent !== spoken) board.clockText.textContent = spoken;
	}

	function dayLabel(session, now) {
		const gap = (session.day - now.day + 7) % 7;
		if (gap === 0) return 'Heute';
		if (gap === 1) return `Morgen, ${DAYS[session.day]}`;
		return DAYS[session.day];
	}

	let boardKey = '';

	function renderBoard() {
		const now = berlinNow();
		const minutes = now.seconds / 60;
		const today = days[now.day]?.sessions ?? [];
		// Two classes can run at the same time, for example on Matte 1 and Matte 2.
		const running = today.filter((s) => s.start <= minutes && minutes < s.end);
		const ongoing = running[0];
		const nextIn = Math.min(...sessions.map((s) => secondsUntil(s, now)));
		const nextGroup = sessions.filter((s) => secondsUntil(s, now) === nextIn);
		const next = nextGroup[0];
		const group = ongoing ? running : nextGroup;
		const focus = group[0];
		const key = `${now.day}:${ongoing ? 'on' : 'next'}:${group.map((s) => sessions.indexOf(s)).join(',')}`;

		if (key !== boardKey) {
			boardKey = key;
			let state = 'Als Nächstes';
			if (ongoing) state = 'Läuft gerade';
			else if (next.day !== now.day || next.start * 60 <= now.seconds) {
				state = today.length ? 'Heute kein Training mehr' : 'Heute kein Training';
			}
			board.frame.dataset.cat = focus.cat;
			board.frame.classList.toggle('is-running', Boolean(ongoing));
			board.date.textContent = now.label;
			board.state.textContent = state;
			board.name.textContent = group.map((s) => s.title).join(' + ');
			board.when.textContent = `${dayLabel(focus, now)}, ${[...new Set(group.map((s) => s.time))].join(' und ')} Uhr`;
			board.clockLabel.textContent = ongoing ? 'Endet in' : 'Start in';
			board.name.hidden = board.when.hidden = board.clock.hidden = false;
			board.progress.hidden = !ongoing;

			board.list.replaceChildren(
				...today.map((s) => {
					const li = document.createElement('li');
					li.dataset.cat = s.cat;
					const past = s.end <= minutes;
					if (past) li.className = 'is-past';
					if (running.includes(s)) li.className = 'is-live';
					for (const [cls, text] of [
						['b-time', s.time],
						['b-name', s.name],
						['b-status', past ? 'vorbei' : running.includes(s) ? 'läuft' : '']
					]) {
						const span = document.createElement('span');
						span.className = cls;
						span.textContent = text;
						li.append(span);
					}
					return li;
				})
			);
			board.list.hidden = !today.some((s) => s.end > minutes);
			sessions.forEach((s) => s.el.classList.toggle('is-now', running.includes(s)));
		}

		if (ongoing) {
			// The clock counts down to the first end, so that it never shows a class that is already over.
			const end = Math.min(...running.map((s) => s.end));
			setClock(end * 60 - now.seconds);
			const done = (now.seconds - ongoing.start * 60) / ((end - ongoing.start) * 60);
			board.progress.firstElementChild.style.setProperty('--v', done.toFixed(4));
		} else {
			setClock(secondsUntil(next, now));
		}

		// Rows of the desktop grid: 10:00–14:00 is rows 0–16, 16:00–22:00 is rows 20–44.
		let row = null;
		if (minutes >= 600 && minutes <= 840) row = (minutes - 600) / 15;
		else if (minutes >= 960 && minutes <= 1320) row = 20 + (minutes - 960) / 15;
		nowLine.hidden = row === null;
		if (row !== null) nowLine.style.setProperty('--now', row.toFixed(2));
	}

	let boardTimer = 0;
	function runBoard() {
		clearInterval(boardTimer);
		if (document.hidden) return;
		renderBoard();
		boardTimer = setInterval(renderBoard, 1000);
	}
	document.addEventListener('visibilitychange', runBoard);

	const plan = $('#trainingsplan');
	const week = $('#week');
	const tabs = $('#day-tabs');
	const todayIndex = berlinNow().day;

	function showDay(day, animate = true) {
		if (week.scrollWidth <= week.clientWidth + 4) return;
		const left = day.el.offsetLeft - (week.clientWidth - day.el.offsetWidth) / 2;
		week.scrollTo({ left, behavior: animate && motion ? 'smooth' : 'auto' });
	}

	days.forEach((day) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = day.name.slice(0, 2);
		button.setAttribute('aria-label', day.name);
		button.addEventListener('click', () => showDay(day));
		tabs.append(button);
		day.tab = button;

		if (day.index === todayIndex) {
			day.el.classList.add('is-today');
			$('.today-tag', day.el).hidden = false;
			button.classList.add('is-today');
		}
	});
	tabs.hidden = false;
	if (days[todayIndex]) showDay(days[todayIndex], false);

	const tabObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const current = days.find((day) => day.el === entry.target);
				days.forEach((day) => day.tab.setAttribute('aria-current', String(day === current)));
			}
		},
		{ root: week, rootMargin: '0px -45% 0px -45%' }
	);
	days.forEach((day) => tabObserver.observe(day.el));

	const filters = $$('.filter');
	filters.forEach((btn) =>
		btn.addEventListener('click', () => {
			const filter = btn.dataset.filter;
			plan.dataset.filter = filter;
			filters.forEach((b) => {
				const on = b === btn;
				b.classList.toggle('is-on', on);
				b.setAttribute('aria-pressed', String(on));
			});
			const matches = (day) => filter === 'all' || day.sessions.some((s) => s.cat === filter);
			days.forEach((day) => {
				day.el.classList.toggle('is-dim', !matches(day));
				day.tab.classList.toggle('is-dim', !matches(day));
			});
			const fromToday = [...days.slice(todayIndex), ...days.slice(0, todayIndex)];
			const target = fromToday.find(matches);
			if (target) showDay(target);
		})
	);

	runBoard();

	/* ----- posters: flip to the back side ----- */

	cards.forEach((card) => {
		const front = $('.front', card);
		const back = $('.back', card);
		const open = $('.front .flip', card);
		const heading = $('h4', back);
		heading.tabIndex = -1;
		back.inert = true;
		$$('.flip', card).forEach((btn) =>
			btn.addEventListener('click', () => {
				const on = !card.classList.contains('is-flipped');
				card.classList.toggle('is-flipped', on);
				back.inert = !on;
				front.inert = on;
				open.setAttribute('aria-expanded', String(on));
				(on ? heading : open).focus({ preventScroll: true });
			})
		);
	});

	/* ----- map: loads from OpenStreetMap only after a click ----- */

	const map = $('#map');
	$('#map-load').addEventListener('click', () => {
		const frame = document.createElement('iframe');
		frame.src = map.dataset.src;
		frame.title = 'Karte: Evolve Grappling, Schorberger Str. 66, Solingen';
		frame.loading = 'lazy';
		map.replaceChildren(frame);
		map.classList.add('is-loaded');
	});

	/* ----- sticky button ----- */

	const sticky = $('#sticky-cta');
	let pastHero = false;
	let atEnd = false;
	const syncSticky = () => sticky.classList.toggle('is-on', pastHero && !atEnd);
	const onScroll = () => {
		const past = window.scrollY > window.innerHeight * 0.3;
		if (past !== pastHero) {
			pastHero = past;
			syncSticky();
		}
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();
	if ('IntersectionObserver' in window) {
		const ends = new Set();
		const endObserver = new IntersectionObserver((entries) => {
			entries.forEach((e) => (e.isIntersecting ? ends.add(e.target) : ends.delete(e.target)));
			atEnd = ends.size > 0;
			syncSticky();
		});
		// The posters have their own buttons. The sticky button would cover them.
		endObserver.observe($('#angebot'));
		endObserver.observe($('#kontakt'));
		endObserver.observe($('.foot'));
	}

	if (!motion) return;

	/* ----- hero, ticker and poster stack ----- */

	// With scroll timelines the stylesheet moves everything that follows the scroll, in step with the compositor.
	// The script then only steers the tilt. Without them the script writes the same values per frame.
	const cssScroll = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: view()'));

	const hero = $('.hero');
	const poster = $('#poster');
	const posterTilt = $('#poster-tilt');
	const band = $('.band');
	const rowSpans = $$('.row span', poster);
	const tickerLine = $('.ticker-line');
	const tilts = cards.map((card) => $('.card-tilt', card));
	const fronts = cards.map((card) => $('.front', card));
	const belts = $('.belts');
	const stackQuery = matchMedia('(max-width: 959px)');

	// The toolbar of a mobile browser changes innerHeight during a scroll. This height stays the same.
	const probe = document.createElement('div');
	probe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100vh;height:100svh;visibility:hidden;pointer-events:none';
	document.body.appendChild(probe);
	let stableH = probe.offsetHeight || window.innerHeight;
	let stableW = window.innerWidth;

	let targetX = 0;
	let targetY = 0;
	let tiltX = 0;
	let tiltY = 0;
	let lastInput = -1e6;
	let steered = false;
	let running = false;
	let lastY = -1;
	let cardLayout = null;
	const seen = { hero: true, cards: false };

	function steer() {
		lastInput = performance.now();
		if (steered) return;
		steered = true;
		posterTilt.classList.add('is-steered');
		syncLoop();
	}

	hero.addEventListener(
		'pointermove',
		(e) => {
			if (e.pointerType === 'touch') return;
			const r = hero.getBoundingClientRect();
			targetX = ((e.clientX - r.left) / r.width - 0.5) * 2;
			targetY = ((e.clientY - r.top) / r.height - 0.5) * 2;
			steer();
		},
		{ passive: true }
	);

	// iOS needs a permission prompt for the motion sensor. There the drift from the stylesheet stays active.
	if ('DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function') {
		let base = null;
		window.addEventListener(
			'deviceorientation',
			(e) => {
				if (e.gamma == null || e.beta == null) return;
				if (!base) base = { beta: e.beta, gamma: e.gamma };
				targetX = clamp((e.gamma - base.gamma) / 22, -1, 1);
				targetY = clamp((e.beta - base.beta) / 22, -1, 1);
				steer();
			},
			{ passive: true }
		);
	}

	function drawTilt(now) {
		const idle = now - lastInput > 2600;
		const goalX = idle ? Math.sin(now / 2300) * 0.4 : targetX;
		const goalY = idle ? Math.cos(now / 3100) * 0.3 : targetY;
		tiltX += (goalX - tiltX) * 0.06;
		tiltY += (goalY - tiltY) * 0.06;
		posterTilt.style.transform = `rotateX(${(-tiltY * 3).toFixed(2)}deg) rotateY(${(tiltX * 4).toFixed(2)}deg)`;
	}

	/* ticker: one endless animation at a constant speed */

	let tickerAnim = null;
	let tickerSeen = false;
	function buildTicker() {
		const half = tickerLine.scrollWidth / 2;
		if (!half || !tickerLine.animate) return;
		if (tickerAnim) tickerAnim.cancel();
		tickerAnim = tickerLine.animate(
			[{ transform: 'translate3d(0,0,0)' }, { transform: `translate3d(${-half}px,0,0)` }],
			{ duration: (half / 32) * 1000, iterations: Infinity, easing: 'linear' }
		);
		if (!tickerSeen || document.hidden) tickerAnim.pause();
	}
	function syncTicker() {
		if (!tickerAnim) return;
		if (tickerSeen && !document.hidden) tickerAnim.play();
		else tickerAnim.pause();
	}
	buildTicker();
	if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildTicker);
	new IntersectionObserver(([entry]) => {
		tickerSeen = entry.isIntersecting;
		syncTicker();
	}).observe($('.ticker'));
	document.addEventListener('visibilitychange', syncTicker);

	/* fallback without scroll timelines */

	function measureCards() {
		// A sticky poster reports its stuck place, so the places in the flow come from the container.
		const stack = stackQuery.matches;
		let top = cards[0].parentElement.getBoundingClientRect().top + window.scrollY;
		cardLayout = cards.map((card) => {
			const style = getComputedStyle(card);
			const entry = { top, height: card.offsetHeight, stick: parseFloat(style.top) || 0 };
			if (stack) top += entry.height + (parseFloat(style.marginBottom) || 0);
			return entry;
		});
	}

	function drawHeroScroll(y) {
		const range = heroWrap.offsetHeight - stableH;
		const e = smooth(range > 0 ? clamp(y / range) : 0);
		poster.style.transform =
			`translate3d(0,${(-e * 4).toFixed(2)}%,0) rotateX(${(e * 40).toFixed(2)}deg) ` +
			`rotateZ(${(-e * 9).toFixed(2)}deg) scale(${(1 - e * 0.3).toFixed(3)})`;
		poster.style.setProperty('--spread', (1 + e * 1.1).toFixed(3));
		rowSpans.forEach((span, i) => {
			span.style.setProperty('--shift', `${((i % 2 ? 1 : -1) * e * 70).toFixed(1)}px`);
		});
		band.style.transform = `translate3d(0,${(e * 115).toFixed(1)}%,0)`;
	}

	function drawCards(y) {
		if (!cardLayout) measureCards();
		const stack = stackQuery.matches;
		const tops = cardLayout.map((c) => (stack ? Math.max(c.top - y, c.stick) : c.top - y));
		let last = 1;
		cards.forEach((card, i) => {
			const enter = smooth(clamp((stableH - tops[i]) / (stableH * 0.6)));
			last = enter;
			card.style.setProperty('--k', enter.toFixed(3));
			if (!stack) return;
			// How far the next poster covers this one.
			const cover = i + 1 < cards.length ? smooth(clamp(1 - (tops[i + 1] - tops[i]) / cardLayout[i].height)) : 0;
			const side = i % 2 ? 1 : -1;
			tilts[i].style.transform =
				`translate3d(0,${((1 - enter) * 70).toFixed(1)}px,0) rotateZ(${((1 - enter) * side * 6).toFixed(2)}deg) ` +
				`rotateX(${(-cover * 9).toFixed(2)}deg) scale(${(1 - cover * 0.07).toFixed(3)})`;
			fronts[i].style.setProperty('--dim', (cover * 0.28).toFixed(3));
		});
		if (belts) belts.style.setProperty('--gap', `${(4 + last * 28).toFixed(1)}px`);
	}

	function frame(now) {
		if (!running) return;
		if (steered && seen.hero) drawTilt(now);
		if (!cssScroll) {
			const y = window.scrollY;
			if (y !== lastY) {
				lastY = y;
				if (seen.hero) drawHeroScroll(y);
				if (seen.cards) drawCards(y);
			}
		}
		requestAnimationFrame(frame);
	}

	function syncLoop() {
		const should = !document.hidden && ((steered && seen.hero) || (!cssScroll && (seen.hero || seen.cards)));
		if (should && !running) {
			running = true;
			lastY = -1;
			requestAnimationFrame(frame);
		} else if (!should) {
			running = false;
		}
	}

	const watch = (el, key, margin = '0px') =>
		new IntersectionObserver(
			([entry]) => {
				seen[key] = entry.isIntersecting;
				syncLoop();
			},
			{ rootMargin: margin }
		).observe(el);
	watch(heroWrap, 'hero');
	if (!cssScroll) watch($('.cards'), 'cards', '20% 0px');
	document.addEventListener('visibilitychange', syncLoop);

	const relayout = () => {
		cardLayout = null;
		lastY = -1;
		if (!cssScroll) {
			tilts.forEach((el) => (el.style.transform = ''));
			fronts.forEach((el) => el.style.removeProperty('--dim'));
			drawCards(window.scrollY);
		}
	};
	window.addEventListener('resize', () => {
		// A change of height alone is the toolbar. It needs no new layout.
		if (window.innerWidth === stableW) return;
		stableW = window.innerWidth;
		stableH = probe.offsetHeight || window.innerHeight;
		buildTicker();
		relayout();
	});
	stackQuery.addEventListener('change', () => {
		relayout();
		if (window.ScrollTrigger) window.ScrollTrigger.refresh();
	});
	window.addEventListener('load', relayout);
	if (matchMedia('(hover: hover)').matches) steer();
	if (!cssScroll) drawCards(window.scrollY);
	syncLoop();

	/* ----- team: tilt with the pointer on wide screens ----- */

	if (matchMedia('(hover: hover) and (min-width: 960px)').matches) {
		$$('.coach-card').forEach((cardEl) => {
			cardEl.style.transition = 'transform .25s ease-out';
			cardEl.addEventListener('pointermove', (e) => {
				const r = cardEl.getBoundingClientRect();
				const x = (e.clientX - r.left) / r.width - 0.5;
				const y = (e.clientY - r.top) / r.height - 0.5;
				cardEl.style.transform = `rotateY(${(x * 8).toFixed(1)}deg) rotateX(${(-y * 6).toFixed(1)}deg) translateZ(8px)`;
			});
			cardEl.addEventListener('pointerleave', () => {
				cardEl.style.transform = '';
			});
		});
	}

	/* ----- scroll scenes with GSAP ----- */

	const { gsap, ScrollTrigger } = window;
	if (!gsap || !ScrollTrigger) return;
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.config({ ignoreMobileResize: true });

	$$('h2.display').forEach((h2) => {
		gsap.fromTo(
			h2,
			{ clipPath: 'inset(-20% 100% -20% 0)', xPercent: -4 },
			{
				clipPath: 'inset(-20% 0% -20% 0)',
				xPercent: 0,
				duration: 0.9,
				ease: 'power3.out',
				clearProps: 'clipPath,transform',
				scrollTrigger: { trigger: h2, start: 'top 90%', once: true }
			}
		);
	});

	const mm = gsap.matchMedia();
	mm.add('(min-width: 960px)', () => {
		const fan = gsap.timeline({
			scrollTrigger: { trigger: '.cards', start: 'top 95%', end: 'top 22%', scrub: 0.5 }
		});
		fan
			.from(tilts[0], { xPercent: 24, rotateZ: -3, ease: 'power2.out' }, 0)
			.from(tilts[1], { yPercent: 6, ease: 'power2.out' }, 0)
			.from(tilts[2], { xPercent: -24, rotateZ: 3, ease: 'power2.out' }, 0);
	});

	if (!cssScroll) {
		gsap.from('.why-photo', {
			rotateX: 8,
			scale: 0.95,
			ease: 'none',
			scrollTrigger: { trigger: '.why-photo', start: 'top bottom', end: 'top 25%', scrub: 0.3 }
		});
		gsap.fromTo(
			'.why-photo img',
			{ scale: 1.28, yPercent: -5 },
			{
				scale: 1.02,
				yPercent: 5,
				ease: 'none',
				scrollTrigger: { trigger: '.why-photo', start: 'top bottom', end: 'bottom top', scrub: 0.3 }
			}
		);
	}

	gsap.set('.session', { y: 12, opacity: 0 });
	ScrollTrigger.batch('.session', {
		start: 'top 94%',
		once: true,
		onEnter: (els) =>
			gsap.to(els, {
				y: 0,
				opacity: 1,
				duration: 0.45,
				stagger: 0.04,
				ease: 'power2.out',
				clearProps: 'transform,opacity'
			})
	});

	const euro = (value) => value.toFixed(2).replace('.', ',');
	function countUp(el, delay) {
		const target = Number(el.dataset.count);
		// The width of the final value stays reserved, so the euro sign does not move while the digits grow.
		el.style.display = 'inline-block';
		el.style.minWidth = `${el.offsetWidth}px`;
		el.textContent = euro(0);
		const start = performance.now() + delay;
		const step = (time) => {
			const t = clamp((time - start) / 1400);
			el.textContent = euro(target * (1 - Math.pow(1 - t, 3)));
			if (t < 1) requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	}

	gsap.from('.ticket', {
		yPercent: 12,
		opacity: 0,
		duration: 0.6,
		stagger: 0.1,
		ease: 'power3.out',
		scrollTrigger: { trigger: '.tickets', start: 'top 84%', once: true },
		onStart: () => $$('.price .num[data-count]').forEach((el, i) => countUp(el, 150 + i * 160))
	});
	if (!cssScroll) {
		gsap.to('.ticket-stub', {
			rotate: 4,
			x: 4,
			y: 4,
			ease: 'none',
			scrollTrigger: { trigger: '.tickets', start: 'top 55%', end: 'bottom 15%', scrub: 0.3 }
		});
	}

	window.addEventListener('load', () => ScrollTrigger.refresh());
	if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
