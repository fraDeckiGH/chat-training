
<script lang=ts>
  import type { Auth } from "$lib/auth"
  import Btn from "$lib/btn/btn.svelte";
  import BtnDemo from "$lib/btn/btn-demo.svelte";
  import { createModal } from "$lib/modal/modal"
  import PopoverDemo from "$lib/popover/popover-demo.svelte"
  import ToastHandlerDemo from "$lib/toast-handler/toast-handler-demo.svelte";
  import type { Maybe } from "$lib/type/util"
  import { onMount } from "svelte"
  
  
  // let access: (() => void) | undefined
  let auth: Auth | undefined
  let psw_autocomplete = "new-password"
  let submittingForm = false
  let userHasAccount: Maybe<string>
  
  
  // * {pinned} lifecycle
  
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
    submittingForm = !submittingForm // test
    return
    
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
    <Btn 
      on:click={() => auth?.signOut()}
    >
      sign out
    </Btn>
    <Btn 
    >
      see password
    </Btn>
    
    <Btn 
      on:click="{createModal}"
    >
      see modal
    </Btn>
    
    <ToastHandlerDemo></ToastHandlerDemo>
    <PopoverDemo></PopoverDemo>
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

      <Btn 
        attr={{
          // disabled: submittingForm,
          // style: "height: 2000px;",
          type: "submit",
        }}
        highlighted
        loading={submittingForm}
      >
        Enter
      </Btn>
      
      <!-- 
        link="fwwefjo"
        loading={submittingForm}
      -->
      <Btn 
        attr={{
          // disabled: true,
          disabled: submittingForm,
          // style: "height: 2000px;",
          type: "button",
        }}
        on:click={() => {
          submittingForm = !submittingForm
        }}
      >
        Ask help
      </Btn>
      
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
    
    
  }
  
</style>
