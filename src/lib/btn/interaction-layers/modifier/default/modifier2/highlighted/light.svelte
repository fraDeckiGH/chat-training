
<script lang=ts>
  import InteractionLayers from "$lib/btn/interaction-layers/interaction-layers.svelte";
  
</script>


<div class="wrap">
  <InteractionLayers></InteractionLayers>
</div>


<style lang="scss">
  
  @use "src/lib/color";
  
  @use "src/lib/btn/interaction-layers/helper";
  @use "./../light" as mod2;
  
  
  .wrap {
    @include helper.unwanted-wrap;
  }
  
  // target child components
  .wrap:global {
    
    @include helper.interaction-layer(focus) {
      $bg2: color.scale(
        mod2.$bg, 
        $lightness: 87%,
      );
      
      background-color: $bg2;
    }
    @include helper.interaction-layer(hover) {
      @include mod2.hover;
    }
    @include helper.interaction-layer(no-interaction) {
      $bg2: color.scale(
        mod2.$bg, 
        $lightness: 90%,
      );
      
      background-color: $bg2;
    }
    
  }
  
  
</style>