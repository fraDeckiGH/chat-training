
<script lang="ts" context=module>
  export type {
    Item as MenuItem,
  }
  
  type Item = {
    // icon: 
    id: string
    lbl: string
    
    /**
     * when a redirect is desired
     */
    link?: string
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
  import Btn from "$lib/btn/btn.svelte";
  import type Cmp from "$lib/menu/menu.svelte"
  import type { 
    PopoverCtrls_val, 
  } from "$lib/popover";
  import type { Writable$ } from "$lib/store";
  import type { Maybe } from "$lib/type/util";
  import { onDestroy } from "svelte";
  import type { Unsubscriber } from "svelte/store"
  
  
  // (pass only 1 of these)
  // non-reactive
  export let items = <Item[]>[]
  // store
  export let items$ = < Maybe<Writable$<typeof items>> >null
  const unsub_items$: Maybe<Unsubscriber> = 
    items$?.subscribe((value) => {
      items = value
    })
  ;
  
  export let popoverCtrl = <Maybe< PopoverCtrls_val<Cmp> >>null
  // BUG svelte "$popoverCtrl.prop not possible on type never"
  // export let popoverCtrl: Maybe< PopoverCtrls_val<Cmp> > = null
  
  let selectedItem: Item | undefined
  
  
  // * lifecycle
  
  onDestroy(() => {
		// console.log(`onDestroy `, )
    unsub_items$?.()
	})
  
  /* onMount(() => {
		console.log(`onMount `, )
    
	}) */
  
  
  export function get_selectedItem() {
    return selectedItem
  }
  
  function selectItem(item: Item) {
    // console.log(`selectItem() `, item)
    selectedItem = item
    
    if (popoverCtrl && $popoverCtrl) {
      popoverCtrl.sync()
      $popoverCtrl.tooltip.hide()
    }
    
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
  
  <nav class="scroller">
    <ul class="list-items">
    
      {#each items as item}
        <li 
          class="li"
        >
          <Btn 
            link={item.link}
            look="menuItem"
            on:click={() => selectItem(item)}
          >
            {item.lbl}
          </Btn>
        </li>
      {/each}
    
    </ul>
  </nav>
  
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
      
      .li {}
    }
    
    :global(html.theme-dark) & {
      $bg: color.scale(
        map.get(plt.$dark, "base"), 
        $lightness: 5%,
      );
      background-color: rgba($bg, .7);
      backdrop-filter: blur(.2em);
      
      // lightness 1 to 3
      box-shadow: 0em .2em .5em .1em hsl(0 0% 0% / 10%);
      // lightness 3 to 5
      // box-shadow: 0em .2em 1em .2em hsl(0 0% 0% / 10%);
    }
    
    :global(html.theme-light) & {
      // background-color: var(--plt-base);
      background-color: hsl(var(--plt-base-hsl) / 70%);
      backdrop-filter: blur(.2em);
      
      // ? colored shadow = good idea?
      box-shadow: 0em .2em .5em .1em hsl(var(--plt-cover-hsl) / 10%);
    }
    
  }
  
  
</style>




