<script lang=ts>
  import type { BtnIconProps, Loading } from "./btn.svelte";
  import Icon from "$lib/icon/icon.svelte";
  import ProgressCircular from "$lib/progress-circular.svelte";
  // import type { Maybe } from "$lib/type/util";
  
  
  export let iconProps: BtnIconProps
  export let loading = null as Loading
  
  
  function filterIconProps() {
    const {
      pos, 
      ...rest
    } = iconProps
    
    return rest
  }
  
  function filterProgressCircularProps() {
    const {
      fz, 
      height, 
      // pos, 
      style, 
      width, 
      // ...rest
    } = iconProps
    
    const ret = {
      size: fz,
      style,
    }
    
    
    // * dimensions: take care of 'em
    
    const dimension = {
      height,
      width,
    }
    const dimensionExists = (val: typeof width) => (
      // accept:
      // any number (including 0)
      (typeof val === "number") || 
      // strings (except ""), true (boolean)
      /* 
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
        
        ??
        val null or undefined ? fail the check
        
        ||
        val falsy ? fail the check
      */
      (val || false)
    )
    
    if (
      // every val of the obj is...
      (Object.values(dimension)).every(dimensionExists)
    ) {
      ret.style = `
        height: ${height};
        width: ${width};
        ${style}
      `
    } else if (
      // at least 1
      (Object.values(dimension)).some(dimensionExists)
    ) {
      const soleDimension = (Object.values(dimension)).find(dimensionExists)
      ret.style = `
        height: ${soleDimension};
        width: ${soleDimension};
        ${style}
      `
    }
    
    
    return ret
  }
  
  
</script>


{#if iconProps}
  {#if loading}
    <ProgressCircular 
      inline
      {...filterProgressCircularProps()}
    ></ProgressCircular>
  {:else}
    <Icon 
      inline
      {...filterIconProps()}
    ></Icon>
  {/if}
{/if}


<!-- <style lang=scss></style> -->







