<script lang="ts">
    import { onMount } from "svelte";
    import workspaces from "../storage";
    import CreateWorkspace from "./CreateWorkspace.svelte";

    let modal : CreateWorkspace; 

    onMount(() => {
        workspaces.reset();
    })

</script>

<div class="container">
    <div class="menu-left">
        <select class="select select-bordered w-full max-w-xs">
            {#each $workspaces.workspaces as workspace}
                <option value={workspace.id}>{workspace.name}</option>
            {/each}
        </select>
    </div>
    
    <div class="menu-right">
        <button class="btn btn-circle" on:click={() => modal.openModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        </button>
        <button class="btn btn-circle btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="3" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v.01M12 18v.01M4.93 4.93l.02.02M19.07 19.07l-.02-.02M6 12h.01M18 12h.01" /></svg>
        </button>
    </div>

    <CreateWorkspace bind:this={modal}/>
    
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .menu-left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 50%;
        height: 100%;
    }

    .menu-right {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        width: 50%;
        height: 100%;
        gap: 0.5rem;
    }


</style>

