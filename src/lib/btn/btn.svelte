
<script lang=ts>
  import { /* popover,  */popoverCtrl } from "$lib/popover/popover"
  import type { PopoverArgs, PopoverContent } from "$lib/popover/popover"
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
  
  let popover: Function
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
    
    
    // if (!popover) {
    //   // ? svelte use:action error
    //   // popover = (await import("$lib/popover/popover")).popover
      
    //   return import("$lib/popover/popover").then((value) => {
    //     popover = value.popover
    //     return popover(htmlEl, args)
    //   })
    // }
    // return popover(htmlEl, args)
    
    
    
    // let ret: any
    
    // if (!popover) {
    //   new Promise<void>(async (resolve) => {
    //     popover = (await import("$lib/popover/popover")).popover
    //     ret = popover(htmlEl, args) // makes it work
    //     resolve()
    //   })
    // }
    
    // return ret || popover(htmlEl, args)
    // // return popover(htmlEl, args) // does not work
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
















