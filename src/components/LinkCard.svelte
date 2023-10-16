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

<div class="card rounded-box w-full my-1">
    <div class="collapse">
        <input type="checkbox">
        <!-- <div class="flex flex-col"> -->
            <div class="collapse-title ">
                    <b>{name}</b>
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
                            <div class="flex gap-2">
                                <svg class="{!disabled ? 'hidden' : ''} w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"/>
                                  </svg>
                                <input class="{!disabled ? 'input input-sm input-bordered w-full' : ''}" type="text" bind:value={link} {disabled}>  
                            </div>
                            
                        </div>
                    </div>

                    <!-- Edit and delete button Daisy UI only icon -->
                    {#if disabled}
                        <div>
                            <button class="btn  btn-sm " on:click={()=> disabled = !disabled}>
                                <svg class="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                                  </svg>
                                  
                            </button>
                            <button class="btn  btn-sm  btn-error btn-outline" on:click={deleteLink}>
                                <svg class="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                  </svg>                            </button>
                        </div>
                    {:else}
                        <div class="self-end">
                            <button class="btn btn-success btn-sm" on:click={save}>
                                <svg  stroke="currentColor" class="w-[18px] h-[18px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M1 5.917 5.724 10.5 15 1.5"/>
                                  </svg>
                            </button>
                            <button class="btn btn-sm btn-outline" on:click={cancel}>
                                <svg  stroke="currentColor" class="w-[18px] h-[18px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 15">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"/>
                                  </svg>                                
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
        background-color: WHITE;
        border-radius: 8px;
    }

</style>


