<script lang="ts">
    import '../app.css';
    import favicon from '$lib/assets/favicon.svg';

    let {children} = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon}/>
</svelte:head>

<div class="bg-gray-900">
    {@render children?.()}
</div>
