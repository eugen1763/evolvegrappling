<script lang="ts">
    import {teamMembers} from '$lib/data/team_members';
    import { scrollAnimate } from '$lib/utils/scroll_animations';
</script>

<div use:scrollAnimate class="mt-20 scroll-animate fade-in-up">
  <h3 class="text-3xl font-bold text-white mb-12 text-center text-wrap-balance">Unser Team</h3>
  <div class="grid md:grid-cols-3 gap-8">
    {#each teamMembers as member, i}
      <div use:scrollAnimate class="text-center scroll-animate scale-in delay-{(i + 1) * 200} group">
        <div class="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-2xl ring-2 ring-surface-700 group-hover:ring-accent-500/50 transition-all duration-300">
          <img src={member.image} alt={member.name}
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
        </div>
        <h4 class="text-xl font-semibold text-white mb-1">{member.name}</h4>
        <p class="text-gray-200">{member.description}</p>
        <p class="text-gray-400 text-sm">{member.rank}</p>
      </div>
    {/each}
  </div>
</div>