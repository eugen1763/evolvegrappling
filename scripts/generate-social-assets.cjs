const sharp = require('sharp');

const width = 1200;
const height = 630;

const overlay = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="shade" x1="0" x2="1">
			<stop offset="0" stop-color="#111817" stop-opacity="0.96" />
			<stop offset="0.55" stop-color="#111817" stop-opacity="0.72" />
			<stop offset="1" stop-color="#111817" stop-opacity="0.12" />
		</linearGradient>
	</defs>
	<rect width="${width}" height="${height}" fill="url(#shade)" />
	<rect x="72" y="116" width="64" height="6" fill="#59c3b6" />
	<text x="72" y="215" fill="#ffffff" font-family="Arial, sans-serif" font-size="76" font-weight="700" letter-spacing="-2">EVOLVE</text>
	<text x="72" y="295" fill="#ffffff" font-family="Arial, sans-serif" font-size="76" font-weight="700" letter-spacing="-2">GRAPPLING</text>
	<text x="74" y="365" fill="#9fc9c3" font-family="Arial, sans-serif" font-size="28" font-weight="600" letter-spacing="5">BJJ · NO-GI · SOLINGEN</text>
	<text x="74" y="420" fill="#d6e2e0" font-family="Arial, sans-serif" font-size="25">Brazilian Jiu-Jitsu &amp; Grappling</text>
</svg>`);

async function main() {
	await sharp('static/optimized/0E8A6454.webp')
		.resize(width, height, { fit: 'cover', position: 'centre' })
		.composite([{ input: overlay }])
		.jpeg({ quality: 86, mozjpeg: true })
		.toFile('static/evolve-grappling-solingen.jpg');

	await sharp('static/logo.svg')
		.resize(512, 512, { fit: 'contain' })
		.png({ compressionLevel: 9, palette: true })
		.toFile('static/evolve-grappling-logo.png');
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
