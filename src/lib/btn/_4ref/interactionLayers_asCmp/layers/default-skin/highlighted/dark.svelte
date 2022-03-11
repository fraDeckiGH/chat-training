
<script lang=ts>
  import { onDestroy, onMount } from "svelte";
  import { fade } from 'svelte/transition';
  
  
  onDestroy(() => {
    console.log(`dummy destroyed`, )
  })
  onMount(() => {
    console.log(`dummy mounted`, )
  })
  
</script>


<div class="dummy"></div>


<style lang="scss">
  .dummy {
    padding: 5px;
    background-color: blueviolet;
  }
</style>