<script lang="ts">
    import LinkCard from "./LinkCard.svelte";
    import TopBar from "./TopBar.svelte";
    import workSpaceStorage, { selectedWorkspace } from "../workSpaceStorage";
    import { onMount } from "svelte";
    import Footer from "./Footer.svelte";

    $: worksSpace = $workSpaceStorage.workspaces[$selectedWorkspace]

    onMount(() => {
        console.log($workSpaceStorage.workspaces, 'selectedWorkspace', $selectedWorkspace)
        // workSpaceStorage.reset();

    })

</script>

<div class="container">
    <TopBar />
    
    <div class="link-list-container overflow-y-auto">
        {#if worksSpace.links != undefined && worksSpace.links.length > 0}
            {#each worksSpace.links as link, index}
                <LinkCard index={index} name={link.name} link={link.url} />
            {/each}
        {:else}
            <div class="container flex flex-col justify-center items-center">
                <h1 class="text-2xl font-bold">No Links</h1>
                <br />
                <p class="text-lg">Add a link to get started</p>
            </div>
        {/if}
    </div>

    <Footer/>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 20px;
        min-width: 100%;
    }
    /* Estilos para ocultar el scrollbar */
    .link-list-container {
        width: 100%;
        overflow-y: auto;
        max-height: 470px;
        margin-top: 10px;
    }

    .link-list-container::-webkit-scrollbar {
        width: 0.5em; /* Ancho del scrollbar */
    }
    .link-list-container::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0); /* Color del scrollbar thumb (puede ser transparente) */
    }
</style>
