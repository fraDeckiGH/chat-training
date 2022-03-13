
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
      $bg: color.scale(
        map.get(plt.$dark, "1"), 
        $lightness: -83%,
      );
      
      background-color: $bg;
    }
    @include helper.interaction-layer(hover) {
      @include mod2.hover;
    }
    @include helper.interaction-layer(no-interaction) {
      $bg: map.get(plt.$dark, "1");
      
      // about the $alpha: do I want to see through?
      $bg2: color.scale(
        $bg, 
        $lightness: -85%,
        // $alpha: -50%,
      );
      
      // background-color: aqua; // visible when $bg1 is transparent
      // background-color: red; // visible when $bg1 is transparent
      // background-color: white; // visible when $bg1 is transparent
      
      background-image: linear-gradient(60deg, 
        transparent , 
        $bg2 35% 65%, 
        transparent ,
      );
      
      // valid aesthetics (save these somewhere)
      // #region
      /* $bg: map.get(plt.$dark, "1");
      
      $bg1: color.scale(
        $bg, 
        $lightness: -65%,
      );
      $bg2: color.scale(
        $bg, 
        $lightness: -85%,
      );
      
      background-image: linear-gradient(60deg, 
        $bg1 , 
        $bg2 35% 65%, 
        $bg1 ,
      ); */
      // background-image: linear-gradient(60deg, 
      //   $bg1 , 
      //   $bg2 40% 60%, 
      //   $bg1 ,
      // );
      // background-image: linear-gradient(60deg, 
      //   $bg1 40%, 
      //   $bg2 , 
      //   $bg1 60%,
      // );
      // background-image: linear-gradient(60deg, 
      //   $bg1 20%, 
      //   $bg2 , 
      //   $bg1 80%,
      // );
      // background-image: linear-gradient(60deg, 
      //   $bg1 30%, 
      //   $bg2 30% 70%, 
      //   $bg1 70%,
      // );
      // #endregion
      
    }
    
  }
  
  
</style>