
<script lang="ts">
    import workSpaceStorage , {selectedWorkspace} from "../workSpaceStorage";
    import AddLinks from "./AddLinks.svelte";


    let options = [
        {label: "Share", onclick: downloadWorkspace, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
    ]
    
    $: worksSpace = $workSpaceStorage.workspaces[$selectedWorkspace]

    let modal : AddLinks; 

    function downloadWorkspace() {
        //Downloads the workspace as a JSON file
        
        //Get the workspace
        let workspace = worksSpace;
       
        let blob = new Blob([JSON.stringify(worksSpace)], {type: "application/json"});
        let url = URL.createObjectURL(blob);

        //Create a link
        let link = document.createElement("a");
        link.href = url;
        link.download = workspace.name + ".json";
        link.click();

        //Remove the link
        link.remove();

        //Remove the blob
        URL.revokeObjectURL(url);
    }

</script>

<div class="container">
    <!-- Two buttons. First fits 90% of the space. Use flex-grow-9. Second fits 10% of the space. Use flex-grow-1 -->
    <div class="footer">
        <div class="flex flex-row w-full gap-1">
            <button class="btn btn-primary grow m-1" on:click={() => modal.openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    
                Add Link
            </button>
            <div class="dropdown dropdown-top dropdown-end">
                <label tabindex="0" class="btn m-1">
                    <!-- Share symbol, social SVG -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-9.95 9.55 1 1 0 00.9 1.05h1.1a1 1 0 001-.9A8 8 0 1112 4a1 1 0 00-1 1v1.5a1 1 0 00.65.93A4.49 4.49 0 0012 11a4.5 4.5 0 004.25-3.05 1 1 0 00-.2-1.1 1 1 0 00-1.1-.2A2.5 2.5 0 1112 8a2.49 2.49 0 012.25 1.45 1 1 0 00.9.55h1.1a1 1 0 001-.9A10 10 0 0012 2z"/></svg>
                    
                    Options</label>
                <ul tabindex="0"  class="dropdown-content z-[1] menu bg-base-200 w-56 rounded-box">
                    {#each options as option}
                        <li >
                            <a on:click={downloadWorkspace}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={option.icon} /></svg>
                                {option.label}
                            </a>
                        </li>
                    {/each}
                  </ul>
              </div>
        </div>
    </div>
    <AddLinks bind:this={modal}/>

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

    /* Nuevo estilo para el 'Footer' fijo en la parte inferior */
    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
        background-color: #fff; /* Cambia el color de fondo según tus preferencias */
    }
</style>


