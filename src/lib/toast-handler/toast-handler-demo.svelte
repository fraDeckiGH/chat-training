<script lang="ts">
  import Btn from "$lib/btn/btn.svelte";
  // import { singleton as toast } from "$lib/toast-handler/toast-handler"
  import type ToastHandler from "$lib/toast-handler/toast-handler.svelte";
  import { onMount } from "svelte";
  
  let toast: ToastHandler | undefined
  
  onMount(async () => {
    toast = (await import("$lib/toast-handler/toast-handler")).singleton
    
  })
  

</script>


{#if toast}
  <Btn
    on:click="{toast.add}"
  >
    add toast
  </Btn>

  <Btn
    on:click="{toast.remove}"
  >
    remove toast
  </Btn>
{/if}






