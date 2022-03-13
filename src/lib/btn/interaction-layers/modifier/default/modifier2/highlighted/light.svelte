
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
  @use "./../light" as mod2;
  
  
  .wrap {
    @include helper.unwanted-wrap;
  }
  
  // target child components
  .wrap:global {
    
    @include helper.interaction-layer(focus) {
      $bg: color.adjust(
        map.get(plt.$light, "1"), 
        $hue: -20,
      );
      $bg2: color.scale(
        $bg, 
        $lightness: 87%,
      );
      
      background-color: $bg2;
    }
    @include helper.interaction-layer(hover) {
      @include mod2.hover;
    }
    @include helper.interaction-layer(no-interaction) {
      $bg: color.adjust(
        map.get(plt.$light, "1"), 
        $hue: -20,
      );
      
      $bg2: color.scale(
        $bg, 
        $lightness: 90%,
      );
      
      background-color: $bg2;
    }
    
  }
  
  
</style>