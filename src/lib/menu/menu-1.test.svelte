
<!-- ! for tests 
  exported func names changed
-->

<script lang=ts>
  import { nanoid } from "nanoid";
  import { afterUpdate, onDestroy, onMount } from "svelte"
  
  export {
    itemsNumber,
  }
  
  const id = nanoid() // test
  let items: any[] = []
  let itemsNumber = 0
  
  $: {
    console.log(`itemsNumber`, itemsNumber)
    
    items = []
    for (let i = 0; i < itemsNumber; i++) {
      items.push({
        // lbl: i + "00000000000000000000000000000000000",
        lbl: i + id,
      })
      items
    }
    items = items
  }
  
  
  afterUpdate(() => {
		console.log(`afterUpdate `, )
    
	})
  onDestroy(() => {
		console.log(`onDestroy `, )
    
	})
  
  
  export function addItems2222(addendum: number = 10) {
    itemsNumber += addendum
  }
  export function removeItems6565(addendum: number = 10) {
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