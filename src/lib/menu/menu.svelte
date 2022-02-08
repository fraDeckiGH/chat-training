

<script lang=ts>
  import { onDestroy } from "svelte";


  // import type Component from "./menu.svelte"
  
  // this component
  // export let component: Component
  
  export let itemsNumber = 0
  let items: any[] = []
  
  $: {
    console.log(`itemsNumber`, itemsNumber)
    
    for (let i = 0; i < itemsNumber; i++) {
      items.push({
        lbl: i + "00000000000000000000000000000000000",
      })
      items
    }
    items = items
  }
  
  
  onDestroy(() => {
		console.log(`onDestroy `, )
	})
  
  
  export function addItems(addendum: number = 10) {
    itemsNumber += addendum
  }
  export function removeItems(addendum: number = 10) {
    itemsNumber -= addendum
  }
  
</script>


<div 
  class="menu"
>
  {#each items as item}
    <div class="li">
      {item.lbl}
    </div>
  {/each}
</div>


<style lang=scss>
  
  .menu {
    padding: .3em 0;
    
    .li {
      padding: .3em 1em;
      &:hover {
        background-color: tomato;
      }
    }
  
  }
  
  
  
</style>