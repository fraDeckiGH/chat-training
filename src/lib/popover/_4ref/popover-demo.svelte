
<script lang=ts>
  /* 
    dependencies
    Btn ($lib/btn)
    Menu ($lib/menu)
  */
  // import { getPopoverCtrl } from "."
  import { 
    // getController,
    // getPopoverCtrl,
    popoverCtrls,
  } from "$lib/popover/index.svelte"
  // } from "."
  import type { PopoverArgs, PopoverCtrl } from "."
  import Btn from "$lib/btn/btn.svelte"
  import type { Writable$ } from "$lib/store"
  
  import Menu/* , { MenuItem } */ from "$lib/menu/menu.svelte"
  // import type Menu from "$lib/menu/menu.svelte"
  import type { MenuItem } from "$lib/menu/menu.svelte"
  // import Menu_1 from "$lib/menu/menu-1.test.svelte"
  
  // import { popoverCtrls } from "$lib/popover/popover"
  // import type { 
  //   CustomStore, 
  //   PopoverArgs, 
  //   PopoverCtrl, 
  // } from "$lib/popover/popover"
  
  import { /* afterUpdate,  */onMount } from "svelte"
  import { writable } from "svelte/store";
  
  
  // const ctrlId = 5308
  // const ctrlId = "randId"
  const ctrlId = Symbol()
  
  // let items: MenuItem[] = (<MenuItem[]>[
  const items = writable([
    {
      lbl: "bbb",
    },
    {
      lbl: "aaa",
    },
    {
      lbl: "ccc",
    },
    
  ])
  
  // may also be a simple literal in the HTML
  const popoverArgs: PopoverArgs<Menu> = {
    cmp: Menu,
    
    // cmpProps: {},
    cmpProps: {
      // items,
      items$: items,
      // itemsNumber: 10,
    },
    
    // cmpOpts: { props: {}, },
    /* cmpOpts: {
      context: new Map(
        Object.entries({
          items$: items, // works!
        })
      ),
      
    }, */
    
    // content: "my tip is...",
    ctrlId,
    
    // tooltipOpts: {},
    tooltipOpts: {
      // hideOnClick: false,
      hideOnClick: 'toggle',
      // placement: "left",
      
    },
    
  }
  
  let popoverCtrl: Writable$<PopoverCtrl> | undefined 
  let showReferenceElem = true
  
  
  // $: console.log(`$popoverCtrls test: key removed? `, $popoverCtrls)
  // $: console.log(`$items `, $items)
  $: {
    popoverCtrl = $popoverCtrls[ctrlId]
    // popoverCtrl = getPopoverCtrl?.(ctrlId)
    console.log(`popoverCtrl`, popoverCtrl)
    console.log(`$popoverCtrl`, $popoverCtrl)
  }
  $: {
    console.log(`item selected `, 
      // $popoverCtrls[ctrlId]?.cmp.get_selectedItem()
      // popoverCtrls[ctrlId]?.cmp.get_selectedItem()
      // popoverCtrls[`$${[ctrlId]}`]?.cmp.get_selectedItem()
      
      $popoverCtrl?.cmp.get_selectedItem()
    )
  }
  
  
  onMount(() => {
		// console.log(`onMount `, )
    
    
	})
  
  
  /**
   * reactivity test
   */
  function alterMenuItems() {
    
    // items.push(<MenuItem>{
    //   lbl: "4444",
    // })
    // items = items
    
    // console.log(`items`, items)
    
    
    items.update((val) => {
      val.push({
        lbl: "4444",
      })
      return val
    })
    
    console.log(`$items`, $items)
    
  }
  
  /**
   * worked even when popoverCtrls wasn't a store
   * w/ the following limitation: 
   * parent/utilizer of popoverCtrls.cmp (eg. this cmp), 
   * could not be notified of changes. no reactivity event 
   * was fired when changes happened);
   * could still retrieve the updated value(s) tho, 
   * (problem is when to?)
   * 
   * consider popoverArgs usage defunct
   */
  function addMenuItems() {
    // console.log(`addMenuItems() popoverCtrls`, popoverCtrls)
    
    // showReferenceElem = !showReferenceElem
    
    
    // * ways of changing cmp instance (inside tippy tooltip)'s props
    
    // $popoverCtrl?.cmp.addItems()
    $popoverCtrl?.cmp.alterMenuItems()
    
    // $popoverCtrls[ctrlId].cmp.addItems()
    // $popoverCtrls[ctrlId].cmp?.$set({ itemsNumber: 50 })
    // $popoverCtrls[ctrlId].cmp.itemsNumber! += 10 // set acaccessors={true}
    
    // popoverArgs.cmpProps = {
    //   itemsNumber: 7,
    // }
    
    
    // * ways of changing tippy instance's props
    
    // $popoverCtrls[ctrlId].tooltip.setProps({
    //   placement: "left",
    // })
    
    // popoverArgs.tooltipOpts = {
    //   placement: "left",
    // }
    
    
  }
  
  function testHelper() {
    
    // $popoverCtrls[ctrlId].cmp?.$set({itemsNumber: 2})
    // // popoverArgs.cmpProps = {
    // //   itemsNumber: 2,
    // // }
    
    // $popoverCtrls[ctrlId].tooltip.setProps({
    //   placement: "right",
    // })
    // // popoverArgs.tooltipOpts = {
    // //   placement: "right",
    // // }
    
  }
  
  
</script>


<Btn
  btnEl={showReferenceElem}
  {popoverArgs}
>
  menu
</Btn>

<Btn 
  on:click="{alterMenuItems}"
>
  alter items
</Btn>

<Btn 
  on:click="{addMenuItems}"
>
  add items
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
  toggle tippyTriggerEl
</Btn>


<!-- <style lang=scss></style> -->















