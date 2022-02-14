
<script lang=ts>
  import "../app.scss"
  import { htmlElems } from "$lib/misc";
  import type { Theme } from "$lib/theme/theme"
  import type ToastHandler  from "$lib/toast-handler/toast-handler.svelte"
  import { onMount } from "svelte"
  
  let theme: Theme | undefined
  let toast: ToastHandler | undefined
  
  $: {
    if (htmlElems.appScrollable) {
      ;(async () => {
        toast = (await import("$lib/toast-handler/toast-handler")).singleton
      })()
    }
  }
  
  
  onMount(async () => {
    // import("@csstools/normalize.css")
    
    // import("sanitize.css")
    // import("sanitize.css/forms.css")
    // import("sanitize.css/assets.css")
    // import("sanitize.css/typography.css")
    // import("sanitize.css/reduce-motion.css")
    // import("sanitize.css/system-ui.css")
    // import("sanitize.css/ui-monospace.css")
    
    theme = (await import("$lib/theme/theme")).create()
    // toast = (await import("$lib/toast-handler/toast-handler")).singleton
  })
  
  
  // * content wrappers
  
  function scroller(htmlEl: HTMLElement) {
    htmlElems.appScroller = htmlEl
  }
  function scrollable(htmlEl: HTMLElement) {
    htmlElems.appScrollable = htmlEl
  }
  
  
</script>


<!-- scrollable/scroller container -->
<!-- ? why do this? read css comment -->
<div 
  class="app-scroller"
  use:scroller
>
  <!-- scrollable content -->
  <div 
    class="app-scrollable"
    use:scrollable
  >
    
    <div class="actions">
      {#if theme}
        <button
          class=""
          on:click={() => {
            if (theme) {
              theme/* ? */.switch()
              theme = theme
            }
          }}
        >
          currentTheme: {theme.switcher}
        </button>
      {/if}
    
      {#if toast}
        <button
          id="myButton"
          on:click="{toast.add}"
        >
          add toast
        </button>
    
        <button
          on:click="{toast.remove}"
        >
          remove toast
        </button>
      {/if}
    </div>
    
    <slot></slot>
    
  </div>
</div>


<style lang=scss>
  
  /*
    prevent scroll on the 'body' tag
    useful for dialogs (if we want the scrollbar to be visible underneath)
  */
  .app-scroller {
    // height: inherit;
    height: 100vh;
    
    overflow-y: auto;
    
    .app-scrollable {
      display: flex;
      flex-direction: column;
      
      position: relative;
    }
  }
  
  .actions {
    position: sticky;
    top: 0;
    
    // background-color: var(--plt-cover);
  }
  
  
</style>

