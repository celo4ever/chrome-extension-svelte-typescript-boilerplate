<script lang="ts">
    import workspaces, { selectedWorkspace } from "../workSpaceStorage";

    let showModal = false;
    let workspaceName = "";
    let importWorkspace = null;

    export function openModal() {
        showModal = true;
    }

    export function closeModal() {
        showModal = false;
    }

    function create() {

        if(importWorkspace) {
            //Import the workspace
            let reader = new FileReader();

            reader.onload = function() {
                let workspace = JSON.parse(reader.result as string);

                //If user has not provided a name, use the name of the imported workspace
                if(workspaceName !== "") {
                    workspace.name = workspaceName;
                }
                
                workspaces.importWorkspace(workspace);

                showModal = false;
                workspaceName = "";
            }

            reader.readAsText(importWorkspace[0]);
            return;
        }else{
            workspaces.addWorkspace(workspaceName);
            showModal = false;
            workspaceName = "";
        }
    }

</script>

{#if showModal}
    <div class="modal" class:modal-open={showModal}>
        <div class="modal-box">
            <h3 class="font-bold text-lg">Create Workspace</h3>
            <br />
            <input 
                type="text" 
                placeholder="Name your Workspace" 
                bind:value={workspaceName}
                class="input input-bordered input-secondary w-full" 
            />
            <br />
            <br />
            <h3 class="font-bold text">Import an Existing Workspace</h3>
            <br />
            <div class="max-w-xl">
                <label
                    class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                    <span class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span class="font-medium text-gray-600">
                            Drop files to Attach, or
                            <span class="text-blue-600 underline">browse</span>
                        </span>
                    </span>
                    <input type="file" name="file_upload" class="hidden" bind:files={importWorkspace}>
                </label>
            </div>
            <div class="modal-action">
                <button class="btn" on:click={create}>Create!</button>
                <button class="btn btn-outline btn-error" on:click={closeModal}>Cancel</button>
            </div>
        </div>
    </div>
{/if}