
<script lang="ts">
    import workSpaceStorage , {selectedWorkspace} from "../workSpaceStorage";
    import AddLinks from "./AddLinks.svelte";


    let options = [
        {label: "Share", onclick: downloadWorkspace,   
        icon: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="m5.953 7.467 6.094-2.612m.096 8.114L5.857 9.676m.305-1.192a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0ZM17 3.84a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Zm0 10.322a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Z"/>
  </svg>`
        },
        {label: "Delete", onclick: deleteWorkspace, 
            icon:`<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
  </svg>`
        }
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

    function deleteWorkspace() {
        //Deletes the workspace
        workSpaceStorage.deleteWorkspace($selectedWorkspace);

        //Selects thhe last workspace
        if($workSpaceStorage.workspaces.length > 1) {
            selectedWorkspace.set($workSpaceStorage.workspaces.length - 1);
        }else {
            //If there is no workspace, we reset default
            workSpaceStorage.reset();
        }
    }

</script>

<div class="container">
    <!-- Two buttons. First fits 90% of the space. Use flex-grow-9. Second fits 10% of the space. Use flex-grow-1 -->
    <div class="footer">
        <div class="flex flex-row w-full gap-1">
            <button class="btn btn-primary grow m-1" on:click={() => modal.openModal()}>
                Add Links
            </button>
            <div class="dropdown dropdown-top dropdown-end">
                <label tabindex="0" class="btn m-1">
                    <!-- Share symbol, social SVG -->
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
                      </svg>                    
                    </label>
                <ul tabindex="0"  class="dropdown-content z-[1] menu bg-base-200 w-56 rounded-box">
                    {#each options as option}
                        <li >
                            <a on:click={option.onclick}>
                                {@html option.icon}
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


