<script lang="ts">
    import LinkCard from "./LinkCard.svelte";
    import TopBar from "./TopBar.svelte";
    import workspaces from "../storage";
    import { onMount } from "svelte";

    onMount(() => {
        workspaces.reset();
    })
</script>

<div class="container">
    <TopBar />

    {#each $workspaces.workspaces[0].links as link}
        <LinkCard name={link.name} link={link.url} />
    {/each}

</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 10px;
    }
</style>
