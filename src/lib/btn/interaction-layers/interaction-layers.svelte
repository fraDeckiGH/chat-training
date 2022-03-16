
<script lang=ts>
  import type { $IntLayersState } from "$lib/btn/btn.svelte";
  import { getContext } from "svelte";
  // import { fade } from 'svelte/transition';
  
  
  const state: $IntLayersState = getContext("state")
  let {
    disabled,
    loading,
    cmpInteraction,
  } = $state
  
  
  $: {
    // console.log(`$state`, $state)
    disabled = $state.disabled
    loading = $state.loading
    cmpInteraction = $state.cmpInteraction
  }
    
  
</script>


<!-- BUG in&out transitions not bidirectional 
  noticeable on long(1/2sec) durations when triggering
  fast both in and out
  
  tried solving it already, don't think there's a fast way
  to do it
-->
{#if 
  // when :disabled, the el loses :focus (this is how <button> behaves)
  disabled || 
  
  (loading && !cmpInteraction.focus) || 
  
  // every val of the obj is...
  (Object.values(cmpInteraction)).every(val => !val)
}
  <!-- fix flashing bug 
    to avoid a bug which visually looks like the elem 
    it's flashing (noticeable when focus by keyboard)
    
    out:fade must be equal to the longest in:fade 
    of other layers
  -->
  <!-- 
    out:fade={{ duration: 300 }} -->
  <div 
    class="int-layer int-layer--no-interaction"
  ></div>
{/if}
{#if cmpInteraction.focus}
  <!-- 
    in:fade={{ duration: 300 }}
    out:fade={{ duration: 200 }} -->
  <div 
    class="int-layer int-layer--focus"
  ></div>
{/if}
{#if cmpInteraction.hover 
  && !disabled
  && !loading
}
  <!-- 
    in:fade={{ duration: 250 }}
    out:fade={{ duration: 200 }} -->
  <div 
    class="int-layer int-layer--hover"
  ></div>
{/if}


<style lang=scss>
  
  // @use "sass:map";
  // @use "sass:meta";
  // @use "src/lib/color";
  // @use "src/lib/palette" as plt;
  // @use "src/lib/reset";
  @use "src/lib/util";
  
  
  .int-layer {
    border-radius: inherit;
    @include util.overlay;
    z-index: -1;
    
    // BUG fix tryout (see notes)
    // #region
    // transition-property: opacity;
    // transition-timing-function: linear;
    
    // &.hide {
    //   opacity: 0;
    // }
    // &.show {
    //   opacity: 1;
    // }
    
    // &--hover {
    //   &.hide {
    //     transition-duration: 2000ms;
    //   }
    //   &.show {
    //     transition-duration: 2500ms;
    //   }
    // }
    // &--no-interaction {
    //   &.hide {
    //     transition-duration: 3000ms;
    //   }
    // }
    // #endregion
    
  }
  
</style>

