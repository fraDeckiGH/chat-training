
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
   * emphasized/emphasised, highlighted, marked
   * very different from a CTA
   * 
   * usage eg
   * when there are more options and I want to emphasise 
   * the default/prioritary one
   */
  export let highlighted = <Maybe<boolean>>null
  
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
  
  
  // * default functionalities, usually loaded no matter what
  
  /**
   * additional styling
   */
  function btnStyling(/* baseClass: string */) {
    // console.log(`extraStyling`, )
    
    let addendum = ""
    
    switch (look) {
      case "menuItem":
        addendum += `menu-item`
        break;
    
      default:
        // addendum += `plain`
        addendum += `default-skin`
        break;
    }
    
    return addendum
  }
  
  function btnStyling2() {
    let addendum = ""
    
    if (highlighted) {
      addendum += `highlighted`
    } else {
      addendum += `ordinary`
    }
    
    return addendum
  }
  
  
  // * extra/opt-in features, usually lazy-loaded (on-need basis)
  
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
      class="btn btn--{btnStyling()} {btnStyling2()}"
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
    display: inline-block; // default for 'button' tag
    
    %btn_focus {
      &:focus {
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
    }
    %btn_focus-visible {
      &:focus-visible {
        html.theme-dark & {
          $shadow-color: color.scale(
            map.get(plt.$dark, "1"),
            $lightness: 75%,
          );
          
          outline-color: $shadow-color;
          // outline-offset: 0;
          outline-style: solid;
          outline-width: .2em;
        }
        html.theme-light & {
          outline-style: none; // no focus-ring
          
          $shadow-color: color.scale(
            map.get(plt.$light, "1"),
            $lightness: 50%,
          );
          // coolest (but harder to see)
          box-shadow: 0 0 .3em $shadow-color;
          
          // box-shadow: 0 0 .1em .05em $shadow-color;
          // box-shadow: 0 0 .2em .05em $shadow-color; // 2nd place
        }
      }//&:focus-visible
    }
    
    .btn {
      display: inherit;
      
      border: 0;
      // background-color: var(--plt-1);
      
      width: 100%; // always fit wrapper
      
      
      // represents an el while is being activated
      // &:active {}
      
      &:disabled {
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
      
      /* reminders about interaction
        (chrome)
        click applies
        :focus, :hover (visible in :focus absence)
        
        keyboard selection
        like click + :focus-visible
        
        when hovering (only)
        :hover prevails on :focus
      */
      
      &--default-skin {
        // ? put here styles I may not want in other skins
        border-radius: var(--border-radius);
        color: var(--plt-1);
        font-weight: 500;
        
        // {pinned}
        &.ordinary {
          
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
          html.theme-light & {
            $bg: color.adjust(
              map.get(plt.$light, "1"), 
              $hue: -20,
            );
            
            $bg2: color.scale(
              $bg, 
              $lightness: 90%,
            );
            
            background-image: linear-gradient(60deg, 
              transparent , 
              $bg2 35% 65%, 
              transparent ,
            );
          }
          
          &:hover {
            html.theme-dark & {
              $bg: color.scale(
                map.get(plt.$dark, "1"), 
                $lightness: -83%,
              );
              
              background-color: $bg;
            }
            html.theme-light & {
              // TODO do the followings for dark mode as well
              
              // TODO get this color from outside (from standard bg eg. when el isnt hovered)
              $bg: color.adjust(
                map.get(plt.$light, "1"), 
                $hue: -20,
              );
              // scale from lightness more dynamically (from standard bg eg. when el isnt hovered)
              $bg2: color.scale(
                $bg, 
                $lightness: 88%,
              );
              // ? for the future (read above)
              // $bg2: color.scale(
              //   , 
              //   $lightness: -2%,
              // );
              
              background-color: $bg2;
            }
          }//&:hover
          
          @extend %btn_focus;
          @extend %btn_focus-visible;
          
        }
        &.highlighted {
          
          html.theme-dark & {
            $bg: map.get(plt.$dark, "1");
            
            $bg2: color.scale(
              $bg, 
              $lightness: -85%,
            );
            
            background-color: $bg2;
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
            
            background-color: $bg2;
          }
          
          &:hover {
            html.theme-dark & {
              $bg: map.get(plt.$dark, "1");
            
              $bg1: color.scale(
                $bg, 
                $lightness: -85%,
              );
              $bg2: color.scale(
                $bg, 
                $lightness: -90%,
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
              $bg2: color.scale(
                $bg, 
                $lightness: 87%,
              );
              
              background-color: $bg2;
            }
          }//&:hover
          
          @extend %btn_focus;
          @extend %btn_focus-visible;
          
        }//&.highlighted
        
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
















