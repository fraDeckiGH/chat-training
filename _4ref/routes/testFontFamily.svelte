
<script lang=ts>
  // import "../app.scss"
  // import "app.scss"
  
</script>

<div class="content-container">
  index
  <div class="lbl1">
    lbl 1 400
  </div>
  <div class="lbl2">
    lbl 2 500
  </div>
  <div class="lbl3">
    lbl 3 600
  </div>
  <div class="lbl4">
    lbl 4 700
  </div>
</div>

<style lang=scss>
  
  // * font (copy-paste from "global" in case I remove it there)
  // #region
  // haven't tested if @import/@use work here

  // ? https://fontsource.org/fonts/asap
  // ? https://fonts.google.com/specimen/Asap?vfonly=true&preview.size=21#standard-styles
  // @use "@fontsource/asap"; // 13.4 kB
  // doesn't work w/ @use
  // @import "@fontsource/asap/500.css"; // 14.2 kB
  // @import "@fontsource/asap/600.css"; // 14.2 kB
  // @import "@fontsource/asap/700.css"; // 13.4 kB

  // ? https://fontsource.org/docs/variable-fonts
  // smaller bundle size
  @use "@fontsource/asap/variable.css"; // 25.6 kB
  @use "@fontsource/asap/variable-italic.css"; // 28.9 kB

  // BUG these 2 (variable-full) don't work
  // @use "@fontsource/asap/variable-full.css";
  // @import "@fontsource/asap/variable-full-italic.css";

  // * END font
  // #endregion
  
  
  .content-container {
    // 1 of the 2
    // font-family: "Asap", sans-serif;
    // font-family: "AsapVariable", sans-serif;
    
    font-size: 50px;
    // font-style: italic;
    
    .lbl1 {
      font-weight: 400;
      // font-variation-settings: "wght" 400;
    }
    .lbl2 {
      font-weight: 500;
      // font-variation-settings: "wght" 500;
    }
    .lbl3 {
      font-weight: 600;
      // font-variation-settings: "wght" 600;
    }
    .lbl4 {
      font-weight: 700;
      // font-variation-settings: "wght" 700;
    }
  }
</style>
