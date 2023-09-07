<script lang="ts">
    export let name: string;
    export let link: string;    
</script>

<div class="card shadow-lg bg-base-100 rounded-box w-96 h-48">
    <div class="card-body">
        <div class="flex flex-col">
            <div class="flex flex-row justify-between">
                <div class="flex flex-col">
                    <div class="text-2xl font-bold">{name}</div>
                    <div class="text-sm">{link}</div>
                </div>
                <div class="flex flex-row">
                    <button class="btn btn-circle btn-xs btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12a7 7 0 01-7 7m7-7a7 7 0 00-7-7m7 7H5" /></svg>
                    </button>
                    <button class="btn btn-circle btn-xs btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12a7 7 0 01-7 7m7-7a7 7 0 00-7-7m7 7H5" /></svg>
                    </button>
                </div>
            </div>
    </div>
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


