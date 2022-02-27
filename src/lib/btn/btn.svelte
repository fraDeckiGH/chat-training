
<script lang="ts" context=module>
  export type {
    // Item as MenuItem,
  }
  
  type Look = 
    | "menuItem"
  type Popover = typeof import("$lib/popover")
  
</script>
<script lang=ts>
  import type { PopoverArgs } from "$lib/popover"
  import type { Maybe } from "$lib/type/util"
  import { onMount } from "svelte"
  
  
  /**
    <button> attributes
    eg
    disabled={submittingForm}
    type="submit"
    style="height: 2000px;"
   */
  // export let attr = <Partial<HTMLButtonElement>>{}
  export let attr = <Partial<any>>{}
  
  /**
   * render <button>?
   */
  export let btnEl = <boolean>true // tests
  
  // Call To Action: bg and/or color 'accent' instead of 'primary'
  // let cta
  // let isCta
  
  /**
   * purpose navigation? pass the link
   */
  export let link = <Maybe<string>>null
  
  export let look = <Maybe<Look>>null
  
  export let popoverArgs = < Maybe<PopoverArgs<any>> >null
  // svelte warns: "prop not passed" (when cmp is created in HTML)
  // export let popoverArgs: PopoverArgs | undefined
  
  
  onMount(() => {
		// console.log(`onMount `, )
    
	})
  
  
  /**
   * additional styling
   */
  function extraStyling(/* baseClass: string */) {
    // console.log(`extraStyling`, )
    
    let addendum = ""
    
    switch (look) {
      case "menuItem":
        addendum += `menu-item`
        break;
    
      default:
        addendum += `default-skin`
        break;
    }
    
    return addendum
  }
  
  function popover(htmlEl: HTMLElement, args: Popover) {
    if (!args) {
      // console.log(`return: !args`, args)
      return
    }
    if (!popoverArgs) {
      return
    }
    
    return args.popover(htmlEl.parentElement!, popoverArgs)
  }
  
  
</script>


<div 
  class="btn-wrap"
>
  {#if btnEl}
    
    <button 
      {...attr}
      class="btn btn--{extraStyling()}"
      class:w-link={link}
      on:click|trusted
    >
      <!-- 
        possible content ideas (ie untested):
        component
        html
        text
       -->
      <slot></slot>
      
      {#if link}
        <!-- svelte-ignore a11y-missing-content -->
        <a 
          class="link-overlay"
          href="{link}"
        ></a>
      {/if}
      {#if popoverArgs}
        {#await import("$lib/popover") then value}
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
  
  @use "../../lib/util";
  
  .btn-wrap {
    display: inline-block; // default for <button>
    
    .btn {
      display: inherit;
      
      border: 0;
      // background-color: var(--plt-1);
      
      width: 100%; // always fit wrapper
      
      
      &:disabled {
        opacity: 0.7;
      }
      &:not(:disabled) {
        cursor: pointer;
      }
      
      
      &.w-link {
        position: relative;
        
        .link-overlay {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }
      }
      
      
      &--default-skin {
        // ? put here styles I may not want in other skins
        border-radius: var(--border-radius);
        color: var(--plt-1);
        font-weight: 500;
      }
      &--menu-item {
        border-radius: var(--border-radius);
        padding: .4em .7em;
        
        &:hover {
          // background-color: tomato;
          color: var(--plt-1);
        }
      }
      
    }
  }
  
  .logic-only {
    // @extend util.%logic-only;
    @include util.logic-only;
  }
  
</style>
















