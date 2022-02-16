
<!-- <svelte:options accessors={true} /> -->

<script lang=ts>
  /*
    todo
    
    component as list-item
    pass a component and its props, and make items w/ that
  */
  import { nanoid } from "nanoid"
  import { popoverCtrl } from "$lib/popover/popover"
  import type { PopoverCtrl_val } from "$lib/popover/popover"
  import { afterUpdate, onDestroy, onMount } from "svelte"
  import type { 
    // Content as TooltipContent,
    Instance as TooltipInstance, 
    // Props as TooltipProps,
  } from 'tippy.js'
  
  
  // BUG svelte: declarations not seen outside
  // export {
  //   addItems, 
  //   // itemsNumber,
  // }
  
  type Item = {
    // icon: 
    id: string
    lbl: string
  }
  
  export let ctrl = <PopoverCtrl_val | null>null
  const id = nanoid() // test
  let items: Item[] = []
  export let itemsNumber = 0 // test
  
  /**
   * container tooltip, 
   * populated if this cmp was instanced inside a tooltip
   */
  // export let tooltip = <TooltipInstance | null>null
  // svelte warns: "prop not passed" (when cmp is created in HTML)
  // export let tooltip: TooltipInstance | undefined
  
  
  $: {
    // needed to make this expr reactive
    console.log(`itemsNumber`, itemsNumber)
    
    createItems()
  }
  
  
  // * lifecycle
  
  afterUpdate(() => {
		console.log(`afterUpdate `, )
    
	})
  onDestroy(() => {
		console.log(`onDestroy `, )
    
	})
  onMount(() => {
		console.log(`onMount `, )
    
	})
  
  
  let selectedItem: Item | undefined
  
  export function get_selectedItem() {
    return selectedItem
  }
  
  function selectItem(item: Item) {
    // console.log(`selectItem() `, item)
    
    selectedItem = item
    popoverCtrl.update(val => val)
    
    ctrl?.tooltip.hide()
    // $popoverCtrl[ctrlId].tooltip.hide()
    
    return item
	}
  
  // * tests
  
  function createItems() {
    // console.log(`itemsNumber`, itemsNumber)
    
    items = []
    for (let i = 0; i < itemsNumber; i++) {
      items.push(<Item>{
        lbl: i + "00000000000000000000000000000000000",
        // lbl: i + id,
        // lbl: i + id + "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        // lbl: i + id + "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      })
    }
    items = items
  }
  
  export function addItems(addendum: number = 10) {
    itemsNumber += addendum
  }
  export function removeItems(addendum: number = 10) {
    itemsNumber -= addendum
  }
  
  
</script>


<div 
  class="cmp"
>
  <!-- <div class="rug"></div> -->
  
  <div class="scroller">
    <div class="list-items">
    
      {#each items as item}
        <div
          class="li"
          on:click={() => selectItem(item)}
        >
          {item.lbl}
        </div>
      {/each}
    
    </div>
  </div>
  
</div>


<style lang=scss>
  
  @use "sass:map";
  
  @use "../../lib/color";
  @use "../../lib/palette" as plt;
  
  
  .cmp {
    // when put inside 'popover' cmp
    max-height: inherit;
    
    border-radius: var(--border-radius);
    padding: .5em 0;
    
    display: grid;
    grid-template-rows: 1fr;
    
    .scroller {
      padding: 0 .5em;
      isolation: isolate;
      overflow-y: auto;
    }
    
    .list-items {
      // max-width: 500ch; // test
      // max-width: 40ch; // best choice is w/out
      
      .li {
        border-radius: var(--border-radius);
        padding: .4em .7em;
        
        &:hover {
          background-color: tomato;
        }
      }
      
    }
    
    
  
  }
  
  :global(html.theme-dark) {
    
    .cmp {
      $bg: color.scale(
        map.get(plt.$dark, "base"), 
        $lightness: 5%,
      );
      background-color: rgba($bg, .7);
      backdrop-filter: blur(.1em);
      
      // lightness 1 to 3
      box-shadow: 0em .2em .5em .1em hsla(0 0% 0% / .1);
      // lightness 3 to 5
      // box-shadow: 0em .2em 1em .2em hsla(0 0% 0% / .1);
    }
    
  }
  
  :global(html.theme-light) {
    
    .cmp {
      // background-color: var(--plt-base);
      background-color: hsla(var(--plt-base-hsl), .3);
      backdrop-filter: blur(.2em);
      
      // ? colored shadow = good idea?
      box-shadow: 0em .2em .5em .1em hsla(var(--plt-cover-hsl), .1);
    }
    
  }
  
</style>