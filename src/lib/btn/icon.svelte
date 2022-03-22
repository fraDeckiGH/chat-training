<script lang=ts>
  import type { BtnIconProps } from "./btn.svelte";
  import Icon from "$lib/icon/icon.svelte";
  import type { Maybe } from "$lib/type/util";
  
  
  export let icon = <Maybe<BtnIconProps>>null
  
  
  function filterIconProps(icon: BtnIconProps) {
    const {
      pos, 
      ...rest
    } = icon
    
    return rest
  }
  
</script>


{#if icon}
  <Icon 
    inline
    {...filterIconProps(icon)}
  ></Icon>
{/if}


