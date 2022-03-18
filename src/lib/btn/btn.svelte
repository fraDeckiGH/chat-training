
<script lang="ts" context=module>
  
  export {
    ctxKey as btnCtxKey,
  }
  export type {
    BtnState$,
    Disabled,
    Link,
    // Loading,
    
  }
  
  
  type Disabled = Maybe<boolean>
  type Link = Maybe<string>
  type Loading = Maybe<boolean>
    
  type Modifier = 
    | "default"
    | "menu-item"
  type Modifier2 = 
    | ""
    | "highlighted"
    | "ordinary"
  
  type Popover = typeof import("$lib/popover")
  
  
  // * interaction
  
  type Interaction = {
    focus?: boolean
    hover?: boolean
  }
  
  
  // * state
  
  type BtnState = {
    disabled: Disabled
    loading: Loading
  } & Interaction
  type BtnState$ = Writable$<BtnState>
  ;
  
  
  // * context keys. usage: getContext(<<key>>)
  
  const ctxKey = {
    resultingInteraction: Symbol(),
    state: Symbol(),
  }
  
  
</script>

<script lang=ts>
  import { calcResultingInteraction } from "$lib/interaction";
  import type { PopoverArgs } from "$lib/popover"
  import { writable$ } from "$lib/store"
  import type { Writable$ } from "$lib/store"
  import type { Theme } from "$lib/theme/theme"
  import type { Maybe } from "$lib/type/util"
  import { onDestroy, onMount, setContext } from "svelte"
  import { derived, Unsubscriber } from "svelte/store";
  
  
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
  export let link = <Link>null
  
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
  
  
  let intLayers_importPath = <Maybe<string>>null
  
  // * interaction
  
  let interaction: Interaction = {}
  // let resultingInteraction: Readable<ResultingInteraction>
  
  // * state
  
  const state_val: BtnState = {
    disabled,
    loading,
    ...interaction,
  }
  const state = writable$(state_val)
  // setContext(ctxKey.state, state)
  
  // * theme
  
  let theme = <Maybe<Theme>>null
  let unsub_currentTheme = <Maybe<Unsubscriber>>null
  ;
  
  
  // * assignments (mainly for un-hoisted vars)
  
  const resultingInteraction = derived(
    state, 
    (val) => calcResultingInteraction(val)
  )
  setContext(ctxKey.resultingInteraction, resultingInteraction)
  
  
  // * reactives
  
  $: {
    /*
      val ?? true
      check is passed if 'val' === (null || undefined)
      doesn't pass if it is 1 of the other falsies
      
      val ?? false
      'val' === (null || undefined) ? else : then
    */
    // both works
    // if (attr.disabled ?? false) {
    if (typeof attr.disabled === "boolean") { // more explicit
      // ? attr.disabled is a boolean
      disabled = attr.disabled
    }
  }
  
  $: {
    state.set({
      disabled, 
      loading, 
      ...interaction,
    })
  }
  
  $: {
    modifier2;
    setModifier2()
  }
  
  
  // * lifecycle
  
  onDestroy(() => {
		// console.log(`onDestroy `, )
    unsub_currentTheme?.()
  })
  
  onMount(async () => {
		// console.log(`onMount `, )
    theme = (await import("$lib/theme/theme")).theme
    
    if (modifier === "default") {
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
    }
    
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
      interaction.focus = true
    }
    htmlEl.onblur = (ev) => {
      // console.log(`onblur`, ev)
      interaction.focus = false
    }
    
    htmlEl.onpointerenter = (ev) => {
      // console.log(`onpointerenter`, ev)
      interaction.hover = true
    }
    htmlEl.onpointerleave = (ev) => {
      // console.log(`onpointerleave`, ev)
      interaction.hover = false
    }
    
    return {
			destroy() {
        // console.log(`destroy()`, )
        interaction = {}
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
        res = ""
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
      <slot 
        resultingInteraction={$resultingInteraction}
        state={$state}
      ></slot>
      
      
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

















