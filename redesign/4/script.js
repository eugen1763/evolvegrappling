const root = document.documentElement;
root.classList.add('js-ok');

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

let threeModule;
const loadThree = () => (threeModule ??= import('../assets/vendor/three.module.min.js'));

/* ---------- Headlines, floating button, schedule ---------- */

function initReveals() {
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-in');
				io.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -10% 0px' }
	);
	for (const el of document.querySelectorAll('.reveal')) {
		el.querySelectorAll('.line').forEach((line, i) => line.style.setProperty('--i', i));
		io.observe(el);
	}
}

function initFloatingButton() {
	const cta = document.querySelector('[data-cta]');
	const coverButton = document.querySelector('.cover-lines .btn');
	const contact = document.getElementById('kontakt');
	if (!cta || !coverButton || !contact) return;

	let pastCover = false;
	let inContact = false;
	const update = () => {
		cta.classList.toggle('is-on', pastCover && !inContact);
		cta.classList.toggle('is-away', inContact);
	};
	new IntersectionObserver(([entry]) => {
		pastCover = !entry.isIntersecting && entry.boundingClientRect.top < 0;
		update();
	}).observe(coverButton);
	new IntersectionObserver(
		([entry]) => {
			inContact = entry.isIntersecting;
			update();
		},
		{ rootMargin: '0px 0px -25% 0px' }
	).observe(contact);
}

function initSchedule() {
	const days = [...document.querySelectorAll('.day')];
	const chips = [...document.querySelectorAll('.chip')];

	const weekday = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Europe/Berlin',
		weekday: 'short'
	}).format(new Date());
	const today = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday);
	document.querySelector(`.day[data-day="${today}"]`)?.classList.add('is-today');

	const apply = (filter) => {
		for (const chip of chips) chip.setAttribute('aria-pressed', String(chip.dataset.filter === filter));
		for (const day of days) {
			let any = false;
			for (const slot of day.querySelectorAll('.slot')) {
				const on = filter === 'all' || slot.dataset.cat === filter;
				slot.hidden = !on;
				any ||= on;
			}
			day.classList.toggle('is-empty', !any);
		}
	};

	for (const chip of chips) {
		chip.addEventListener('click', () => {
			const filter = chip.dataset.filter;
			if (document.startViewTransition && !reduced) document.startViewTransition(() => apply(filter));
			else apply(filter);
		});
	}
}

/* ---------- Cover: photos change through a liquid wipe and tilt in 3D ---------- */

const COVER_TALL = [
	{ src: '../assets/0E8A4917.webp', caption: 'BJJ im Gi' },
	{ src: 'img/cover-6454-p.webp', caption: 'No-Gi Grappling' },
	{ src: '../assets/0E8A4853.webp', caption: 'BJJ im Gi' },
	{ src: 'img/cover-6503-p.webp', caption: 'No-Gi Grappling' }
];
const COVER_WIDE = [
	{ src: '../assets/0E8A6454.webp', caption: 'No-Gi Grappling' },
	{ src: '../assets/0E8A4818.webp', caption: 'BJJ im Gi' },
	{ src: '../assets/0E8A6503.webp', caption: 'No-Gi Grappling' }
];

const COVER_VERTEX = /* glsl */ `
	uniform float uProg;
	uniform float uTime;
	uniform vec2 uTilt;
	varying vec2 vUv;
	void main() {
		vUv = uv;
		vec3 p = position;
		float mid = sin(uProg * 3.14159);
		p.z += sin((uv.x * 2.2 + uv.y * 1.4) * 3.14159 + uTime * 1.6) * 0.03 * mid;
		p.z += (0.5 - distance(uv, vec2(0.5))) * 0.12 * length(uTilt);
		gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
	}
`;

const COVER_FRAGMENT = /* glsl */ `
	uniform sampler2D uTex0;
	uniform sampler2D uTex1;
	uniform float uAsp0;
	uniform float uAsp1;
	uniform float uZoom0;
	uniform float uZoom1;
	uniform float uPlane;
	uniform float uProg;
	uniform float uTime;
	uniform float uKey;
	varying vec2 vUv;

	float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
	float noise(vec2 p) {
		vec2 i = floor(p), f = fract(p);
		f = f * f * (3.0 - 2.0 * f);
		return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
			mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
	}
	float fbm(vec2 p) {
		float v = 0.0, a = 0.5;
		for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
		return v;
	}
	vec2 cover(vec2 uv, float imageAspect, float zoom) {
		vec2 s = uPlane > imageAspect ? vec2(1.0, imageAspect / uPlane) : vec2(uPlane / imageAspect, 1.0);
		return (uv - 0.5) * s * (1.0 - zoom) + 0.5;
	}
	void main() {
		float n = fbm(vUv * vec2(uPlane, 1.0) * 2.6 + vec2(0.0, uTime * 0.06));
		float edge = vUv.y * 0.6 + n * 0.4;
		float th = mix(-0.14, 1.14, uProg);
		float m = 1.0 - smoothstep(th - 0.09, th + 0.09, edge);
		float band = m * (1.0 - m) * 4.0;
		vec2 warp = vec2(n - 0.5, 0.4) * band * 0.09;
		vec3 a = texture2D(uTex0, cover(vUv, uAsp0, uZoom0) + warp).rgb;
		vec3 b = texture2D(uTex1, cover(vUv, uAsp1, uZoom1) - warp).rgb;
		vec3 c = clamp(mix(a, b, m) + band * 0.05, 0.0, 1.0);
		// Premultiplied output that equals a multiply for grey tones: white becomes clear, dark stays solid.
		float k = min(c.r, min(c.g, c.b)) * uKey;
		gl_FragColor = vec4(c - k, 1.0 - k);
	}
`;

async function initCover() {
	const host = document.querySelector('[data-hero]');
	if (!host || reduced) return;
	const canvas = host.querySelector('canvas');
	const captionEl = document.querySelector('[data-hero-caption]');
	const indexEl = document.querySelector('[data-hero-index]');
	const totalEl = document.querySelector('[data-hero-total]');

	const wide = matchMedia('(min-width: 800px) and (orientation: landscape)').matches;
	const set = wide ? COVER_WIDE : COVER_TALL;
	const label = (i) => {
		captionEl.textContent = set[i].caption;
		indexEl.textContent = String(i + 1);
	};
	totalEl.textContent = String(set.length);
	label(0);

	let THREE;
	let renderer;
	try {
		THREE = await loadThree();
		renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: false,
			powerPreference: 'high-performance'
		});
	} catch {
		return; // the <img> stays as the cover
	}
	renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
	renderer.setClearColor(0x000000, 0);
	// A shader that does not link (for example after a lost context) hands the cover back to the <img>.
	let broken = false;
	renderer.debug.onShaderError = () => {
		broken = true;
	};

	const loader = new THREE.TextureLoader();
	const textures = new Array(set.length);
	const loadTexture = (i) =>
		(textures[i] ??= new Promise((resolve, reject) => {
			loader.load(
				set[i].src,
				(texture) => {
					texture.minFilter = THREE.LinearFilter;
					texture.generateMipmaps = false;
					// Upload now, so the first frame of the wipe does not wait for it.
					renderer.initTexture(texture);
					resolve(texture);
				},
				undefined,
				reject
			);
		}));
	const aspectOf = (texture) => texture.image.width / texture.image.height;

	let first;
	try {
		first = await loadTexture(0);
	} catch {
		renderer.dispose();
		return;
	}

	const uniforms = {
		uTex0: { value: first },
		uTex1: { value: first },
		uAsp0: { value: aspectOf(first) },
		uAsp1: { value: aspectOf(first) },
		uZoom0: { value: 0 },
		uZoom1: { value: 0 },
		uPlane: { value: 1 },
		uProg: { value: 0 },
		uTime: { value: 0 },
		uKey: { value: 0 },
		uTilt: { value: new THREE.Vector2() }
	};
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 10);
	camera.position.z = 3;
	const mesh = new THREE.Mesh(
		new THREE.PlaneGeometry(1, 1, 40, 40),
		new THREE.ShaderMaterial({ uniforms, vertexShader: COVER_VERTEX, fragmentShader: COVER_FRAGMENT })
	);
	scene.add(mesh);

	let sizeW = 0;
	let sizeH = 0;
	let painted = false;
	const resize = () => {
		const w = host.clientWidth;
		const h = host.clientHeight;
		// setSize clears the canvas, so it runs only for a real change.
		if (!w || !h || (w === sizeW && h === sizeH)) return;
		sizeW = w;
		sizeH = h;
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		const viewHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
		// Larger than the view, so that the tilted plane never shows its edge.
		mesh.scale.set(viewHeight * camera.aspect * 1.16, viewHeight * 1.16, 1);
		uniforms.uPlane.value = w / h;
		if (painted) renderer.render(scene, camera);
	};
	new ResizeObserver(resize).observe(host);
	resize();

	const aim = { x: 0, y: 0 };
	const tilt = { x: 0, y: 0 };
	addEventListener(
		'pointermove',
		(event) => {
			aim.x = (event.clientX / innerWidth - 0.5) * 2;
			aim.y = (event.clientY / innerHeight - 0.5) * 2;
		},
		{ passive: true }
	);
	let rest = null;
	addEventListener(
		'deviceorientation',
		(event) => {
			if (event.gamma == null || event.beta == null) return;
			rest ??= { gamma: event.gamma, beta: event.beta };
			aim.x = clamp((event.gamma - rest.gamma) / 25, -1, 1);
			aim.y = clamp((event.beta - rest.beta) / 25, -1, 1);
		},
		{ passive: true }
	);

	const HOLD = 3.6;
	const WIPE = 1.7;
	let current = 0;
	let next = 1 % set.length;
	let nextReady = false;
	let phase = 0; // seconds in the current hold or wipe
	let wiping = false;
	let clock = 0;
	let shown0 = 0;
	let shown1 = 0;
	const prepareNext = () => {
		nextReady = false;
		loadTexture(next).then(
			(texture) => {
				uniforms.uTex1.value = texture;
				uniforms.uAsp1.value = aspectOf(texture);
				nextReady = true;
			},
			() => {}
		);
	};
	prepareNext();

	let last = 0;
	let frameId = 0;
	let running = false;
	const frame = (now) => {
		frameId = requestAnimationFrame(frame);
		const dt = Math.min((now - last) / 1000, 0.05);
		last = now;
		clock += dt;
		phase += dt;
		shown0 += dt;

		if (!wiping && phase > HOLD && nextReady) {
			wiping = true;
			phase = 0;
			shown1 = 0;
			label(next);
		}
		if (wiping) {
			shown1 += dt;
			const t = clamp(phase / WIPE, 0, 1);
			uniforms.uProg.value = t * t * (3 - 2 * t);
			if (t === 1) {
				uniforms.uTex0.value = uniforms.uTex1.value;
				uniforms.uAsp0.value = uniforms.uAsp1.value;
				shown0 = shown1;
				uniforms.uProg.value = 0;
				wiping = false;
				phase = 0;
				current = next;
				next = (current + 1) % set.length;
				prepareNext();
			}
		}
		uniforms.uZoom0.value = Math.min(shown0 * 0.008, 0.08);
		uniforms.uZoom1.value = Math.min(shown1 * 0.008, 0.08);
		uniforms.uTime.value = clock;

		const driftX = Math.sin(clock * 0.45) * 0.22;
		const driftY = Math.cos(clock * 0.37) * 0.18;
		const ease = 1 - Math.exp(-dt * 3.7);
		tilt.x += (aim.x + driftX - tilt.x) * ease;
		tilt.y += (aim.y + driftY - tilt.y) * ease;
		mesh.rotation.y = tilt.x * 0.15;
		mesh.rotation.x = tilt.y * 0.1;
		uniforms.uTilt.value.set(tilt.x, tilt.y);

		renderer.render(scene, camera);
		if (broken) {
			cancelAnimationFrame(frameId);
			host.classList.remove('is-gl', 'is-solid');
			return;
		}
		if (!painted) {
			painted = true;
			host.classList.add('is-gl');
			// The canvas fades in over the <img>. Then one frame changes the blend from CSS to the shader.
			setTimeout(() => {
				if (broken) return;
				uniforms.uKey.value = 1;
				renderer.render(scene, camera);
				host.classList.add('is-solid');
			}, 650);
		}
	};

	let inView = true;
	const setRunning = () => {
		const on = inView && !document.hidden && !broken;
		if (on === running) return;
		running = on;
		if (on) {
			last = performance.now();
			frameId = requestAnimationFrame(frame);
		} else {
			cancelAnimationFrame(frameId);
		}
	};
	new IntersectionObserver(([entry]) => {
		inView = entry.isIntersecting;
		setRunning();
	}).observe(host);
	document.addEventListener('visibilitychange', setRunning);
	canvas.addEventListener('webglcontextlost', () => {
		broken = true;
		host.classList.remove('is-gl', 'is-solid');
		setRunning();
	});
	setRunning();
}

/* ---------- Gallery: pinned sideways travel, planes curve with the scroll speed ---------- */

const GALLERY_VERTEX = /* glsl */ `
	uniform float uVel;
	uniform float uWidth;
	varying vec2 vUv;
	varying float vShade;
	void main() {
		vUv = uv;
		vec4 wp = modelMatrix * vec4(position, 1.0);
		float nx = wp.x / (uWidth * 0.5);
		float curve = 0.07 + min(abs(uVel) * 0.007, 0.3);
		wp.z -= nx * nx * uWidth * curve;
		float lag = (uv.y - 0.5) * 2.0;
		wp.x += uVel * 0.9 * lag * lag;
		vShade = 1.0 - min(nx * nx * curve * 1.4, 0.4);
		gl_Position = projectionMatrix * viewMatrix * wp;
	}
`;

const GALLERY_FRAGMENT = /* glsl */ `
	uniform sampler2D uTex;
	uniform float uVel;
	varying vec2 vUv;
	varying float vShade;
	void main() {
		float split = clamp(uVel * 0.0007, -0.02, 0.02);
		float r = texture2D(uTex, vUv + vec2(split, 0.0)).r;
		float g = texture2D(uTex, vUv).g;
		float b = texture2D(uTex, vUv - vec2(split, 0.0)).b;
		gl_FragColor = vec4(vec3(r, g, b) * vShade, 1.0);
	}
`;

function initGallery() {
	const section = document.querySelector('[data-gallery]');
	if (!section || reduced) return;
	const pin = section.querySelector('.gallery-pin');
	const track = section.querySelector('.gallery-track');
	const bar = section.querySelector('.gallery-bar i');
	const canvas = section.querySelector('canvas');
	const images = [...track.querySelectorAll('img[data-gl]')];

	section.classList.add('is-pinned');
	track.removeAttribute('tabindex');

	let width = 0;
	let height = 0;
	let distance = 0;
	let sectionTop = 0;
	let baseLeft = 0;
	let baseTop = 0;
	let slots = [];
	let x = 0;
	let velocity = 0;
	let dirty = true;
	let gl = null;

	// The layout is read here and nowhere else. A frame works from these numbers and from scrollY, so the
	// track, the bar and the planes always get the same offset in the same frame.
	const measure = () => {
		const pinRect = pin.getBoundingClientRect();
		const trackRect = track.getBoundingClientRect();
		const w = pin.clientWidth;
		const h = pin.clientHeight;
		const resized = w !== width || h !== height;
		width = w;
		height = h;
		distance = Math.max(0, track.offsetWidth - width);
		sectionTop = section.getBoundingClientRect().top + scrollY;
		baseLeft = trackRect.left - pinRect.left - x;
		baseTop = trackRect.top - pinRect.top;
		slots = images.map((img) => {
			const rect = img.getBoundingClientRect();
			return {
				w: rect.width,
				h: rect.height,
				cx: rect.left - trackRect.left + rect.width / 2,
				cy: rect.top - trackRect.top + rect.height / 2
			};
		});
		section.style.setProperty('--dist', `${distance}px`);
		if (resized) gl?.resize();
		dirty = true;
		// A new canvas size clears the canvas, so the picture is drawn again in the same task.
		if (resized && gl) draw();
	};
	let measureQueued = false;
	const queueMeasure = () => {
		if (measureQueued) return;
		measureQueued = true;
		requestAnimationFrame(() => {
			measureQueued = false;
			measure();
		});
	};
	new ResizeObserver(queueMeasure).observe(track);
	// Content above the gallery can change its height (fonts, pictures, opened details).
	new ResizeObserver(queueMeasure).observe(document.body);
	measure();

	const draw = () => {
		dirty = false;
		track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
		bar.style.transform = `scaleX(${(distance ? -x / distance : 0).toFixed(4)})`;
		gl?.render();
	};

	const startGL = async () => {
		for (const img of images) img.loading = 'eager';
		let THREE;
		let renderer;
		try {
			THREE = await loadThree();
			renderer = new THREE.WebGLRenderer({
				canvas,
				alpha: true,
				antialias: true,
				powerPreference: 'high-performance'
			});
		} catch {
			return;
		}
		renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0);

		const DEPTH = 1000;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(40, 1, 10, 4000);
		camera.position.z = DEPTH;
		const shared = { uVel: { value: 0 }, uWidth: { value: 1 } };
		const geometry = new THREE.PlaneGeometry(1, 1, 28, 14);
		const loader = new THREE.TextureLoader();

		const planes = images.map((img) => {
			const material = new THREE.ShaderMaterial({
				uniforms: { uTex: { value: null }, uVel: shared.uVel, uWidth: shared.uWidth },
				vertexShader: GALLERY_VERTEX,
				fragmentShader: GALLERY_FRAGMENT
			});
			const mesh = new THREE.Mesh(geometry, material);
			mesh.visible = false;
			scene.add(mesh);
			const plane = { shot: img.closest('.shot'), mesh, swapped: false };
			// A texture straight from the laid-out <img> would take its CSS size, so load the file again from the cache.
			loader.load(img.currentSrc || img.src, (texture) => {
				texture.minFilter = THREE.LinearFilter;
				texture.generateMipmaps = false;
				renderer.initTexture(texture);
				material.uniforms.uTex.value = texture;
				mesh.visible = true;
				dirty = true;
			});
			return plane;
		});

		section.classList.add('is-gl');
		// From here on the <img> elements are the pictures again.
		const giveUp = () => {
			section.classList.remove('is-gl');
			gl = null;
		};
		canvas.addEventListener('webglcontextlost', giveUp);
		renderer.debug.onShaderError = giveUp;

		gl = {
			resize() {
				if (!width || !height) return;
				renderer.setSize(width, height, false);
				// One world unit is one CSS pixel at z = 0, so planes can copy the layout of the <img> elements.
				camera.fov = (2 * Math.atan(height / 2 / DEPTH) * 180) / Math.PI;
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				shared.uWidth.value = width;
			},
			render() {
				planes.forEach(({ mesh }, i) => {
					const slot = slots[i];
					mesh.scale.set(slot.w, slot.h, 1);
					mesh.position.set(baseLeft + x + slot.cx - width / 2, -(baseTop + slot.cy - height / 2), 0);
				});
				shared.uVel.value = velocity;
				renderer.render(scene, camera);
				// The <img> hides only after its plane is on the canvas, so no frame shows neither of them.
				for (const plane of planes) {
					if (plane.swapped || !plane.mesh.visible) continue;
					plane.swapped = true;
					plane.shot.classList.add('gl-on');
				}
			}
		};
		gl.resize();
		dirty = true;
		if (!running) draw();
	};

	let frameId = 0;
	let running = false;
	let last = 0;
	const frame = (now) => {
		frameId = requestAnimationFrame(frame);
		const dt = clamp((now - last) / 1000, 0.001, 0.05);
		last = now;
		const progress = distance ? clamp((scrollY - sectionTop) / distance, 0, 1) : 0;
		const target = -progress * distance;
		const before = x;
		x += (target - x) * (1 - Math.exp(-dt * 7));
		if (Math.abs(target - x) < 0.05) x = target;
		// Pixels per 60 Hz frame, so the bend is the same at every refresh rate.
		const step = (x - before) / (dt * 60);
		velocity += (step - velocity) * (1 - Math.exp(-dt * 13));
		if (Math.abs(velocity) < 0.01) velocity = 0;
		if (x !== before || velocity !== 0 || dirty) draw();
	};

	let visible = false;
	let glStarted = false;
	const setRunning = () => {
		const on = visible && !document.hidden;
		if (on === running) return;
		running = on;
		if (on) {
			last = performance.now();
			frameId = requestAnimationFrame(frame);
		} else {
			cancelAnimationFrame(frameId);
		}
	};
	new IntersectionObserver(([entry]) => {
		visible = entry.isIntersecting;
		setRunning();
	}).observe(section);
	// The textures load before the gallery comes into view.
	const early = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting || glStarted) return;
			glStarted = true;
			early.disconnect();
			startGL();
		},
		{ rootMargin: '60% 0px 60% 0px' }
	);
	early.observe(section);
	document.addEventListener('visibilitychange', setRunning);
}

initReveals();
initFloatingButton();
initSchedule();
initGallery();
initCover();
