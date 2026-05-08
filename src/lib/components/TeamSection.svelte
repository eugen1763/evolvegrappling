<script lang="ts">
	import { teamMembers } from '$lib/data/team_members';
	import { scrollAnimate } from '$lib/utils/scroll_animations';
</script>

<div use:scrollAnimate class="scroll-animate fade-in-up mt-20">
	<h3 class="mb-12 text-center text-3xl font-bold tracking-tight text-white">Unser Team</h3>
	<div class="grid gap-8 md:grid-cols-2">
		{#each teamMembers as member, i}
			<div
				use:scrollAnimate
				class="scroll-animate scale-in group text-center delay-{(i + 1) * 200}"
			>
				<div class="mx-auto mb-5 h-48 w-48 overflow-hidden rounded-2xl ring-2 ring-white/10 transition-shadow duration-300 group-hover:ring-brand-500/40">
					<img
						src={member.image}
						alt={member.name}
						class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
					/>
				</div>
				<h4 class="mb-1 text-xl font-semibold text-white">{member.name}</h4>
				<p class="text-brand-200">{member.description}</p>
				<p class="text-brand-400">{member.rank}</p>
			</div>
		{/each}
	</div>
</div>
