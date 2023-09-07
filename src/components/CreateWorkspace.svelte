<script lang="ts">
    import workspaces from "../storage";

    let showModal = false;
    let workspaceName = "";

    export function openModal() {
        showModal = true;
    }

    export function closeModal() {
        showModal = false;
    }

    function create() {
        workspaces.addWorkspace(workspaceName);
        showModal = false;
        workspaceName = "";
    }

</script>

{#if showModal}
    <div class="modal" class:modal-open={showModal}>
        <div class="modal-box">
            <h3 class="font-bold text-lg">New Workspace</h3>
            <br />
            <input 
                type="text" 
                placeholder="Name your Workspace" 
                bind:value={workspaceName}
                class="input input-bordered input-secondary w-full" 
            />

            <div class="modal-action">
                <button class="btn" on:click={create}>Create!</button>
                <button class="btn btn-outline btn-error" on:click={closeModal}>Cancel</button>
            </div>
        </div>
    </div>
{/if}