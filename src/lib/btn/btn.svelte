
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
  
  /**
   * aka 'skin'
   */
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
    
    <!-- passed attributes('attr') will overwrite -->
    <button 
      class="btn btn--{extraStyling()}"
      class:w-link={link}
      on:click|trusted
      {...attr}
    >
      <!-- 
        possible content ideas (ie untested):
        component
        html
        text
       -->
      <slot></slot>
      
      <!-- disable tabindex? -->
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
  
  @use "sass:map";
  @use "../../lib/color";
  @use "../../lib/palette" as plt;
  @use "../../lib/reset";
  @use "../../lib/util";
  
  // @include reset.button;
  
  
  .btn-wrap {
    display: inline-block; // default for <button>
    
    .btn {
      display: inherit;
      
      border: 0;
      // background-color: var(--plt-1);
      
      width: 100%; // always fit wrapper
      
      // represents an el while is being activated
      // &:active {}
      
      &:disabled {
        // opacity: 0.7;
        opacity: 70%;
      }
      
      // &:focus {}
      // &:focus-visible {}
      
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
        
        &:not(:focus-visible) {
          html.theme-dark & {
            $bg: map.get(plt.$dark, "1");
            
            // about the $alpha: do I want to see through?
            $bg2: color.scale(
              $bg, 
              $lightness: -85%,
              // $alpha: -50%,
            );
            
            // background-color: aqua; // visible when $bg1 is transparent
            // background-color: red; // visible when $bg1 is transparent
            // background-color: white; // visible when $bg1 is transparent
            
            background-image: linear-gradient(60deg, 
              transparent , 
              $bg2 35% 65%, 
              transparent ,
            );
            
            // valid aesthetics (save these somewhere)
            // #region
            /* $bg: map.get(plt.$dark, "1");
            
            $bg1: color.scale(
              $bg, 
              $lightness: -65%,
            );
            $bg2: color.scale(
              $bg, 
              $lightness: -85%,
            );
            
            background-image: linear-gradient(60deg, 
              $bg1 , 
              $bg2 35% 65%, 
              $bg1 ,
            ); */
            // background-image: linear-gradient(60deg, 
            //   $bg1 , 
            //   $bg2 40% 60%, 
            //   $bg1 ,
            // );
            // background-image: linear-gradient(60deg, 
            //   $bg1 40%, 
            //   $bg2 , 
            //   $bg1 60%,
            // );
            // background-image: linear-gradient(60deg, 
            //   $bg1 20%, 
            //   $bg2 , 
            //   $bg1 80%,
            // );
            // background-image: linear-gradient(60deg, 
            //   $bg1 30%, 
            //   $bg2 30% 70%, 
            //   $bg1 70%,
            // );
            // #endregion
            
          }
        }
        html.theme-light & {
          $bg: color.adjust(
            map.get(plt.$light, "1"), 
            $hue: -20,
          );
          
          $bg2: color.scale(
            $bg, 
            $lightness: 90%,
          );
          
          // background-color: $bg2; // looks good! (less in dark mode)
          background-image: linear-gradient(60deg, 
            transparent , 
            $bg2 35% 65%, 
            transparent ,
          );
          
        }
        
        
        &:focus:not(:focus-visible) {
          html.theme-dark & {
            $bg: map.get(plt.$dark, "1");
            
            $bg1: color.scale(
              $bg, 
              $lightness: -65%,
            );
            $bg2: color.scale(
              $bg, 
              $lightness: -85%,
            );
            
            background-image: linear-gradient(60deg, 
              $bg1 , 
              $bg2 35% 65%, 
              $bg1 ,
            );
            
          }
          html.theme-light & {
            $bg: color.adjust(
              map.get(plt.$light, "1"), 
              $hue: -20,
            );
            
            $bg1: color.scale(
              $bg, 
              $lightness: 75%,
            );
            $bg2: color.scale(
              $bg, 
              $lightness: 90%,
            );
            
            background-image: linear-gradient(60deg, 
              $bg1 , 
              $bg2 35% 65%, 
              $bg1 ,
            );
            
          }
        }//&:focus
        
        /*
          justifying the existance of what follows: 
          the "focus-ring" uses currentColor and I don't like
          the light-scheme's currentColor.
          In fact, I kinda like the focus-ring in dark mode.
        */
        &:focus-visible {
          outline-style: none; // no focus-ring
          
          // coolest (slightly harder to see tho)
          box-shadow: 0 0 .3em currentColor;
          
          // box-shadow: 0 0 .1em .05em currentColor;
          // box-shadow: 0 0 .2em .05em currentColor; // 2nd place
        }
        
      }//&--default-skin
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
















