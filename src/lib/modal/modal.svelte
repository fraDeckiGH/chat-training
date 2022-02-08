
<script lang=ts>
  import type Component from "./modal.svelte"
  import ProgressCircular from "$lib/progress-circular.svelte";
  // import type Component from "./modal"
  import { /* onDestroy,  */onMount } from "svelte";
  // import { blur, fade, fly, scale } from "svelte/transition";
  import { fade, fly } from "svelte/transition";
  
  
  // this component (instance)
  export let component: Component
  
  
  // * component creation/destruction
  
  // governs component's DOM
  // used by: transition directive(s)
  let componentIsLive = true
  
  // useful: before destroying this component
  const outroEnded = {
    backdrop: false,
    modal: false,
  }
  
  // * {css} dynamic styles
  let shadowOnBackdrop_themeDark = false
  
  // * scroll
  let initialInlineStyles: CSSStyleDeclaration
  
  type TargetHTMLEl = HTMLElement | null
  let scrollableContainer: TargetHTMLEl
  
  let scrollbarWasReset = false
  
  
  // * {pinned} reactives
  
  $: {
    // console.log(`outroEnded`, outroEnded)
    if (
      scrollbarWasReset && 
      // every val of the obj is...
      (Object.values(outroEnded)).every(val => val === true)
    ) {
      component.$destroy()
    }
	}
  
  
  // * {pinned} lifecycle
  
  onMount(() => {
    initScrollableElVars()
    removeScrollbarY(scrollableContainer)
	})
  
  // onDestroy(() => {})
  
  
  /**
   * initiate destroy sequence
   */
  function destroyComponent() {
    componentIsLive = false
    resetScrollbarY(scrollableContainer)
  }
  
  // * scroll
  
  function initScrollableElVars() {
    scrollableContainer = document.getElementById("appScroller")
    
    if (!scrollableContainer) {
      console.log(`return: !scrollableContainer`, scrollableContainer)
      return
    }
    
    initialInlineStyles = {...scrollableContainer.style}
    // console.log(`initialInlineStyles`, initialInlineStyles)
  }
  
  /**
   * doesn't account for: 
   * margin-x
   * outline-x
   * ; on target HTMLElement.
   * Tested mostly on document.body
   */
  function removeScrollbarY(targetEl: TargetHTMLEl) {
    if (!targetEl) {
      console.log(`return: !targetEl`, targetEl)
      return
    }
    
    /* for tests, in global css I used the following on the 'body' tag:
      // ? scrollbar width tests
      // padding-right: 10px;
      // border-right: 15px solid black;
      // margin-right: 20px;
      // outline: 10px solid black;
    */
    
    /* ? targetEl.clientWidth == targetEl.offsetWidth (on document.body)
      in most cases, they are equivalent, some notes: 
      offsetWidth counts border
      haven't tested pseudo elems
    */
    
    // offset vs getBoundingClientRect props
    // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements#how_much_room_does_it_use_up
    
    // console.log(`targetEl.clientWidth`, targetEl.clientWidth)
    // console.log(`targetEl.offsetWidth`, targetEl.offsetWidth)
    // console.log(`targetEl.getBoundingClientRect()`, targetEl.getBoundingClientRect())
    // BUG on Safari(iOS), reported by caniuse
    // console.log(`window.innerWidth`, window.innerWidth)
    
    
    // if targetEl is document.body
    // const scrollbarWidth = window.innerWidth - targetEl.offsetWidth
    // if targetEl is NOT document.body
    const scrollbarWidth = targetEl.offsetWidth - targetEl.clientWidth
    
    // console.log(`scrollbarWidth (in px)`, scrollbarWidth)
    
    
    // * get current padding-right (in px)
    const padRight = window.getComputedStyle(targetEl).paddingRight
    // console.log(`padRight`, padRight)
    
    // Substring vs Substr vs Slice
    // ? https://masteringjs.io/tutorials/fundamentals/substring
    
    // String to Number: 7 ways
    // ? https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l
    
    // cut the "px" out of the string & transform to number
    const padRightPx = Number(padRight.slice(0, -2))
    
    targetEl.style.paddingRight = (padRightPx + scrollbarWidth) + "px"
    // console.log(`targetEl.style.paddingRight`, targetEl.style.paddingRight)
    
    
    // * remove scrollbar(s)
    
    // targetEl.style.overflow = "hidden" // commented to avoid future bug
    targetEl.style.overflowY = "hidden"
  }
  
  function resetScrollbarY(targetEl: TargetHTMLEl) {
    if (!targetEl) {
      console.log(`return: !targetEl`, targetEl)
      return
    }
    
    /* ? the following are equal
      same is true when using: getPropertyValue(), setProperty()
      
      targetEl.style.overflowY = ""
      targetEl.style.paddingRight = ""
      targetEl.style.removeProperty("overflow-y")
      targetEl.style.removeProperty("padding-right")
      
      console.log(`targetEl.style`, targetEl.style)
    */
    
    targetEl.style.overflowY = initialInlineStyles.overflowY
    targetEl.style.paddingRight = initialInlineStyles.paddingRight
    
    scrollbarWasReset = true
  }
  
  
</script>


{#if componentIsLive}
  <div class="component component--modal">
    
    <div class="backdrop"
      on:click="{destroyComponent}"
      
      transition:fade="{{ duration: 400 }}"
      on:outroend="{() => {
        outroEnded.backdrop = true
      }}"
    ></div>
    
    <!-- 
      discord settings
      transition:scale="{{ start: 1.2, duration: 200 }}" 
      
      ionic android modal
      transition:fly="{{ y: 20, duration: 300 }}"
      transition:fly="{{ y: 25, duration: 300 }}" best
      transition:fly="{{ y: 30, duration: 400 }}"
      
      https://svelte.dev/docs#template-syntax-element-directives-transition-fn-transition-events
    -->
    <div
      class="modal"
      class:shadow-on-backdrop--theme-dark={shadowOnBackdrop_themeDark}
      
      transition:fly="{{ y: 25, duration: 300 }}"
      on:introend="{() => {
        shadowOnBackdrop_themeDark = true
      }}"
      on:outrostart="{() => {
        /* a couple of notes on the line below
          - not consistent w/ how the various transitions play out 
            (ie the chronological order), during component init
          - not needed really, even w/out looks fine
        */
        shadowOnBackdrop_themeDark = false
      }}"
      on:outroend="{() => {
        outroEnded.modal = true
      }}"
    >
      <!-- <div class="modal__content"> -->
    
        <ProgressCircular></ProgressCircular>
    
        <div class="text">
          this is a modal
        </div>
    
      <!-- </div> -->
    </div>
  
  </div>
{/if}


<style lang=scss>
  
  @use "sass:map";
  
  @use "../../lib/color";
  @use "../../lib/palette" as plt;
  // @use "../../lib/theme/theme";
  
  
  .component {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    
    // test
    // pointer-events: none;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    .backdrop {
      position: absolute;
      z-index: -1;
      height: 100%;
      width: 100%;
    }
    .modal {
      // test (can be left as is)
      pointer-events: initial;
      
      // TODO actual values must be decided still
      height: 45%;
      width: 45%;
    }
  }
  
  
  :global(html.theme-dark) {
    
    .backdrop {
      background-color: hsla(0 0% 0% / .45);
      
      & + .modal {
        background-color: var(--plt-base);
        
        transition: box-shadow 1s;
        // transition-property: ;
        // transition-duration: 0s;
        // transition-timing-function: ease;
        // transition-delay: 0s;
        
        &.shadow-on-backdrop--theme-dark {
          // (lightness 1 to 3)
          // ? shadow itself it's too little
          // box-shadow: 0em .2em .5em .1em hsla(0 0% 0% / .3);
          
          // (lightness 3 to 5)
          // .3 alpha = slightly more noticeable
          // box-shadow: 0em .2em 1em .2em hsla(0 0% 0% / .2);
          // box-shadow: 0em .2em 1em .2em hsla(0 0% 0% / .3);
        
          box-shadow: 0em .3em 1.2em .6em hsla(0 0% 0% / .25);
          
          // test
          // box-shadow: 0em .2em .5em .1em red;
          // box-shadow: 0em .2em 1em .2em red;
          // box-shadow: 0em .3em 1.2em .6em red;
        }
      }
      
    }
    
    .modal {
      background-color: color.scale(
        map.get(plt.$dark, "base"), 
        $lightness: 3%,
      );
      
      // lightness 1 to 3
      // box-shadow: 0em .2em .5em .1em hsla(0 0% 0% / .1);
      // lightness 3 to 5
      box-shadow: 0em .2em 1em .2em hsla(0 0% 0% / .1);
    }
    
  }
  
  :global(html.theme-light) {
    
    .backdrop {
      background-color: hsla(0 0% 0% / .3);
    }
    
    .modal {
      background-color: var(--plt-base);
      
      // v1.0
      // ? add slightly more blur?
      // box-shadow: 0px 2px 7px 1px hsla(var(--plt-cover-hsl), .1);
      
      // ? colored shadow = good idea?
      box-shadow: 0px .2em .5em .1em hsla(var(--plt-cover-hsl), .1);
      
      // BUG could not make this work
      /* box-shadow: 0 0 5px 5px hsla(
        #{color.get-hsl(
          map.get(plt.$light, "cover")
        )} 
        / .1
      ); */
    }
    
  }
  
  
</style>