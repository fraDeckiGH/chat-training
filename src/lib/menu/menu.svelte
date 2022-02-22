
<script lang="ts" context=module>
  export type {
    Item as MenuItem,
  }
  
  type Item = {
    // icon: 
    id: string
    lbl: string
  }
  
</script>

<script lang="ts">
  /*
    todo
    
    --
    {component as list-item}
    use a passed component as list-item
    pass a component and its props, and make items w/ that.
    in other words, iterate that in the html
    
    here? shouldn't I keep things simple?
    --
  */
  import type { 
    PopoverCtrl, 
    PopoverCtrls, 
    PopoverCtrls_key, 
  } from "$lib/popover"
  import type { Writable$ } from "$lib/store"
  import { onDestroy } from "svelte"
  import type { Unsubscriber, Writable } from "svelte/store"
  
  
  // (pass only 1 of these)
  // non-reactive
  export let items: Item[] = []
  // store
  export let items$: Writable<typeof items> | undefined
  const unsub_items$: Unsubscriber | undefined = 
    items$?.subscribe((value) => {
      items = value
    })
  ;
  
  let popoverCtrl: PopoverCtrl | undefined
  export let popoverCtrls: Writable$<PopoverCtrls> | undefined = undefined
  export let popoverCtrls_key: PopoverCtrls_key | undefined = undefined
  
  let selectedItem: Item | undefined
  
  
  $: {
    if ($popoverCtrls && popoverCtrls_key) {
      popoverCtrl = $popoverCtrls[popoverCtrls_key]
    }
  }
  
  
  // * lifecycle
  
  onDestroy(() => {
		// console.log(`onDestroy `, )
    unsub_items$?.()
	})
  
  
  export function get_selectedItem() {
    return selectedItem
  }
  
  function selectItem(item: Item) {
    // console.log(`selectItem() `, item)
    
    selectedItem = item
    popoverCtrls?.sync()
    
    popoverCtrl?.tooltip.hide()
    
    // TODO destroy cmp (?)
    
    return item
	}
  
  
  // * tests
  
  /**
   * reactivity test
   * works! o.o
   * also tried w/out export by making this func trigger from here
   */
  export function alterMenuItems() {
    items.push(<Item>{
      lbl: "4444",
    })
    items = items
    
    console.log(`items`, items)
  }
  
  
</script>


<div 
  class="cmp"
>
  <!-- <div class="rug"></div> -->
  
  <div class="scroller">
    <ul class="list-items">
    
      {#each items as item}
        <button 
          class="li"
          on:click={() => selectItem(item)}
        >
          {item.lbl}
        </button>
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