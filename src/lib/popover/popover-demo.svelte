
<script lang=ts>
  /* 
    dependencies
    Menu ($lib/menu)
  */
  import Btn from "$lib/btn/btn.svelte"
  import Menu from "$lib/menu/menu.svelte"
  
  import { popover, popoverCtrl } from "$lib/popover/popover"
  import type { PopoverArgs } from "$lib/popover/popover"
  
  import { afterUpdate, onMount } from "svelte"
  
  
  let showReferenceElem = true
  
  // may also be a simple literal in the HTML
  // const popoverArgs: PopoverArgs<Menu> = {
  const popoverArgs: PopoverArgs = {
    cmp: Menu,
    // cmpProps: {},
    // cmpOpts: {},
    popoverCtrl_key: "randId",
    // tippyOpts: {},
  }
  
  
  onMount(() => {
		// console.log(`onMount `, )
    
	})
  
  
</script>


<Btn
  btnEl={showReferenceElem}
  {popoverArgs}
>
  menu
</Btn>

<Btn 
  on:click="{() => {
    
    // showReferenceElem = !showReferenceElem
    
    
    // * ways of changing cmp instance (inside tippy tooltip)'s props
    
    popoverCtrl.randId.cmp.addItems()
    // popoverCtrl.randId.cmp.$set({itemsNumber: 7})
    
    // popoverArgs.cmpProps = {
    //   itemsNumber: 4,
    // }
    
    
    // * ways of changing tippy instance's props
    
    // popoverArgs.tippyOpts = {
    //   placement: "right",
    // }
    
    
  }}"
>
  add menu items
</Btn>


<!-- <style lang=scss></style> -->















