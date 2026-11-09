<!-- eslint-disable svelte/no-navigation-without-resolve -- The start page is a static file, and trailingSlash is 'always'. -->
<footer class="foot">
	<div class="foot-main">
		<img class="foot-logo" src="/logo.svg" alt="Evolve Grappling" width="96" height="96" />
		<address>
			Evolve Grappling<br />
			Schorberger Str. 66, 42699 Solingen<br />
			<a href="tel:+4915735412788">+49 1573 5412788</a><br />
			<a href="mailto:info@evolvegrappling.de">info@evolvegrappling.de</a>
		</address>
		<nav aria-label="Rechtliches">
			<a href="/">Startseite</a>
			<a href="/impressum/">Impressum</a>
			<a href="/datenschutz/">Datenschutz</a>
			<a href="/links/">Links</a>
		</nav>
	</div>
	<a
		class="affil"
		href="https://www.bjjglobetrotters.com/"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Affiliation: BJJ Globetrotters, öffnet in neuem Tab"
	>
		<span>Affiliation</span>
		<img
			src="/affiliates/bjj-globetrotters.svg"
			alt="BJJ Globetrotters"
			width="200"
			height="44"
			loading="lazy"
		/>
	</a>
</footer>

<style>
	.foot {
		padding: 40px var(--gut) calc(40px + env(safe-area-inset-bottom));
		background: #0a1214;
		color: #c9d0cd;
		font-size: 0.9375rem;
	}
	.foot-main {
		display: grid;
		gap: 22px;
		max-width: var(--max);
		margin-inline: auto;
	}
	.foot-logo {
		width: 72px;
		height: auto;
	}
	address {
		font-style: normal;
		line-height: 1.7;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 22px;
	}
	nav a,
	address a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}
	address a {
		min-height: 32px;
	}
	.foot :focus-visible {
		outline-color: var(--sand);
		box-shadow: none;
	}
	.affil {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 18px;
		max-width: var(--max);
		margin: 28px auto 0;
		padding-top: 22px;
		border-top: 2px solid rgba(216, 220, 195, 0.2);
		text-decoration: none;
	}
	.affil img {
		width: 200px;
		padding: 8px 12px;
		background: var(--paper);
	}
	@media (min-width: 900px) {
		.foot-main {
			grid-template-columns: auto 1fr auto;
			align-items: start;
			gap: 40px;
		}
	}
</style>
