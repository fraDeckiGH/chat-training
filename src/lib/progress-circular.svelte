
<script lang=ts>
  // https://github.com/material-components/material-components-web/tree/master/packages/mdc-circular-progress

  import { MDCCircularProgress } from "@material/circular-progress";
  import "@material/circular-progress/mdc-circular-progress.scss"
  import { onMount } from "svelte";

  let circularProgress: MDCCircularProgress
  
  onMount(() => {
    circularProgress = new MDCCircularProgress(
      document.querySelector(".mdc-circular-progress")!
    )
    // console.log(`circularProgress`, circularProgress)
    
    // circularProgress.determinate = false
  })
  
</script>


<!-- 
  BUG these were removed cuz they give error
  aria-valuemin="0"
  aria-valuemax="1"
 -->
<!-- 
  https://github.com/material-components/material-components-web/tree/master/packages/mdc-circular-progress#css-classes
  
  added by me:
  mdc-circular-progress--indeterminate
  
 -->
<div
  class="mdc-circular-progress mdc-circular-progress--indeterminate"
  style="
    height:48px;
    width:48px;
  "
  role="progressbar"
  aria-label="Example Progress Bar"
>
  <div class="mdc-circular-progress__determinate-container">
    <svg
      class="mdc-circular-progress__determinate-circle-graphic"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="mdc-circular-progress__determinate-track"
        cx="24"
        cy="24"
        r="18"
        stroke-width="4"
      />
      <circle
        class="mdc-circular-progress__determinate-circle"
        cx="24"
        cy="24"
        r="18"
        stroke-dasharray="113.097"
        stroke-dashoffset="113.097"
        stroke-width="4"
      />
    </svg>
  </div>
  
  <div class="mdc-circular-progress__indeterminate-container">
    <div class="mdc-circular-progress__spinner-layer">
      
      <div
        class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left"
      >
        <svg
          class="mdc-circular-progress__indeterminate-circle-graphic"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="18"
            stroke-dasharray="113.097"
            stroke-dashoffset="56.549"
            stroke-width="4"
          />
        </svg>
      </div>
      
      <div class="mdc-circular-progress__gap-patch">
        <svg
          class="mdc-circular-progress__indeterminate-circle-graphic"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="18"
            stroke-dasharray="113.097"
            stroke-dashoffset="56.549"
            stroke-width="3.2"
          />
        </svg>
      </div>
      
      <div
        class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right"
      >
        <svg
          class="mdc-circular-progress__indeterminate-circle-graphic"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="18"
            stroke-dasharray="113.097"
            stroke-dashoffset="56.549"
            stroke-width="4"
          />
        </svg>
      </div>
      
    </div>
  </div>
</div>


<style lang="scss">
  
  // @use "sass:meta";
  
  // gives warning
  // @use "@material/circular-progress/mdc-circular-progress";
  @use "@material/circular-progress/mixins";
  
  // @use "sass:map";
  // @use "../lib/palette" as plt;
  @use "../lib/util";
  
  // :global(html) {
  //   // gives warning
  //   @include meta.load-css("@material/circular-progress/mdc-circular-progress");
  // }
  
  
  // works outside as well
  // @include mixins.color(var(--plt-1));
  
  .mdc-circular-progress {
    // breaks
    // @include mixins.core-styles;
    
    // work
    @include util.trueHeight;
    // @include util.trueHeight(block);
    // @include util.trueHeight($display: block);
    
    // both work
    @include mixins.color(var(--plt-1));
    // @include mixins.color(map.get(plt.$dark, "1"));
    
    // dont work
    // @include mdc-circular-progress-color(red);
    // @include mdc-circular-progress.mdc-circular-progress-color(red);
    
  }
  
</style>
