<script lang="ts">
    import { onMount } from "svelte";
    import Options from "./Options.svelte";

    let count = 0;


</script>

<div class="overlay">
</div>

<style>
    .overlay {
        position: fixed;
        width: 300px;
        top: 16px;
        left: 16px;
        background-color: white;
        border: 1px solid black;
        padding: 16px;
    }
</style>
