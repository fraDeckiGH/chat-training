

<script lang=ts>
  
  // docs
  // https://typogram.github.io/Anicons/use.html
  
</script>



<!-- icons test -->
<div class="anicon">o</div>



<style lang=scss>
  
  // icons test
  
  @font-face {
    font-family: 'Anicons Regular';
    // weren't able to customize colored anicons
    // font-family: 'Anicons Color';
    
    // '/' points to ./src/static/
    
    // ? what's the diff between webfont_kit & variable
    src: url("/_iconAnimated-test/anicons/webfont_kit/AniconsGX.ttf");
    // src: url("/_iconAnimated-test/anicons/webfont_kit/AniconsColorGX.ttf");
    
    // src: url("/_iconAnimated-test/anicons/variable/AniconsGX.ttf");
    // src: url("/_iconAnimated-test/anicons/variable/AniconsColorGX.ttf");
    
    font-weight: normal;
    font-style: normal;
  }
  
  .anicon {
    font-family: "Anicons Regular", sans-serif;
    
    font-variation-settings: "TIME" 1;
    transition: font-variation-settings 0.4s ease;
    &:hover {
      font-variation-settings: "TIME" 100;
    }
    
    font-size: 400%;
  }
  
</style>




