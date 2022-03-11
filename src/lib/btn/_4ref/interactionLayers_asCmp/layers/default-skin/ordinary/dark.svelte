
<script lang=ts>
  // future: this import won't work
  import InteractionLayers from "$lib/btn/layers/interaction-layers.svelte";
  
</script>


<div class="wrap">
  <InteractionLayers></InteractionLayers>
</div>


<style lang="scss">
  
  @use "sass:map";
  // @use "sass:meta";
  @use "src/lib/color";
  @use "src/lib/palette" as plt;
  // @use "src/lib/reset";
  // @use "src/lib/util";
  
  
  .wrap {
    all: inherit;
    display: contents;
  }
  .wrap:global {
    @mixin interaction-layer($modifier) {
      .int-layer {
        &.int-layer--#{$modifier} {
          @content;
        }
      }
    }
    
    // .int-layer {
    //   background-color: brown;
    // }
    @include interaction-layer(hover) {
      // @extend %btn--default-skin_hover;
      $bg: map.get(plt.$dark, "1");
      
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
      );
    }
    
  }
  
  
</style>