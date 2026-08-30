<script lang="ts">
	let { centered = false }: { centered?: boolean } = $props();
</script>

<div
	class={centered
		? 'flex flex-col items-center gap-5 border-t border-brand-900 pt-10'
		: 'flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'}
>
	<div class="flex items-center gap-3">
		<div class="h-px w-8 bg-brand-500"></div>
		<span class="text-xs font-semibold tracking-[0.25em] text-brand-400 uppercase">Affiliation</span
		>
	</div>
	<a
		href="https://www.bjjglobetrotters.com/"
		target="_blank"
		rel="noopener noreferrer"
		class="group flex w-fit flex-col gap-2 opacity-90 transition-opacity hover:opacity-100 {centered
			? 'items-center'
			: 'sm:items-end'}"
		aria-label="BJJ Globetrotters — opens in new tab"
	>
		<img
			src="/affiliates/bjj-globetrotters.svg"
			alt=""
			class="h-10 w-auto max-w-[220px] object-contain md:h-12"
			width="220"
			height="48"
		/>
		<span class="text-sm text-brand-400 transition-colors group-hover:text-brand-300">
			BJJ Globetrotters
		</span>
	</a>
</div>
