
<script lang=ts>
import { onMount } from "svelte";

  // import '@csstools/normalize.css'
  
  // TODO try loading these in onmount
  // import 'sanitize.css'
  // import 'sanitize.css/forms.css'
  // import 'sanitize.css/assets.css'
  // import 'sanitize.css/typography.css'
  // import 'sanitize.css/reduce-motion.css'
  // import 'sanitize.css/system-ui.css'
  // import 'sanitize.css/ui-monospace.css'
  
  import "../app.scss"
  
  type Theme = "dark" | "light" | "system"
  
  let currentTheme: Theme = "system"
  let nextTheme: "dark" | "light" | "system" = "system"
  
  onMount(() => {
    currentTheme = <Theme>localStorage.getItem("theme") ?? "system"
    
    
  })
  
  // can it work server-side?
  function switchTheme() {
    // get current theme
    // if (
    //   window.matchMedia(`
    //     (prefers-color-scheme: dark), 
    //     (prefers-color-scheme: no-preference)
    //   `).matches
    // ) {
    //   // dark theme
    //   console.log(`dark`, )
    //   document.documentElement.classList
    //     .replace("theme-light", "theme-dark")
    // } else {
    //   // light theme
    //   console.log(`light`, )
    //   document.documentElement.classList
    //     .replace("theme-dark", "theme-light")
    // }
    
    switch (nextTheme) {
      case "dark":
        nextTheme = "light"
        
        document.documentElement.classList
          .replace("theme-light", "theme-dark")
        localStorage.setItem("theme", "dark")
        break
      case "light":
        nextTheme = "system"
        
        document.documentElement.classList
          .replace("theme-dark", "theme-light")
        localStorage.setItem("theme", "light")
        break
      case "system":
        nextTheme = "dark"
        
        // current is now system
        document.documentElement.classList.remove(
          "theme-dark", "theme-light",
        )
        localStorage.removeItem("theme")
        break
    
      default:
        console.log(`switch default`, )
    }
    
    
    const a = localStorage.getItem("theme")
    const b = window.matchMedia(`
      (prefers-color-scheme: dark), 
      (prefers-color-scheme: no-preference)
    `).matches
    
    if (a === "dark" && b) {
      localStorage.removeItem("theme")
    }
    if (a === "light" && !b) {
      localStorage.removeItem("theme")
    }
    if (a === "dark" && !b) {
      localStorage.setItem("theme", "")
    }
    
  }
  
</script>

<div class="actions">
  <button on:click={() => switchTheme()}
    class=""
  >
    switch theme
  </button>
  
  
</div>

<slot></slot>


<style lang=scss>
  
  .actions {
    // background-color: var(--plt-cover);
  }
  
</style>

