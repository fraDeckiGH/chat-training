
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
  import { changes, writable$ } from "$lib/store"
  import type { Theme } from "$lib/theme/theme"
  import type { Maybe } from "$lib/type/util"
  import { onMount, setContext } from "svelte"
  import { fade } from 'svelte/transition'
  
  
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
  
  
  let shownInteractionLayer: {
    focus?: boolean
    hover?: boolean
  } = {}
  
  let intLayers_importPath = <Maybe<string>>null
  let theme = <Maybe<Theme>>null
  
  
  $: {
    disabled = attr.disabled;
  }
  $: {
    // does this work when u change theme?
    console.log(`theme.current`, theme?.current)
    
    if (theme) {
      intLayers_importPath = `layers/${
          btnStyling()
        }/${
          btnStyling2()
        }/${
          theme.current
        }`
      ;
    }
  }
  
  
  onMount(async () => {
		// console.log(`onMount `, )
    theme = (await import("$lib/theme/theme")).theme
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
  
  
  // TODO move somewhere else
  const intLayers_state = writable$({
    disabled,
    loading,
    shownInteractionLayer,
  })
  setContext("state", intLayers_state)
  
  $: {
    intLayers_state.update(val => ({
      disabled, 
      loading, 
      shownInteractionLayer,
    }))
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
      {#if intLayers_importPath}
        {#await import("./" + intLayers_importPath + ".svelte") then value}
          <svelte:component this={value.default} />
        {/await}
      {/if}
      
      
      <!-- possible content ideas
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


<style src="./style.scss"></style>

















