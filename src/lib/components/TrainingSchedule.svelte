<script lang="ts">
    import { trainingSchedule } from '$lib/data/training-schedule';
</script>

<div class="mt-20 mb-20 scroll-animate fade-in-up">
    <h3 class="text-3xl font-bold text-white mb-12 text-center">Weekly Training Schedule</h3>
    <!-- Mobile View -->
    <div class="grid grid-cols-1 gap-4 md:hidden">
        {#each Object.entries(trainingSchedule) as [day, schedule], i}
            <div class="bg-gray-800 p-4 rounded-lg scroll-animate slide-in-left delay-{i * 100}">
                <h4 class="text-xl font-semibold text-white mb-4">{day}</h4>
                <div class="space-y-2 text-gray-300">
                    {#each schedule as session}
                        <p>{session.time} - {session.class}</p>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    <!-- Desktop View -->
    <div class="hidden md:block overflow-x-auto scroll-animate slide-in-up">
        <table class="w-full text-gray-300">
            <thead class="bg-gray-800">
                <tr>
                    {#each Object.keys(trainingSchedule) as day}
                        <th class="px-4 py-3 text-left">{day}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each Array(Math.max(...Object.values(trainingSchedule).map(s => s.length))) as _, i}
                    <tr class="border-b border-gray-700">
                        {#each Object.values(trainingSchedule) as schedule}
                            <td class="px-4 py-3">
                                {#if schedule[i]}
                                    <div>{schedule[i].time}</div>
                                    <div class="text-gray-400">{schedule[i].class}</div>
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
