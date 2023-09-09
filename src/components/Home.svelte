<script lang="ts">
    import LinkCard from "./LinkCard.svelte";
    import TopBar from "./TopBar.svelte";
    import workSpaceStorage, {selectedWorkspace} from "../workSpaceStorage";
    import { onMount } from "svelte";
    import Footer from "./Footer.svelte";

    $: worksSpace = $workSpaceStorage.workspaces[$selectedWorkspace]

   
    onMount(() => {
    })

</script>

<div class="container">
    <TopBar />
    

    {#if worksSpace.links != undefined && worksSpace.links.length > 0}
        {#each worksSpace.links as link}
            <LinkCard name={link.name} link={link.url} />
        {/each}
    {:else}
        <!-- Container centered  -->
        <div class="container flex flex-col justify-center items-center">
            <h1 class="text-2xl font-bold">No Links</h1>
            <br />
            <p class="text-lg">Add a link to get started</p>
        </div>
    {/if}
    

    <Footer/>
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
