<script lang="ts">
	import { trainingSchedule } from '$lib/data/training-schedule';
	import { scrollAnimate } from '$lib/utils/scroll_animations';
</script>

<div use:scrollAnimate class="scroll-animate fade-in-up mt-20 mb-20">
	<h3 class="mb-12 text-center text-3xl font-bold tracking-tight text-white">Trainingsplan</h3>

	<div class="grid grid-cols-1 gap-4 md:hidden">
		{#each Object.entries(trainingSchedule) as [day, schedule], i}
			{#if schedule.length > 0}
				<div
					use:scrollAnimate
					class="scroll-animate slide-in-left rounded-2xl border border-white/5 bg-brand-900/70 p-5 delay-{i * 100}"
				>
					<h4 class="mb-3 text-lg font-semibold text-brand-400">{day}</h4>
					<div class="space-y-2 text-brand-100">
						{#each schedule as session}
							<div class="flex items-center justify-between">
								<span class="text-sm tabular-nums">{session.time} – {session.endTime}</span>
								<span class="font-medium">{session.class}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<div use:scrollAnimate class="scroll-animate slide-in-up hidden overflow-x-auto rounded-2xl border border-white/5 md:block">
		<table class="w-full table-fixed text-brand-100">
			<thead class="bg-brand-900">
				<tr>
					<th class="w-1/8 px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-brand-400">Zeit</th>
					{#each Object.keys(trainingSchedule) as day}
						<th class="w-1/8 px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-brand-400">{day}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each Array.from(new Set(Object.values(trainingSchedule)
							.flat()
							.map((session) => `${session.time} - ${session.endTime}`))).sort((a, b) => {
					const timeA = a.split(' - ')[0].replace(' Uhr', '');
					const timeB = b.split(' - ')[0].replace(' Uhr', '');
					return timeA.localeCompare(timeB);
				}) as timeSlot}
					<tr class="border-b border-brand-800/50 transition-colors hover:bg-brand-900/50">
						<td class="px-4 py-3 tabular-nums">{timeSlot}</td>
						{#each Object.values(trainingSchedule) as schedule}
							<td class="px-4 py-3">
								{#each schedule as session}
									{#if `${session.time} - ${session.endTime}` === timeSlot}
										<div class="text-brand-300">{session.class}</div>
									{/if}
								{/each}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
