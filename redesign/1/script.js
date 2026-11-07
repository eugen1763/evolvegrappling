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

	/* ----- plan: today and filter ----- */

	const today = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'long' }).format(
		new Date()
	);
	$$('.day').forEach((day) => day.classList.toggle('is-today', day.dataset.day === today));

	const filters = $$('.filter');
	filters.forEach((btn) =>
		btn.addEventListener('click', () => {
			const cat = btn.dataset.filter;
			filters.forEach((b) => {
				const on = b === btn;
				b.classList.toggle('is-on', on);
				b.setAttribute('aria-pressed', String(on));
			});
			$$('.day').forEach((day) => {
				let hits = 0;
				$$('.bout', day).forEach((bout) => {
					const off = cat !== 'all' && bout.dataset.cat !== cat;
					bout.classList.toggle('is-off', off);
					if (!off) hits++;
				});
				day.classList.toggle('is-off', hits === 0);
			});
		})
	);

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

	/* ----- sticky button ----- */

	const sticky = $('#sticky-cta');
	let pastHero = false;
	let atEnd = false;
	const syncSticky = () => sticky.classList.toggle('is-on', pastHero && !atEnd);
	const onScroll = () => {
		const past = window.scrollY > window.innerHeight * 0.55;
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
		const goalX = idle ? Math.sin(now / 2300) * 0.6 : targetX;
		const goalY = idle ? Math.cos(now / 3100) * 0.45 : targetY;
		tiltX += (goalX - tiltX) * 0.06;
		tiltY += (goalY - tiltY) * 0.06;
		posterTilt.style.transform = `rotateX(${(-tiltY * 5).toFixed(2)}deg) rotateY(${(tiltX * 7).toFixed(2)}deg)`;
	}

	/* ticker: one endless animation, faster while the page scrolls */

	let tickerAnim = null;
	let tickerRate = 1;
	let tickerCalm = 0;
	let tickerSeen = false;
	function buildTicker() {
		const half = tickerLine.scrollWidth / 2;
		if (!half || !tickerLine.animate) return;
		if (tickerAnim) tickerAnim.cancel();
		tickerAnim = tickerLine.animate(
			[{ transform: 'translate3d(0,0,0)' }, { transform: `translate3d(${-half}px,0,0)` }],
			{ duration: (half / 42) * 1000, iterations: Infinity, easing: 'linear' }
		);
		tickerRate = 1;
		if (!tickerSeen || document.hidden) tickerAnim.pause();
	}
	function setTickerRate(rate) {
		if (!tickerAnim || Math.abs(rate - tickerRate) < 0.5) return;
		tickerRate = rate;
		tickerAnim.updatePlaybackRate(rate);
	}
	function syncTicker() {
		if (!tickerAnim) return;
		if (tickerSeen && !document.hidden) tickerAnim.play();
		else tickerAnim.pause();
	}
	buildTicker();
	if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildTicker);
	let tickerY = window.scrollY;
	window.addEventListener(
		'scroll',
		() => {
			const y = window.scrollY;
			const dy = Math.abs(y - tickerY);
			tickerY = y;
			if (!tickerSeen) return;
			setTickerRate(1 + Math.min(5, Math.round(dy * 0.5) / 2));
			clearTimeout(tickerCalm);
			tickerCalm = setTimeout(() => setTickerRate(1), 140);
		},
		{ passive: true }
	);
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
				cardEl.style.transform = `rotateY(${(x * 16).toFixed(1)}deg) rotateX(${(-y * 12).toFixed(1)}deg) translateZ(18px)`;
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
			.from(tilts[0], { xPercent: 104, rotateZ: -8, rotateY: 30, z: -160, ease: 'power2.out' }, 0)
			.from(tilts[1], { yPercent: 10, scale: 0.92, ease: 'power2.out' }, 0)
			.from(tilts[2], { xPercent: -104, rotateZ: 8, rotateY: -30, z: -80, ease: 'power2.out' }, 0);
	});

	if (!cssScroll) {
		gsap.from('.why-photo', {
			rotateX: 22,
			scale: 0.86,
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

	gsap.set('.bout', { rotateX: -92, opacity: 0, transformOrigin: '50% 0' });
	ScrollTrigger.batch('.bout', {
		start: 'top 94%',
		once: true,
		onEnter: (els) =>
			gsap.to(els, { rotateX: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'back.out(1.7)', clearProps: 'opacity' })
	});

	gsap.from('.ticket', {
		rotateX: 70,
		yPercent: 30,
		opacity: 0,
		transformOrigin: '50% 100%',
		duration: 0.9,
		stagger: 0.16,
		ease: 'power3.out',
		scrollTrigger: { trigger: '.tickets', start: 'top 84%', once: true }
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
