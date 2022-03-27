
<script lang="ts">
  // * setup: purge-icons (not working)
  //#region 
  // ? https://github.com/antfu/purge-icons/blob/main/examples/vite/src/main.js
  
  // classic SVG Framework setup (needed by purge-icons)
  // triggers iconify api
  // import '@iconify/iconify'
  // I've seen this on Google, try it out (one day...)
  // import Icon from '@iconify/iconify'
  
  // future: does this setup work w/ native cmps? and using named import?
  // import '@iconify/svelte'
  
  // BUG in network > 'generated' file: array is empty
  // import '@purge-icons/generated'
  //#endregion 
  
  // import Icon from '@iconify/iconify' // try this out
  // import Icon from '@iconify/svelte'
  
  
  export let src: string
  
  
</script>


<span class="iconify" data-icon={src}></span>
<!-- <Icon icon={src} /> -->


<style lang=scss>
  
  
  
</style>








