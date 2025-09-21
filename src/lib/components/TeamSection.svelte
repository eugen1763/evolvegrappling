<script lang="ts">
    import {teamMembers} from '$lib/data/team_members';
</script>

<div class="mt-20 scroll-animate fade-in-up">
  <h3 class="text-3xl font-bold text-white mb-12 text-center">Lernen Sie unser Team kennen</h3>
  <div class="grid md:grid-cols-3 gap-8">
    {#each teamMembers as member, i}
      <div class="text-center scroll-animate scale-in delay-{(i + 1) * 200}">
        <img src={member.image} alt={member.name}
             class="rounded-full mx-auto mb-4 w-48 h-48 object-cover"/>
        <h4 class="text-xl font-semibold text-white mb-2">{member.name}</h4>
        <p class="text-gray-200">{member.description}</p>
        <p class="text-gray-400">{member.rank}</p>
      </div>
    {/each}
  </div>
</div>