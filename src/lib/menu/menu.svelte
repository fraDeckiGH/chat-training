
<!-- <svelte:options accessors={true} /> -->

<script lang="ts">
  /*
    todo
    
    {component as list-item}
    use a passed component as list-item
    pass a component and its props, and make items w/ that.
    in other words, iterate that in the html
  */
  import { nanoid } from "nanoid"
  import { popoverCtrls } from "$lib/popover/popover"
  import type { PopoverCtrl } from "$lib/popover/popover"
  import { afterUpdate, onDestroy, onMount } from "svelte"
  import { getContext/* , hasContext */ } from 'svelte'
  import type { Unsubscriber, Writable } from "svelte/store"
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
  export type {
    Item as MenuItem,
  }
  
  type Item = {
    // icon: 
    id: string
    lbl: string
  }
  
  export let popoverCtrl = <PopoverCtrl | null>null
  const id = nanoid() // test
  export let itemsNumber = 0 // test
  
  // non-reactive
  export let items: Item[] = []
  // store, can be passed as prop or w/ context
  export let items$: Writable<typeof items> | undefined = 
    getContext("items$")
  let unsub_items$: Unsubscriber | undefined = 
    items$?.subscribe((value) => {
      items = value
    })
  ;
  
  
  /**
   * container tooltip, 
   * populated if this cmp was instanced inside a tooltip
   */
  // all good
  // export let tooltip = <TooltipInstance | null>null
  // svelte warns: "prop not passed" (when cmp is created in HTML)
  // export let tooltip: TooltipInstance | undefined
  
  
  $: {
    // these 2 log the same result
    // console.log(`items`, items)
    // console.log(`$items$`, $items$)
  }
  
  // tests
  /* $: { 
    // needed to make this expr reactive
    console.log(`itemsNumber`, itemsNumber)
    
    createItems()
  } */
  
  
  // * lifecycle
  
  afterUpdate(() => {
		console.log(`afterUpdate `, )
    
	})
  onDestroy(() => {
		console.log(`onDestroy `, )
    unsub_items$?.()
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
    popoverCtrls.sync()
    
    // tooltip?.hide()
    popoverCtrl?.tooltip.hide()
    // $popoverCtrls[ctrlId].tooltip.hide()
    
    // TODO destroy cmp (?)
    
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
    <ul class="list-items">
    
      {#each items as item}
        <li
          class="li"
          on:click={() => selectItem(item)}
        >
          {item.lbl}
        </li>
      {/each}
    
    </ul>
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