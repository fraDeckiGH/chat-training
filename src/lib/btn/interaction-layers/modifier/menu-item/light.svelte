
<script lang=ts>
  import InteractionLayers from "$lib/btn/interaction-layers/interaction-layers.svelte";
  
</script>


<div class="wrap">
  <InteractionLayers></InteractionLayers>
</div>


<style lang="scss">
  
  @use "src/lib/color";
  
  @use "src/lib/btn/interaction-layers/helper";
  // @use "./../light" as mod2;
  
  
  .wrap {
    @include helper.unwanted-wrap;
  }
  
  // target child components
  .wrap:global {
    
    @include helper.interaction-layer(focus) {
      
    }
    @include helper.interaction-layer(hover) {
      background-color: hsl(var(--plt-cover-hsl) / .05);
    }
    @include helper.interaction-layer(no-interaction) {
      
    }
    
  }
  
  
</style>