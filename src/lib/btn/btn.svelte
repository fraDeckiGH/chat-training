
<script lang="ts" context=module>
  export type {
    // Item as MenuItem,
    $IntLayersState,
  }
  
  type Disabled = Maybe<boolean>
  type Interaction = {
    focus?: boolean
    hover?: boolean
  }
  type Loading = Maybe<boolean>
    
  type Modifier = 
    | "default"
    | "menu-item"
  type Modifier2 = 
    | "highlighted"
    | "ordinary"
  
  type Popover = typeof import("$lib/popover")
  
  
  // * interaction layer
  
  type IntLayersState = {
    disabled: Disabled
    loading: Loading
    cmpInteraction: Interaction
  }
  type $IntLayersState = Writable$<IntLayersState>
  
  
</script>

<script lang=ts>
  import type { PopoverArgs } from "$lib/popover"
  import { writable$ } from "$lib/store"
  import type { Writable$ } from "$lib/store"
  import type { Theme } from "$lib/theme/theme"
  import type { Maybe } from "$lib/type/util"
  import { onDestroy, onMount, setContext } from "svelte"
  import type { Unsubscriber } from "svelte/store";
  
  
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
  export let disabled = <Disabled>null
  
  // Call To Action: bg and/or color 'accent' instead of 'primary'
  // let cta
  // let isCta
  
  /** sets prop 'modifier2'
    
    emphasized/emphasised, highlighted, marked
    very different from a CTA
    
    usage eg
    when there are more options and I want to emphasise 
    the default/prioritary one
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
  export let loading = <Loading>null
  
  
  export let modifier = <Maybe<Modifier>>"default"
  export let modifier2 = <Maybe<Modifier2>>null
  
  
  export let popoverArgs = < Maybe<PopoverArgs<any>> >null
  // svelte warns: "prop not passed" (when cmp is created in HTML)
  // export let popoverArgs: PopoverArgs | undefined
  
  
  // * interaction layer
  let intLayers_importPath = <Maybe<string>>null
  let cmpInteraction: Interaction = {}
  
  const intLayers_state: IntLayersState = {
    disabled,
    loading,
    cmpInteraction,
  }
  const intLayers_state$: $IntLayersState = writable$(intLayers_state)
  setContext("state", intLayers_state$)
  
  // * theme
  let theme = <Maybe<Theme>>null
  let unsub_currentTheme = <Maybe<Unsubscriber>>null
  ;
  
  
  // * reactives
  
  $: {
    disabled = attr.disabled
  }
  $: {
    modifier2;
    setModifier2()
  }
  $: {
    intLayers_state$.set({
      disabled, 
      loading, 
      cmpInteraction,
    })
  }
  
  
  // * lifecycle
  
  onDestroy(() => {
		// console.log(`onDestroy `, )
    unsub_currentTheme?.()
  })
  
  onMount(async () => {
		// console.log(`onMount `, )
    theme = (await import("$lib/theme/theme")).theme
    
    unsub_currentTheme = 
      theme!.current$.subscribe((value) => {
        let path = `interaction-layers/modifier/${modifier}`
        
        if (modifier2) {
          path += `/modifier2/${modifier2}`
        }
        
        path += `/${value}`
        intLayers_importPath = path
      })
    ;
    
	})
  
  
  /**
   * layers on which some btn styles are applied
   */
  function handleInteraction(
    htmlEl: HTMLAnchorElement | HTMLButtonElement, 
    // args?: any
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
      cmpInteraction.focus = true
    }
    htmlEl.onblur = (ev) => {
      // console.log(`onblur`, ev)
      cmpInteraction.focus = false
    }
    
    htmlEl.onpointerenter = (ev) => {
      // console.log(`onpointerenter`, ev)
      cmpInteraction.hover = true
    }
    htmlEl.onpointerleave = (ev) => {
      // console.log(`onpointerleave`, ev)
      cmpInteraction.hover = false
    }
    
    return {
			destroy() {
        // console.log(`destroy()`, )
        cmpInteraction = {}
			},
      // update(updatedArgs: typeof args) {
      //   console.log(`handleInteraction update`, )
      // }
		};
  }
  
  function setModifier2() {
    let res: typeof modifier2 
    
    switch (modifier) {
      case "default":
        res = "ordinary"
        if (highlighted) {
          res = "highlighted"
        }
        break;
      
      case "menu-item":
        if (highlighted) {
          res = null
        }
        break;
      
      default:
        console.log(`default case`, )
    }
    
    modifier2 = res
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
  class="btn-wrap btn-wrap--{modifier}"
>
  {#if btnEl}
    
    <!-- passed attributes("attr") will overwrite 
      those which come before
    -->
    <button 
      class="btn btn--{modifier} {modifier2}"
      class:is-loading={loading}
      class:w-link={link}
      {disabled}
      on:click|trusted
      tabindex={link ? -1 : 0}
      {...attr}
      use:handleInteraction
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
      
      <span 
        class="slot"
        class:slot--focus-outside={cmpInteraction.focus}
      >
        <slot></slot>
      </span>
      
      
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
          use:handleInteraction
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

















