
<script lang=ts>
  // https://github.com/material-components/material-components-web/tree/master/packages/mdc-circular-progress
  
  // import "@material/circular-progress/mdc-circular-progress.scss"
  import type { Maybe } from "$lib/type/util";
  import { MDCCircularProgress } from "@material/circular-progress";
  
  
  /**
    sets font-size
    usage eg. size=120%
  */
  export let size = <Maybe<string>>null
  
  
  let guideline = { 
    // Medium (36px)
    viewBox: 32,
    c: 16,
    r: 12.5,
    strokeDasharray: 78.54,
    strokeDashoffset: 39.27,
    strokeWidth: 3,
    strokeWidth_gapPatch: 2.4,
  }
  let mdcCmp: MDCCircularProgress
  
  
  /** 
    why do this?
    ? https://github.com/material-components/material-components-web/tree/master/packages/mdc-circular-progress#sizing
    
    not evaluated:
    resizing of the target htmlEl
  */
  function initGuidelineValues(htmlEl: HTMLElement) {
    const rect = htmlEl.getBoundingClientRect()
    // console.log(`rect`, rect)
    
    // assumption: height & width are the same 
    const { height } = rect
    
    /*
      value between 24 and 36 == 30
      value between 36 and 48 == 42
    */
    if (height < 30) {
      // Small (24px)
      guideline = {
        viewBox: 24,
        c: 12,
        r: 8.75,
        strokeDasharray: 54.978,
        strokeDashoffset: 27.489,
        strokeWidth: 2.5,
        strokeWidth_gapPatch: 2,
      }
    } else if (height < 42) {
      // Medium (36px)
      guideline = {
        viewBox: 32,
        c: 16,
        r: 12.5,
        strokeDasharray: 78.54,
        strokeDashoffset: 39.27,
        strokeWidth: 3,
        strokeWidth_gapPatch: 2.4,
      }
    } else {
      // Large (48px)
      guideline = {
        viewBox: 48,
        c: 24,
        r: 18,
        strokeDasharray: 113.097,
        strokeDashoffset: 56.549,
        strokeWidth: 4,
        strokeWidth_gapPatch: 3.2,
      }
    }
    
  }
  
  /** 
    some indications
    https://material.io/develop/web/guides/framework-integration
  */
  function instantiate(htmlEl: HTMLElement, args?: any) {
    initGuidelineValues(htmlEl)
    
    mdcCmp = new MDCCircularProgress(htmlEl)
    // console.log(`mdcCmp`, mdcCmp)
    
    // mdcCmp.determinate = false
    
    return {
      destroy() {
        mdcCmp.destroy()
			}
    }
  }
  
  
</script>


<!-- 
  BUG these were removed cuz they give error
  aria-valuemin="0"
  aria-valuemax="1"
 -->
<!-- 
  https://github.com/material-components/material-components-web/tree/master/packages/mdc-circular-progress#css-classes
  
  added by me:
  .mdc-circular-progress--indeterminate
  
  following in Iconify's footsteps
  font-size: {size};
 -->
<div
  class="
    mdc-circular-progress 
    mdc-circular-progress--indeterminate
  "
  style="
    font-size: {size};
  "
  role="progressbar"
  aria-label="Example Progress Bar"
  
  use:instantiate={{ 
    mdcCmp, 
  }}
>
  <div class="mdc-circular-progress__determinate-container">
    <svg
      class="mdc-circular-progress__determinate-circle-graphic"
      viewBox="0 0 {guideline.viewBox} {guideline.viewBox}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="mdc-circular-progress__determinate-track"
        cx={guideline.c}
        cy={guideline.c}
        r={guideline.r}
        stroke-width={guideline.strokeWidth}
      />
      <!-- 
        not an error
        stroke-dashoffset={guideline.strokeDasharray}
      -->
      <circle
        class="mdc-circular-progress__determinate-circle"
        cx={guideline.c}
        cy={guideline.c}
        r={guideline.r}
        stroke-dasharray={guideline.strokeDasharray}
        stroke-dashoffset={guideline.strokeDasharray}
        stroke-width={guideline.strokeWidth}
      />
    </svg>
  </div>
  
  <div class="mdc-circular-progress__indeterminate-container">
    <div class="mdc-circular-progress__spinner-layer">
      
      <div
        class="
          mdc-circular-progress__circle-clipper 
          mdc-circular-progress__circle-left
        "
      >
        <svg
          class="mdc-circular-progress__indeterminate-circle-graphic"
          viewBox="0 0 {guideline.viewBox} {guideline.viewBox}"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={guideline.c}
            cy={guideline.c}
            r={guideline.r}
            stroke-dasharray={guideline.strokeDasharray}
            stroke-dashoffset={guideline.strokeDashoffset}
            stroke-width={guideline.strokeWidth}
          />
        </svg>
      </div>
      
      <div class="mdc-circular-progress__gap-patch">
        <svg
          class="mdc-circular-progress__indeterminate-circle-graphic"
          viewBox="0 0 {guideline.viewBox} {guideline.viewBox}"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={guideline.c}
            cy={guideline.c}
            r={guideline.r}
            stroke-dasharray={guideline.strokeDasharray}
            stroke-dashoffset={guideline.strokeDashoffset}
            stroke-width={guideline.strokeWidth_gapPatch}
          />
        </svg>
      </div>
      
      <div
        class="
          mdc-circular-progress__circle-clipper 
          mdc-circular-progress__circle-right
        "
      >
        <svg
          class="mdc-circular-progress__indeterminate-circle-graphic"
          viewBox="0 0 {guideline.viewBox} {guideline.viewBox}"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={guideline.c}
            cy={guideline.c}
            r={guideline.r}
            stroke-dasharray={guideline.strokeDasharray}
            stroke-dashoffset={guideline.strokeDashoffset}
            stroke-width={guideline.strokeWidth}
          />
        </svg>
      </div>
      
    </div>
  </div>
</div>


<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
  
  @use "@material/circular-progress/mdc-circular-progress"; // gives warning
  @use "@material/circular-progress/mixins";
  
  // @use "sass:map";
  // @use "../lib/palette" as plt;
  @use "../lib/util";
  
  
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
    
    // following in Iconify's footsteps
    height: 1em;
    width: 1em;
  }
  
</style>
