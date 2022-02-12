
<script lang=ts>
  /* 
    dependencies
    Menu ($lib/menu)
  */
  import Btn from "$lib/btn/btn.svelte"
  
  import Menu from "$lib/menu/menu.svelte"
  // import type Menu from "$lib/menu/menu.svelte"
  // import Menu_1 from "$lib/menu/menu-1.test.svelte"
  
  import { popoverCtrl } from "$lib/popover/popover"
  import type { PopoverArgs } from "$lib/popover/popover"
  
  import { afterUpdate, onMount } from "svelte"
  
  
  // const ctrlId = 5308
  // const ctrlId = "randId"
  const ctrlId = Symbol()
  
  // may also be a simple literal in the HTML
  const popoverArgs: PopoverArgs<Menu> = {
    cmp: Menu,
    
    // cmpProps: {},
    cmpProps: {
      itemsNumber: 4,
    },
    
    // cmpOpts: { props: {}, },
    // content: "my tip is...",
    ctrlId,
    
    // tooltipOpts: {},
    tooltipOpts: {
      hideOnClick: 'toggle',
      // placement: "left",
      
    },
    
  }
  
  let showReferenceElem = true
  
  
  onMount(() => {
		// console.log(`onMount `, )
    
	})
  
  
  function addMenuItems() {
    // console.log(`addMenuItems() popoverCtrl`, popoverCtrl)
    
    // showReferenceElem = !showReferenceElem
    
    
    // * ways of changing cmp instance (inside tippy tooltip)'s props
    
    popoverCtrl[ctrlId].cmp?.addItems()
    // popoverCtrl[ctrlId].cmp?.$set({itemsNumber: 50})
    
    // popoverArgs.cmpProps = {
    //   itemsNumber: 4,
    // }
    
    
    // * ways of changing tippy instance's props
    
    // popoverArgs.tooltipOpts = {
    //   placement: "right",
    // }
    
    
    // ? tests on SvelteActionReturnType.update()
    
    // setTimeout(() => {
    //   console.log(`addMenuItems() popoverCtrl`, popoverCtrl)
    // }, 100)
    
    // setTimeout(() => {
    //   popoverArgs.cmpProps = {
    //     itemsNumber: 2,
    //   }
    //   popoverArgs.tooltipOpts = {
    //     placement: "right",
    //   }
    // }, 4000)
    
  }
  
  
</script>


<Btn
  btnEl={showReferenceElem}
  {popoverArgs}
>
  menu
</Btn>

<Btn 
  on:click="{addMenuItems}"
>
  add menu items
</Btn>


<!-- <style lang=scss></style> -->















