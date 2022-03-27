
<script lang="ts" context=module>
  export type {
    Props as IconProps,
  }
  
  type Props = {
    inline?: Maybe<boolean>
    src: string
    
    /** inline styles
      
      eg
      in case dimensions are passed, these will 
      overwrite props
    */
    style?: Maybe<string>
    
    // * dimensions
    
    /** font-size
      eg fz=120%
    */
    fz?: Maybe<Size>
    height?: Maybe<Size>
    width?: Maybe<Size>
    
  }
  
</script>

<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { Size } from '$lib/type/cmp';
  import type { Maybe } from '$lib/type/util';
  
  
  export let inline = <Maybe<boolean>>null
  export let src: string
  
  /**
    inline styles
    
    eg
    in case dimensions are passed, these will 
    overwrite props
  */
  export let style = <Maybe<string>>null
  
  // * dimensions
  
  /** font-size
    eg fz=120%
  */
  export let fz = <Maybe<Size>>null
  export let height = <Maybe<Size>>null
  // seems too generic
  // export let size = <Maybe<Size>>null
  export let width = <Maybe<Size>>null
  
  
</script>


<Icon 
  {height}
  icon={src} 
  {inline}
  font-size={fz}
  {style}
  {width}
/>


<!-- <style lang=scss></style> -->








