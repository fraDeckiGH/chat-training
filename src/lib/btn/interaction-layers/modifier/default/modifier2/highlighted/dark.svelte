
<script lang=ts>
  import InteractionLayers from "$lib/btn/interaction-layers/interaction-layers.svelte";
  
</script>


<div class="wrap">
  <InteractionLayers></InteractionLayers>
</div>


<style lang="scss">
  
  @use "sass:map";
  // @use "sass:meta";
  @use "src/lib/color";
  @use "src/lib/palette" as plt;
  
  @use "src/lib/btn/interaction-layers/helper";
  @use "./../dark" as mod2;
  
  
  .wrap {
    @include helper.unwanted-wrap;
  }
  
  // target child components
  .wrap:global {
    
    @include helper.interaction-layer(focus) {
      $bg: map.get(plt.$dark, "1");
      
      $bg1: color.scale(
        $bg, 
        $lightness: -85%,
      );
      $bg2: color.scale(
        $bg, 
        $lightness: -90%,
      );
      
      background-image: linear-gradient(60deg, 
        $bg1 , 
        $bg2 35% 65%, 
        $bg1 ,
      );
    }
    @include helper.interaction-layer(hover) {
      @include mod2.hover;
    }
    @include helper.interaction-layer(no-interaction) {
      $bg: map.get(plt.$dark, "1");
      
      $bg2: color.scale(
        $bg, 
        $lightness: -85%,
      );
      
      background-color: $bg2;
    }
    
  }
  
  
</style>