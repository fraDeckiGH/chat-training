
<script lang=ts>
  import InteractionLayers from "$lib/btn/interaction-layers/interaction-layers.svelte";
  
</script>


<div class="wrap">
  <InteractionLayers></InteractionLayers>
</div>


<style lang="scss">
  
  @use "src/lib/color";
  
  @use "src/lib/btn/interaction-layers/helper";
  @use "./../dark" as mod2;
  
  
  .wrap {
    @include helper.unwanted-wrap;
  }
  
  // target child components
  .wrap:global {
    
    @include helper.interaction-layer(focus) {
      $bg2: color.scale(
        mod2.$bg, 
        $lightness: -83%,
      );
      
      background-color: $bg2;
    }
    @include helper.interaction-layer(hover) {
      @include mod2.hover;
    }
    @include helper.interaction-layer(no-interaction) {
      // about the $alpha: do I want to see through?
      $bg2: color.scale(
        mod2.$bg, 
        $lightness: -85%,
        // $alpha: -50%,
      );
      
      background-image: linear-gradient(60deg, 
        transparent , 
        $bg2 35% 65%, 
        transparent ,
      );
    }
    
  }
  
  
</style>