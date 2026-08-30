<script lang="ts">
	import { trainingSchedule } from '$lib/data/training-schedule';
	import { centerHighlight } from '$lib/utils/center_highlight';
	import { scrollReveal } from '$lib/utils/scroll_animations';

	// Get today's German day name
	const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
	let todayIndex = $state(new Date().getDay());
	let todayName = $state(days[todayIndex]);
</script>

<section class="px-6 py-24 md:px-12 lg:px-20 xl:px-28">
	<div class="grid gap-16 md:grid-cols-[1fr_2fr]">
		<!-- Left: section label -->
		<div use:scrollReveal class="reveal reveal-left md:sticky md:top-24 md:self-start">
			<div class="mb-4 flex items-center gap-3">
				<div class="h-px w-8 bg-brand-500"></div>
				<span class="text-xs font-semibold tracking-[0.25em] text-brand-400 uppercase"
					>W&ouml;chentlich</span
				>
			</div>
			<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
				Trainingsplan
			</h2>
		</div>

		<!-- Right: schedule -->
		<div class="space-y-6">
			<!-- Mobile: card list -->
			<div use:centerHighlight class="space-y-3 md:hidden">
				{#each Object.entries(trainingSchedule) as [day, schedule], i (day)}
					{#if schedule.length > 0}
						<div
							use:scrollReveal
							data-center-highlight-item
							class="center-highlight-item reveal reveal-left border-l-2 border-brand-800 py-2 pl-4 delay-{i}"
						>
							<h3
								class="center-highlight-accent mb-2 text-sm font-semibold tracking-wider text-brand-400 uppercase"
							>
								{day}
								{#if day === todayName}
									<span class="ml-2 text-[10px] font-normal tracking-normal text-accent-500/70"
										>Heute</span
									>
								{/if}
							</h3>
							<div class="space-y-1.5">
								{#each schedule as session (session.time)}
									<div class="flex items-baseline justify-between gap-4">
										<span class="text-sm text-brand-300 tabular-nums"
											>{session.time} &ndash; {session.endTime}</span
										>
										<span class="text-sm font-medium text-brand-100">{session.class}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<!-- Desktop: refined table -->
			<div use:scrollReveal class="reveal reveal-scale hidden overflow-x-auto md:block">
				<table class="w-full border-collapse text-sm">
					<thead>
						<tr class="border-b border-brand-800">
							<th
								class="py-3 pr-6 text-left text-xs font-semibold tracking-wider text-brand-400 uppercase"
								>Zeit</th
							>
							{#each Object.keys(trainingSchedule) as day (day)}
								<th
									class="px-3 py-3 text-left text-xs font-semibold tracking-wider uppercase {day ===
									todayName
										? 'text-accent-500'
										: 'text-brand-400'}"
								>
									{day}
								</th>
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
						}) as timeSlot (timeSlot)}
							<tr class="border-b border-brand-900/50 transition-colors hover:bg-brand-950/50">
								<td class="py-3 pr-6 whitespace-nowrap text-brand-300 tabular-nums">{timeSlot}</td>
								{#each Object.entries(trainingSchedule) as [day, schedule] (day)}
									<td class="px-3 py-3 {day === todayName ? 'bg-accent-500/5' : ''}">
										{#each schedule as session (session.time)}
											{#if `${session.time} - ${session.endTime}` === timeSlot}
												<span class="text-brand-200">{session.class}</span>
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
	</div>
</section>
