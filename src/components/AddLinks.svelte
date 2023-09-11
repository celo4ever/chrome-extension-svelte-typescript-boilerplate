<script lang="ts">
    import { onMount } from "svelte";
    import workspaces, { selectedWorkspace } from "../workSpaceStorage";

    let showModal       = false;
    let workspaceName   = "";
    let workspaceUrl    = "";
	let selection = [];

    export function openModal() {
        showModal = true;
    }

    export function closeModal() {
        showModal = false;
    }

    function addLink() {
        if(activeTabIndex == 0){
            const links = selection.map((tab) => {
                return {name: tab.title, url: tab.url}
            });
            workspaces.addLinks($selectedWorkspace, links);
        }else{
            //Add the link to the workspace
            workspaces.addLink($selectedWorkspace, {name: workspaceName, url: workspaceUrl});
        }
        //Close the modal
        showModal = false;

        //Reset the values
        workspaceName = "";
        workspaceUrl = "";
        selection = [];
    }

    let tabs = [ 'Opened Tabs', 'Custom Link']
    let activeTabIndex = 0

    let chromeTabs = [];

  function getOpenTabs() {
    chrome.tabs.query({}, function (result) {
        chromeTabs = result;
    });
  }

  onMount(() => {
    getOpenTabs();
  });

</script>

{#if showModal}
<div class="modal " class:modal-open={showModal}>
    <div class="modal-box h-5/6 overflow-hidden flex flex-col">
        <!-- Steacky tab -->
        <div class="tabs tabs-boxed tab-container">
            {#each tabs as tab, index}
                <a
                    class="tab" class:tab-active={activeTabIndex == index}
                    on:click={()=>activeTabIndex = index}
                >
                    {tab}
                </a>
            {/each}
        </div>

        <div class="flex-grow"> <!-- Esto permite que la lista crezca y ocupe todo el espacio disponible -->
            {#if activeTabIndex == 0}
                <div class="my-2">
                    <!-- For each chromeTabs, list each tab with its name/link. It has a checkbox to select each of them -->
                    <div class="">
                        <div class="card card-bordered card-compact overflow-x-auto tab-list">
                            <ul class="max-w flex flex-col">
                            {#each chromeTabs as tab}
                                <li class="inline-flex items-center gap-x-3.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                    <input type="checkbox" bind:group={selection} class="checkbox checkbox-accent" name="link" value={tab}/>
                                    <a href={tab.url} target="_blank" class="truncate">{tab.title}</a>
                                </li>
                            {/each}
                            </ul>
                        </div>
                    </div>
                </div>
            {/if}

            {#if activeTabIndex == 1}
                <div class="my-2">
                    <label class="label">
                        <span class="label-text">Name of the site</span>
                    </label>            
                    <input 
                        type="text" 
                        placeholder="Name your Link" 
                        bind:value={workspaceName}
                        class="input input-bordered input-secondary w-full"
                    />
                    <br />
                    <label class="label">
                        <span class="label-text">Url</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Url" 
                        bind:value={workspaceUrl}
                        class="input input-bordered input-secondary w-full"
                    />
                </div>
            {/if}
        </div>

        <div class="mt-4"> <!-- Agrega margen superior para separar el botón de la lista -->
            <button class="btn btn-primary btn-block" on:click={addLink}>Add Selected Tabs</button>
        </div>
    </div>
</div>

{/if}

<style>
    .tab-container {
      display: flex;
      justify-content: space-between;
    }
  
    .tab {
      flex: 1;
      max-width: 50%;
    }
    .tab-list {
      max-height: 365px; /* Ajusta la altura máxima según tus necesidades */
      overflow-y: auto; /* Habilita el desplazamiento vertical cuando se excede la altura máxima */
    }
    .truncate {
      white-space: nowrap; /* Evita que el texto se divida en múltiples líneas */
      overflow: hidden; /* Oculta el exceso de texto que no cabe */
      text-overflow: ellipsis; /* Muestra puntos suspensivos (...) al final del texto truncado */
      max-width: 100%; /* Ajusta el ancho máximo según sea necesario */
    }
  </style>