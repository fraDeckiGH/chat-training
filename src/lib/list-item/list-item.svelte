
<script lang=ts context=module>
  export type {
    Props as ListItemProps,
  }
  
  type Props = 
    & ItemCommonProps
    & {
      disabled?: Disabled
      // icon: unknown
      
      lbl: string
      
      /**
        when a redirect is desired
      */
      link?: Link
      
    }
  ;
  
</script>

<script lang="ts">
  import Btn from "$lib/btn/btn.svelte";
  import type { Disabled, Link, } from "$lib/btn/btn.svelte";
  // import Icon from "$lib/icon/icon.svelte";
  import { calcResultingInteraction } from "$lib/interaction";
  // import type { MenuItem } from "$lib/menu/menu.svelte";
  import type { ItemCommonProps, } from "$lib/type/cmp";
  import type { Maybe } from "$lib/type/util";
  
  
  export let disabled = <Disabled>null
  
  export let lbl: string
  
  /**
    when a redirect is desired
  */
  export let link = <Link>null
  
  /**
    :checked
  */
  export let selected = <Maybe<boolean>>null
  
  
</script>


<!-- 
  let:resultingInteraction -->
<Btn 
  {disabled}
  {link}
  modifier="menu-item"
  let:state
  on:click
>
  <!-- state sync
    I want to use 'disabled' returned from Btn so 
    there is no discrepancy between Btn being disabled 
    and its content being not
  -->
  <div 
    class="slot slot--{
      calcResultingInteraction({
        ...state,
        selected,
      })
    }"
    class:disabled={state.disabled}
    class:selected={selected}
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
        
        background-color: hsl(var(--plt-cover-hsl) / 10%);
      }
      :global(html.theme-light) & {
        background-color: hsl(var(--plt-cover-hsl) / 05%);
      }
      
    }
    // &--no-interaction {}
    
    
    &.disabled {
      opacity: 50%;
    }
    &.selected {
      
      :global(html.theme-dark) & {
        background-color: hsl(var(--plt-1-hsl) / 10%);
      }
      :global(html.theme-light) & {
        background-color: color.scale(
          // map.get(plt.$light, "1"),
          map.get(plt.$light, "1--lessHue"),
          $alpha: -90%,
        );
        
      }
      
    }
    
  }
  
</style>
