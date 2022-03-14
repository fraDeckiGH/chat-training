
<script lang=ts>
  import InteractionLayers from "$lib/btn/interaction-layers/interaction-layers.svelte";
  
</script>


<div class="wrap">
  <InteractionLayers></InteractionLayers>
</div>


<style lang="scss">
  
  @use "src/lib/color";
  // @use "sass:map";
  // @use "src/lib/palette" as plt;
  
  @use "src/lib/btn/interaction-layers/helper";
  // @use "./../dark" as mod2;
  
  
  .wrap {
    @include helper.unwanted-wrap;
  }
  
  // target child components
  .wrap:global {
    
    @include helper.interaction-layer(focus) {
      
    }
    @include helper.interaction-layer(hover) {
      // background-color: color.scale(
      //   map.get(plt.$dark, "cover"), 
      //   $alpha: -80%,
      //   // $lightness: 100%,
      // );
      
      background-color: hsl(var(--plt-cover-hsl) / .1);
    }
    @include helper.interaction-layer(no-interaction) {
      
    }
    
  }
  
  
</style>