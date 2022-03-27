
<script lang="ts">
  // * setup: unplugin-icons + unplugin-auto-import
  /* unfinished but it works!
    
    - then why am I not using this setup?
    online-only vers. == faster usage and I don't need to take 
    the time to finish this
    
    ---
    things I originally planned to do:
    
    usage could be better, like 
    src=mdi:account-box
    and then transform the string in here
  */
  
  let iconCmp: unknown
  export let src: string
  
  
  switch (src) {
    case "IconMdiAccountBox":
      // @ts-ignore
      iconCmp = IconMdiAccountBox
      break;
  
    default:
      console.log(`default case`, )
  }
  
  
</script>


<!-- usage
<Icon 
  src=IconMdiAccountBox
></Icon>
-->

<svelte:component this={iconCmp} />


<style lang=scss>
  
  
  
</style>








