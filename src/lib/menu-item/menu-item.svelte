
<script lang=ts context=module>
  export type {
    Props as MenuItemProps,
  }
  
  type Props = {
    disabled?: Disabled
    // icon: 
    id: string
    lbl: string
    
    /**
     * when a redirect is desired
     */
    link?: Link
  }
  
</script>

<script lang="ts">
  import Btn from "$lib/btn/btn.svelte";
  import type { Disabled, Link, } from "$lib/btn/btn.svelte";
  // import type { MenuItem } from "$lib/menu/menu.svelte";
  import type { Maybe } from "$lib/type/util";
  
  
  export let disabled = <Disabled>null
  
  // export let id = <Maybe<string>>null
  export let lbl = <Maybe<string>>null
  
  /**
    when a redirect is desired
  */
  export let link = <Link>null
  
  
</script>


<Btn 
  {disabled}
  {link}
  modifier="menu-item"
  let:resultingInteraction
  let:state
  on:click
>
  <div 
    class="slot slot--{resultingInteraction}"
    class:disabled={state.disabled}
  >
    <!-- <slot></slot> -->
    {lbl}
  </div>
</Btn>


<style lang="scss">
  
  @use "sass:map";
  @use "src/lib/color";
  @use "src/lib/palette" as plt;
  
  
  .slot {
    border-radius: var(--border-radius);
    padding: .4em .7em;
    
    &--focus {
      
      :global html.theme-dark & {
        color: var(--plt-1);
      }
      :global html.theme-light & {
        color: color.scale(
          map.get(plt.$light, "1"),
          // map.get(plt.$light, "1--lessHue"),
          $lightness: -25%,
        );
      }
      
    }
    &--hover {
      
      :global(html.theme-dark) & {
        // background-color: color.scale(
        //   map.get(plt.$dark, "cover"), 
        //   $alpha: -80%,
        //   // $lightness: 100%,
        // );
        
        background-color: hsl(var(--plt-cover-hsl) / .1);
      }
      :global(html.theme-light) & {
        background-color: hsl(var(--plt-cover-hsl) / .05);
      }
      
    }
    // &--no-interaction {}
    
    
    &.disabled {
      opacity: 50%;
    }
    
  }
  
</style>
