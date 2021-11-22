
<script lang=ts>
  import type { Theme } from "$lib/theme"
  import "../app.scss"
  import { onMount } from "svelte"
  
  let theme: Theme | undefined
  
  onMount(async () => {
    // import("@csstools/normalize.css")
    
    // import("sanitize.css")
    // import("sanitize.css/forms.css")
    // import("sanitize.css/assets.css")
    // import("sanitize.css/typography.css")
    // import("sanitize.css/reduce-motion.css")
    // import("sanitize.css/system-ui.css")
    // import("sanitize.css/ui-monospace.css")
    
    theme = (await import("$lib/theme")).create()
  })
</script>


<div class="actions">
  {#if theme}
    <button on:click={() => {
      theme?.switchCurrentTheme()
    }}
      class=""
    >
      <!-- BUG doesn't update -->
      currentTheme: {theme.currentTheme}
    </button>
  {/if}
  
  
</div>

<slot></slot>


<style lang=scss>
  
  .actions {
    position: sticky;
    top: 0;
    
    // background-color: var(--plt-cover);
  }
  
</style>

