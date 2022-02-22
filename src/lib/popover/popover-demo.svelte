
<script lang=ts>
  /* 
    dependencies
    Btn ($lib/btn)
    Menu ($lib/menu)
  */
  import Btn from "$lib/btn/btn.svelte"
  
  import Menu from "$lib/menu/menu.svelte"
  import type { MenuItem } from "$lib/menu/menu.svelte"
  
  import type { PopoverArgs, PopoverCtrl } from "$lib/popover"
  import { 
    popoverCtrls,
    popoverEvents,
  } from "$lib/popover"
  
  import type { Writable$ } from "$lib/store"
  import type { Maybe } from "$lib/type"
  import { writable } from "svelte/store"
  
  
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
  
  let popoverCtrl: Maybe<Writable$<PopoverCtrl>>
  let showReferenceElem = true
  
  
  // $: console.log(`items `, items)
  $: console.log(`$items `, $items)
  
  $: {
    // console.log(`log`, $popoverEvents)
    $popoverEvents;
    popoverCtrl = popoverCtrls[ctrlId]
  }
  $: {
    console.log(
      `selected item`, 
      // popoverCtrls[ctrlId]?.cmp.get_selectedItem()
      $popoverCtrl?.cmp.get_selectedItem()
    )
  }
  
  
  
  /**
   * reactivity test
   */
  function alterMenuItems() {
    
    // 1
    
    // items.push(<MenuItem>{
    //   lbl: "4444",
    // })
    // items = items
    
    // console.log(`items`, items)
    
    
    // 2
    
    items.update((val) => {
      val.push(<MenuItem>{
        lbl: "4444",
      })
      return val
    })
    
    // console.log(`$items`, $items)
    
  }
  
  /**
   * worked even when popoverCtrls wasn't a store
   * w/ the following limitation: 
   * parent/utilizer of popoverCtrls.cmp (eg. this cmp), 
   * could not be notified of changes. no reactivity event 
   * was fired when changes happened);
   * could still retrieve the updated value(s) tho, 
   * (problem is when to?)
   */
  function addMenuItems() {
    
    // * ways of changing cmp instance (inside tippy tooltip)'s props
    
    $popoverCtrl?.cmp.alterMenuItems()
    // $popoverCtrls[ctrlId].cmp.alterMenuItems()
    // $popoverCtrls[ctrlId].cmp.$set({ itemsNumber: 50 })
    
    
    // * ways of changing tippy instance's props
    
    // $popoverCtrls[ctrlId].tooltip.setProps({
    //   placement: "left",
    // })
    
  }
  
  function testHelper() {
    
    // $popoverCtrls[ctrlId].cmp.$set({itemsNumber: 2})
    
    // $popoverCtrls[ctrlId].tooltip.setProps({
    //   placement: "right",
    // })
    
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















