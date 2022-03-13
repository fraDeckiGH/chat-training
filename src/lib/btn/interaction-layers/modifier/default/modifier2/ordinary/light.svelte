
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
      // @extend %btn--default-skin_ordinary_focus;
      // TODO do the followings for dark mode as well
      
      // TODO get this color from outside (from standard bg eg. when el isnt hovered)
      $bg: color.adjust(
        map.get(plt.$light, "1"), 
        $hue: -20,
      );
      // scale from lightness more dynamically (from standard bg eg. when el isnt hovered)
      $bg2: color.scale(
        $bg, 
        $lightness: 88%,
      );
      // ? for the future (read above)
      // $bg2: color.scale(
      //   , 
      //   $lightness: -2%,
      // );
      
      background-color: $bg2;
    }
    @include helper.interaction-layer(hover) {
      @include mod2.hover;
    }
    @include helper.interaction-layer(no-interaction) {
      // @extend %btn--default-skin_ordinary_no-interaction;
      $bg: color.adjust(
        map.get(plt.$light, "1"), 
        $hue: -20,
      );
      
      $bg2: color.scale(
        $bg, 
        $lightness: 90%,
      );
      
      background-image: linear-gradient(60deg, 
        transparent , 
        $bg2 35% 65%, 
        transparent ,
      );
    }
    
  }
  
  
</style>