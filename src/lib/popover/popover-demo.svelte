
<script lang=ts>
  /* 
    dependencies
    Btn ($lib/btn)
    List ($lib/menu)
  */
  import Btn from "$lib/btn/btn.svelte"
  
  import List from "$lib/list/list.svelte"
  import type { ListItemProps } from "$lib/list-item/list-item.svelte";
  
  import { 
    popoverChanges,
    popoverCtrls, 
  } from "$lib/popover"
  import type { PopoverArgs, PopoverCtrls_val } from "$lib/popover"
  
  import { writable$ } from "$lib/store"
  import type { Maybe } from "$lib/type/util"
  
  
  // const ctrlId = 5308
  // const ctrlId = "randId"
  const ctrlId = Symbol()
  
  const items_val: ListItemProps[] = [
    // ? coercion is for tests
    {
      // id: "1",
      id: Symbol(),
      lbl: "BBB irejgre gjiregijrei jg",
    },
    {
      // id: "2",
      id: Symbol(),
      lbl: "Item theItem",
      link: "4354543534543543543",
    },
    {
      // id: "3",
      id: Symbol(),
      disabled: true,
      lbl: "ccc",
    },
    
  ]
  const items = writable$(items_val)
  
  
  // may also be a simple literal in the HTML
  const popoverArgs: PopoverArgs<List> = {
    cmp: List,
    
    // cmpProps: {},
    cmpProps: {
      // itemCmp: MenuItem2,
      
      // items,
      items$: items,
      
    },
    
    // cmpOpts: { props: {items$: items, trete: "ewrie"}, },
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
  
  let popoverCtrl: Maybe< PopoverCtrls_val<List> >
  let showReferenceElem = true
  
  
  // $: console.log(`items `, items)
  $: console.log(`$items `, $items)
  
  $: {
    $popoverChanges;
    popoverCtrl = popoverCtrls[ctrlId]
  }
  $: {
    console.log(
      `selected item`, 
      // $popoverCtrl?.cmp.getSelectedItem()
      
    )
  }
  
  
  
  /**
   * reactivity test
   */
  function alterMenuItems() {
    
    // 1
    
    // items.push(<ListItemProps>{
    //   lbl: "4444",
    // })
    // items = items
    
    // console.log(`items`, items)
    
    
    // 2
    
    items.update((val) => {
      val.push(<ListItemProps>{
        lbl: "4444",
      })
      return val
    })
    
    // console.log(`$items`, $items)
    
  }
  
  
  function addMenuItems() {
    
    // * ways of changing cmp instance (inside tippy tooltip)'s props
    
    // ? all 3 work
    $popoverCtrl?.cmp.alterMenuItems()
    
    // popoverCtrl?.update((val) => {
    // no intellisense cuz type is Controllers<any>
    // popoverCtrls[ctrlId].update((val) => { 
    //   val.cmp.alterMenuItems()
    //   return val
    // })
    // ------------
    
    // $popoverCtrl.cmp.$set({ items:  })
    
    
    // * ways of changing tippy instance's props
    
    // $popoverCtrl.tooltip.setProps({
    //   placement: "left",
    // })
    
  }
  
  function testHelper() {
    
    // $popoverCtrl.tooltip.setProps({
    //   placement: "left",
    // })
    
  }
  
  
</script>

<!-- use the following outside for additional tests
  
  script
  
  let popoverDemo = true
  
  
  html
  
  <div class=""
    on:click="{() => {
      popoverDemo = !popoverDemo
      popoverDemo=popoverDemo
    }}"
  >
    toggle PopoverDemo
  </div>
  {#if popoverDemo}
    <PopoverDemo></PopoverDemo>
  {/if}
  
-->

<!-- simple usage -->
<!-- <List
  items$={items}
></List> -->

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

<!-- <Btn 
  on:click="{testHelper}"
>
  testHelper
</Btn> -->

<Btn 
  on:click="{() => {
    showReferenceElem = !showReferenceElem
  }}"
>
  toggle tippyTriggerEl
</Btn>


<!-- <style lang=scss></style> -->















