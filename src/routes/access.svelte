
<script context=module lang=ts>
  // import { createUser } from "$lib/_auth";
  // import { firebaseApp } from "$lib/firebase";
  // import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
  
  /* function createUser(form: any) {
    console.log(`form`, form)
    
    const auth = getAuth(firebaseApp)
    
    createUserWithEmailAndPassword(auth, form.email, form.password)
    .then((userCredential) => {
      console.log(`userCredential`, userCredential)

      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.error(`error`, error)
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    })
    
    
  } */
  
</script>

<script lang=ts>
  import { onMount } from "svelte";
  // import { createUser } from "$lib/_auth";
  
  const form = {
    email: "",
    password: "",
  }
  
  
  let createUser: any
  
  onMount(async () => {
    createUser = (await import("$lib/_auth")).createUser
    
  })
  
</script>


<main class="page">
  <!-- <div class="page"> -->
    
    <h4>
      login
    </h4>
    
    <div class="form">
    
      <input bind:value={form.email}
        placeholder="Email"
      >
      <input bind:value={form.password}
        placeholder="Password"
        type="password"
      >
      
      {#if createUser}
      <button on:click={() => createUser(form)}
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
