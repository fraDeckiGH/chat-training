
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
  import { fade } from 'svelte/transition';
  
  
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
  
  /**
   * don't use this 1 for loadings
   */
  export let disabled = <Maybe<boolean>>null
  
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
    is the cmp in a loading state?
    unlike :disabled, removes only a part of the interaction
    (I wanted this)
   */
  export let loading = <Maybe<boolean>>null
  
  /**
   * aka 'skin'
   */
  export let look = <Maybe<Look>>null
  
  export let popoverArgs = < Maybe<PopoverArgs<any>> >null
  // svelte warns: "prop not passed" (when cmp is created in HTML)
  // export let popoverArgs: PopoverArgs | undefined
  
  // Im sure these can be taken from .btn's htmlEl
  let shownInteractionLayer: {
    focus?: boolean
    hover?: boolean
  } = {}
  
  
  $: {
    disabled = attr.disabled;
  }
  
  
  onMount(() => {
		// console.log(`onMount `, )
    
	})
  
  
  // * basic/default features, usually loaded no matter what
  
  // btn styling (advanced)
  
  /**
   * layers on which some btn styles are applied
   */
  function handleInteractionLayers(
    htmlEl: HTMLAnchorElement | HTMLButtonElement, 
    args?: any
    ) {
    // console.log(`htmlEl`, htmlEl)
    
    if (
      (htmlEl.tagName === "BUTTON" && link) 
      // tbs (to be safe)
      || (htmlEl.tagName === "A" && !link)
    ) {
      // console.log(`return`, htmlEl)
      return
    }
    
    // test
    /* htmlEl.onclick = (ev) => {
      console.log(`onclick`, ev)
      
      btnEl = !btnEl
      setTimeout(() => {
        btnEl = !btnEl
      }, 1000);
    } */
    
    htmlEl.onfocus = (ev) => {
      // console.log(`onfocus`, ev)
      shownInteractionLayer.focus = true
    }
    htmlEl.onblur = (ev) => {
      // console.log(`onblur`, ev)
      shownInteractionLayer.focus = false
    }
    
    htmlEl.onpointerenter = (ev) => {
      // console.log(`onpointerenter`, ev)
      shownInteractionLayer.hover = true
    }
    htmlEl.onpointerleave = (ev) => {
      // console.log(`onpointerleave`, ev)
      shownInteractionLayer.hover = false
    }
    
    return {
			destroy() {
        // console.log(`destroy()`, )
        shownInteractionLayer = {}
			},
      // update(updatedArgs: typeof args) {
      //   console.log(`handleInteractionLayers update`, )
      // }
		};
  }
  
  // btn styling (basic)
  
  function btnStyling() {
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
    
    <!-- passed attributes("attr") will overwrite 
      those which come before
    -->
    <button 
      class="btn btn--{btnStyling()} {btnStyling2()}"
      class:is-loading={loading}
      class:w-link={link}
      {disabled}
      on:click|trusted
      tabindex={link ? -1 : 0}
      {...attr}
      use:handleInteractionLayers
    > 
      {#if 
        // when :disabled, the el loses :focus
        disabled || 
        
        (loading && !shownInteractionLayer.focus) || 
        
        // every val of the obj is...
        (Object.values(shownInteractionLayer)).every(val => !val)
      }
        <!-- fix flashing bug 
          to avoid a bug which visually looks like the elem 
          it's flashing (noticeable when focus by keyboard)
          
          out:fade must be equal to the longest in:fade 
          of other layers
        -->
        <div 
          class="int-layer int-layer--no-interaction"
          out:fade={{ duration: 300 }}
        ></div>
      {/if}
      <!-- BUG in&out transitions not bidirectional 
        noticeable on long(1/2sec) durations when triggering
        fast both in and out
        
        tried solving it already, don't think there's a fast way
        to do it
      -->
      {#if shownInteractionLayer.focus}
        <div 
          class="int-layer int-layer--focus"
          in:fade={{ duration: 300 }}
          out:fade={{ duration: 200 }}
        ></div>
      {/if}
      {#if shownInteractionLayer.hover && !loading}
      <!-- {#if shownInteractionLayer.hover} -->
        <div 
          class="int-layer int-layer--hover"
          in:fade={{ duration: 250 }}
          out:fade={{ duration: 200 }}
        ></div>
      {/if}
      
      
      <!-- 
        possible content ideas (ie untested):
        component
        html
        text
       -->
      <slot></slot>
      
      
      {#if link 
        && !disabled
        // ? to be safe (might remove in the future)
        && !loading
      }
        <!-- in case I need to do more than just redirecting 
          when the link is activated.
          here are some res/ideas which may come back useful
          
          modifiers: preventDefault == no redirect
          https://svelte.dev/docs#template-syntax-element-directives-on-eventname
          
          https://svelte.dev/docs#run-time-svelte-createeventdispatcher
          
          https://kit.svelte.dev/docs/loading
        -->
        
        <!-- on:click|preventDefault
          on:click|preventDefault={() => {
            console.log(`link activated (by either mouse, keyboard...)`, )
          }}
        -->
        
        <!-- svelte-ignore a11y-missing-content -->
        <a 
          class="link-overlay"
          href="{link}"
          use:handleInteractionLayers
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
  
  @include reset.a;
  // @include reset.button;
  
  
  .btn-wrap {
    display: inline-block; // default for 'button' tag
    
    // #region .btn--default-skin
    
    // * {pinned} in common
    
    %btn--default-skin_focus-visible {
      &:focus-visible {
        html.theme-dark & {
          $color: color.scale(
            map.get(plt.$dark, "1"),
            $lightness: 75%,
          );
          
          outline-color: $color;
          // outline-offset: 0;
          outline-style: solid;
          outline-width: .2em;
        }
        html.theme-light & {
          $colorAdj: color.adjust(
            map.get(plt.$light, "1"), 
            $hue: -20,
          );
          $color: color.scale(
            $colorAdj,
            // $lightness: -25%,
          );
          
          outline-color: $color;
          // outline-offset: 0;
          outline-style: solid;
          outline-width: .2em;
          
          /* shadow as focus-ring
            outline-style: none; // no focus-ring
            
            $shadow-color: color.scale(
              map.get(plt.$light, "1"),
              $lightness: 50%,
            );
            // coolest (but harder to see)
            box-shadow: 0 0 .3em $shadow-color;
            
            // box-shadow: 0 0 .1em .05em $shadow-color;
            // box-shadow: 0 0 .2em .05em $shadow-color; // 2nd place
          */
        }
      }//&:focus-visible
    }
    %btn--default-skin_hover {
      // &:hover {
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
      // }
    }
    
    // * &.ordinary
    
    %btn--default-skin_ordinary_focus {
      // &:focus {
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
      // }
    }
    %btn--default-skin_ordinary_no-interaction {
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
    }
    
    // * &.highlighted
    
    %btn--default-skin_highlighted_focus {
      // &:focus {
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
      // }
    }
    %btn--default-skin_highlighted_no-interaction {
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
    }
    
    // #endregion .btn--default-skin
    
    .btn {
      display: inherit;
      
      border: 0;
      // background-color: var(--plt-1);
      
      width: 100%; // always fit wrapper
      
      // .int-layer
      position: relative;
      
      .int-layer {
        border-radius: inherit;
        @include util.overlay;
        z-index: -1;
      }
      
      
      // represents an el while is being activated
      // &:active {}
      
      &:not(:disabled) {
        cursor: pointer;
      }
      
      &.w-link {
        position: relative;
        
        .link-overlay {
          border-radius: inherit;
          @include util.overlay;
        }
      }
      
      /* reminders about interaction
        --
        legend
        
        "is present"
        means if there is the css rule w/ 
        at least 1(any) style rule written inside
        --
        
        chrome (many tests were made)
        --
        click applies 
        :focus
        :hover
        
        (after having clicked)
        
        :focus vs :hover (while hovering)
        none is given priority
        
        :focus vs :hover (while not hovering)
        :focus prevails
        if :focus rule isn't present :hover is shown instead
        --
        
        --
        keyboard "focus" applies
        :focus
        :focus-visible
        :hover
        
        (after having focused by means of keyboard)
        in this case hovering/not hovering - doesn't change things
        
        :focus vs :hover
        :focus prevails
        
        :focus vs :focus-visible
        none is given priority
        
        :focus-visible vs :hover
        if :focus rule is present :focus-visible prevails; 
        otherwise none is given priority
        --
      */
      
      // ? @mixin is more scalable than %placeholder-selector
      @mixin disabled {
        &:disabled {
          filter: grayscale(50%);
          text-decoration: line-through;
        }
      }
      @mixin interaction-layer($modifier) {
        .int-layer {
          &.int-layer--#{$modifier} {
            @content;
          }
        }
      }
      @mixin link-overlay {
        &.w-link {
          .link-overlay {
            @content;
          }
        }
      }
      
      &--default-skin {
        // ? put here styles I may not want in other skins
        border-radius: var(--border-radius);
        color: var(--plt-1);
        font-weight: 500;
        
        @include disabled;
        
        @extend %btn--default-skin_focus-visible;
        @include link-overlay {
          @extend %btn--default-skin_focus-visible;
        }
        
        &:not(:disabled) {
          @include interaction-layer(hover) {
            @extend %btn--default-skin_hover;
          }
        }
        
        // {pinned}
        &.ordinary {
          
          @include interaction-layer(focus) {
            @extend %btn--default-skin_ordinary_focus;
          }
          @include interaction-layer(no-interaction) {
            @extend %btn--default-skin_ordinary_no-interaction;
          }
          
        }
        &.highlighted {
          
          @include interaction-layer(focus) {
            @extend %btn--default-skin_highlighted_focus;
          }
          @include interaction-layer(no-interaction) {
            @extend %btn--default-skin_highlighted_no-interaction;
          }
          
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
      
    }//.btn
  }
  
  .logic-only {
    // @extend util.%logic-only;
    @include util.logic-only;
  }
  
</style>
















