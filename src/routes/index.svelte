
<script lang=ts>
  // import "index.postcss"
  const pippo: number = 5
</script>

<h1 class="from-app-postcss">
  Welcome to SvelteKit
</h1>

<div class="from-here"></div>

<p class="from-app-scss">
  Visit 
  <a href="https://kit.svelte.dev">
    kit.svelte.dev
  </a>
  to read the documentation
</p>
<div class="from-app-scss-2"></div>

<style lang=scss>
  $color: fuchsia;
  .from-here {
    height: 10px;
    /* -x-size: 40px; */
    // /* -x- */margin: 40px *;
    /* background-color: yellowgreen; */
    background-color: $color;
  }
</style>