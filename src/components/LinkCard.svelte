<script lang="ts">
    import workSpaceStorage, { selectedWorkspace } from "../workSpaceStorage";

    export let name: string;
    export let link: string;    
    export let index: number;

    let disabled:boolean = true;

    function save(){
        disabled = !disabled;
        if(name != "" && link != ""){
            workSpaceStorage.updateLink(index, $selectedWorkspace, {name, url: link});
        }
    }

    function cancel(){
        disabled = !disabled;
    }

    function deleteLink(){
        workSpaceStorage.deleteLink($selectedWorkspace, index);
    }

</script>

<div class="card border border-gray-300 rounded-box w-full my-1">
    <div class="collapse">
        <input type="checkbox">
        <!-- <div class="flex flex-col"> -->
            <div class="collapse-title ">
                <div class="text-lg font-bold">
                    {name}
                </div>
            </div>
            <div class="collapse-content ">
                <!-- Web SVG icon next to the link -->
                <div class="flex justify-between items-center">
                    <div class="flex justify-start items-center gap-2">
                        <div>
                            <label  class="label {disabled ? 'hidden' : ''}">
                                <span class="label-text">Name</span>
                            </label>
                            <input class="{!disabled ? 'input input-sm input-bordered w-full' : ''}"  type="text" bind:value={name} {disabled} hidden = {disabled}>   
                        </div>
                        <div>
                            <label class="label {disabled ? 'hidden' : ''}">
                                <span class="label-text">Url</span>
                            </label>
                            <input class="{!disabled ? 'input input-sm input-bordered w-full' : ''}" type="text" bind:value={link} {disabled}>  
                        </div>
                    </div>

                    <!-- Edit and delete button Daisy UI only icon -->
                    {#if disabled}
                        <div>
                            <button class="btn  btn-sm btn-neutral" on:click={()=> disabled = !disabled}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                Edit
                            </button>
                            <button class="btn  btn-sm  btn-error btn-outline" on:click={deleteLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    {:else}
                        <div>
                            <button class="btn  btn-sm btn-neutral" on:click={save}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                Save
                            </button>
                            <button class="btn  btn-sm  btn-error btn-outline" on:click={cancel}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                
                            </button>
                        </div>
                    {/if}
                    
                </div>
            </div>
        <!-- </div> -->
    </div>
</div>
<style>
    .card {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

</style>


