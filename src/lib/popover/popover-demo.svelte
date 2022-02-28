
<script lang=ts>
  /* 
    dependencies
    Btn ($lib/btn)
    Menu ($lib/menu)
  */
  import Btn from "$lib/btn/btn.svelte"
  
  import Menu from "$lib/menu/menu.svelte"
  import type { MenuItem } from "$lib/menu"
  
  import { 
    popoverCtrls, 
  } from "$lib/popover"
  import type { PopoverArgs, PopoverCtrls_val } from "$lib/popover"
  
  import { changes, Writable$, writable$ } from "$lib/store"
  import type { Maybe } from "$lib/type/util"
  
  
  // const ctrlId = 5308
  // const ctrlId = "randId"
  const ctrlId = Symbol()
  
  // let items: MenuItem[] = (<MenuItem[]>[
  const items: Writable$<MenuItem[]> = writable$(<MenuItem[]>[
    // ? coercion is for tests
    {
      lbl: "bbb",
    },
    {
      lbl: "aaa",
      link: "4354543534543543543",
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
  
  let popoverCtrl: Maybe< PopoverCtrls_val<Menu> >
  let showReferenceElem = true
  
  
  // $: console.log(`items `, items)
  $: console.log(`$items `, $items)
  
  $: {
    $changes;
    popoverCtrl = popoverCtrls[ctrlId]
  }
  $: {
    console.log(
      `selected item`, 
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
<!-- <Menu
  items$={items}
></Menu> -->

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















