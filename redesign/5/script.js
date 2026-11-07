(() => {
	'use strict';

	const root = document.documentElement;
	const $ = (sel, ctx = document) => ctx.querySelector(sel);
	const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
	const reduce = matchMedia('(prefers-reduced-motion: reduce)');
	const clamp = (n, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
	const lerp = (a, b, t) => a + (b - a) * t;
	const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
	const backOut = (t) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);

	/* ---------- Headline lines that fill their column ---------- */
	function fitLines() {
		for (const el of $$('.fit')) {
			const parent = el.parentElement;
			const cs = getComputedStyle(parent);
			const room = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
			if (room <= 0) continue;
			let lo = 50;
			let hi = 150;
			for (let i = 0; i < 7; i++) {
				const mid = (lo + hi) / 2;
				el.style.fontStretch = mid + '%';
				if (el.offsetWidth > room) hi = mid;
				else lo = mid;
			}
			el.style.fontStretch = Math.floor(lo) + '%';
		}
	}

	/* ---------- Cube ---------- */
	// 4x4 matrices in the column-major order of CSS matrix3d().
	const ident = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	function mul(a, b) {
		const o = new Array(16);
		for (let c = 0; c < 4; c++) {
			for (let r = 0; r < 4; r++) {
				o[c * 4 + r] =
					a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
			}
		}
		return o;
	}
	const mulAll = (...ms) => ms.reduce(mul);
	function move(x, y, z) {
		const m = ident();
		m[12] = x;
		m[13] = y;
		m[14] = z;
		return m;
	}
	function scale(k) {
		const m = ident();
		m[0] = m[5] = m[10] = k;
		return m;
	}
	function turn(x, y, z, rad) {
		const c = Math.cos(rad);
		const s = Math.sin(rad);
		const t = 1 - c;
		return [
			t * x * x + c, t * x * y + s * z, t * x * z - s * y, 0,
			t * x * y - s * z, t * y * y + c, t * y * z + s * x, 0,
			t * x * z + s * y, t * y * z - s * x, t * z * z + c, 0,
			0, 0, 0, 1
		];
	}
	function transpose(m) {
		return [m[0], m[4], m[8], 0, m[1], m[5], m[9], 0, m[2], m[6], m[10], 0, 0, 0, 0, 1];
	}
	// Axis and angle of a pure rotation. The branch for 180 degrees avoids a division by zero.
	function axisAngle(m) {
		const cos = clamp((m[0] + m[5] + m[10] - 1) / 2, -1, 1);
		const ang = Math.acos(cos);
		if (ang < 1e-4) return { axis: [0, 1, 0], ang: 0 };
		if (Math.PI - ang > 1e-2) {
			const d = 2 * Math.sin(ang);
			return { axis: [(m[6] - m[9]) / d, (m[8] - m[2]) / d, (m[1] - m[4]) / d], ang };
		}
		const xx = (m[0] + 1) / 2;
		const yy = (m[5] + 1) / 2;
		const zz = (m[10] + 1) / 2;
		let axis;
		if (xx >= yy && xx >= zz) {
			const x = Math.sqrt(xx);
			axis = [x, m[4] / (2 * x), m[8] / (2 * x)];
		} else if (yy >= zz) {
			const y = Math.sqrt(yy);
			axis = [m[4] / (2 * y), y, m[9] / (2 * y)];
		} else {
			const z = Math.sqrt(zz);
			axis = [m[8] / (2 * z), m[9] / (2 * z), z];
		}
		const len = Math.hypot(...axis) || 1;
		return { axis: axis.map((n) => n / len), ang };
	}

	const HALF = Math.PI / 2;
	// Scroll progress of the hero at which the tiles lie flat in the grid.
	const FLAT_AT = 0.95;
	const TOUR = ['front', 'right', 'top', 'back', 'left', 'bottom'];
	// Position of each face in the flat net, in tile units, with the front face at the origin.
	const NET = { front: [0, 0], right: [1, 0], left: [-1, 0], top: [0, -1], bottom: [0, 1], back: [0, 2] };

	function initCube() {
		const hero = $('.hero');
		const pin = $('.hero__pin');
		const wrap = $('.cube-wrap');
		const cube = $('#cube');
		const head = $('.cube-head');
		const lead = $('.hero__lead');
		const title = $('.hero__title');
		const nowName = $('#now-name');
		const nowRest = $('#now-rest');
		if (!hero || !cube) return {};

		const faces = $$('.face', cube).map((el) => ({
			el,
			key: el.dataset.face,
			cat: el.className.match(/face--(\w+)/)[1],
			front: $('.side--front', el),
			back: $('.side--back', el)
		}));
		const byKey = Object.fromEntries(faces.map((f) => [f.key, f]));
		const dots = $$('.dot');

		let on = false;
		let visible = true;
		let raf = 0;
		let geo = null;
		let R = ident();
		let anim = null;
		let drag = null;
		let current = 'front';
		let idleAt = 0;
		let p = 0;
		let ps = 0;
		let flat = false;
		let blockClick = false;
		let first = true;

		// Each face hangs on a hinge. An angle of 90 degrees closes the cube, 0 gives the flat net.
		// The back face hangs on the bottom face. Its content is turned by 180 degrees in the cube,
		// so that it is upright after a turn about the vertical axis. `spin` removes that turn again.
		function hinge(key, a, b, c, spin) {
			const h = geo.h;
			switch (key) {
				case 'front':
					return move(0, 0, h);
				case 'right':
					return mulAll(move(h, 0, h), turn(0, 1, 0, a), move(h, 0, 0));
				case 'left':
					return mulAll(move(-h, 0, h), turn(0, 1, 0, -a), move(-h, 0, 0));
				case 'top':
					return mulAll(move(0, -h, h), turn(1, 0, 0, b), move(0, -h, 0));
				case 'bottom':
					return mulAll(move(0, h, h), turn(1, 0, 0, -b), move(0, h, 0));
				default:
					return mulAll(
						move(0, h, h),
						turn(1, 0, 0, -b),
						move(0, h, 0),
						move(0, h, 0),
						turn(1, 0, 0, -c),
						move(0, h, 0),
						turn(0, 0, 1, spin)
					);
			}
		}
		const rotationOf = (m) => [m[0], m[1], m[2], 0, m[4], m[5], m[6], 0, m[8], m[9], m[10], 0, 0, 0, 0, 1];

		function measure() {
			const cr = cube.getBoundingClientRect();
			const pr = pin.getBoundingClientRect();
			const t = faces[0].el.offsetWidth;
			const zoneTop = title.getBoundingClientRect().bottom - cr.top;
			// The cube gets the room between the title and the highest visible item of the lead.
			const leadTop = Math.min(
				...Array.from(lead.children)
					.filter((el) => el.offsetParent)
					.map((el) => el.getBoundingClientRect().top)
			);
			const zoneBottom = leadTop - cr.top;
			const zone = Math.max(120, zoneBottom - zoneTop);
			const side = Math.min(pr.width * 0.6, zone * 0.6, 330);
			const netTile = Math.min(cube.offsetWidth / 3, cube.offsetHeight / 4) * 0.96;
			geo = {
				t,
				h: t / 2,
				g: faces.map((f) => [f.el.offsetLeft + f.el.offsetWidth / 2, f.el.offsetTop + f.el.offsetHeight / 2]),
				cubeAt: [pr.left + pr.width / 2 - cr.left, (zoneTop + zoneBottom) / 2],
				cubeK: side / t,
				netAt: [cube.offsetWidth / 2, cube.offsetHeight / 2 - netTile / 2],
				netK: netTile / t,
				stickTop: parseFloat(getComputedStyle(pin).top) || 0,
				pinH: pin.offsetHeight,
				heroTop: hero.getBoundingClientRect().top + scrollY,
				heroH: hero.offsetHeight
			};
			geo.closed = Object.fromEntries(
				faces.map((f) => [f.key, rotationOf(hinge(f.key, HALF, HALF, HALF, Math.PI))])
			);
		}

		function frontOf(rot) {
			let best = current;
			let bestZ = -2;
			for (const f of faces) {
				const z = mul(rot, geo.closed[f.key])[10];
				if (z > bestZ) {
					bestZ = z;
					best = f.key;
				}
			}
			return best;
		}

		function setCurrent(key) {
			if (key === current) return;
			current = key;
			const f = byKey[key];
			nowName.textContent = f.el.dataset.name;
			nowName.dataset.cat = f.cat === 'nogi' ? 'bjj' : f.cat;
			nowRest.textContent = f.el.dataset.rest;
			for (const d of dots) d.setAttribute('aria-current', String(d.dataset.to === key));
			syncTab();
			nowName.animate(
				[
					{ transform: 'translateY(60%) rotate(-4deg)', opacity: 0 },
					{ transform: 'none', opacity: 1 }
				],
				{ duration: 220, easing: 'steps(3, end)' }
			);
		}

		// A face on the far side of the cube is not visible, so it must not take the keyboard focus.
		function syncTab() {
			for (const f of faces) f.front.tabIndex = flat || f.key === current ? 0 : -1;
		}

		function snapTo(key, duration = 620) {
			const target = transpose(geo.closed[key]);
			const { axis, ang } = axisAngle(mul(target, transpose(R)));
			anim = { from: R, target, axis, ang, t0: performance.now(), duration };
			setCurrent(key);
		}

		function setFlat(next) {
			if (flat === next) return;
			flat = next;
			cube.classList.toggle('is-flat', flat);
			if (flat) {
				for (const f of faces) f.el.style.transform = '';
			} else {
				for (const f of faces) flip(f, false);
			}
			syncTab();
		}

		function flip(f, open) {
			f.el.classList.toggle('is-flipped', open);
			f.front.setAttribute('aria-expanded', String(open));
		}

		function render(now) {
			// No layout read per frame: iOS Safari scrolls on another thread and a forced layout costs a frame there.
			p = clamp((geo.stickTop - geo.heroTop + scrollY) / Math.max(1, geo.heroH - geo.pinH));
			ps = first || Math.abs(p - ps) < 0.0008 ? p : ps + (p - ps) * 0.22;
			first = false;

			const q = clamp(ps / 0.14);
			const u = clamp((ps - 0.14) / 0.44);
			const v = clamp((ps - 0.58) / 0.36);

			lead.style.opacity = String(1 - clamp(ps / 0.07));
			lead.classList.toggle('is-off', ps > 0.07);
			head.style.opacity = String(clamp((ps - 0.8) / 0.12));
			root.classList.toggle('hero-open', ps > 0.07);
			wrap.classList.toggle('is-grab', ps < 0.02 && !drag);

			if (ps >= FLAT_AT) {
				setFlat(true);
				return;
			}
			setFlat(false);

			if (anim) {
				const tt = clamp((now - anim.t0) / anim.duration);
				R = tt >= 1 ? anim.target : mul(turn(...anim.axis, anim.ang * backOut(tt)), anim.from);
				if (tt >= 1) anim = null;
			} else if (!drag && ps < 0.01 && now > idleAt) {
				snapTo(TOUR[(TOUR.indexOf(current) + 1) % TOUR.length], 900);
				idleAt = now + 3000;
			}
			if (drag || (!anim && ps < 0.01)) setCurrent(frontOf(R));

			if (v > 0) {
				faces.forEach((f, i) => {
					const e = easeInOut(clamp(v * 1.3 - i * 0.06));
					const net = NET[f.key];
					const x = lerp(geo.netAt[0] + geo.netK * geo.t * net[0], geo.g[i][0], e) - geo.g[i][0];
					const y = lerp(geo.netAt[1] + geo.netK * geo.t * net[1], geo.g[i][1], e) - geo.g[i][1];
					// Safari sorts the tiles of one 3D context by depth. Tiles that cross in one plane flicker,
					// so each tile has its own depth until it is in its place.
					const lift = (1 - e) * (f.key === 'back' ? 14 : i + 1);
					let m = mul(move(x, y, lift), scale(lerp(geo.netK, 1, e)));
					if (f.key === 'back') m = mul(m, turn(0, 0, 1, Math.PI * (1 - e)));
					f.el.style.transform = `matrix3d(${m.map((n) => +n.toFixed(4)).join(',')})`;
				});
				return;
			}

			// The scroll first turns the cube to its front, then it opens the hinges.
			const eq = easeInOut(q);
			let rot = R;
			if (q > 0) {
				const back = axisAngle(transpose(R));
				rot = mul(turn(...back.axis, back.ang * eq), R);
			}
			const tilt = mul(turn(1, 0, 0, -0.22 * (1 - eq)), turn(0, 1, 0, -0.38 * (1 - eq)));
			const eu = easeInOut(u);
			const k = lerp(geo.cubeK, geo.netK, easeInOut(clamp(u / 0.5)));
			const at = [lerp(geo.cubeAt[0], geo.netAt[0], eu), lerp(geo.cubeAt[1], geo.netAt[1], eu)];
			const a = HALF * (1 - easeInOut(clamp(u / 0.6)));
			const b = HALF * (1 - easeInOut(clamp((u - 0.2) / 0.6)));
			const c = HALF * (1 - easeInOut(clamp((u - 0.4) / 0.6)));
			const base = mulAll(scale(k), tilt, rot, move(0, 0, -geo.h * eu));
			cube.style.perspectiveOrigin = `${at[0]}px ${at[1]}px`;
			faces.forEach((f, i) => {
				const m = mulAll(move(at[0] - geo.g[i][0], at[1] - geo.g[i][1], 0), base, hinge(f.key, a, b, c, Math.PI));
				f.el.style.transform = `matrix3d(${m.map((n) => +n.toFixed(4)).join(',')})`;
			});
		}

		function loop(now) {
			raf = 0;
			if (!on || !visible || document.hidden) return;
			render(now);
			raf = requestAnimationFrame(loop);
		}
		const wake = () => {
			if (on && !raf) raf = requestAnimationFrame(loop);
		};

		// Drag: the cube follows the pointer. A touch turns it only sideways, so that a vertical swipe scrolls the page.
		wrap.addEventListener('pointerdown', (e) => {
			if (!on || flat || ps > 0.02 || e.button > 0) return;
			drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0, touch: e.pointerType === 'touch', trail: [] };
			anim = null;
		});
		wrap.addEventListener('pointermove', (e) => {
			if (!drag || e.pointerId !== drag.id) return;
			const dx = e.clientX - drag.x;
			const dy = drag.touch ? 0 : e.clientY - drag.y;
			drag.x = e.clientX;
			drag.y = e.clientY;
			drag.moved += Math.abs(dx) + Math.abs(dy);
			if (drag.moved > 6 && !drag.held) {
				drag.held = true;
				wrap.setPointerCapture(drag.id);
				wrap.classList.add('is-grabbing');
			}
			const gain = HALF / (geo.t * geo.cubeK * 0.9);
			R = mulAll(turn(1, 0, 0, -dy * gain), turn(0, 1, 0, dx * gain), R);
			drag.trail.push({ dx, dy, t: e.timeStamp });
			if (drag.trail.length > 6) drag.trail.shift();
		});
		function release(e) {
			if (!drag || e.pointerId !== drag.id) return;
			const recent = drag.trail.filter((s) => e.timeStamp - s.t < 110);
			const span = recent.length ? Math.max(16, e.timeStamp - recent[0].t) : 1;
			const gain = HALF / (geo.t * geo.cubeK * 0.9);
			// The throw decides which face the cube lands on.
			const throwX = (recent.reduce((n, s) => n + s.dx, 0) / span) * 170 * gain;
			const throwY = (recent.reduce((n, s) => n + s.dy, 0) / span) * 170 * gain;
			const ahead = mulAll(turn(1, 0, 0, -throwY), turn(0, 1, 0, throwX), R);
			blockClick = drag.moved > 6;
			wrap.classList.remove('is-grabbing');
			drag = null;
			snapTo(frontOf(ahead));
			idleAt = performance.now() + 7000;
		}
		wrap.addEventListener('pointerup', release);
		wrap.addEventListener('pointercancel', release);
		wrap.addEventListener('dragstart', (e) => e.preventDefault());

		wrap.addEventListener(
			'click',
			(e) => {
				if (blockClick) {
					blockClick = false;
					e.preventDefault();
					e.stopPropagation();
				}
			},
			true
		);

		for (const d of dots) {
			d.addEventListener('click', () => {
				if (!on || ps > 0.02) return;
				snapTo(d.dataset.to);
				idleAt = performance.now() + 9000;
			});
		}

		// Flat tiles flip on tap. In the cube, the link goes to the section of the class.
		for (const f of faces) {
			f.front.setAttribute('role', 'button');
			f.front.setAttribute('aria-expanded', 'false');
			f.front.addEventListener('click', (e) => {
				if (on && !flat) {
					if (ps > 0.02) e.preventDefault();
					return;
				}
				e.preventDefault();
				flip(f, true);
				$('.side__go', f.el).focus({ preventScroll: true });
			});
			f.front.addEventListener('keydown', (e) => {
				if (e.key === ' ') {
					e.preventDefault();
					f.front.click();
				}
			});
			f.back.addEventListener('click', (e) => {
				if (e.target.closest('a')) return;
				flip(f, false);
			});
			f.back.addEventListener('keydown', (e) => {
				if (e.key === 'Escape') {
					flip(f, false);
					f.front.focus({ preventScroll: true });
				}
			});
		}

		function setMode() {
			on = !reduce.matches;
			root.classList.toggle('cube-on', on);
			if (on) {
				measure();
				flat = true;
				setFlat(false);
				current = '';
				setCurrent(frontOf(R));
				idleAt = performance.now() + 2200;
				wake();
			} else {
				cancelAnimationFrame(raf);
				raf = 0;
				flat = false;
				setFlat(true);
				lead.style.opacity = '';
				head.style.opacity = '';
				lead.classList.remove('is-off');
			}
		}

		new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			wake();
		}).observe(hero);
		document.addEventListener('visibilitychange', wake);
		reduce.addEventListener('change', setMode);

		let lastW = innerWidth;
		addEventListener('resize', () => {
			// A mobile browser changes the height when its toolbar hides. The layout uses svh units, so only the width counts.
			if (innerWidth === lastW) return;
			lastW = innerWidth;
			fitLines();
			if (on) measure();
		});

		setMode();
		return {
			remeasure: () => on && measure()
		};
	}

	/* ---------- Trainingsplan ---------- */
	function initPlan() {
		const chips = $$('.chip');
		const slots = $$('.slot');
		const days = $$('.day');
		if (!chips.length) return;

		function apply(cat) {
			const before = new Map(slots.map((s) => [s, s.classList.contains('is-off') ? null : s.getBoundingClientRect()]));
			for (const c of chips) c.setAttribute('aria-pressed', String(c.dataset.cat === cat));
			for (const s of slots) s.classList.toggle('is-off', cat !== 'all' && s.dataset.cat !== cat);
			for (const d of days) d.classList.toggle('is-empty', !$('.slot:not(.is-off)', d));
			if (reduce.matches) return;
			slots.forEach((s, i) => {
				if (s.classList.contains('is-off')) return;
				const was = before.get(s);
				const is = s.getBoundingClientRect();
				if (!was) {
					s.animate(
						[
							{ transform: 'scale(0.6) rotate(-5deg)', opacity: 0 },
							{ transform: 'none', opacity: 1 }
						],
						{ duration: 260, delay: i * 14, easing: 'cubic-bezier(.2,1.5,.4,1)', fill: 'backwards' }
					);
					return;
				}
				const dx = was.left - is.left;
				const dy = was.top - is.top;
				s.animate(
					[
						{ transform: `translate(${dx}px, ${dy}px)` },
						{ transform: `translate(${dx * 0.15}px, ${dy * 0.15 - 18}px) rotate(-1.5deg)`, offset: 0.55 },
						{ transform: 'none' }
					],
					{ duration: 420, delay: i * 14, easing: 'cubic-bezier(.3,1.2,.5,1)', fill: 'backwards' }
				);
			});
		}

		for (const c of chips) c.addEventListener('click', () => apply(c.dataset.cat));
		for (const a of $$('[data-filter]')) a.addEventListener('click', () => apply(a.dataset.filter));

		const today = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'long' }).format(new Date());
		const day = days.find((d) => d.dataset.day === today);
		if (day) {
			day.classList.add('is-today');
			const tag = document.createElement('span');
			tag.className = 'heute';
			tag.textContent = 'Heute';
			$('.day__name', day).append(tag);
		}
	}

	/* ---------- Blocks that slam in ---------- */
	function initSlam() {
		const items = $$('[data-slam]');
		if (!('IntersectionObserver' in window)) {
			for (const el of items) el.classList.add('in');
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add('in');
					io.unobserve(entry.target);
				}
			},
			{ rootMargin: '0px 0px -12% 0px' }
		);
		for (const el of items) io.observe(el);
	}

	/* ---------- Reveals on iOS ---------- */
	// iOS Safari runs scroll-driven CSS animation on the main thread, one frame behind the scroll.
	// There the same keyframes play one time when the element enters the view.
	function initReveal() {
		const ios = CSS.supports('-webkit-touch-callout', 'none') || location.hash === '#reveal';
		if (!ios || reduce.matches || !CSS.supports('animation-timeline', 'view()')) return;
		root.classList.add('reveal');
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add('seen');
					io.unobserve(entry.target);
				}
			},
			{ rootMargin: '0px 0px -14% 0px' }
		);
		const sel = '.rule, .sec .h-fit, .kurs__body .h-fit, .kurs__art, .warum__photo, .belts li, .people, .day, .frame';
		for (const el of $$(sel)) io.observe(el);
	}

	/* ---------- Sticky button ---------- */
	function initSticky() {
		const sticky = $('#sticky');
		const contact = $('#kontakt');
		if (!sticky || !contact) return;
		new IntersectionObserver(([entry]) => {
			sticky.classList.toggle('is-hidden', entry.isIntersecting);
		}).observe(contact);
	}

	/* ---------- Team cards tilt under the mouse ---------- */
	function initTilt() {
		if (!matchMedia('(hover: hover) and (min-width: 900px)').matches) return;
		for (const card of $$('.person')) {
			card.addEventListener('pointermove', (e) => {
				if (reduce.matches) return;
				const r = card.getBoundingClientRect();
				const x = (e.clientX - r.left) / r.width - 0.5;
				const y = (e.clientY - r.top) / r.height - 0.5;
				card.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(12px)`;
			});
			card.addEventListener('pointerleave', () => {
				card.style.transform = '';
			});
		}
	}

	/* ---------- Omoplata iframe: height from the widget ---------- */
	function initFrame() {
		const ORIGIN = 'https://evolve-grappling.omoplata.de';
		const frame = $('#omoplata-trial');
		if (!(frame instanceof HTMLIFrameElement)) return;
		const ask = () => frame.contentWindow?.postMessage(['requestHeight'], ORIGIN);
		addEventListener('message', (e) => {
			if (e.origin !== ORIGIN || e.source !== frame.contentWindow) return;
			if (Array.isArray(e.data) && e.data[0] === 'setHeight') {
				frame.style.height = Math.max(0, Number(e.data[1]) || 0) + 'px';
			}
		});
		addEventListener('resize', ask);
		frame.addEventListener('load', () => {
			ask();
			setTimeout(ask, 250);
			setTimeout(ask, 1000);
		});
	}

	fitLines();
	const cube = initCube();
	initPlan();
	initSlam();
	initReveal();
	initSticky();
	initTilt();
	initFrame();
	root.classList.add('ready');

	// The font changes the width of every line and with it the size of the tiles.
	document.fonts?.ready.then(() => {
		fitLines();
		cube.remeasure?.();
	});
})();
