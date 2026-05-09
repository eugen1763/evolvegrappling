<script lang="ts">
	import { teamMembers } from '$lib/data/team_members';
	import { scrollReveal } from '$lib/utils/scroll_animations';
</script>

<section class="px-6 py-24 md:px-12 lg:px-20 xl:px-28">
	<div class="grid gap-16 md:grid-cols-[1fr_2fr]">
		<!-- Left: section label -->
		<div use:scrollReveal class="reveal reveal-left md:sticky md:top-24 md:self-start">
			<div class="flex items-center gap-3 mb-4">
				<div class="h-px w-8 bg-brand-500"></div>
				<span class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">Wer wir sind</span>
			</div>
			<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
				Unser Team
			</h2>
		</div>

		<!-- Right: team members -->
		<div class="grid gap-12 sm:grid-cols-2">
			{#each teamMembers as member, i}
				<div use:scrollReveal class="reveal reveal-scale delay-{i + 1} group">
					<div class="relative mb-6 overflow-hidden rounded-sm">
						<div class="duotone">
							<img
								src={member.image}
								alt={member.name}
								class="w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
								style="aspect-ratio: 3/4;"
							/>
						</div>
						<!-- Corner accent -->
						<div class="absolute top-0 right-0 h-12 w-12 border-t-2 border-r-2 border-accent-500/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
					</div>
					<div class="space-y-1">
						<div class="flex items-center gap-2">
							<div class="h-0.5 w-4 bg-accent-500"></div>
							<span class="text-xs font-semibold uppercase tracking-wider text-accent-500">{member.rank}</span>
						</div>
						<h3 class="text-2xl font-bold tracking-tight text-white">{member.name}</h3>
						<p class="text-brand-300">{member.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
