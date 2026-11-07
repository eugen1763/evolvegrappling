const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
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

/* ---------- Live board ---------- */

const board = {
	frame: $('.board-frame'),
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

const flips = [];
for (const unit of ['Std.', 'Min.', 'Sek.']) {
	const group = document.createElement('span');
	group.className = 'clock-group';
	for (let i = 0; i < 2; i++) {
		const flip = document.createElement('span');
		flip.className = 'flip';
		flip.innerHTML = '<span class="flip-face">0</span>';
		flip.dataset.value = '0';
		group.append(flip);
		flips.push(flip);
	}
	const label = document.createElement('small');
	label.textContent = unit;
	group.append(label);
	board.digits.append(group);
}

function setDigit(flip, value) {
	if (flip.dataset.value === value) return;
	flip.dataset.value = value;
	const old = flip.lastElementChild;
	if (reducedMotion.matches || document.hidden) {
		old.textContent = value;
		return;
	}
	$$('.is-out', flip).forEach((face) => face.remove());
	const next = document.createElement('span');
	next.className = 'flip-face is-in';
	next.textContent = value;
	old.classList.remove('is-in');
	old.classList.add('is-out');
	old.addEventListener('animationend', () => old.remove(), { once: true });
	flip.append(next);
}

function setClock(totalSeconds) {
	const h = Math.min(99, Math.floor(totalSeconds / 3600));
	const m = Math.floor((totalSeconds % 3600) / 60);
	const s = totalSeconds % 60;
	const text = [h, m, s].map((n) => String(n).padStart(2, '0')).join('');
	flips.forEach((flip, i) => setDigit(flip, text[i]));
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
	const ongoing = today.find((s) => s.start <= minutes && minutes < s.end);
	const next = sessions.reduce((best, s) => (secondsUntil(s, now) < secondsUntil(best, now) ? s : best));
	const focus = ongoing ?? next;
	const key = `${now.day}:${ongoing ? 'on' : 'next'}:${sessions.indexOf(focus)}`;

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
		board.name.textContent = focus.name;
		board.when.textContent = `${dayLabel(focus, now)}, ${focus.time} Uhr`;
		board.clockLabel.textContent = ongoing ? 'Endet in' : 'Start in';
		board.name.hidden = board.when.hidden = board.clock.hidden = false;
		board.progress.hidden = !ongoing;

		board.list.replaceChildren(
			...today.map((s) => {
				const li = document.createElement('li');
				li.dataset.cat = s.cat;
				const past = s.end <= minutes;
				if (past) li.className = 'is-past';
				if (s === ongoing) li.className = 'is-live';
				for (const [cls, text] of [
					['b-time', s.time],
					['b-name', s.name],
					['b-status', past ? 'vorbei' : s === ongoing ? 'läuft' : '']
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
		sessions.forEach((s) => s.el.classList.toggle('is-now', s === ongoing));
	}

	if (ongoing) {
		setClock(ongoing.end * 60 - now.seconds);
		const done = (now.seconds - ongoing.start * 60) / ((ongoing.end - ongoing.start) * 60);
		board.progress.firstElementChild.style.setProperty('--v', done.toFixed(4));
	} else {
		setClock(secondsUntil(next, now));
	}

	// Rows of the desktop grid: 10:00–13:00 is rows 0–12, 16:00–20:00 is rows 16–32.
	let row = null;
	if (minutes >= 600 && minutes <= 780) row = (minutes - 600) / 15;
	else if (minutes >= 960 && minutes <= 1200) row = 16 + (minutes - 960) / 15;
	nowLine.hidden = row === null;
	if (row !== null) nowLine.style.setProperty('--now', row.toFixed(2));

	return now;
}

let boardTimer = 0;
function runBoard() {
	clearInterval(boardTimer);
	if (document.hidden) return;
	renderBoard();
	boardTimer = setInterval(renderBoard, 1000);
}
document.addEventListener('visibilitychange', runBoard);

/* ---------- Week: today, day tabs, filter ---------- */

const plan = $('#trainingsplan');
const week = $('#week');
const tabs = $('#day-tabs');
const todayIndex = berlinNow().day;

function weekScrolls() {
	return week.scrollWidth > week.clientWidth + 4;
}

function showDay(day, smooth = true) {
	if (!weekScrolls()) return;
	const left = day.el.offsetLeft - (week.clientWidth - day.el.offsetWidth) / 2;
	week.scrollTo({ left, behavior: smooth && !reducedMotion.matches ? 'smooth' : 'auto' });
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

const filterButtons = $$('#filters button');
filterButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const filter = button.dataset.filter;
		plan.dataset.filter = filter;
		filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));

		const matches = (day) => filter === 'all' || day.sessions.some((s) => s.cat === filter);
		days.forEach((day) => {
			day.el.classList.toggle('is-dim', !matches(day));
			day.tab.classList.toggle('is-dim', !matches(day));
		});
		const fromToday = [...days.slice(todayIndex), ...days.slice(0, todayIndex)];
		const target = fromToday.find(matches);
		if (target) showDay(target);
	});
});

runBoard();

/* ---------- Pointer tilt ---------- */

if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion.matches) {
	$$('[data-tilt]').forEach((el) => {
		el.addEventListener('pointermove', (event) => {
			const rect = el.getBoundingClientRect();
			el.style.setProperty('--tx', (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
			el.style.setProperty('--ty', (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
			el.style.setProperty('--lit', '1');
		});
		el.addEventListener('pointerleave', () => {
			el.style.setProperty('--tx', '0');
			el.style.setProperty('--ty', '0');
			el.style.setProperty('--lit', '0');
		});
	});
}

/* ---------- Price count-up ---------- */

const euro = (value) => value.toFixed(2).replace('.', ',');
if (!reducedMotion.matches) {
	const countObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				countObserver.unobserve(entry.target);
				const el = entry.target;
				const target = Number(el.dataset.count);
				el.style.display = 'inline-block';
				el.style.minWidth = `${el.offsetWidth}px`;
				const start = performance.now();
				const step = (time) => {
					const t = Math.min(1, (time - start) / 1400);
					el.textContent = euro(target * (1 - Math.pow(1 - t, 3)));
					if (t < 1) requestAnimationFrame(step);
				};
				requestAnimationFrame(step);
			}
		},
		{ threshold: 0.8 }
	);
	$$('[data-count]').forEach((el) => countObserver.observe(el));
}

/* ---------- Sticky button and header ---------- */

const sticky = $('#sticky-cta');
const covered = new Set();
const stickyObserver = new IntersectionObserver((entries) => {
	for (const entry of entries) {
		if (entry.isIntersecting) covered.add(entry.target);
		else covered.delete(entry.target);
	}
	sticky.classList.toggle('is-hidden', covered.size > 0);
});
stickyObserver.observe($('#hero-cta'));
stickyObserver.observe($('#kontakt'));

const head = $('#site-head');
const onScroll = () => head.classList.toggle('is-scrolled', scrollY > 24);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Hero mat (WebGL) ---------- */

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uFar;
uniform vec4 uRipples[4];
varying vec2 vUv;
varying float vTop;
varying float vGlow;
varying float vDist;
varying float vSeed;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
	vec3 center = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;

	float swell = sin(center.z * 0.38 + uTime * 0.9) * sin(center.x * 0.22 - uTime * 0.35);
	float waveZ = mix(-uFar, 6.0, fract(uTime / 7.0));
	float band = exp(-pow(center.z - waveZ, 2.0) * 0.09);

	float ring = 0.0;
	for (int i = 0; i < 4; i++) {
		vec4 r = uRipples[i];
		float age = uTime - r.z;
		if (r.w > 0.0 && age > 0.0 && age < 7.0) {
			float d = distance(center.xz, r.xy);
			ring += exp(-pow(d - age * 4.5, 2.0) * 0.7) * exp(-age * 0.6) * r.w;
		}
	}

	vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
	world.y += swell * 0.04 + band * 0.26 + ring * 0.42;
	vec4 view = viewMatrix * world;

	vUv = uv;
	vTop = step(0.5, normal.y);
	vGlow = clamp(band * 0.9 + ring * 1.3, 0.0, 1.6);
	vDist = -view.z;
	vSeed = hash(center.xz);
	gl_Position = projectionMatrix * view;
}`;

const FRAGMENT = /* glsl */ `
uniform vec3 uTop;
uniform vec3 uSide;
uniform vec3 uGlow;
uniform vec3 uFog;
uniform float uFar;
varying vec2 vUv;
varying float vTop;
varying float vGlow;
varying float vDist;
varying float vSeed;

void main() {
	vec2 edge = abs(vUv - 0.5) * 2.0;
	float rim = smoothstep(0.82, 1.0, max(edge.x, edge.y));

	vec3 color = mix(uSide, uTop * (0.75 + vSeed * 0.5), vTop);
	float nearness = 1.0 - smoothstep(2.0, uFar * 0.6, vDist);
	color += uGlow * vTop * (rim * (0.1 + nearness * 0.22 + vGlow * 0.9) + vGlow * 0.14);
	color += uGlow * (1.0 - vTop) * (0.06 + vGlow * 0.95);
	color = mix(color, uFog, smoothstep(2.0, uFar * 0.75, vDist));

	float alpha = 1.0 - smoothstep(uFar * 0.3, uFar * 0.95, vDist);
	gl_FragColor = vec4(color, alpha);
	#include <colorspace_fragment>
}`;

async function initMat() {
	const hero = $('#hero');
	const canvas = $('#hero-mat');
	let THREE;
	let renderer;
	try {
		THREE = await import('../assets/vendor/three.module.min.js');
		renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
	} catch {
		// The CSS floor stays visible as the static picture.
		return;
	}

	const FOV = 55;
	const FAR = 36;
	const CAMERA_HEIGHT = 2.1;
	const TILE_WIDTH = 0.44;
	const TILE_DEPTH = 0.88;
	const MAX_COLUMNS = 170;
	const halfFov = Math.tan(THREE.MathUtils.degToRad(FOV / 2));

	renderer.setClearColor(0x000000, 0);
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 90);
	camera.position.set(0, CAMERA_HEIGHT, 0);

	const ripples = Array.from({ length: 4 }, () => new THREE.Vector4(0, 0, 0, 0));
	const uniforms = {
		uTime: { value: 0 },
		uFar: { value: FAR },
		uRipples: { value: ripples },
		uTop: { value: new THREE.Color('#0d3740') },
		uSide: { value: new THREE.Color('#03151a') },
		uGlow: { value: new THREE.Color('#6fe0e6') },
		uFog: { value: new THREE.Color('#0d343c') }
	};
	const material = new THREE.ShaderMaterial({
		uniforms,
		vertexShader: VERTEX,
		fragmentShader: FRAGMENT,
		transparent: true
	});
	const geometry = new THREE.BoxGeometry(TILE_WIDTH * 0.93, 0.08, TILE_DEPTH * 0.965);

	let mesh = null;
	let builtColumns = 0;
	function buildMat(columns) {
		if (mesh) {
			scene.remove(mesh);
			mesh.dispose();
		}
		const rows = Math.ceil((FAR + 3) / TILE_DEPTH);
		mesh = new THREE.InstancedMesh(geometry, material, columns * rows);
		mesh.frustumCulled = false;
		const matrix = new THREE.Matrix4();
		let i = 0;
		for (let row = 0; row < rows; row++) {
			// Each second row shifts by half a tile, the way tatami mats are laid.
			const shift = row % 2 ? 0.5 : 0;
			for (let col = 0; col < columns; col++) {
				matrix.makeTranslation((col - columns / 2 + shift) * TILE_WIDTH, 0, 2 - row * TILE_DEPTH);
				mesh.setMatrixAt(i++, matrix);
			}
		}
		scene.add(mesh);
		builtColumns = columns;
	}

	let time = 0;
	let rippleIndex = 0;
	function addRipple(x, z, strength) {
		ripples[rippleIndex].set(x, z, time, strength);
		rippleIndex = (rippleIndex + 1) % ripples.length;
	}

	function layout() {
		const width = hero.clientWidth;
		const height = hero.clientHeight;
		renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
		renderer.setSize(width, height, false);
		camera.aspect = width / height;
		// The pitch puts the horizon of the mat on the --horizon line of the CSS layout.
		const horizon = parseFloat(getComputedStyle(hero).getPropertyValue('--horizon')) / 100 || 0.54;
		camera.rotation.set(Math.atan((2 * horizon - 1) * halfFov), 0, 0);
		camera.updateProjectionMatrix();

		const columns = Math.min(MAX_COLUMNS, Math.ceil((2 * FAR * halfFov * camera.aspect) / TILE_WIDTH) + 4);
		if (columns > builtColumns) buildMat(columns);
	}

	function render() {
		const progress = Math.min(1, Math.max(0, scrollY / hero.offsetHeight));
		camera.position.set(0, CAMERA_HEIGHT - progress * 0.5, -progress * 5);
		uniforms.uTime.value = time;
		renderer.render(scene, camera);
	}

	const raycaster = new THREE.Raycaster();
	const pointer = new THREE.Vector2();
	const floor = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
	const hit = new THREE.Vector3();
	function rippleAt(event, strength) {
		const rect = canvas.getBoundingClientRect();
		pointer.set(
			((event.clientX - rect.left) / rect.width) * 2 - 1,
			-((event.clientY - rect.top) / rect.height) * 2 + 1
		);
		raycaster.setFromCamera(pointer, camera);
		if (raycaster.ray.intersectPlane(floor, hit) && hit.z > -FAR) addRipple(hit.x, hit.z, strength);
	}

	let running = false;
	let inView = true;
	let frame = 0;
	let last = 0;
	let nextAutoRipple = 0.4;
	let lastMove = 0;

	function tick(now) {
		frame = requestAnimationFrame(tick);
		time += Math.min((now - last) / 1000, 0.05);
		last = now;
		if (time > nextAutoRipple) {
			const z = -4 - Math.random() * 14;
			const reach = -z * halfFov * camera.aspect * 0.7;
			addRipple((Math.random() * 2 - 1) * reach, z, 0.75);
			nextAutoRipple = time + 3 + Math.random() * 2.5;
		}
		render();
	}

	function sync() {
		const shouldRun = inView && !document.hidden && !reducedMotion.matches;
		if (shouldRun && !running) {
			running = true;
			last = performance.now();
			frame = requestAnimationFrame(tick);
		} else if (!shouldRun && running) {
			running = false;
			cancelAnimationFrame(frame);
		}
	}

	layout();
	if (reducedMotion.matches) {
		// One still frame with a ripple in mid-travel.
		time = 5.2;
		ripples[0].set(0, -7, 4.2, 1);
	}
	render();
	hero.classList.add('is-live');

	new ResizeObserver(() => {
		layout();
		render();
	}).observe(hero);
	new IntersectionObserver(([entry]) => {
		inView = entry.isIntersecting;
		sync();
	}).observe(hero);
	document.addEventListener('visibilitychange', sync);
	reducedMotion.addEventListener('change', sync);

	hero.addEventListener('pointerdown', (event) => rippleAt(event, 1));
	hero.addEventListener('pointermove', (event) => {
		if (event.pointerType !== 'mouse' || event.timeStamp - lastMove < 140) return;
		lastMove = event.timeStamp;
		rippleAt(event, 0.45);
	});

	canvas.addEventListener('webglcontextlost', (event) => {
		event.preventDefault();
		hero.classList.remove('is-live');
		inView = false;
		sync();
	});

	sync();
}

if ('requestIdleCallback' in window) requestIdleCallback(initMat, { timeout: 1200 });
else setTimeout(initMat, 200);
