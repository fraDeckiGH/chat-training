
<script lang=ts>
  /* 
    dependencies
    Btn ($lib/btn)
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
      itemsNumber: 10,
    },
    
    // cmpOpts: { props: {}, },
    // content: "my tip is...",
    ctrlId,
    
    // tooltipOpts: {},
    tooltipOpts: {
      // hideOnClick: 'toggle',
      // placement: "left",
      
    },
    
  }
  
  let showReferenceElem = true
  
  
  $: {
    console.log(`item selected `, 
      $popoverCtrl[ctrlId]?.cmp.get_selectedItem()
    )
  }
  
  
  onMount(() => {
		// console.log(`onMount `, )
    
	})
  
  
  function addMenuItems() {
    // console.log(`addMenuItems() popoverCtrl`, popoverCtrl)
    
    // showReferenceElem = !showReferenceElem
    
    
    // * ways of changing cmp instance (inside tippy tooltip)'s props
    
    popoverCtrl[ctrlId].cmp.addItems()
    // popoverCtrl[ctrlId].cmp?.$set({ itemsNumber: 50 })
    // popoverCtrl[ctrlId].cmp.itemsNumber! += 10 // set acaccessors={true}
    
    // popoverArgs.cmpProps = {
    //   itemsNumber: 7,
    // }
    
    
    // * ways of changing tippy instance's props
    
    // popoverCtrl[ctrlId].tooltip.setProps({
    //   placement: "left",
    // })
    
    // popoverArgs.tooltipOpts = {
    //   placement: "left",
    // }
    
    
  }
  
  function testHelper() {
    
    popoverCtrl[ctrlId].cmp?.$set({itemsNumber: 2})
    // popoverArgs.cmpProps = {
    //   itemsNumber: 2,
    // }
    
    popoverCtrl[ctrlId].tooltip.setProps({
      placement: "right",
    })
    // popoverArgs.tooltipOpts = {
    //   placement: "right",
    // }
    
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

<Btn 
  on:click="{testHelper}"
>
  testHelper
</Btn>

<Btn 
  on:click="{() => {
    showReferenceElem = !showReferenceElem
  }}"
>
  destroy tippyTriggerEl
</Btn>


<!-- <style lang=scss></style> -->















