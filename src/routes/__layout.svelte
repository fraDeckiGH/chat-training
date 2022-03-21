
<script lang=ts>
  import "../app.scss"
  
  // * <Icon/> setup: purge-icons -- moved inside the cmp itself
  //#region 
  // ? https://github.com/antfu/purge-icons/blob/main/examples/vite/src/main.js
  // import '@iconify/iconify'
  // import '@purge-icons/generated'
  //#endregion 
  
  import Btn from "$lib/btn/btn.svelte";
  import { htmlElems } from "$lib/misc";
  import type { Theme } from "$lib/theme/theme"
  import ToastHandlerDemo from "$lib/toast-handler/toast-handler-demo.svelte";
  import { onMount } from "svelte"
  
  
  let theme: Theme | undefined
  
  
  onMount(async () => {
    // css imports (don't delete)
    //#region 
    // don't delete, these lines have been useful in so many tests
    // import("@csstools/normalize.css")
    
    // import("sanitize.css")
    // import("sanitize.css/forms.css")
    // import("sanitize.css/assets.css")
    // import("sanitize.css/typography.css")
    // import("sanitize.css/reduce-motion.css")
    // import("sanitize.css/system-ui.css")
    // import("sanitize.css/ui-monospace.css")
    //#endregion
    
    theme = (await import("$lib/theme/theme")).theme
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
        <Btn
          on:click={() => {
            if (theme) {
              theme.switch()
              theme = theme
            }
          }}
        >
          currentTheme: {theme.switcher}
        </Btn>
      {/if}
      
      <ToastHandlerDemo></ToastHandlerDemo>
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

