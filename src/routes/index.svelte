
<script lang=ts>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  
  onMount(() => {
    // user logged
    // goto("/home")
    
    // user !logged
    goto("/access")
  })
  
</script>

<!-- root page -->
<!-- this is the page that loads the app -->

<!-- <slot> -->
  <!-- <Layout></Layout> -->
  <!-- <Login></Login> -->
  
  <!-- 
    an idea could be to put a loading here 
    sth saying "loading the app" for example
  -->
<!-- </slot> -->


<main class="page">
  
  <h4>
    index
  </h4>
  
  
  
</main>



<style lang=scss>
  
  
  
</style>
