const assert = require('node:assert/strict');
const fs = require('node:fs');
const sharp = require('sharp');

function read(path) {
	return fs.readFileSync(path, 'utf8');
}

function matches(html, pattern) {
	return [...html.matchAll(pattern)].map((match) => match[1]);
}

async function main() {
	assert.equal(
		fs.existsSync('build/app.html'),
		false,
		'SPA fallback build/app.html must not exist'
	);

	const home = read('build/index.html');
	assert.match(home, /<html lang="de-DE"/);
	assert.match(home, /<title>BJJ, Grappling &amp; Kampfsport in Solingen \| Evolve<\/title>/);
	assert.match(home, /<link rel="canonical" href="https:\/\/evolvegrappling\.de\/"/);
	assert.match(home, /<meta name="robots" content="index, follow, max-image-preview:large"/);
	assert.match(home, /<h1[^>]*>[\s\S]*?BJJ[\s\S]*?GRAPPLING[\s\S]*?IN SOLINGEN[\s\S]*?<\/h1>/);
	assert.match(home, /Kampfsport in[\s\S]*?Solingen/);
	assert.doesNotMatch(home, /NaN/);
	assert.equal(matches(home, /<meta name="description" content="([^"]+)"/g).length, 1);
	assert.equal(matches(home, /<meta name="keywords" content="([^"]+)"/g).length, 0);

	const jsonLd = matches(home, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
	assert.equal(jsonLd.length, 1, 'Homepage must contain exactly one JSON-LD block');
	JSON.parse(jsonLd[0]);

	for (const route of ['links', 'impressum', 'datenschutz']) {
		const html = read(`build/${route}/index.html`);
		assert.match(html, /<meta name="robots" content="noindex, follow"/);
		assert.equal(matches(html, /<meta name="description" content="([^"]+)"/g).length, 1);
	}

	const robots = read('build/robots.txt');
	assert.match(robots, /Sitemap: https:\/\/evolvegrappling\.de\/sitemap\.xml/);
	assert.doesNotMatch(robots, /Disallow: \/_app\//);

	const sitemap = read('build/sitemap.xml');
	assert.match(sitemap, /<loc>https:\/\/evolvegrappling\.de\/<\/loc>/);
	assert.doesNotMatch(sitemap, /evolve-grappling\.de/);

	const socialImage = await sharp('build/evolve-grappling-solingen.jpg').metadata();
	assert.equal(socialImage.width, 1200);
	assert.equal(socialImage.height, 630);

	const logo = await sharp('build/evolve-grappling-logo.png').metadata();
	assert.equal(logo.width, 512);
	assert.equal(logo.height, 512);

	console.log('SEO build checks passed.');
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
