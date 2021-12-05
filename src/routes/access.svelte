
<script lang=ts>
  import type { Auth } from "$lib/auth"; 
  import type { Maybe } from "$lib/type";
  import { onMount } from "svelte";
  
  // let access: (() => void) | undefined
  let auth: Auth | undefined
  let psw_autocomplete = "new-password"
  let submittingForm = false
  let userHasAccount: Maybe<string>
  
  onMount(async () => {
    auth = (await import("$lib/auth")).create()
    // console.log(`auth`, auth)
    
    // localStorage.item might change while user is using the app
    userHasAccount = window.localStorage.getItem("userHasAccount")
    initForm()
    
  })
  
  // * form
  
  /**
   * has to run client-side
   */
  function initForm() {
    if (!auth) {
      console.log(`return: !auth`, auth)
      return
    }
    
    if (userHasAccount) {
      // access = () => auth?.signInWithEmailAndPassword()
      psw_autocomplete = "current-password"
    } else {
      // access = () => auth?.createUserWithEmailAndPassword()
      psw_autocomplete = "new-password"
    }
  }
  
  async function submitForm() {
    console.log(`submitForm() `, )
    
    if (!auth) {
      console.log(`return: !auth`, auth)
      return
    }
    
    submittingForm = true
    // loading
    // evalutate error cases
    
    try {
      if (userHasAccount) {
        await auth.signInWithEmailAndPassword()
      } else {
        await auth.createUserWithEmailAndPassword()
      }
      console.log(`finished awaiting(s)`, )
    } catch (error) {
      console.error(`error`, error)
    }
    
    submittingForm = false
    console.log(`btn not disabled anymore`, )
  }
  
</script>


<main class="page">
    
  <h4>
    access
  </h4>
  
  <div class="actions">
    <button on:click={() => auth?.signOut()}
      class=""
    >
      sign out
    </button>
    
    <button 
      class=""
    >
      see password
    </button>
  </div>
  
  {#if auth}
  <!-- on:submit|preventDefault={() => {
        access?.()
      }} -->
    <form 
      autocomplete="on"
      class="form"
      on:submit|preventDefault={submitForm}
    >
      
      <!-- autofocus bad for mobile & accessibility -->
      <input 
        autocomplete="email"
        autofocus
        bind:value={auth.form.email}
        placeholder="Email"
        type="email"
      >
      <input 
        autocomplete={psw_autocomplete}
        bind:value={auth.form.password}
        placeholder="Password"
        type="password"
      >
      <!-- TODO eye icon to see the psw -->

      <button 
        class="btn-submit"
        disabled={submittingForm}
        type="submit"
      >
        Enter
      </button>
        
    </form>
  {/if}
  
  
    
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
    
    // font-size: 110%;
    
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
