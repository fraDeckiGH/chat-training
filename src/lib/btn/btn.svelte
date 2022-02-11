
<script lang=ts>
  import { popover/* , popoverCtrl */ } from "$lib/popover/popover"
  import type { PopoverArgs/* , PopoverContent */ } from "$lib/popover/popover"
  import { onMount } from "svelte"
  
  export {
    btnEl,
    popover,
    popoverArgs,
  }
  
  /**
   * render <button>?
   */
  let btnEl = <boolean>true // tests
  
  // Call To Action: bg and/or color 'accent' instead of 'primary'
  // let cta
  // let isCta
  
  // let popoverArgs = <PopoverArgs<PopoverContent> | undefined>undefined
  let popoverArgs = <PopoverArgs | undefined>undefined
  
  
  onMount(() => {
		// console.log(`onMount `, )
    
	})
  
  
  function popoverWrap(htmlEl: HTMLElement, args: typeof popoverArgs) {
    if (!args) {
      console.log(`return: !args`, )
      return
    }
    
    return popover(htmlEl, args)
  }
  
</script>


<div 
  class="btn-wrap"
>
  {#if btnEl}
    
    <button 
      class="btn"
      on:click|trusted
      use:popoverWrap={popoverArgs}
    >
      <slot></slot>
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
  
</style>
















