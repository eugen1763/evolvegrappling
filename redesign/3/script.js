const html = document.documentElement;
html.classList.add('js');

const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const pageRect = (el) => {
	const r = el.getBoundingClientRect();
	return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height };
};

/* ---------- Rail: current belt and stripes ---------- */
const rail = $('.rail');
const railItems = $$('.rail li');
const zones = ['#top', '#blau', '#lila', '#braun', '#kontakt'].map((id) => $(id));
let zoneTops = [];
let railState = { zone: 0, stripes: 0 };

function measureZones() {
	zoneTops = zones.map((el, i) => (i === 0 ? 0 : pageRect(el).y));
	zoneTops.push(html.scrollHeight);
}

function updateRail() {
	const y = scrollY + innerHeight * 0.5;
	let zone = 0;
	for (let i = 1; i < 5; i++) if (y >= zoneTops[i]) zone = i;
	const span = zoneTops[zone + 1] - zoneTops[zone];
	const stripes = clamp(Math.floor(((y - zoneTops[zone]) / span) * 5), 0, 4);
	if (zone !== railState.zone || stripes !== railState.stripes) {
		railState = { zone, stripes };
		railItems.forEach((li, i) => {
			li.classList.toggle('is-current', i === zone);
			const a = li.firstElementChild;
			if (i === zone) a.setAttribute('aria-current', 'true');
			else a.removeAttribute('aria-current');
		});
		rail.dataset.stripes = stripes;
	}
}

/* ---------- Sticky button ---------- */
const sticky = $('#sticky');
const hidden = new Set();
const stickyWatch = new IntersectionObserver((entries) => {
	for (const e of entries) {
		if (e.isIntersecting) hidden.add(e.target);
		else hidden.delete(e.target);
	}
	sticky.classList.toggle('show', hidden.size === 0);
});
stickyWatch.observe($('.hero .btn'));
stickyWatch.observe($('#kontakt'));
stickyWatch.observe($('.foot'));

/* ---------- Plan: today and filter ---------- */
const weekday = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Berlin', weekday: 'short' }).format(new Date());
const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday);
const todayEl = $(`.day[data-day="${dayIndex}"] h3`);
if (todayEl) {
	const tag = document.createElement('span');
	tag.className = 'today';
	tag.textContent = 'Heute';
	todayEl.append(tag);
}

const plan = $('.plan');
const filterButtons = $$('.legend button');
for (const button of filterButtons) {
	button.addEventListener('click', () => {
		plan.dataset.filter = button.dataset.filter;
		for (const b of filterButtons) b.setAttribute('aria-pressed', String(b === button));
	});
}

/* ---------- Kickboxen: the focus mitt ---------- */
const mitt = $('.mitt');
const hitsEl = $('#hits');
let hits = 0;
function hit(count = true) {
	if (count) hitsEl.textContent = String(++hits);
	mitt.classList.remove('hit');
	void mitt.offsetWidth;
	mitt.classList.add('hit');
}
mitt.addEventListener('click', () => hit());
new IntersectionObserver(
	(entries, io) => {
		if (entries[0].isIntersecting) {
			setTimeout(() => hit(false), 250);
			io.disconnect();
		}
	},
	{ threshold: 0.8 },
).observe(mitt);

/* ---------- Team: tilt with the pointer ---------- */
if (matchMedia('(hover: hover) and (min-width: 900px)').matches && !reduceQuery.matches) {
	for (const coach of $$('.coach')) {
		const card = $('.coach-card', coach);
		coach.addEventListener('pointermove', (e) => {
			const r = coach.getBoundingClientRect();
			const px = (e.clientX - r.left) / r.width - 0.5;
			const py = (e.clientY - r.top) / r.height - 0.5;
			card.style.setProperty('--ry', `${px * 14}deg`);
			card.style.setProperty('--rx', `${py * -10}deg`);
		});
		coach.addEventListener('pointerleave', () => {
			card.style.setProperty('--ry', '0deg');
			card.style.setProperty('--rx', '0deg');
		});
	}
}

/* ---------- The 3D belt ---------- */
const BELT_COLOURS = [
	[0.972, 0.966, 0.94],
	[0.122, 0.306, 0.612],
	[0.357, 0.18, 0.549],
	[0.42, 0.259, 0.149],
	[0.07, 0.072, 0.085],
];
const SEG = 22;

const VERT = /* glsl */ `
attribute vec3 posB;
attribute vec3 nrmA;
attribute vec3 nrmB;
attribute float aS;
attribute float aY;
attribute float aLen;
attribute float aKnot;
uniform float uTight;
uniform float uTime;
uniform float uSway;
uniform vec3 uOffset;
varying float vV;
varying vec3 vN;
varying float vS;
varying float vY;
varying float vLen;
void main() {
	vec3 p = mix(position, posB, uTight);
	vec3 n = normalize(mix(nrmA, nrmB, uTight));
	float sway = uSway * (1.0 - aKnot * uTight);
	p += n * sin(aLen * 0.011 + uTime * 1.1) * sway;
	p.x += sin(aLen * 0.006 + uTime * 0.7) * sway * 0.6;
	p += uOffset;
	vV = uv.x;
	vN = n;
	vS = aS;
	vY = aY;
	vLen = aLen;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const FRAG = /* glsl */ `
precision highp float;
uniform vec3 uCols[5];
uniform float uBounds[4];
uniform float uBlend;
uniform float uDraw;
uniform float uLen;
uniform float uW;
uniform float uStripes;
varying float vV;
varying vec3 vN;
varying float vS;
varying float vY;
varying float vLen;
void main() {
	if (vS > uDraw) discard;
	vec3 base = uCols[0];
	float blackZone = 0.0;
	for (int i = 0; i < 4; i++) {
		float m = smoothstep(uBounds[i] - uBlend, uBounds[i] + uBlend, vY);
		base = mix(base, uCols[i + 1], m);
		if (i == 3) blackZone = m;
	}

	// The rank bar travels with the tip. Distance is in belt widths.
	float d = (uDraw - vS) * uLen / uW;
	float bd = d - 0.9;
	float bar = step(0.0, bd) * step(bd, 2.9);
	vec3 barCol = mix(vec3(0.07, 0.072, 0.085), vec3(0.77, 0.13, 0.17), blackZone);
	float border = blackZone * (step(bd, 0.2) + step(2.7, bd));
	float sx = (bd - 0.5) / 0.46;
	float stripe = step(0.0, sx) * step(fract(sx), 0.42) * step(floor(sx), uStripes - 0.5);
	vec3 col = mix(base, barCol, bar);
	col = mix(col, vec3(0.97), bar * clamp(border + stripe, 0.0, 1.0));

	vec3 n = normalize(vN);
	if (!gl_FrontFacing) n = -n;
	float diff = clamp(dot(n, normalize(vec3(-0.35, 0.55, 0.75))), 0.0, 1.0);
	float dark = 1.0 - dot(col, vec3(0.299, 0.587, 0.114));
	float round = sin(vV * 3.14159);
	float lum = 1.0 - dark;
	float shade = mix(0.6 + 0.45 * diff, 0.9 + 0.14 * diff, lum) * (0.93 + 0.07 * round);
	float row = 1.0 - smoothstep(0.03, 0.11, abs(fract(vV * 7.0) - 0.5));
	col *= shade;
	col = mix(col, col * mix(0.82, 0.93, lum) + dark * 0.06, row * 0.85);
	col += dark * (0.15 * diff + 0.05 * round);
	float edge = smoothstep(0.0, 0.06, vV) * smoothstep(1.0, 0.94, vV);
	col *= mix(0.76 + 0.24 * dark, 1.0, edge);
	// A light rim keeps the black belt readable on the dark ground.
	col += blackZone * (1.0 - bar) * (1.0 - edge) * 0.2;
	gl_FragColor = vec4(col, 1.0);
}`;

const SHADOW_FRAG = /* glsl */ `
precision highp float;
uniform float uDraw;
varying float vV;
varying float vS;
void main() {
	if (vS > uDraw) discard;
	float soft = smoothstep(0.0, 0.3, vV) * smoothstep(1.0, 0.7, vV);
	gl_FragColor = vec4(0.05, 0.08, 0.11, 0.2 * soft);
}`;

async function initBelt() {
	const canvas = $('#belt');
	// A cheap probe first: three.js logs errors when no context is available.
	const probe = document.createElement('canvas');
	const gl = probe.getContext('webgl2') || probe.getContext('webgl');
	if (!gl) return;
	gl.getExtension('WEBGL_lose_context')?.loseContext();

	let THREE;
	let renderer;
	try {
		THREE = await import('../assets/vendor/three.module.min.js');
		renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
	} catch {
		return;
	}
	renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
	renderer.setClearColor(0x000000, 0);

	const FOV = 32;
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 8000);
	const uniforms = {
		uCols: { value: BELT_COLOURS.map((c) => new THREE.Vector3(...c)) },
		uBounds: { value: [1e6, 1e6, 1e6, 1e6] },
		uBlend: { value: 90 },
		uDraw: { value: 0 },
		uLen: { value: 1 },
		uW: { value: 44 },
		uStripes: { value: 0 },
		uTight: { value: 0 },
		uTime: { value: 0 },
		uSway: { value: 0 },
		uOffset: { value: new THREE.Vector3() },
	};
	const beltMaterial = new THREE.ShaderMaterial({
		uniforms,
		vertexShader: VERT,
		fragmentShader: FRAG,
		side: THREE.DoubleSide,
	});
	const shadowMaterial = new THREE.ShaderMaterial({
		uniforms: { ...uniforms, uOffset: { value: new THREE.Vector3() } },
		vertexShader: VERT,
		fragmentShader: SHADOW_FRAG,
		side: THREE.DoubleSide,
		transparent: true,
		depthWrite: false,
	});
	const belt = new THREE.Mesh(new THREE.BufferGeometry(), beltMaterial);
	const shadow = new THREE.Mesh(belt.geometry, shadowMaterial);
	belt.frustumCulled = shadow.frustumCulled = false;
	scene.add(belt, shadow);

	const heroImg = $('.hero-figure img');
	const knotEl = $('.knot');
	const stageEls = ['#weiss', '#blau', '#lila', '#braun', '#kontakt'].map((id) => $(id));

	let vw = 0;
	let H = 0;
	let W = 44;
	let knotRect = null;
	let drawTable = { y: [], s: [] };

	function layout() {
		vw = html.clientWidth;
		H = canvas.clientHeight || innerHeight;
		W = knotEl.getBoundingClientRect().height / 8.4 || 44;
		const margin = (vw - Math.min(vw, 1120)) / 2;
		const out = margin > W * 1.6 ? -margin * 0.5 : W * 0.14;
		knotRect = pageRect(knotEl);
		return {
			fig: pageRect(heroImg),
			edgeL: -out,
			edgeR: vw + out,
			tops: stageEls.map((el) => pageRect(el).y),
			gaps: stageEls.map((el) => pageRect($('.stage-head, .knot', el)).y - pageRect(el).y),
		};
	}

	// Control points in page pixels. `tw` is the twist of the ribbon about its own axis.
	function controls(L, tight) {
		const P = [];
		let tw = 0.75;
		const add = (x, y, z = 0, o = {}) => P.push({ x, y, z, tw: o.tw ?? tw, knot: o.knot ? 1 : 0 });

		const f = L.fig;
		const cx = f.x + f.w / 2;
		const cy = f.y + f.h * 0.5;
		const rx = Math.min(f.w * 0.5, vw / 2 - W * 0.1);
		const ry = f.h * 0.37;
		add(vw + W * 4, cy - ry * 1.1, -W);
		add(vw + W * 1.5, cy - ry * 0.7, -W * 0.5);
		for (let a = -30; a <= 372; a += 33.5) {
			const r = (a * Math.PI) / 180;
			const k = 0.9 + (0.2 * (a + 30)) / 402;
			// The z wave has a period of two turns, so the two passes never share a depth.
			add(cx + Math.cos(r) * rx * k, cy + Math.sin(r) * ry * k, Math.sin(r / 2 + 0.7) * W * 1.5);
		}

		// The loose end hangs down beside the headline.
		const tailX = Math.min(cx + rx * 0.92, vw - W * 0.95);
		add(tailX, cy + ry * 1.3, W * 0.4);
		add(tailX + W * 0.1, L.tops[0] - W * 2.2);

		let side = 1;
		const edge = (s) => (s < 0 ? L.edgeL : L.edgeR);
		for (let k = 0; k < 4; k++) {
			const top = L.tops[k];
			const gap = Math.max(L.gaps[k], W * 2);
			const x0 = edge(side);
			const x1 = edge(-side);
			const y0 = top + gap * 0.16;
			const y1 = top + gap * 0.84;
			add(x0, y0 - gap * 0.35);
			const t0 = tw;
			tw += Math.PI;
			for (const q of [0.22, 0.5, 0.78]) {
				add(lerp(x0, x1, q), lerp(y0, y1, q), Math.sin(q * Math.PI) * W * 1.3, { tw: lerp(t0, tw, q) });
			}
			side = -side;
			add(x1, y1 + gap * 0.35);
			const end = L.tops[k + 1] - gap * 0.3;
			const start = y1 + gap * 0.35;
			const n = Math.max(1, Math.round((end - start) / 430));
			for (let i = 1; i <= n; i++) {
				const y = lerp(start, end, i / n);
				add(x1 - side * Math.sin(i * 1.7) * W * 0.12, y, Math.sin(i * 1.3) * W);
			}
		}

		// The knot: one loop, then the end goes through the loop and hangs down.
		const K = knotRect;
		const kx = K.x + K.w / 2;
		const ky = K.y + K.h * 0.33;
		const R = tight ? W * 0.82 : W * 1.95;
		const dir = side;
		tw = Math.round(tw / Math.PI) * Math.PI;
		const knot = { knot: true };
		add(lerp(edge(side), kx, 0.45), ky - W * 2.2, 0, knot);
		add(kx + dir * W * 2.6, ky - W * 1.2, 0, knot);
		for (let a = 215; a <= 615; a += 40) {
			const r = (a * Math.PI) / 180;
			const z = -Math.cos(((a - 215) / 400) * Math.PI) * W * 0.9;
			add(kx - dir * Math.cos(r) * R, ky + Math.sin(r) * R, z, knot);
		}
		add(kx - dir * W * 0.05, ky - R * 0.1, W * 0.5, knot);
		add(kx - dir * W * 0.25, ky + R * 0.95, -W * 0.9, knot);
		add(kx - dir * W * 0.8, ky + W * 3.2, -W * 0.2, knot);
		add(kx - dir * W * 1.25, ky + W * 5.3, 0, knot);

		// The second end of the belt. It comes out behind the knot.
		const Q = [];
		const end = (x, y, z) => Q.push({ x, y, z, tw, knot: 1 });
		end(kx + dir * R * 0.5, ky - R * 0.75, -W * 1.4);
		end(kx + dir * W * 0.25, ky + R * 0.3, -W * 1.4);
		end(kx + dir * W * 0.6, ky + Math.max(R * 1.05, W * 1.4), -W * 1.4);
		end(kx + dir * W * 0.95, ky + W * 3.3, -W * 0.6);
		end(kx + dir * W * 1.3, ky + W * 5.1, 0);
		return [P, Q];
	}

	function ribbon(P) {
		const curve = new THREE.CatmullRomCurve3(
			P.map((p) => new THREE.Vector3(p.x - vw / 2, -p.y, p.z)),
			false,
			'centripetal',
		);
		const count = (P.length - 1) * SEG;
		const pts = curve.getPoints(count);
		const len = new Float32Array(count + 1);
		for (let j = 1; j <= count; j++) len[j] = len[j - 1] + pts[j].distanceTo(pts[j - 1]);
		return { pts, len, count };
	}

	function frames(R, P, len) {
		const Z = new THREE.Vector3(0, 0, 1);
		const T = new THREE.Vector3();
		const S0 = new THREE.Vector3();
		const N0 = new THREE.Vector3();
		const sides = [];
		const normals = [];
		for (let j = 0; j <= R.count; j++) {
			T.subVectors(R.pts[Math.min(j + 1, R.count)], R.pts[Math.max(j - 1, 0)]).normalize();
			S0.crossVectors(Z, T).normalize();
			N0.crossVectors(T, S0);
			const i = Math.min(Math.floor(j / SEG), P.length - 2);
			const q = j / SEG - i;
			const knot = lerp(P[i].knot, P[i + 1].knot, q);
			const phi = lerp(P[i].tw, P[i + 1].tw, q) + 0.38 * Math.sin(len[j] / 230) * (1 - knot);
			const c = Math.cos(phi);
			const s = Math.sin(phi);
			sides.push(new THREE.Vector3().copy(S0).multiplyScalar(c).addScaledVector(N0, s));
			normals.push(new THREE.Vector3().copy(N0).multiplyScalar(c).addScaledVector(S0, -s));
		}
		return { sides, normals };
	}

	function build() {
		const L = layout();
		const [PA, QA] = controls(L, false);
		const [PB, QB] = controls(L, true);
		const out = { pos: [], posB: [], nrmA: [], nrmB: [], uv: [], aS: [], aY: [], aLen: [], aKnot: [], index: [] };
		const half = W / 2;

		// `sOf` maps the length along a strip to the draw position of the whole belt.
		function strip(CA, CB, sOf) {
			const A = ribbon(CA);
			const B = ribbon(CB);
			const FA = frames(A, CA, A.len);
			const FB = frames(B, CB, A.len);
			const base = out.aS.length;
			for (let j = 0; j <= A.count; j++) {
				const i = Math.min(Math.floor(j / SEG), CA.length - 2);
				const knot = lerp(CA[i].knot, CA[i + 1].knot, j / SEG - i);
				for (const sign of [-1, 1]) {
					const a = A.pts[j];
					const b = B.pts[j];
					const sa = FA.sides[j];
					const sb = FB.sides[j];
					out.pos.push(a.x + sa.x * half * sign, a.y + sa.y * half * sign, a.z + sa.z * half * sign);
					out.posB.push(b.x + sb.x * half * sign, b.y + sb.y * half * sign, b.z + sb.z * half * sign);
					out.nrmA.push(FA.normals[j].x, FA.normals[j].y, FA.normals[j].z);
					out.nrmB.push(FB.normals[j].x, FB.normals[j].y, FB.normals[j].z);
					out.uv.push(sign > 0 ? 1 : 0, 0);
					out.aS.push(sOf(A.len[j], A.len[A.count]));
					out.aY.push(-a.y);
					out.aLen.push(A.len[j]);
					out.aKnot.push(knot);
				}
				if (j < A.count) {
					const v = base + j * 2;
					out.index.push(v, v + 1, v + 2, v + 1, v + 3, v + 2);
				}
			}
			return A;
		}

		const main = strip(PA, PB, (len, total) => len / total);
		const total = main.len[main.count];
		strip(QA, QB, (len, own) => 1 - (own - len) / total);

		const tableY = new Float32Array(main.count + 1);
		const tableS = new Float32Array(main.count + 1);
		let yMax = -1e9;
		for (let j = 0; j <= main.count; j++) {
			yMax = Math.max(yMax, -main.pts[j].y);
			tableY[j] = yMax;
			tableS[j] = main.len[j] / total;
		}

		const g = new THREE.BufferGeometry();
		const attr = (name, size) => g.setAttribute(name, new THREE.Float32BufferAttribute(out[name], size));
		g.setAttribute('position', new THREE.Float32BufferAttribute(out.pos, 3));
		attr('posB', 3);
		attr('nrmA', 3);
		attr('nrmB', 3);
		attr('uv', 2);
		attr('aS', 1);
		attr('aY', 1);
		attr('aLen', 1);
		attr('aKnot', 1);
		g.setIndex(out.index);
		belt.geometry.dispose();
		belt.geometry = shadow.geometry = g;

		drawTable = { y: tableY, s: tableS };
		uniforms.uLen.value = total;
		uniforms.uW.value = W;
		uniforms.uBlend.value = W * 2;
		uniforms.uBounds.value = [1, 2, 3, 4].map((k) => L.tops[k] + Math.max(L.gaps[k], W * 2) * 0.5);
		shadowMaterial.uniforms.uOffset.value.set(W * 0.22, -W * 0.34, -W * 0.3);

		renderer.setSize(vw, H, false);
		camera.aspect = vw / H;
		camera.position.z = H / 2 / Math.tan((FOV * Math.PI) / 360);
		camera.updateProjectionMatrix();
	}

	function drawTarget(yLimit) {
		const { y, s } = drawTable;
		let lo = 0;
		let hi = y.length - 1;
		while (lo < hi) {
			const mid = (lo + hi + 1) >> 1;
			if (y[mid] <= yLimit) lo = mid;
			else hi = mid - 1;
		}
		return s[lo];
	}

	let camY = scrollY;
	let draw = 0;
	let tight = 0;
	let pointerX = 0;
	let camX = 0;
	let raf = 0;
	let lastTime = 0;
	let activeUntil = 0;
	let heroVisible = true;

	function frame(time) {
		raf = 0;
		const reduced = reduceQuery.matches;
		const dt = Math.min(0.05, (time - lastTime) / 1000 || 0.016);
		lastTime = time;

		const atEnd = scrollY + innerHeight >= html.scrollHeight - 4;
		const drawGoal = reduced || atEnd ? 1 : drawTarget(scrollY + H * 0.9);
		const tightGoal = reduced ? 1 : clamp((scrollY + H * 0.78 - knotRect.y) / (H * 0.5), 0, 1);

		if (reduced) {
			camY = scrollY;
			draw = drawGoal;
			tight = tightGoal;
			camX = 0;
		} else {
			camY += (scrollY - camY) * Math.min(1, dt * 14);
			// After a jump, only the part inside the viewport is drawn with motion.
			draw = Math.max(draw, Math.min(drawGoal, drawTarget(camY - H * 0.1)));
			draw += (drawGoal - draw) * Math.min(1, dt * 2.6);
			tight += (tightGoal - tight) * Math.min(1, dt * 5);
			camX += (pointerX - camX) * Math.min(1, dt * 4);
		}
		const settled =
			Math.abs(scrollY - camY) < 0.3 &&
			Math.abs(drawGoal - draw) < 0.0004 &&
			Math.abs(tightGoal - tight) < 0.002 &&
			Math.abs(pointerX - camX) < 0.2;

		uniforms.uDraw.value = draw;
		uniforms.uTight.value = tight * tight * (3 - 2 * tight);
		uniforms.uTime.value = time / 1000;
		uniforms.uSway.value = reduced ? 0 : W * 0.1;
		uniforms.uStripes.value = railState.stripes;
		camera.position.x = camX;
		camera.position.y = -(camY + H / 2);
		renderer.render(scene, camera);

		const moving = !reduced && (heroVisible || time < activeUntil);
		if (!document.hidden && (!settled || moving)) raf = requestAnimationFrame(frame);
	}

	function wake(ms = 900) {
		activeUntil = Math.max(activeUntil, performance.now() + ms);
		if (!raf && !document.hidden) raf = requestAnimationFrame(frame);
	}

	// The address bar of a mobile browser fires resize events that change no layout.
	const signature = () => `${html.clientWidth}|${html.scrollHeight}|${canvas.clientHeight}`;
	let built = '';
	let rebuildTimer = 0;
	function rebuild() {
		clearTimeout(rebuildTimer);
		rebuildTimer = setTimeout(() => {
			if (signature() === built) return;
			build();
			built = signature();
			wake();
		}, 140);
	}

	// The canvas has no CSS size before the class is set.
	html.classList.add('gl');
	try {
		build();
	} catch {
		html.classList.remove('gl');
		return;
	}
	built = signature();
	wake(1600);

	addEventListener('scroll', () => wake(), { passive: true });
	addEventListener('resize', rebuild);
	new ResizeObserver(rebuild).observe(document.body);
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) {
			cancelAnimationFrame(raf);
			raf = 0;
		} else wake();
	});
	reduceQuery.addEventListener('change', () => wake());
	new IntersectionObserver((entries) => {
		heroVisible = entries[0].isIntersecting;
		if (heroVisible) wake();
	}).observe($('.hero'));
	if (matchMedia('(hover: hover)').matches) {
		addEventListener(
			'pointermove',
			(e) => {
				pointerX = (e.clientX / innerWidth - 0.5) * -24;
				wake(400);
			},
			{ passive: true },
		);
	}
	canvas.addEventListener('webglcontextlost', (e) => {
		e.preventDefault();
		cancelAnimationFrame(raf);
		raf = 0;
		html.classList.remove('gl');
	});
	canvas.addEventListener('webglcontextrestored', () => {
		html.classList.add('gl');
		wake();
	});
}

/* ---------- Start ---------- */
let scrollQueued = false;
addEventListener(
	'scroll',
	() => {
		if (scrollQueued) return;
		scrollQueued = true;
		requestAnimationFrame(() => {
			scrollQueued = false;
			updateRail();
		});
	},
	{ passive: true },
);
new ResizeObserver(() => {
	measureZones();
	updateRail();
}).observe(document.body);
measureZones();
updateRail();
initBelt();
