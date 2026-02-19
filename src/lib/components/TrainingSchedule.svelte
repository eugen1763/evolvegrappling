<script lang="ts">
	import { trainingSchedule } from '$lib/data/training-schedule';
	import { scrollAnimate } from '$lib/utils/scroll_animations';
</script>

<div use:scrollAnimate class="scroll-animate fade-in-up mt-20 mb-20">
	<h3 class="mb-12 text-center text-3xl font-bold text-white">Wöchentlicher Trainingsplan</h3>
	<!-- Mobile View -->
	<div class="grid grid-cols-1 gap-4 md:hidden">
		{#each Object.entries(trainingSchedule) as [day, schedule], i}
			{#if schedule.length > 0}
				<div use:scrollAnimate class="scroll-animate slide-in-left rounded-lg bg-gray-800 p-4 delay-{i * 100}">
					<h4 class="mb-4 text-xl font-semibold text-white">{day}</h4>
					<div class="space-y-2 text-gray-300">
						{#each schedule as session}
							<div class="flex flex-col items-start text-nowrap">
								<div class="w-32">{session.time} - {session.endTime}</div>
								<div class="font-semibold">{session.class}</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<!-- Desktop View -->
	<div use:scrollAnimate class="scroll-animate slide-in-up hidden overflow-x-auto md:block">
		<table class="w-full table-fixed text-gray-300">
			<thead class="bg-gray-800">
				<tr>
					<th class="w-1/8 px-4 py-3 text-left">Zeit</th>
					{#each Object.keys(trainingSchedule) as day}
						<th class="w-1/8 px-4 py-3 text-left">{day}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each Array.from(new Set(Object.values(trainingSchedule)
							.flat()
							.map((session) => `${session.time} - ${session.endTime}`))).sort((a, b) => {
					// Extract start times from "HH:MM Uhr - HH:MM Uhr" format
					const timeA = a.split(' - ')[0].replace(' Uhr', '');
					const timeB = b.split(' - ')[0].replace(' Uhr', '');
					return timeA.localeCompare(timeB);
				}) as timeSlot}
					<tr class="border-b border-gray-700">
						<td class="px-4 py-3 font-medium">{timeSlot}</td>
						{#each Object.values(trainingSchedule) as schedule}
							<td class="px-4 py-3">
								{#each schedule as session}
									{#if `${session.time} - ${session.endTime}` === timeSlot}
										<div class="text-gray-400">{session.class}</div>
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

