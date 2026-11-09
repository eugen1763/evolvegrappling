<!-- The start page is a static file, so the links use plain paths instead of resolve(). -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<header class="bar">
	<a class="bar-logo" href="/" aria-label="Evolve Grappling, zur Startseite">
		<img src="/logo.svg" alt="" width="44" height="44" />
	</a>
	<nav class="bar-nav" aria-label="Hauptnavigation">
		<a href="/#angebot">Kurse</a>
		<a href="/#trainingsplan">Plan</a>
		<a href="/#preise">Preise</a>
		<a class="bar-cta" href="/#kontakt">Probetraining</a>
	</nav>
</header>

<style>
	.bar {
		position: fixed;
		inset: 0 0 auto;
		z-index: 50;
		height: var(--bar-h);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 var(--gut);
		background: var(--ink);
		color: var(--sand);
	}
	.bar-logo {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
	}
	.bar-nav {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.bar-nav a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 8px;
		font: 800 1.25rem/1 var(--display);
		text-transform: uppercase;
		letter-spacing: 0.02em;
		text-decoration: none;
	}
	.bar-nav a:hover {
		color: #fff;
	}
	.bar-nav .bar-cta {
		display: none;
	}
	.bar :focus-visible {
		outline-color: var(--sand);
		box-shadow: none;
	}
	@media (min-width: 900px) {
		.bar-nav {
			gap: 12px;
		}
		.bar-nav .bar-cta {
			display: inline-flex;
			margin-left: 10px;
			padding: 2px 16px 0;
			background: var(--signal);
			color: var(--ink);
		}
		.bar-nav .bar-cta:hover {
			color: var(--ink);
			background: #ff5c45;
		}
	}
</style>
