
<script lang=ts>
  import type { Auth } from "$lib/auth"; 
  import { onMount } from "svelte";
  
  let auth: Auth
  
  onMount(async () => {
    auth = (await import("$lib/auth")).createAuth()
  })
  
</script>


<main class="page">
    
  <h4>
    login
  </h4>
  
  <div class="form">
    
    {#if auth}
      <input 
        bind:value={auth.form.email}
        placeholder="Email"
      >
      <input 
        bind:value={auth.form.password}
        placeholder="Password"
        type="password"
      >
      
      <button on:click={() => auth.createUserWithEmailAndPassword()}
        class="btn-submit"
      >
        Enter
      </button>
    {/if}
    
  </div>
    
</main>


<style lang=scss>
  
  main {
    display: grid;
    align-content: flex-start;
  }
  
  .form {
    justify-self: center;
    
    width: 100%;
    max-width: 30ch;
    
    display: grid;
    gap: 1em;
    
    font-size: 110%;
    
    input {
      // border: initial;
    }
    
    .btn-submit {
      // border: 0;
      // cursor: pointer;
      
      // font-weight: 500;
    }
  }
  
</style>
