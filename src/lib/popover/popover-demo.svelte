
<script lang=ts>
  /* 
    dependencies
    Menu ($lib/menu)
  */
  import Menu from "$lib/menu/menu.svelte"
  import { onMount } from "svelte";
  import { popover, popoverCtrl } from "$lib/popover/popover"
  import type { PopoverArgs } from "$lib/popover/popover"
  
  
  onMount(() => {
		// console.log(`onMount `, )
    
	})
  
  
  let showReferenceElem = true
  
  // may also be a simple literal in the HTML
  const popoverArgs: PopoverArgs<Menu> = {
    cmp: Menu,
    // cmpProps: {},
    // cmpOpts: {},
    popoverCtrl_key: "randId",
    // tippyOpts: {},
  }
  
  
</script>


<!-- <span class="btn-wrapper"> -->
{#if showReferenceElem}
<button
  use:popover={popoverArgs}
>
  menu
</button>
{/if}
<!-- </span> -->

<button 
  on:click="{() => {
    
    // showReferenceElem = !showReferenceElem
    
    // ways of changing cmp instance (inside tippy tooltip)'s props
    
    // popoverCtrl.randId.cmp.addItems()
    // popoverCtrl.randId.cmp.$set({itemsNumber: 7})
    
    // popoverArgs.cmpProps = {
    //   itemsNumber: 4,
    // }
    
    // ways of changing tippy instance's props
    popoverArgs.tippyOpts = {
      placement: "right",
    }
    
  }}"
>
  add menu items
</button>


<style lang=scss>
  
</style>















