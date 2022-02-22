
<script lang=ts>
  import type { PopoverArgs } from "$lib/popover"
  import type { Maybe } from "$lib/type"
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
  export let popoverArgs: Maybe<PopoverArgs> = null
  
  
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
  
  /* async  */function myfunc(htmlEl: HTMLElement, args: any) {
    // const cmp = (await import("$lib/popover/index.svelte")).default
    
    const cmpInstance = new args.default({
      props: {
        args: popoverArgs,
      },
      
      // I'm going to show a tippy inside a svelte component;
      // by default...
      // svelte creates the html by appending to(/nesting inside) the target
      // tippy creates a sibling after it's target
      target: htmlEl.parentElement?.parentElement,
      
    })
    
    // return cmpInstance.popover(htmlEl.parentElement, popoverArgs)
    
    // I can do this directly inside the component, 
    // is that more comfortable during usage tho?
    return {
      destroy: () => {
        cmpInstance.$destroy()
      }
    }
    
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
        {#await import("$lib/popover/index.svelte") then value}
          <!-- <div 
            class="logic-only"
            use:popover={value}
          ></div> -->
          <div 
            class="logic-only"
            use:myfunc={value}
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
















