
<script lang=ts>
  import type { PopoverArgs } from "$lib/popover/popover"
  import { onMount } from "svelte"
  
  
  /**
   * render <button>?
   */
  export let btnEl = <boolean>true // tests
  
  // Call To Action: bg and/or color 'accent' instead of 'primary'
  // let cta
  // let isCta
  
  // svelte warns: "prop not passed" (when cmp is created in HTML)
  // export let popoverArgs: PopoverArgs | undefined
  export let popoverArgs = <PopoverArgs | null>null
  
  
  onMount(() => {
		// console.log(`onMount `, )
    
	})
  
  
  function popover(htmlEl: HTMLElement, args: any) {
    if (!args) {
      // console.log(`return: !args`, args)
      return
    }
    
    return args.popover(htmlEl.parentElement, popoverArgs)
  }
  
</script>


<div 
  class="btn-wrap"
>
  {#if btnEl}
    
    <button 
      class="btn"
      on:click|trusted
    >
      <!-- 
        possible content ideas (ie untested):
        component
        html
        text
       -->
      <slot></slot>
      
      {#if popoverArgs}
        {#await import("$lib/popover/popover") then value}
          <div 
            class="logic-only"
            use:popover={value}
          ></div>
        {/await}
      {/if}
    </button>
    
  {/if}
</div>


<style lang=scss>
  
  .btn-wrap {
    display: inline-block; // default for <button>
    .btn {
      display: inherit;
    }
  }
  
  .logic-only {
    display: none;
  }
  
</style>
















