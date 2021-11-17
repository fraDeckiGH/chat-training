
<script lang=ts>
  // import type { Form } from "$lib/_auth"; 
  import { onMount } from "svelte";
  
  const form/* : Form */ = {
    email: "",
    password: "",
  }
  
  
  // let createUser: any
  let auth: any
  
  onMount(async () => {
    // createUser = (await import("$lib/_auth")).createUser
    auth = await import("$lib/_auth")
    
  })
  
</script>


<main class="page">
  <!-- <div class="page"> -->
    
    <h4>
      login
    </h4>
    
    <div class="form">
      
      <!-- {#if $auth} -->
      <input bind:value={form.email}
        placeholder="Email"
      >
      <input bind:value={form.password}
        placeholder="Password"
        type="password"
      >
      
      {#if auth}
      <button on:click={() => auth.createUser(form)}
        class="btn-submit"
      >
        Enter
      </button>
      <!-- <button on:click={createUser}
        class="btn-submit"
      >
        Enter
      </button> -->
      {/if}
      
    </div>
    
  <!-- </div> -->
</main>


<style lang=scss>
  
  main {
    // height: 100vh;
  // }
  // .page {
  //   height: 100%;
    
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
