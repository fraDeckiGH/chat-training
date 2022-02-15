
<!-- <svelte:options accessors={true} /> -->

<script lang=ts>
  import { nanoid } from "nanoid";
  import { afterUpdate, onDestroy, onMount } from "svelte"
  
  // BUG svelte: declarations not seen outside
  // export {
  //   // addItems, 
  //   itemsNumber,
  // }
  
  const id = nanoid() // test
  let items: any[] = []
  export let itemsNumber = 0
  
  $: {
    console.log(`itemsNumber`, itemsNumber)
    createItems()
  }
  
  
  afterUpdate(() => {
		console.log(`afterUpdate `, )
    
	})
  onDestroy(() => {
		console.log(`onDestroy `, )
    
	})
  
  
  function createItems() {
    // console.log(`itemsNumber`, itemsNumber)
    
    items = []
    for (let i = 0; i < itemsNumber; i++) {
      items.push({
        // lbl: i + "00000000000000000000000000000000000",
        // lbl: i + id,
        lbl: i + id + "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
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
  <div class="scroller">
    
    {#each items as item}
      <div class="li">
        {item.lbl}
      </div>
    {/each}
    
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
      overflow-y: auto;
      padding: 0 .5em;
    }
    
    .li {
      border-radius: var(--border-radius);
      padding: .4em .7em;
      
      &:hover {
        background-color: tomato;
      }
    }
    
  
  }
  
  :global(html.theme-dark) {
    
    .cmp {
      // background-color: var(--plt-base);
      background-color: color.scale(
        map.get(plt.$dark, "base"), 
        $lightness: 5%,
      );
      
      // lightness 1 to 3
      box-shadow: 0em .2em .5em .1em hsla(0 0% 0% / .1);
      // lightness 3 to 5
      // box-shadow: 0em .2em 1em .2em hsla(0 0% 0% / .1);
    }
    
  }
  
  :global(html.theme-light) {
    
    .cmp {
      background-color: var(--plt-base);
      
      // ? colored shadow = good idea?
      box-shadow: 0px .2em .5em .1em hsla(var(--plt-cover-hsl), .1);
    }
    
  }
  
</style>